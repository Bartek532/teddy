import { encode } from "gpt-tokenizer";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getIntention, intentions } from "../lib/ai/intentions";
import { getOpenAiRequestOptions } from "../lib/ai/openai";
import { createSafeContext } from "../lib/context";
import { LOADING_ASSISTANT_MESSAGE, MILLISECONDS_PER_SECOND } from "../utils/constants";
import { updateLastItem } from "../utils/functions";
import { MESSAGE_VARIANT, ROLE } from "../utils/types";

import { useActionsContext } from "./ActionsProvider";
import { useSettingsContext } from "./SettingsProvider";

import type { IncomingChunk } from "../lib/ai/openai";
import type { ChatMessage, ChatMessageParams } from "../utils/types";
import type { ReactNode } from "react";

interface ChatContextValue {
  readonly tokens: number;
  readonly messages: ChatMessage[];
  readonly isLoading: boolean;
  readonly abortResponse: () => void;
  readonly resetMessages: () => void;
  readonly setMessages: (newMessages: ChatMessageParams[]) => void;
  readonly setSystemPrompt: (message: string) => void;
  readonly submitPrompt: (messages: ChatMessageParams[]) => void;
}

const createChatMessage = ({
  content,
  role,
  variant,
  ...restOfParams
}: ChatMessageParams): ChatMessage => ({
  content,
  role,
  variant: variant ?? MESSAGE_VARIANT.DEFAULT,
  timestamp: restOfParams.timestamp ?? Date.now(),
  meta: {
    loading: false,
    responseTime: "",
    chunks: [],
    ...restOfParams.meta,
  },
});

const filterMessages = (messages: ChatMessage[]) =>
  messages
    .filter(({ content }) => content.trim().length && content !== LOADING_ASSISTANT_MESSAGE)
    .filter(
      ({ variant }, index, arr) =>
        variant !== MESSAGE_VARIANT.ERROR &&
        (arr[index + 1] ? arr[index + 1].variant !== MESSAGE_VARIANT.ERROR : true),
    );

const [useChatContext, ChatContextProvider] = createSafeContext<ChatContextValue>();

const ChatProvider = ({ children }: { readonly children: ReactNode }) => {
  const { settings } = useSettingsContext();
  const { actions } = useActionsContext();
  const [systemPrompt, setSystemPrompt] = useState(settings.systemPrompt);

  const [messages, _setMessages] = useState<ChatMessage[]>([
    createChatMessage({
      role: ROLE.SYSTEM,
      variant: MESSAGE_VARIANT.DEFAULT,
      content: systemPrompt,
    }),
  ]);
  const [tokens, setTokens] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [controller, setController] = useState<AbortController | null>(null);

  const abortResponse = () => {
    if (controller) {
      controller.abort();
      setController(null);
    }
  };

  const resetMessages = () => {
    abortResponse();
    _setMessages((prev) => prev.filter(({ role }) => role === ROLE.SYSTEM));
  };

  const setMessages = (newMessages: ChatMessageParams[]) => {
    if (!isLoading) {
      _setMessages(newMessages.map(createChatMessage));
    }
  };

  const handleNewData = ({ content, role, variant = MESSAGE_VARIANT.DEFAULT }: IncomingChunk) => {
    _setMessages(
      updateLastItem((msg) => ({
        content: `${msg.content.replace(LOADING_ASSISTANT_MESSAGE, "")}${content}`,
        role: msg.role,
        variant: variant,
        timestamp: 0,
        meta: {
          ...msg.meta,
          chunks: [
            ...msg.meta.chunks,
            {
              content,
              role,
              timestamp: Date.now(),
            },
          ],
        },
      })),
    );
  };

  const closeStream = (beforeTimestamp: number) => {
    const afterTimestamp = Date.now();
    const diffInSeconds = (afterTimestamp - beforeTimestamp) / MILLISECONDS_PER_SECOND;
    const formattedDiff = diffInSeconds.toFixed(2) + " sec.";

    _setMessages(
      updateLastItem((msg) => ({
        ...msg,
        timestamp: afterTimestamp,
        meta: {
          ...msg.meta,
          loading: false,
          responseTime: formattedDiff,
        },
      })),
    );
  };

  const submitPrompt = useCallback(
    async (newMessages: ChatMessageParams[]) => {
      if (messages[messages.length - 1]?.meta?.loading) {
        return;
      }

      setIsLoading(true);

      const updatedMessages: ChatMessage[] = [
        ...messages,
        ...newMessages.map(createChatMessage),
        createChatMessage({
          content: LOADING_ASSISTANT_MESSAGE,
          role: ROLE.ASSISTANT,
          timestamp: 0,
          meta: { loading: true },
        }),
      ];

      _setMessages(updatedMessages);

      const newController = new AbortController();
      setController(newController);

      const options = getOpenAiRequestOptions(
        settings.ai,
        filterMessages(updatedMessages.slice(0, -1)).map(({ content, role }) => ({
          content,
          role,
        })),
        newController.signal,
      );

      const beforeTimestamp = Date.now();
      try {
        const intention = await getIntention(settings.ai, newMessages[0].content);
        await intentions[intention].getResponse({
          options,
          handler: handleNewData,
          closeStream,
          actions,
        });
      } catch (err) {
        console.error(err);
        if (newController.signal.aborted) {
          handleNewData({
            content: "Request aborted, please try again.",
            role: ROLE.ASSISTANT,
            variant: MESSAGE_VARIANT.ERROR,
          });
        } else {
          const message =
            err instanceof Error
              ? err.message
              : "Something went wrong during streaming response. Check your settings and try again.";
          handleNewData({
            content: message,
            role: ROLE.ASSISTANT,
            variant: MESSAGE_VARIANT.ERROR,
          });
        }
        closeStream(beforeTimestamp);
      } finally {
        setController(null);
        setIsLoading(false);
      }
    },
    [messages],
  );

  useEffect(() => {
    setSystemPrompt(settings.systemPrompt);
  }, [settings.systemPrompt]);

  useEffect(() => {
    _setMessages((prev) => [
      createChatMessage({
        role: ROLE.SYSTEM,
        variant: MESSAGE_VARIANT.DEFAULT,
        content: systemPrompt,
      }),
      ...prev.filter(({ role }) => role !== ROLE.SYSTEM),
    ]);
  }, [systemPrompt]);

  useEffect(() => {
    const filteredMessages = filterMessages(messages);
    setTokens(filteredMessages.reduce((acc, { content }) => acc + encode(content).length, 0));
  }, [messages]);

  const value = useMemo(
    () => ({
      isLoading,
      tokens,
      messages,
      setMessages,
      abortResponse,
      resetMessages,
      setSystemPrompt,
      submitPrompt,
    }),
    [tokens, messages, isLoading, submitPrompt, controller],
  );

  return <ChatContextProvider value={value}>{children}</ChatContextProvider>;
};

export { useChatContext, ChatProvider };
