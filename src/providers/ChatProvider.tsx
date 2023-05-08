import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useChatCompletion } from "../hooks/useChatCompletion";
import { createSafeContext } from "../lib/context";
import { getState, saveState } from "../lib/store";
import { DEFAULT_SETTINGS } from "../utils/constants";
import { ROLE } from "../utils/types";
import { isSettings } from "../utils/validation/validator";

import type { AI_MODEL, ChatMessage, Settings } from "../utils/types";
import type { ReactNode } from "react";

interface ChatContextValue {
  readonly settings: Settings;
  readonly messages: ChatMessage[];
  readonly changeApiKey: (apiKey: string) => void;
  readonly changeModel: (model: AI_MODEL) => void;
  readonly sendMessage: (message: string) => void;
  readonly resetMessages: () => void;
  readonly updateSystemMessage: (message: string) => void;
  readonly resetSystemMessage: () => void;
}

const [useChatContext, ChatContextProvider] =
  createSafeContext<ChatContextValue>();

const syncSettings = debounce(async (settings: Settings) => {
  const prev = await getState();
  await saveState({ ...prev, settings });
}, 1000);

const ChatProvider = ({ children }: { readonly children: ReactNode }) => {
  const {
    messages,
    tokens,
    submitPrompt,
    resetMessages,
    updateSystemMessage,
    resetSystemMessage,
  } = useChatCompletion();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const changeApiKey = (apiKey: string) => {
    setSettings((prev) => ({ ...prev, apiKey }));
  };

  const changeModel = (model: AI_MODEL) => {
    setSettings((prev) => ({ ...prev, model }));
  };

  const sendMessage = useCallback(
    (content: string) => {
      return submitPrompt(settings, [
        {
          content,
          role: ROLE.USER,
        },
      ]);
    },
    [settings, submitPrompt],
  );

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
      tokens,
      messages,
      settings,
      changeApiKey,
      changeModel,
      sendMessage,
      resetMessages,
      updateSystemMessage,
      resetSystemMessage,
    }),
    [
      tokens,
      settings,
      messages,
      sendMessage,
      resetMessages,
      updateSystemMessage,
      resetSystemMessage,
    ],
  );

  return <ChatContextProvider value={value}>{children}</ChatContextProvider>;
};

export { useChatContext, ChatProvider };
