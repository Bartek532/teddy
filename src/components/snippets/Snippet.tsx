import { memo, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "../common/Icon";

import type { Snippet as SnippetType } from "../../utils/types";

interface SnippetProps {
  readonly snippet: SnippetType;
  readonly onActivate: (snippetId: string) => void;
  readonly onDeactivate: (snippetId: string) => void;
  readonly isActive?: boolean;
}

const iconProps = {
  size: 22,
};

export const Snippet = memo<SnippetProps>(
  ({ snippet, isActive = false, onActivate, onDeactivate }) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    return (
      <li>
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={twMerge(
            "border-2 border-solid rounded-2xl transition w-full flex flex-col justify-center items-center p-2.5 pt-3 gap-1.5 hover:text-white-100",
            isActive && "text-white-100",
          )}
          style={{
            borderColor: snippet.color,
            backgroundColor: isHovering || isActive ? snippet.color : "transparent",
          }}
          onClick={() => (isActive ? onDeactivate(snippet.id) : onActivate(snippet.id))}
        >
          <Icon name={snippet.icon} props={iconProps} />
          <span className="truncate max-w-[85%] text-sm">{snippet.title}</span>
        </button>
      </li>
    );
  },
);

Snippet.displayName = "Snippet";
