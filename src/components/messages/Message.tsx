import { marked } from "marked";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { MESSAGE_VARIANT, ROLE } from "../../utils/types";

import type { ChatMessage } from "../../utils/types";

interface MessageProps {
  readonly message: ChatMessage;
}

export const Message = memo<MessageProps>(({ message }) => {
  return (
    <li
      className={twMerge(
        "flex first:pt-4",
        message.role === ROLE.USER && "justify-end",
      )}
    >
      <div
        className={twMerge(
          "bg-white-100 rounded-2xl p-3 px-5 pt-1 max-w-[80%] mb-1 rounded-br-none",
          message.role === ROLE.ASSISTANT &&
            "bg-gray-100 rounded-br-2xl rounded-bl-none",
          message.variant === MESSAGE_VARIANT.ERROR &&
            "text-red-100 bg-red-100/10",
        )}
      >
        <p
          className="content"
          dangerouslySetInnerHTML={{ __html: marked.parse(message.content) }}
        ></p>
      </div>
    </li>
  );
});

Message.displayName = "Message";
