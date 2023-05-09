"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import PaperPlaneIcon from "@/public/svg/paper-plane.svg";
import { MessagesList } from "@/src/components/messages/MessagesList";
import { Snippets } from "@/src/components/snippets/Snippets";
import { Textarea } from "@/src/components/Textarea";
import { useChatContext } from "@/src/providers/ChatProvider";
import { useSnippetsContext } from "@/src/providers/SnippetsProvider";
import { MODELS } from "@/src/utils/constants";
import { onPromise } from "@/src/utils/functions";
import { ROLE } from "@/src/utils/types";
import { messageSchema } from "@/src/utils/validation/schema";

import type { SubmitPromptInput } from "@/src/utils/types";

const Home = () => {
  const { register, handleSubmit, reset } = useForm<SubmitPromptInput>({
    resolver: zodResolver(messageSchema),
  });
  const { snippets, activeSnippet, deactivateSnippet, activateSnippet } =
    useSnippetsContext();
  const { messages, sendMessage, resetMessages, tokens, settings } =
    useChatContext();

  const maxTokens =
    MODELS.find(({ value }) => value === settings.model)?.tokenLimit ?? 0;

  const onPromptSubmit = ({ prompt }: SubmitPromptInput) => {
    reset();
    return sendMessage(prompt);
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit(onPromptSubmit)();
    }
  };

  return (
    <main className="px-7 pr-5 h-full flex flex-col justify-between grow">
      <Snippets
        snippets={snippets}
        active={activeSnippet}
        onActivate={activateSnippet}
        onDeactivate={deactivateSnippet}
      />
      <MessagesList
        messages={messages.filter(
          ({ content, role }) => content && role !== ROLE.SYSTEM,
        )}
      />

      <form
        className="relative shadow-200"
        onSubmit={onPromise(handleSubmit(onPromptSubmit))}
      >
        <Textarea
          className="pr-12"
          placeholder="Ask me anything..."
          onKeyDown={handleTextareaKeyDown}
          {...register("prompt")}
          disabled={messages.at(-1)?.meta.loading ?? false}
        />

        <button
          className="absolute bottom-6 right-6 disabled:opacity-50"
          disabled={messages.at(-1)?.meta.loading ?? false}
        >
          <PaperPlaneIcon className="w-4" />
        </button>
      </form>

      <div className="text-sm px-3.5 flex justify-between mb-3 mt-1">
        <button onClick={() => resetMessages()} className="hover:underline">
          Clear conversation
        </button>
        <span className={twMerge(tokens > maxTokens && "text-red-100")}>
          Tokens: {tokens} / {maxTokens}
        </span>
      </div>
    </main>
  );
};

export default Home;
