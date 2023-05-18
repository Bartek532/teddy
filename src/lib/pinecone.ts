import { PineconeClient } from "@pinecone-database/pinecone";

const getApi = async ({ apiKey, env }: { apiKey: string; env: string }) => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    apiKey,
    environment: env,
  });

  return pinecone;
};

export const getIndex = async ({
  apiKey,
  env,
  index,
}: {
  apiKey: string;
  env: string;
  index: string;
}) => {
  const pinecone = await getApi({ apiKey, env });

  return pinecone.Index(index);
};
