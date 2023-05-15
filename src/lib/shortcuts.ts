import { readText, writeText } from "@tauri-apps/api/clipboard";
import {
  isRegistered,
  register,
  unregister,
} from "@tauri-apps/api/globalShortcut";
import { sendNotification } from "@tauri-apps/api/notification";

import { ROLE } from "../utils/types";

import { getOpenAiRequestOptions, openAiStreamingDataHandler } from "./openai";

import type { Settings } from "../utils/types";

export const registerShortcut = async ({
  title,
  shortcut,
  settings,
  prompt,
}: {
  title: string;
  shortcut: string;
  settings: Settings;
  prompt: string;
}) => {
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

    sendNotification({ title: `🎉 ${title}`, body: content });
  });
};

export const unregisterShortcut = async (shortcut: string) => {
  await unregister(shortcut);
};
