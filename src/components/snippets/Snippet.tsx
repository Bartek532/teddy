"use client";
import { memo, useState } from "react";

import { Icon } from "../Icon";

import type { Snippet as SnippetType } from "@/src/utils/types";

interface SnippetProps {
  readonly snippet: SnippetType;
}

const iconProps = {
  size: 22,
};

export const Snippet = memo<SnippetProps>(({ snippet }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <li className="grow basis-60">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="border-2 border-solid rounded-2xl transition w-full flex justify-center items-center p-2.5 gap-3.5 hover:text-white-100"
        style={{
          borderColor: snippet.color,
          backgroundColor: isHovering ? snippet.color : "transparent",
        }}
      >
        <Icon name={snippet.icon} props={iconProps} />
        {snippet.title}
      </button>
    </li>
  );
});

Snippet.displayName = "Snippet";
