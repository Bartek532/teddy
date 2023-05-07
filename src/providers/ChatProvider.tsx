/* eslint-disable */
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";
import { getCompletion } from "../lib/openai";
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
  readonly editMessage: (messageId: string, data: Partial<Message>) => void;
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

      const newAssistanceMessage = {
        id: crypto.randomUUID(),
        text: "",
        timestamp: new Date().toString(),
        sender: MESSAGE_SENDER.ASSISTANT,
        variant: MESSAGE_VARIANT.DEFAULT,
      };

      setMessages((prev) => [...prev, newAssistanceMessage]);

      try {
        const completion = await getCompletion(
          [...messages, newMessage],
          settings,
        );

        completion.data.on("data", (data) => {
          const lines = data
            ?.toString()
            ?.split("\n")
            .filter((line) => line.trim() !== "");
          for (const line of lines) {
            const message = line.replace(/^data: /, "");
            if (message === "[DONE]") {
              break;
            }

            try {
              const parsed = JSON.parse(message);
              editMessage(newAssistanceMessage.id, {
                text: parsed.choices[0].text,
              });
            } catch {
              return editMessage(newAssistanceMessage.id, {
                variant: MESSAGE_VARIANT.ERROR,
                text: "Could not JSON parse stream message.",
              });
            }
          }
        });
      } catch (err) {
        if (err instanceof Error) {
          return editMessage(newAssistanceMessage.id, {
            variant: MESSAGE_VARIANT.ERROR,
            text: err.message,
          });
        }

        return editMessage(newAssistanceMessage.id, {
          variant: MESSAGE_VARIANT.ERROR,
          text: "Something went wrong. Check your settings and try again.",
        });
      }
    },
    [messages, settings],
  );

  const editMessage = (messageId: string, data: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === messageId) {
          return { ...message, ...data };
        }

        return message;
      }),
    );
  };

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
      editMessage,
      clearMessages,
    }),
    [settings, messages, sendMessage],
  );

  return <ChatContextProvider value={value}>{children}</ChatContextProvider>;
};

export { useChatContext, ChatProvider };
