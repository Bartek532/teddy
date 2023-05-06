import { useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";

import type { Snippet } from "../utils/types";
import type { ReactNode, Dispatch, SetStateAction } from "react";

interface SnippetsContextValue {
  readonly snippets: Snippet[];
  readonly setSnippets: Dispatch<SetStateAction<Snippet[]>>;
}

const [useSnippetsContext, SnippetsContextProvider] =
  createSafeContext<SnippetsContextValue>();

const SnippetsProvider = ({ children }: { readonly children: ReactNode }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const value = useMemo(
    () => ({
      snippets,
      setSnippets,
    }),
    [snippets],
  );

  return (
    <SnippetsContextProvider value={value}>{children}</SnippetsContextProvider>
  );
};

export { useSnippetsContext, SnippetsProvider };
