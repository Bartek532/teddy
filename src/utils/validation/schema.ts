import { z } from "zod";

import { AI_MODEL } from "../types";

export const settingsSchema = z.object({
  model: z.nativeEnum(AI_MODEL),
  apiKey: z.string(),
  maxTokens: z.number(),
  temperature: z.number(),
  stream: z.boolean(),
});
