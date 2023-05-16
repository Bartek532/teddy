import { isRegistered } from "@tauri-apps/api/globalShortcut";
import { useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/context";
import { registerShortcut, unregisterShortcut } from "../lib/shortcuts";
import { add, get, load, remove, sync, update } from "../lib/snippets";

import { useChatContext } from "./ChatProvider";

import type { Snippet } from "../utils/types";
import type { ReactNode } from "react";

interface SnippetsContextValue {
  readonly activeSnippet: Snippet | null;
  readonly activateSnippet: (snippetId: string) => void;
  readonly deactivateSnippet: (snippetId: string) => void;
  readonly snippets: Snippet[];
  readonly addSnippet: (snippet: Omit<Snippet, "id" | "enabled">) => void;
  readonly removeSnippet: (snippetId: string) => void;
  readonly getSnippet: (snippetId: string) => Snippet | null;
  readonly editSnippet: (
    snippetId: string,
    data: Partial<Omit<Snippet, "id">>,
  ) => void;
  readonly changeSnippetShortcut: (
    snippetId: string,
    shortcut: string,
  ) => Promise<void>;
  readonly toggleSnippet: (snippetId: string) => Promise<void> | null;
}

const [useSnippetsContext, SnippetsContextProvider] =
  createSafeContext<SnippetsContextValue>();

const SnippetsProvider = ({ children }: { readonly children: ReactNode }) => {
  const { resetSystemMessage, updateSystemMessage, settings } =
    useChatContext();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const addSnippet = (snippet: Omit<Snippet, "id" | "enabled">) => {
    setSnippets((prev) => add(prev, snippet));
  };

  const removeSnippet = (snippetId: string) => {
    setSnippets((prev) => remove(prev, snippetId));
  };

  const getSnippet = (snippetId: string) => {
    return get(snippets, snippetId) ?? null;
  };

  const editSnippet = (
    snippetId: string,
    data: Partial<Omit<Snippet, "id">>,
  ) => {
    setSnippets((prev) => update(prev, snippetId, data));
  };

  const activateSnippet = (snippetId: string) => {
    const snippet = get(snippets, snippetId);

    if (snippet) {
      setActiveSnippet(snippet);
    }
  };

  const deactivateSnippet = (snippetId: string) => {
    const snippet = get(snippets, snippetId);

    if (snippet) {
      setActiveSnippet(null);
    }
  };

  const changeSnippetShortcut = async (snippetId: string, shortcut: string) => {
    const snippet = get(snippets, snippetId);

    if (!snippet) {
      return;
    }

    if (snippet.shortcut) {
      const prevShortcut = snippet.shortcut;
      const isShortcutRegistered = await isRegistered(prevShortcut);

      isShortcutRegistered && (await unregisterShortcut(prevShortcut));
    }

    await registerShortcut({ settings, ...snippet, shortcut });

    setSnippets((prev) => update(prev, snippetId, { shortcut }));
  };

  const toggleSnippet = (snippetId: string) => {
    const snippet = get(snippets, snippetId);

    if (!snippet) {
      return null;
    }

    setSnippets((prev) =>
      update(prev, snippetId, { enabled: !snippet.enabled }),
    );

    const shortcut = snippet.shortcut;

    if (!shortcut) {
      return null;
    }

    return snippet.enabled
      ? unregisterShortcut(shortcut)
      : registerShortcut({ settings, ...snippet, shortcut });
  };

  useEffect(() => {
    void sync(snippets);
  }, [snippets]);

  useEffect(() => {
    const loadSnippets = async () => {
      const snippets = await load();

      if (snippets) {
        setSnippets(snippets);
      }
    };

    void loadSnippets();
  }, []);

  useEffect(() => {
    if (activeSnippet) {
      updateSystemMessage(activeSnippet.prompt);
    } else {
      resetSystemMessage();
    }
  }, [activeSnippet]);

  const value = useMemo(
    () => ({
      activeSnippet,
      activateSnippet,
      deactivateSnippet,
      snippets,
      addSnippet,
      removeSnippet,
      getSnippet,
      editSnippet,
      toggleSnippet,
      changeSnippetShortcut,
    }),
    [snippets, activeSnippet, activateSnippet, getSnippet, deactivateSnippet],
  );

  return (
    <SnippetsContextProvider value={value}>{children}</SnippetsContextProvider>
  );
};

export { useSnippetsContext, SnippetsProvider };
