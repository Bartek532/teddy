import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { MESSAGE_VARIANT, ROLE } from "@/src/utils/types";

import type { ChatMessage } from "@/src/utils/types";

interface MessageProps {
  readonly message: ChatMessage;
}

export const Message = memo<MessageProps>(({ message }) => {
  return (
    <li
      className={twMerge("flex", message.role === ROLE.USER && "justify-end")}
    >
      <div
        className={twMerge(
          "shadow bg-white-100 rounded-2xl p-3 px-5 max-w-[80%] mb-1",
          message.role === ROLE.ASSISTANT && "bg-gray-100",
          message.variant === MESSAGE_VARIANT.ERROR &&
            "text-red-100 bg-red-100/10",
        )}
      >
        {message.content}
      </div>
    </li>
  );
});

Message.displayName = "Message";
