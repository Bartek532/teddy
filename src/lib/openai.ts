import { CHAT_COMPLETIONS_URL } from "../utils/constants";
import { ROLE } from "../utils/types";

import type {
  FetchRequestOptions,
  OpenAIChatMessage,
  OpenAIStreamingParams,
  OpenAIChatCompletionChunk,
} from "../utils/types";

const textDecoder = new TextDecoder("utf-8");

export const getOpenAiRequestOptions = (
  { apiKey, model, ...restOfApiParams }: OpenAIStreamingParams,
  messages: OpenAIChatMessage[],
  signal?: AbortSignal,
): FetchRequestOptions => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  method: "POST",
  body: JSON.stringify({
    model,
    ...restOfApiParams,
    messages,
    stream: true,
  }),
  signal,
});

export const openAiStreamingDataHandler = async (
  requestOpts: FetchRequestOptions,
  onIncomingChunk: ({ content, role }: { content: string; role: ROLE }) => void,
  onCloseStream: (beforeTimestamp: number) => void,
) => {
  const beforeTimestamp = Date.now();

  const response = await fetch(CHAT_COMPLETIONS_URL, requestOpts);

  if (!response.ok) {
    throw new Error(
      `Network response was not ok: ${response.status} - ${response.statusText}.`,
    );
  }

  if (!response.body) {
    throw new Error("No body included in POST response object.");
  }

  let content = "";
  let role = "";

  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }
    const decodedData = textDecoder.decode(value as Buffer);

    const lines = decodedData.split(/(\n){2}/);
    const chunks = lines
      .map((line) => line.replace(/(\n)?^data:\s*/, "").trim())
      .filter((line) => line !== "" && line !== "[DONE]")
      .map((line) => JSON.parse(line) as OpenAIChatCompletionChunk);

    for (const chunk of chunks) {
      const contentChunk = (chunk.choices[0].delta.content ?? "").replace(
        /^`\s*/,
        "`",
      );
      const roleChunk: ROLE = chunk.choices[0].delta.role ?? ROLE.ASSISTANT;

      content = `${content}${contentChunk}`;
      role = `${role}${roleChunk}`;

      onIncomingChunk({ content: contentChunk, role: roleChunk });
    }
  }

  onCloseStream(beforeTimestamp);

  return { content, role } as OpenAIChatMessage;
};

// export const getCompletion = async (
//   messages: Message[],
//   settings: Settings,
// ) => {
//   const filteredMessages = messages.filter(
//     ({ variant }, index, arr) =>
//       variant !== MESSAGE_VARIANT.ERROR &&
//       arr[index + 1]?.variant !== MESSAGE_VARIANT.ERROR,
//   );

//   const { openai } = getApi(settings.apiKey);

//   const completion = await openai.createChatCompletion({
//     model: "text-davinci-003", //settings.model,
//     max_tokens: settings.maxTokens,
//     temperature: settings.temperature,
//     messages: filteredMessages.map(({ sender, text }) => ({
//       role: sender,
//       content: text,
//     })),
//     stream: settings.stream,
//     stop: ["---"],
//   });

//   //   const options = {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json; charset=utf-8",
//   //       Authorization: `Bearer ${settings.apiKey}`,
//   //     },
//   //     body: JSON.stringify({
//   //       model: "text-davinci-003", //settings.model,
//   //       max_tokens: settings.maxTokens,
//   //       temperature: settings.temperature,
//   //       messages: filteredMessages.map(({ sender, text }) => ({
//   //         role: sender,
//   //         content: text,
//   //       })),
//   //       stream: settings.stream,
//   //       stop: ["---"],
//   //     }),
//   //   };

//   //   const response = await fetch(OPENAI_API_URL, options);
//   //   return response;

//   return completion;
// };
