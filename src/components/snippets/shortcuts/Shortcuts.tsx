import { memo } from "react";

import { Shortcut } from "./Shortcut";

import type { Snippet } from "../../../utils/types";

interface ShortcutsProps {
  readonly snippets: Snippet[];
}

export const Shortcuts = memo<ShortcutsProps>(({ snippets }) => {
  return (
    <ul className="w-full flex flex-col gap-2">
      {snippets.map((snippet) => {
        return <Shortcut key={snippet.id} snippet={snippet} />;
      })}
    </ul>
  );
});

Shortcuts.displayName = "Shortcuts";
