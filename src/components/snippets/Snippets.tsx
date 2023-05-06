import { memo } from "react";

import { Snippet } from "./Snippet";

import type { Snippet as SnippetType } from "@/src/utils/types";

interface SnippetsProps {
  readonly snippets: SnippetType[];
}

export const Snippets = memo<SnippetsProps>(({ snippets }) => {
  return (
    <section>
      <ul className="flex justify-center pr-2 items-center w-full flex-wrap gap-3 max-h-28 overflow-y-scroll">
        {snippets.map((snippet) => (
          <Snippet key={snippet.id} snippet={snippet} />
        ))}
      </ul>
    </section>
  );
});

Snippets.displayName = "Snippets";
