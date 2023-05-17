import { CHAT_COMPLETIONS_URL, INTENTION_PROMPT } from "../utils/constants";
import { fetcher } from "../utils/fetcher";
import { INTENTION, ROLE } from "../utils/types";

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
  body: {
    model,
    ...restOfApiParams,
    messages,
    stream: true,
  },
  signal,
});

export const getChatCompletion = async (
  requestOpts: FetchRequestOptions,
  onIncomingChunk?: ({
    content,
    role,
  }: {
    content: string;
    role: ROLE;
  }) => void,
  onCloseStream?: (beforeTimestamp: number) => void,
) => {
  const beforeTimestamp = Date.now();

  const response = await fetcher(CHAT_COMPLETIONS_URL, requestOpts);

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

      onIncomingChunk?.({ content: contentChunk, role: roleChunk });
    }
  }

  onCloseStream?.(beforeTimestamp);

  return { content, role } as OpenAIChatMessage;
};

export const getPromptIntention = async (
  params: OpenAIStreamingParams,
  prompt: string,
): Promise<INTENTION> => {
  const options = getOpenAiRequestOptions(params, [
    {
      content: INTENTION_PROMPT + prompt,
      role: ROLE.USER,
    },
  ]);

  const { content } = await getChatCompletion(options);

  console.log(content);

  if (Object.values<string>(INTENTION).includes(content)) {
    return content as INTENTION;
  }

  return INTENTION.QUERY;
};
