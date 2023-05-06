import { settingsSchema, snippetSchema } from "./schema";

import type { Settings, Snippet } from "./types";

export const isSettings = (maybeSettings: unknown): maybeSettings is Settings =>
  settingsSchema.safeParse(maybeSettings).success;

export const isSnippet = (maybeSnippet: unknown): maybeSnippet is Snippet =>
  snippetSchema.safeParse(maybeSnippet).success;
