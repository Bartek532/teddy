export interface Snippet {
  readonly id: string;
  readonly title: string;
  readonly icon: string;
  readonly prompt: string;
  readonly color: string;
  readonly shortcut?: string;
}

enum MESSAGE_SENDER {
  USER = "USER",
  ASSISTANT = "ASSISTANT",
}

export enum AI_MODEL {
  "GPT_4" = "GPT-4",
  "GPT_3_5" = "GPT-3.5",
}

export interface Message {
  readonly id: string;
  readonly text: string;
  readonly timestamp: string;
  readonly sender: MESSAGE_SENDER;
}
