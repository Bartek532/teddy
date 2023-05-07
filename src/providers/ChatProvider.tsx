import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";
import { getAiAnswer } from "../lib/openai";
import { getState, saveState } from "../lib/store";
import { DEFAULT_SETTINGS } from "../utils/constants";
import { MESSAGE_SENDER, MESSAGE_VARIANT } from "../utils/types";
import { isSettings } from "../utils/validation/validator";

import type { AI_MODEL, Message, Settings } from "../utils/types";
import type { ReactNode } from "react";

interface ChatContextValue {
  readonly settings: Settings;
  readonly messages: Message[];
  readonly changeApiKey: (apiKey: string) => void;
  readonly changeModel: (model: AI_MODEL) => void;
  readonly sendMessage: (message: string) => void;
  readonly clearMessages: () => void;
}

const [useChatContext, ChatContextProvider] =
  createSafeContext<ChatContextValue>();

const syncSettings = debounce(async (settings: Settings) => {
  const prev = await getState();
  await saveState({ ...prev, settings });
}, 1000);

const ChatProvider = ({ children }: { readonly children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const changeApiKey = (apiKey: string) => {
    setSettings((prev) => ({ ...prev, apiKey }));
  };

  const changeModel = (model: AI_MODEL) => {
    setSettings((prev) => ({ ...prev, model }));
  };

  const sendMessage = useCallback(
    async (message: string) => {
      const newMessage = {
        id: crypto.randomUUID(),
        text: message,
        timestamp: new Date().toString(),
        sender: MESSAGE_SENDER.USER,
        variant: MESSAGE_VARIANT.DEFAULT,
      };

      setMessages((prev) => [...prev, newMessage]);

      const answer = await getAiAnswer([...messages, newMessage], settings);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: answer.message,
          timestamp: new Date().toString(),
          sender: MESSAGE_SENDER.ASSISTANT,
          variant: answer.variant,
        },
      ]);
    },
    [messages, settings],
  );

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    const loadSettings = async () => {
      const state = await getState();

      if (state?.settings && isSettings(state.settings)) {
        setSettings(state.settings);
      }
    };

    void loadSettings();
  }, []);

  useEffect(() => {
    void syncSettings(settings);
  }, [settings]);

  const value = useMemo(
    () => ({
      messages,
      settings,
      changeApiKey,
      changeModel,
      sendMessage,
      clearMessages,
    }),
    [settings, messages, sendMessage],
  );

  return <ChatContextProvider value={value}>{children}</ChatContextProvider>;
};

export { useChatContext, ChatProvider };
