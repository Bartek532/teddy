import type {
  createSnippetSchema,
  messageSchema,
  settingsSchema,
  snippetSchema,
} from "./schema";
import type { z } from "zod";

export type Settings = z.infer<typeof settingsSchema>;
export type CreateSnippetInput = z.infer<typeof createSnippetSchema>;
export type Snippet = z.infer<typeof snippetSchema>;
export type SubmitPromptInput = z.infer<typeof messageSchema>;
