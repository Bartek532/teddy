"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";
import { getState, saveState } from "../lib/store";
import { isSnippet } from "../utils/validation/validator";

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
}

const [useSnippetsContext, SnippetsContextProvider] =
  createSafeContext<SnippetsContextValue>();

const syncSnippets = async (snippets: Snippet[]) => {
  const prev = await getState();
  await saveState({ ...prev, snippets });
};

const SnippetsProvider = ({ children }: { readonly children: ReactNode }) => {
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
      }
    },
    [getSnippet],
  );

  const deactivateSnippet = useCallback(
    (snippetId: string) => {
      const snippet = getSnippet(snippetId);

      if (snippet) {
        setActiveSnippet(null);
      }
    },
    [getSnippet],
  );

  useEffect(() => {
    void syncSnippets(snippets);
  }, [snippets]);

  useEffect(() => {
    const loadSnippets = async () => {
      const state = await getState();

      if (Array.isArray(state?.snippets) && state?.snippets.every(isSnippet)) {
        setSnippets(state.snippets);
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
    }),
    [snippets, activeSnippet, activateSnippet, getSnippet],
  );

  return (
    <SnippetsContextProvider value={value}>{children}</SnippetsContextProvider>
  );
};

export { useSnippetsContext, SnippetsProvider };
