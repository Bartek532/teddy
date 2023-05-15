import { type } from "@tauri-apps/api/os";
import { capitalize, debounce } from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as BinIcon } from "../../../assets/svg/bin.svg";
import { ReactComponent as PencilICon } from "../../../assets/svg/pencil.svg";
import { useSnippetsContext } from "../../../providers/SnippetsProvider";
import { Icon } from "../../Icon";
import { Input } from "../../Input";

import type { Snippet } from "../../../utils/types";
import type { OsType } from "@tauri-apps/api/os";
import type { KeyboardEvent } from "react";

interface ShortcutProps {
  readonly snippet: Snippet;
}

export const Shortcut = memo<ShortcutProps>(({ snippet }) => {
  const [os, setOs] = useState<OsType>();
  const [isFinished, setIsFinished] = useState(!!snippet.shortcut);
  const [shortcut, setShortcut] = useState<string[]>(
    snippet.shortcut?.split("+").filter(Boolean).length
      ? snippet.shortcut.trim().split("+").filter(Boolean)
      : [],
  );
  const { removeSnippet, changeSnippetShortcut } = useSnippetsContext();

  const debouncedKeyUp = useCallback(
    debounce(() => {
      setIsFinished(true);
      changeSnippetShortcut(snippet.id, shortcut.join("+"));
    }, 100),
    [shortcut],
  );

  useEffect(() => {
    const checkPlatform = async () => {
      const osType = await type();
      setOs(osType);
    };

    void checkPlatform();
  }, []);

  const replaceSpecialCharacters = (key: string) => {
    switch (key) {
      case " ":
        return "Space";
      case "ArrowLeft":
        return "←";
      case "ArrowRight":
        return "→";
      case "ArrowUp":
        return "↑";
      case "ArrowDown":
        return "↓";
      case "Control":
        return "Ctrl";
      case "Meta":
        return os === "Darwin" ? "⌘" : "🪟";
      default:
        return key;
    }
  };

  const handleKeyDownCapture = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isFinished) {
      setIsFinished(false);
      setShortcut([e.key]);
    } else {
      return setShortcut((prev) =>
        prev.includes(e.key) ? prev : [...prev, e.key],
      );
    }
  };

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
        <span className="truncate text-sm max-w-[70%]">{snippet.title}</span>
      </div>
      <Input
        className="h-full text-center"
        onKeyDownCapture={handleKeyDownCapture}
        onKeyUp={debouncedKeyUp}
        value={shortcut
          .map(replaceSpecialCharacters)
          .map(capitalize)
          .join(" + ")}
        readOnly
      >
        <span className="sr-only">Shortcut</span>
      </Input>
      <Link
        to={`/snippets/edit/${snippet.id}`}
        className="group border-2 border-blue-100 transition hover:bg-blue-100 rounded-2xl flex items-center justify-center"
      >
        <span className="sr-only">Edit</span>
        <PencilICon className="w-4 fill-blue-100 group-hover:fill-white-200" />
      </Link>
      <button
        className="group border-2 border-red-100 transition hover:bg-red-100 rounded-2xl flex items-center justify-center"
        onClick={() => removeSnippet(snippet.id)}
      >
        <span className="sr-only">Delete</span>
        <BinIcon className="w-5 stroke-red-100 group-hover:stroke-white-200" />
      </button>
    </li>
  );
});

Shortcut.displayName = "Shortcut";
