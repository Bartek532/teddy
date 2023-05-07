import { memo } from "react";

import { Message } from "./Message";

import type { Message as MessageType } from "@/src/utils/types";

interface MessagesListProps {
  readonly messages: MessageType[];
}

export const MessagesList = memo<MessagesListProps>(({ messages }) => {
  return (
    <section className="flex grow justify-end flex-col py-5">
      <ul className="flex flex-col grow h-full gap-3 overflow-y-scroll basis-0 pr-1.5">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </ul>
    </section>
  );
});

MessagesList.displayName = "MessagesList";
