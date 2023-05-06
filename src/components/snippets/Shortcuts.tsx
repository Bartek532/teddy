import { memo } from "react";

import BinIcon from "@/public/svg/bin.svg";

import { Icon } from "../Icon";
import { Input } from "../Input";

import type { Snippet } from "@/src/utils/types";

interface ShortcutsProps {
  readonly snippets: Snippet[];
}

export const Shortcuts = memo<ShortcutsProps>(({ snippets }) => {
  return (
    <ul className="w-full flex flex-col gap-2">
      {snippets.map((snippet) => {
        return (
          <li
            key={snippet.id}
            className="grid grid-cols-[2fr_2fr_0.5fr] gap-2 items-stretch"
          >
            <div
              className="flex justify-center items-center border-2 border-solid rounded-2xl p-2.5 gap-3.5"
              style={{
                borderColor: snippet.color,
              }}
            >
              <Icon name={snippet.icon} /> {snippet.title}
            </div>
            <Input className="h-full text-center">
              <span className="sr-only">Shortcut</span>
            </Input>
            <button className="group border-2 border-red-100 bg-red-100 transition hover:bg-transparent rounded-2xl flex items-center justify-center">
              <span className="sr-only">Delete</span>
              <BinIcon className="w-5 stroke-white-100 group-hover:stroke-red-100" />
            </button>
          </li>
        );
      })}
    </ul>
  );
});

Shortcuts.displayName = "Shortcuts";
