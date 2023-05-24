import { AI_MODEL } from "./types";

import type { Settings, Snippet } from "./types";

export const MILLISECONDS_PER_SECOND = 1000;

export const CHAT_COMPLETIONS_URL =
  "https://api.openai.com/v1/chat/completions";

export const EMBEDDING_URL = "https://api.openai.com/v1/embeddings";

export const LOADING_ASSISTANT_MESSAGE = "I'm thinking...";

export const INTENTION_PROMPT =
  "Describe my intention from message below. Focus on the beginning of it. Always return only name of the category and nothing more. categories: action|query|memory Example: Write a newsletter. - actionSave a note - actionAre you B.E.A.R.? - query Remember that Alexa is a dog. - memory I need to finish something important for tomorrow. Add it to my list - action. Answer should be one word with the name of the category and nothing more. ###message\n";

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
      secondary: "var(--white-200)",
    },
    style: {
      backgroundColor: "var(--red-200)",
      color: "var(--red-100)",
    },
  },
  success: {
    iconTheme: {
      primary: "var(--green-100)",
      secondary: "var(--white-200)",
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

const DEFAULT_SYSTEM_PROMPT = `I'm a B.E.A.R. - superanimal, helpful assistant.
I'm strictly following these rules "to the word":
  - I always speak truthfully and gramatically correct
  - My responses are natural, friendly, easygoing and concise
  - I avoid repeating myself and my limitations
  - When I don't know the answer I say "I don't know"
  - When I don't understand the question I ask for clarification
  - When I asked I return detailed explanations
  - When I asked I return specific formats without any comments
  - I always return the requested format right away
  - I always speak in a language of the user's message down below`;

const DEFAULT_SETTINGS: Settings = {
  ai: {
    model: AI_MODEL.GPT_3_5,
    apiKey: "",
    max_tokens: 1500,
    temperature: 0.8,
  },
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  actionsUrl: "",
};

const DEFAULT_SNIPPETS: Snippet[] = [
  {
    id: crypto.randomUUID(),
    title: "Translate",
    icon: "BsTranslate",
    prompt:
      "Translate user's message to provided language or to English if language is not provided. If source message is in Polish than translate it to English. Return only translated message without any comments or notes.",
    color: "#fcd53b",
    enabled: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Fix typos",
    icon: "RxText",
    prompt:
      "Act as a Senior Copywriter. Your role is to fix all typos and grammar in user's message. Your response should be concise and user-friendly.  Return only fixed message without any comments or notes.",
    color: "#fcd53b",
    enabled: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Explain step-by-step",
    icon: "TbBrandWechat",
    prompt: "Explain",
    color: "#fcd53b",
    enabled: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Critique",
    icon: "AiOutlineFire",
    prompt:
      "Now act as if you were a rocket scientist investigating provided solution to a problem. Your job is to find all flaws and faulty in logic in a given approach and provide me with the simplest way to achieve the results. Let’s work this out in a step by step way to be sure we have all the errors. ",
    color: "#fcd53b",
    enabled: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Summarize",
    icon: "MdOutlineSummarize",
    prompt:
      "Summarize the provided content. Your response should as concise as possible.",
    color: "#fcd53b",
    enabled: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Fix code",
    icon: "BiBug",
    prompt:
      "Act as a Senior Software Engineer. Fix all bugs in provided code. Follow best practices about writing code such as naming variables, comments, etc. Return only fixed code without any comments or notes.",
    color: "#fcd53b",
    enabled: true,
  },
  {
    id: crypto.randomUUID(),
    title: "Autocomplete",
    icon: "VscWand",
    prompt:
      "Autocomplete user's message. Try to do your best with prediction what should go next in provided sentence. Return only completed message without any comments or notes.",
    color: "#fcd53b",
    enabled: true,
  },
];

export const DEFAULT_STATE = {
  settings: DEFAULT_SETTINGS,
  snippets: DEFAULT_SNIPPETS,
};
