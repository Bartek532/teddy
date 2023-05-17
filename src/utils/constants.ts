import { AI_MODEL, INTENTION } from "./types";

import type { Settings } from "./types";

export const CHAT_COMPLETIONS_URL =
  "https://api.openai.com/v1/chat/completions";

export const LOADING_ASSISTANT_MESSAGE = "I'm thinking...";
export const SYSTEM_PROMPT =
  "You're a superanimal, helpful assistant called B.E.A.R..";

export const INTENTION_PROMPT =
  "Describe my intention from message below. Focus on the beginning of it. Always return only name of the category and nothing more. categories: action|query|memory Example: Write a newsletter. - actionSave a note - actionAre you B.E.A.R.? - query Remember that Alexa is a dog. - memory I need to finish something important for tomorrow. Add it to my list - action. Answer should be one word with the name of the category and nothing more. ###message\n";

export const DEFAULT_SETTINGS: Settings = {
  model: AI_MODEL.GPT_3_5,
  apiKey: "",
  max_tokens: 1500,
  temperature: 0.8,
  airtable: {
    apiKey: "",
    base: "",
    table: "",
  },
};

export const DEFAULT_STATE = {
  settings: DEFAULT_SETTINGS,
  snippets: [],
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
  {
    route: "/actions",
    label: "Actions",
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

export const INTENTIONS: Record<INTENTION, { url: string }> = {
  [INTENTION.ACTION]: {
    url: "https://hook.eu1.make.com/61wtmjty1fs2v8zi0o8zn73qg5xzweq6",
  },
  [INTENTION.QUERY]: {
    url: "https://hook.eu1.make.com/61wtmjty1fs2v8zi0o8zn73qg5xzweq6",
  },
  [INTENTION.MEMORY]: {
    url: "https://hook.eu1.make.com/61wtmjty1fs2v8zi0o8zn73qg5xzweq6",
  },
};
