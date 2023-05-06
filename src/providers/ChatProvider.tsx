import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";
import { get, save, store } from "../lib/store";
import { DEFAULT_SETTINGS } from "../utils/constants";

import type { Message, Settings } from "../utils/types";
import type { ReactNode, Dispatch, SetStateAction } from "react";

interface ChatContextValue {
  readonly settings: Settings;
  readonly messages: Message[];
  readonly setSettings: Dispatch<SetStateAction<Settings>>;
}

const [useChatContext, ChatContextProvider] =
  createSafeContext<ChatContextValue>();

const syncSettings = debounce(async (settings: Settings) => {
  await save(store.chat, "settings", settings);
}, 1000);

const ChatProvider = ({ children }: { readonly children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = (await get(store.chat, "settings")) as Settings; // TODO: add zod validation

      if (settings) {
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
      setSettings,
    }),
    [settings, messages],
  );

  return <ChatContextProvider value={value}>{children}</ChatContextProvider>;
};

export { useChatContext, ChatProvider };
