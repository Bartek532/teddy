import type { settingsSchema } from "./schema";
import type { z } from "zod";

export type Settings = z.infer<typeof settingsSchema>;
