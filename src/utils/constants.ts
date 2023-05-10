import { AI_MODEL } from "./types";

import type { Settings } from "./types";

export const CHAT_COMPLETIONS_URL =
  "https://api.openai.com/v1/chat/completions";

export const LOADING_ASSISTANT_MESSAGE = "I'm thinking...";
export const SYSTEM_PROMPT = "You're a helpful assistant called David.";

export const DEFAULT_SETTINGS: Settings = {
  model: AI_MODEL.GPT_3_5,
  apiKey: "",
  max_tokens: 1500,
  temperature: 0.8,
};

export const SETTINGS_ROUTES = [
  {
    route: "/settings",
    label: "Settings",
  },
  {
    route: "/snippets",
    label: "Snippets",
  },
] as const;

export const MODELS = [
  {
    id: AI_MODEL.GPT_3_5,
    value: AI_MODEL.GPT_3_5,
    label: "GPT-3.5 Turbo",
    isAvailable: true,
    tokenLimit: 4096,
  },
  {
    id: AI_MODEL.GPT_4,
    value: AI_MODEL.GPT_4,
    label: "GPT-4",
    isAvailable: false,
    tokenLimit: 8192,
  },
] as const;
