export enum MESSAGE_SENDER {
  USER = "user",
  ASSISTANT = "assistant",
}

export enum MESSAGE_VARIANT {
  DEFAULT = "DEFAULT",
  ERROR = "ERROR",
}

export enum AI_MODEL {
  "GPT_4" = "gpt-4",
  "GPT_3_5" = "gpt-3.5-turbo",
}

export interface Message {
  readonly id: string;
  readonly text: string;
  readonly timestamp: string;
  readonly sender: MESSAGE_SENDER;
  readonly variant: MESSAGE_VARIANT;
}

export * from "./validation/types";

export interface GptChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  choices: GptChoice[];
  usage: GptUsage;
}

export interface GptChoice {
  index: number;
  message: GptMessage;
  finish_reason: string;
}

export interface GptMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface GptUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
