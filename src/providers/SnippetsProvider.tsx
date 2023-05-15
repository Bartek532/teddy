import { isRegistered } from "@tauri-apps/api/globalShortcut";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/context";
import { registerShortcut, unregisterShortcut } from "../lib/shortcuts";
import { getState, saveState } from "../lib/store";
import { isSnippet } from "../utils/validation/validator";

import { useChatContext } from "./ChatProvider";

import type { Snippet } from "../utils/types";
import type { ReactNode } from "react";

interface SnippetsContextValue {
  readonly activeSnippet: Snippet | null;
  readonly activateSnippet: (snippetId: string) => void;
  readonly deactivateSnippet: (snippetId: string) => void;
  readonly snippets: Snippet[];
  readonly addSnippet: (snippet: Omit<Snippet, "id">) => void;
  readonly removeSnippet: (snippetId: string) => void;
  readonly getSnippet: (snippetId: string) => Snippet | undefined;
  readonly editSnippet: (snippetId: string, data: Omit<Snippet, "id">) => void;
  readonly changeSnippetShortcut: (
    snippetId: string,
    shortcut: string,
  ) => Promise<void>;
  readonly enableSnippet: (snippetId: string) => Promise<void> | undefined;
  readonly disableSnippet: (snippetId: string) => Promise<void> | undefined;
}

const [useSnippetsContext, SnippetsContextProvider] =
  createSafeContext<SnippetsContextValue>();

const syncSnippets = async (snippets: Snippet[]) => {
  const prev = await getState();
  await saveState({ ...prev, snippets });
};

const SnippetsProvider = ({ children }: { readonly children: ReactNode }) => {
  const { resetSystemMessage, updateSystemMessage } = useChatContext();
  const { settings } = useChatContext();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activeSnippet, setActiveSnippet] = useState<Snippet | null>(null);

  const addSnippet = (snippet: Omit<Snippet, "id">) => {
    const id = crypto.randomUUID();
    setSnippets((prev) => [...prev, { ...snippet, id }]);
  };

  const removeSnippet = (snippetId: string) => {
    setSnippets((prev) => prev.filter((snippet) => snippet.id !== snippetId));
  };

  const getSnippet = useCallback(
    (snippetId: string) => {
      return snippets.find((snippet) => snippet.id === snippetId);
    },
    [snippets],
  );

  const editSnippet = (snippetId: string, snippet: Omit<Snippet, "id">) => {
    setSnippets((prev) =>
      prev.map((prevSnippet) =>
        prevSnippet.id === snippetId
          ? { ...snippet, id: snippetId }
          : prevSnippet,
      ),
    );
  };

  const activateSnippet = useCallback(
    (snippetId: string) => {
      const snippet = getSnippet(snippetId);

      if (snippet) {
        setActiveSnippet(snippet);
        updateSystemMessage(snippet.prompt);
      }
    },
    [getSnippet, updateSystemMessage],
  );

  const deactivateSnippet = useCallback(
    (snippetId: string) => {
      const snippet = getSnippet(snippetId);

      if (snippet) {
        setActiveSnippet(null);
        resetSystemMessage();
      }
    },
    [getSnippet, resetSystemMessage],
  );

  const changeSnippetShortcut = async (snippetId: string, shortcut: string) => {
    const snippet = getSnippet(snippetId);

    if (!snippet) {
      return;
    }

    if (snippet.shortcut) {
      const prevShortcut = snippet.shortcut;
      const isShortcutRegistered = await isRegistered(prevShortcut);

      isShortcutRegistered && (await unregisterShortcut(prevShortcut));
    }

    await registerShortcut({ settings, ...snippet, shortcut });

    setSnippets((prev) =>
      prev.map((snippet) =>
        snippet.id === snippetId ? { ...snippet, shortcut } : snippet,
      ),
    );
  };

  const enableSnippet = (snippetId: string) => {
    const snippet = getSnippet(snippetId);

    if (!snippet) {
      return;
    }

    setSnippets((prev) =>
      prev.map((snippet) =>
        snippet.id === snippetId ? { ...snippet, enabled: true } : snippet,
      ),
    );

    const shortcut = snippet.shortcut;

    if (!shortcut) {
      return;
    }

    return registerShortcut({ settings, ...snippet, shortcut });
  };

  const disableSnippet = (snippetId: string) => {
    const snippet = getSnippet(snippetId);

    if (!snippet) {
      return;
    }

    setSnippets((prev) =>
      prev.map((snippet) =>
        snippet.id === snippetId ? { ...snippet, enabled: false } : snippet,
      ),
    );

    const shortcut = snippet.shortcut;

    if (!shortcut) {
      return;
    }

    return unregisterShortcut(shortcut);
  };

  useEffect(() => {
    void syncSnippets(snippets);
  }, [snippets]);

  useEffect(() => {
    const loadSnippets = async () => {
      const state = await getState();

      if (Array.isArray(state?.snippets) && state?.snippets.every(isSnippet)) {
        setSnippets(state.snippets);

        try {
          await Promise.all(
            state.snippets
              .filter((s): s is Snippet & { shortcut: string } => !!s.shortcut)
              .map(({ shortcut, prompt, title }) =>
                registerShortcut({
                  title,
                  shortcut,
                  prompt,
                  settings,
                }),
              ),
          );
        } catch (err) {
          console.error(err);
        }
      }
    };

    void loadSnippets();
  }, []);

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
      changeSnippetShortcut,
      enableSnippet,
      disableSnippet,
    }),
    [snippets, activeSnippet, activateSnippet, getSnippet, deactivateSnippet],
  );

  return (
    <SnippetsContextProvider value={value}>{children}</SnippetsContextProvider>
  );
};

export { useSnippetsContext, SnippetsProvider };
