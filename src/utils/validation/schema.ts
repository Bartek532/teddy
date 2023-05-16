import { z } from "zod";

import { AI_MODEL } from "../types";

export const settingsSchema = z.object({
  model: z.nativeEnum(AI_MODEL),
  apiKey: z.string(),
  max_tokens: z.number(),
  temperature: z.number(),
});

export const createSnippetSchema = z.object({
  title: z.string().nonempty("Title cannot be empty."),
  icon: z.string().nonempty("Icon cannot be empty."),
  prompt: z.string().nonempty("Prompt cannot be empty."),
  color: z.string().nonempty("Color cannot be empty."),
});

export const snippetSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  prompt: z.string(),
  color: z.string(),
  shortcut: z.string().optional(),
  enabled: z.boolean().default(true),
});

export const messageSchema = z.object({
  prompt: z.string(),
});

export const stateSchema = z.object({
  settings: settingsSchema,
  snippets: z.array(snippetSchema),
});
