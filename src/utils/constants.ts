import { AI_MODEL } from "./types";

import type { Settings } from "./types";

export const DEFAULT_SETTINGS: Settings = {
  model: AI_MODEL.GPT_3_5,
  apiKey: "",
  maxTokens: 1500,
  temperature: 0.8,
  stream: true,
};
