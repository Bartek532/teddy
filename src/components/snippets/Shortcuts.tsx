import { memo } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as BinIcon } from "../../assets/svg/bin.svg";
import { ReactComponent as PencilICon } from "../../assets/svg/pencil.svg";
import { useSnippetsContext } from "../../providers/SnippetsProvider";
import { Icon } from "../Icon";
import { Input } from "../Input";

import type { Snippet } from "../../utils/types";

interface ShortcutsProps {
  readonly snippets: Snippet[];
}

export const Shortcuts = memo<ShortcutsProps>(({ snippets }) => {
  const { removeSnippet } = useSnippetsContext();
  return (
    <ul className="w-full flex flex-col gap-2">
      {snippets.map((snippet) => {
        return (
          <li
            key={snippet.id}
            className="grid grid-cols-[1fr_1fr_44px_44px] gap-2 items-stretch"
          >
            <div
              className="flex justify-center items-center border-2 border-solid rounded-2xl p-2.5 gap-3.5 overflow-hidden"
              style={{
                borderColor: snippet.color,
              }}
            >
              <Icon name={snippet.icon} />
              <span className="truncate text-sm max-w-[70%]">
                {snippet.title}
              </span>
            </div>
            <Input className="h-full text-center">
              <span className="sr-only">Shortcut</span>
            </Input>
            <Link
              to={`/snippets/edit/${snippet.id}`}
              className="group border-2 border-blue-100 bg-blue-100 transition hover:bg-transparent rounded-2xl flex items-center justify-center"
            >
              <span className="sr-only">Edit</span>
              <PencilICon className="w-4 fill-white-100 group-hover:fill-blue-100" />
            </Link>
            <button
              className="group border-2 border-red-100 bg-red-100 transition hover:bg-transparent rounded-2xl flex items-center justify-center"
              onClick={() => removeSnippet(snippet.id)}
            >
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
