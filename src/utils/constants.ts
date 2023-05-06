import { AI_MODEL } from "./types";

import type { Settings } from "./types";

export const DEFAULT_SETTINGS: Settings = {
  model: AI_MODEL.GPT_3_5,
  apiKey: "",
  maxTokens: 1500,
  temperature: 0.8,
  stream: true,
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
