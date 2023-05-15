import { readText, writeText } from "@tauri-apps/api/clipboard";
import {
  isRegistered,
  register,
  unregister,
} from "@tauri-apps/api/globalShortcut";

import { ROLE } from "../utils/types";

import { getOpenAiRequestOptions, openAiStreamingDataHandler } from "./openai";

import type { Settings } from "../utils/types";

export const registerShortcut = async ({
  shortcut,
  settings,
  prompt,
}: {
  shortcut: string;
  settings: Settings;
  prompt: string;
}) => {
  try {
    const alreadyRegistered = await isRegistered(shortcut);
    if (alreadyRegistered) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await register(shortcut, async () => {
      const clipboardText = (await readText())?.toString()?.trim();
      if (!clipboardText) {
        return;
      }

      const options = getOpenAiRequestOptions(settings, [
        { role: ROLE.SYSTEM, content: prompt },
        { role: ROLE.USER, content: clipboardText },
      ]);

      const { content } = await openAiStreamingDataHandler(options);

      await writeText(content);
    });
  } catch (e) {
    console.error(e);
  }
};

export const unregisterShortcut = async (shortcut: string) => {
  await unregister(shortcut);
};
