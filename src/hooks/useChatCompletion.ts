import React from "react";

import {
  getOpenAiRequestOptions,
  openAiStreamingDataHandler,
} from "../lib/openai";
import { MESSAGE_VARIANT } from "../utils/types";
import { ROLE } from "../utils/types";

import type {
  ChatMessage,
  ChatMessageParams,
  OpenAIChatMessage,
  OpenAIStreamingParams,
} from "../utils/types";

const MILLISECONDS_PER_SECOND = 1000;

const officialOpenAIParams = ({
  content,
  role,
}: ChatMessage): OpenAIChatMessage => ({ content, role });

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

const updateLastItem =
  <T>(msgFn: (message: T) => T) =>
  (currentMessages: T[]) =>
    currentMessages.map((msg, i) => {
      if (currentMessages.length - 1 === i) {
        return msgFn(msg);
      }
      return msg;
    });

export const useChatCompletion = () => {
  const [messages, _setMessages] = React.useState<ChatMessage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [controller, setController] = React.useState<AbortController | null>(
    null,
  );

  const abortResponse = () => {
    if (controller) {
      controller.abort();
      setController(null);
    }
  };

  const resetMessages = () => {
    if (!loading) {
      _setMessages([]);
    }
  };

  const setMessages = (newMessages: ChatMessageParams[]) => {
    if (!loading) {
      _setMessages(newMessages.map(createChatMessage));
    }
  };

  const addMessage = (message: ChatMessageParams) => {
    if (!loading) {
      _setMessages((currentMessages) => [
        ...currentMessages,
        createChatMessage(message),
      ]);
    }
  };

  const handleNewData = (chunkContent: string, chunkRole: ROLE) => {
    _setMessages(
      updateLastItem((msg) => ({
        content: `${msg.content}${chunkContent}`,
        role: msg.role,
        variant: MESSAGE_VARIANT.DEFAULT,
        timestamp: 0,
        meta: {
          ...msg.meta,
          chunks: [
            ...msg.meta.chunks,
            {
              content: chunkContent,
              role: chunkRole,
              timestamp: Date.now(),
            },
          ],
        },
      })),
    );
  };

  const closeStream = (beforeTimestamp: number) => {
    const afterTimestamp = Date.now();
    const diffInSeconds =
      (afterTimestamp - beforeTimestamp) / MILLISECONDS_PER_SECOND;
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

  const submitPrompt = React.useCallback(
    async (
      apiParams: OpenAIStreamingParams,
      newMessages: ChatMessageParams[],
    ) => {
      if (messages[messages.length - 1]?.meta?.loading) {
        return;
      }

      setLoading(true);

      const updatedMessages: ChatMessage[] = [
        ...messages,
        ...newMessages.map(createChatMessage),
        createChatMessage({
          content: "",
          role: ROLE.ASSISTANT,
          timestamp: 0,
          meta: { loading: true },
        }),
      ];

      _setMessages(updatedMessages);

      const newController = new AbortController();
      const signal = newController.signal;
      setController(newController);

      const requestOpts = getOpenAiRequestOptions(
        apiParams,
        updatedMessages
          .filter((m, i) => updatedMessages.length - 1 !== i)
          .filter(({ content }) => content.trim().length > 0)
          .filter(
            ({ variant }, index, arr) =>
              variant !== MESSAGE_VARIANT.ERROR &&
              arr[index + 1]?.variant !== MESSAGE_VARIANT.ERROR,
          )
          .map(officialOpenAIParams),
        signal,
      );

      try {
        await openAiStreamingDataHandler(
          requestOpts,
          handleNewData,
          closeStream,
        );
      } catch (err) {
        console.error(err);
        if (signal.aborted) {
          addMessage({
            content: "Request aborted, please try again.",
            role: ROLE.ASSISTANT,
            variant: MESSAGE_VARIANT.ERROR,
          });
        } else {
          if (err instanceof Error) {
            addMessage({
              content: err.message,
              role: ROLE.ASSISTANT,
              variant: MESSAGE_VARIANT.ERROR,
            });
          } else {
            addMessage({
              content:
                "Something went wrong during streaming response. Check your settings and try again.",
              role: ROLE.ASSISTANT,
              variant: MESSAGE_VARIANT.ERROR,
            });
          }
        }
      } finally {
        setController(null);
        setLoading(false);
      }
    },
    [messages],
  );

  return {
    messages,
    loading,
    submitPrompt,
    abortResponse,
    resetMessages,
    setMessages,
  };
};