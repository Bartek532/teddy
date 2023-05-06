"use client";
import { useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";
import { get, save, store } from "../lib/store";
import { isSnippet } from "../utils/validation/validator";

import type { Snippet } from "../utils/types";
import type { ReactNode } from "react";

interface SnippetsContextValue {
  readonly snippets: Snippet[];
  readonly addSnippet: (snippet: Omit<Snippet, "id">) => void;
  readonly removeSnippet: (snippetId: string) => void;
}

const [useSnippetsContext, SnippetsContextProvider] =
  createSafeContext<SnippetsContextValue>();

const syncSnippets = async (snippets: Snippet[]) => {
  await save(store.snippets, "snippets", snippets);
};

const SnippetsProvider = ({ children }: { readonly children: ReactNode }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const addSnippet = (snippet: Omit<Snippet, "id">) => {
    const id = crypto.randomUUID();
    setSnippets((prev) => [...prev, { ...snippet, id }]);
  };

  const removeSnippet = (snippetId: string) => {
    setSnippets((prev) => prev.filter((snippet) => snippet.id !== snippetId));
  };

  useEffect(() => {
    void syncSnippets(snippets);
  }, [snippets]);

  useEffect(() => {
    const loadSnippets = async () => {
      const snippets = await get(store.snippets, "snippets");

      if (Array.isArray(snippets) && snippets.every(isSnippet)) {
        setSnippets(snippets);
      }
    };

    void loadSnippets();
  }, []);

  const value = useMemo(
    () => ({
      snippets,
      addSnippet,
      removeSnippet,
    }),
    [snippets],
  );

  return (
    <SnippetsContextProvider value={value}>{children}</SnippetsContextProvider>
  );
};

export { useSnippetsContext, SnippetsProvider };
