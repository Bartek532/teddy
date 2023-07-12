import { FetchRequestOptions } from "../../../../utils/types";
import { IncomingChunk, getChatCompletion } from "../../openai";

const getResponse = async ({
  options,
  handler,
  closeStream,
}: {
  options: FetchRequestOptions;
  handler: (chunk: IncomingChunk) => void;
  closeStream?: (beforeTimestamp: number) => void;
}) => {
  await getChatCompletion(options, handler, closeStream);
};

export const queryIntention = {
  getResponse,
};
