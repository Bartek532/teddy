import { settingsSchema } from "./schema";

import type { Settings } from "./types";

export const isSettings = (maybeSettings: unknown): maybeSettings is Settings =>
  settingsSchema.safeParse(maybeSettings).success;
