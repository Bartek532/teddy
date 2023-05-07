import { Configuration, OpenAIApi } from "openai";

import { MESSAGE_VARIANT } from "../utils/types";

import type { Message, Settings } from "../utils/types";

export const getApi = (apiKey: string) => {
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  return { openai };
};

export const getCompletion = async (
  messages: Message[],
  settings: Settings,
) => {
  const filteredMessages = messages.filter(
    ({ variant }, index, arr) =>
      variant !== MESSAGE_VARIANT.ERROR &&
      arr[index + 1]?.variant !== MESSAGE_VARIANT.ERROR,
  );

  const { openai } = getApi(settings.apiKey);

  const completion = await openai.createChatCompletion({
    model: "text-davinci-003", //settings.model,
    max_tokens: settings.maxTokens,
    temperature: settings.temperature,
    messages: filteredMessages.map(({ sender, text }) => ({
      role: sender,
      content: text,
    })),
    stream: settings.stream,
    stop: ["---"],
  });

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       Authorization: `Bearer ${settings.apiKey}`,
  //     },
  //     body: JSON.stringify({
  //       model: "text-davinci-003", //settings.model,
  //       max_tokens: settings.maxTokens,
  //       temperature: settings.temperature,
  //       messages: filteredMessages.map(({ sender, text }) => ({
  //         role: sender,
  //         content: text,
  //       })),
  //       stream: settings.stream,
  //       stop: ["---"],
  //     }),
  //   };

  //   const response = await fetch(OPENAI_API_URL, options);
  //   return response;

  return completion;
};
