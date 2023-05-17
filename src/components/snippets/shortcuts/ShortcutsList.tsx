import { memo } from "react";

import { Shortcut } from "./Shortcut";

import type { Snippet } from "../../../utils/types";

interface ShortcutsListProps {
  readonly snippets: Snippet[];
}

export const ShortcutsList = memo<ShortcutsListProps>(({ snippets }) => {
  return (
    <ul className="w-full flex flex-col gap-2">
      {snippets.map((snippet) => {
        return <Shortcut key={snippet.id} snippet={snippet} />;
      })}
    </ul>
  );
});

ShortcutsList.displayName = "ShortcutsList";
