import { isRegistered } from "@tauri-apps/api/globalShortcut";
import { create } from "zustand";

import { registerShortcut, unregisterShortcut } from "../lib/shortcuts";
import { add, get, load, remove, sync, update } from "../lib/snippets";
import { DEFAULT_STATE } from "../utils/constants";

import { useSettings } from "./settings.store";

import type { Snippet } from "../utils/types";

interface SnippetsStore {
  readonly activeSnippet: Snippet | null;
  readonly activateSnippet: (snippetId: string) => void;
  readonly deactivateSnippet: (snippetId: string) => void;
  readonly snippets: Snippet[];
  readonly addSnippet: (snippet: Omit<Snippet, "id" | "enabled">) => void;
  readonly removeSnippet: (snippetId: string) => void;
  readonly getSnippet: (snippetId: string) => Snippet | null;
  readonly editSnippet: (snippetId: string, data: Partial<Omit<Snippet, "id">>) => void;
  readonly changeSnippetShortcut: (snippetId: string, shortcut: string) => Promise<void>;
  readonly toggleSnippet: (snippetId: string) => Promise<void> | null;
}

export const useSnippets = create<SnippetsStore>((set, getState) => ({
  snippets: DEFAULT_STATE.snippets,
  activeSnippet: null,
  activateSnippet: (snippetId) => set({ activeSnippet: getState().getSnippet(snippetId) }),
  deactivateSnippet: () => set({ activeSnippet: null }),
  addSnippet: (snippet) => set(({ snippets }) => ({ snippets: add(snippets, snippet) })),
  removeSnippet: (snippetId) => set(({ snippets }) => ({ snippets: remove(snippets, snippetId) })),
  getSnippet: (snippetId) => get(getState().snippets, snippetId) ?? null,
  editSnippet: (snippetId, data) =>
    set(({ snippets }) => ({ snippets: update(snippets, snippetId, data) })),
  changeSnippetShortcut: async (snippetId, shortcut) => {
    const snippet = getState().getSnippet(snippetId);
    if (!snippet) {
      return Promise.resolve();
    }
    if (snippet.shortcut) {
      const prevShortcut = snippet.shortcut;
      const isShortcutRegistered = await isRegistered(prevShortcut);

      isShortcutRegistered && (await unregisterShortcut(prevShortcut));
      await registerShortcut({ settings: useSettings.getState().settings, ...snippet, shortcut });

      return set(({ snippets }) => ({
        snippets: update(snippets, snippetId, { shortcut }),
      }));
    }
  },
  toggleSnippet: (snippetId) => {
    const snippet = getState().getSnippet(snippetId);
    if (!snippet) {
      return null;
    }
    set(({ snippets }) => ({
      snippets: update(snippets, snippetId, { enabled: !snippet.enabled }),
    }));

    const shortcut = snippet.shortcut;

    if (!shortcut) {
      return null;
    }

    return snippet.enabled
      ? unregisterShortcut(shortcut)
      : registerShortcut({ settings: useSettings.getState().settings, ...snippet, shortcut });
  },
}));

useSnippets.subscribe(({ snippets, activeSnippet }) => {
  if (activeSnippet) {
    // setSystemPrompt(activeSnippet.prompt);
  } else {
    // setSystemPrompt(settings.systemPrompt);
  }

  void sync(snippets);
});

const loadSnippets = async () => {
  const snippets = await load();
  useSnippets.setState({ snippets });
};

void loadSnippets();
