import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";
import { get, save } from "../lib/store";
import { DEFAULT_SETTINGS } from "../utils/constants";
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
  await save("settings", settings);
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

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await get("settings");

      if (isSettings(settings)) {
        setSettings(settings);
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
