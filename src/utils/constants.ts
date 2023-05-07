import { AI_MODEL } from "./types";

import type { Settings } from "./types";

export const CHAT_COMPLETIONS_URL =
  "https://api.openai.com/v1/chat/completions";

export const DEFAULT_SETTINGS: Settings = {
  model: AI_MODEL.GPT_3_5,
  apiKey: "",
  max_tokens: 1500,
  temperature: 0.8,
};

export const MODELS = [
  {
    id: AI_MODEL.GPT_3_5,
    value: AI_MODEL.GPT_3_5,
    label: "GPT-3.5 Turbo",
    isAvailable: true,
  },
  {
    id: AI_MODEL.GPT_4,
    value: AI_MODEL.GPT_4,
    label: "GPT-4",
    isAvailable: false,
  },
] as const;
