import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";
import { getState, saveState } from "../lib/store";
import { DEFAULT_SETTINGS } from "../utils/constants";
import { MESSAGE_SENDER } from "../utils/types";
import { isSettings } from "../utils/validation/validator";

import type { AI_MODEL, Message, Settings } from "../utils/types";
import type { ReactNode } from "react";

interface ChatContextValue {
  readonly settings: Settings;
  readonly messages: Message[];
  readonly changeApiKey: (apiKey: string) => void;
  readonly changeModel: (model: AI_MODEL) => void;
}

const [useChatContext, ChatContextProvider] =
  createSafeContext<ChatContextValue>();

const syncSettings = debounce(async (settings: Settings) => {
  const prev = await getState();
  await saveState({ ...prev, settings });
}, 1000);

const ChatProvider = ({ children }: { readonly children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "12",
      text: "Hello, I'm a chatbot. How can I help you?",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.USER,
    },
    {
      id: "2",
      text: "The Windows Registry is a hierarchical database that stores configuration settings and options on Microsoft Windows operating systems. The tauri-plugin-store plugin uses the Registry API provided by Windows to read and write data to the Registry.      ",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.ASSISTANT,
    },
    {
      id: "12",
      text: "Hello, I'm a chatbot. How can I help you?",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.USER,
    },
    {
      id: "2",
      text: "The Windows Registry is a hierarchical database that stores configuration settings and options on Microsoft Windows operating systems. The tauri-plugin-store plugin uses the Registry API provided by Windows to read and write data to the Registry.      ",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.ASSISTANT,
    },

    {
      id: "12",
      text: "Hello, I'm a chatbot. How can I help you?",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.USER,
    },
    {
      id: "2",
      text: "The Windows Registry is a hierarchical database that stores configuration settings and options on Microsoft Windows operating systems. The tauri-plugin-store plugin uses the Registry API provided by Windows to read and write data to the Registry.      ",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.ASSISTANT,
    },
    {
      id: "12",
      text: "Hello, I'm a chatbot. How can I help you?",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.USER,
    },
    {
      id: "2",
      text: "The Windows Registry is a hierarchical database that stores configuration settings and options on Microsoft Windows operating systems. The tauri-plugin-store plugin uses the Registry API provided by Windows to read and write data to the Registry.      ",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.ASSISTANT,
    },
    {
      id: "12",
      text: "Hello, I'm a chatbot. How can I help you?",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.USER,
    },
    {
      id: "2",
      text: "The Windows Registry is a hierarchical database that stores configuration settings and options on Microsoft Windows operating systems. The tauri-plugin-store plugin uses the Registry API provided by Windows to read and write data to the Registry.      ",
      timestamp: new Date().toString(),
      sender: MESSAGE_SENDER.ASSISTANT,
    },
  ]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const changeApiKey = (apiKey: string) => {
    setSettings((prev) => ({ ...prev, apiKey }));
  };

  const changeModel = (model: AI_MODEL) => {
    setSettings((prev) => ({ ...prev, model }));
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
    }),
    [settings, messages],
  );

  return <ChatContextProvider value={value}>{children}</ChatContextProvider>;
};

export { useChatContext, ChatProvider };
