import {
  Action,
  FetchRequestOptions,
  INTENTION,
  OpenAIStreamingParams,
  ROLE,
} from "../../../utils/types";
import {
  IncomingChunk,
  getChatCompletion,
  getOpenAiRequestOptions,
} from "../openai";
import { actionIntention } from "./action";
import { INTENTION_PROMPT } from "./constants";
import { queryIntention } from "./query";

type IntentionStrategy = {
  getResponse: ({
    options,
    handler,
    closeStream,
    actions,
  }: {
    options: FetchRequestOptions;
    handler: (chunk: IncomingChunk) => void;
    closeStream?: (beforeTimestamp: number) => void;
    actions?: Action[];
  }) => Promise<void>;
};

export const intentions: Record<INTENTION, IntentionStrategy> = {
  [INTENTION.QUERY]: queryIntention,
  [INTENTION.ACTION]: actionIntention,
  [INTENTION.MEMORY]: queryIntention,
};

export const getIntention = async (
  params: OpenAIStreamingParams,
  prompt: string,
) => {
  const options = getOpenAiRequestOptions(params, [
    {
      content: INTENTION_PROMPT + prompt,
      role: ROLE.USER,
    },
  ]);

  const { content } = await getChatCompletion(options);

  if (Object.values<string>(INTENTION).includes(content)) {
    return content as INTENTION;
  }

  return INTENTION.QUERY;
};
