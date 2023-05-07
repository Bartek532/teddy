import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { MESSAGE_SENDER, MESSAGE_VARIANT } from "@/src/utils/types";

import type { Message as MessageType } from "@/src/utils/types";

interface MessageProps {
  readonly message: MessageType;
}

export const Message = memo<MessageProps>(({ message }) => {
  return (
    <li
      className={twMerge(
        "flex",
        message.sender === MESSAGE_SENDER.USER && "justify-end",
      )}
    >
      <div
        className={twMerge(
          "shadow bg-white-100 rounded-2xl p-3 px-5 max-w-[75%] mb-1",
          message.sender === MESSAGE_SENDER.ASSISTANT && "bg-gray-100",
          message.variant === MESSAGE_VARIANT.ERROR &&
            "text-red-100 bg-red-100/10",
        )}
      >
        {message.text}
      </div>
    </li>
  );
});

Message.displayName = "Message";
