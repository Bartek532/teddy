import { AI_MODEL } from "./types";

import type { Settings } from "./types";

export const CHAT_COMPLETIONS_URL =
  "https://api.openai.com/v1/chat/completions";

export const EMBEDDING_URL = "https://api.openai.com/v1/embeddings";

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
  pinecone: {
    apiKey: "",
    env: "",
    index: "",
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

export const TOASTER_CONFIG = {
  style: {
    padding: "14px 25px",
    minWidth: "250px",
    gap: "10px",
  },
  error: {
    iconTheme: {
      primary: "var(--red-100)",
    },
    style: {
      backgroundColor: "var(--red-200)",
      color: "var(--red-100)",
    },
  },
  success: {
    iconTheme: {
      primary: "var(--green-100)",
    },
    style: {
      backgroundColor: "var(--green-200)",
      color: "var(--green-100)",
    },
  },
};

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
