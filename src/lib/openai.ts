import { OPENAI_API_URL } from "../utils/constants";
import { MESSAGE_VARIANT } from "../utils/types";

import type {
  Message,
  Settings,
  GptChatCompletionResponse,
} from "../utils/types";

export const getCompletion = async (
  messages: Message[],
  settings: Settings,
) => {
  const filteredMessages = messages.filter(
    ({ variant }, index, arr) =>
      variant !== MESSAGE_VARIANT.ERROR &&
      arr[index + 1]?.variant !== MESSAGE_VARIANT.ERROR,
  );

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.model,
      max_tokens: settings.maxTokens,
      temperature: settings.temperature,
      messages: filteredMessages.map(({ sender, text }) => ({
        role: sender,
        content: text,
      })),
      stream: false,
      stop: ["---"],
    }),
  };

  console.log(options);

  const response = await fetch(OPENAI_API_URL, options);
  return response;
};

export const getAiAnswer = async (messages: Message[], settings: Settings) => {
  try {
    const response = await getCompletion(messages, settings);
    const completion = (await response.json()) as GptChatCompletionResponse;

    console.log(completion);

    return {
      variant: MESSAGE_VARIANT.DEFAULT,
      message: completion.choices[0].message.content,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        variant: MESSAGE_VARIANT.ERROR,
        message: err.message,
      };
    }

    return {
      variant: MESSAGE_VARIANT.ERROR,
      message: "Something went wrong. Check your settings and try again.",
    };
  }
};
