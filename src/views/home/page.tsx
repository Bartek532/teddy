import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { ReactComponent as PaperPlaneIcon } from "../../assets/svg/paper-plane.svg";
import { Textarea } from "../../components/common/Textarea";
import { MessagesList } from "../../components/messages/MessagesList";
import { Snippets } from "../../components/snippets/Snippets";
import { useChatContext } from "../../providers/ChatProvider";
import { useSnippetsContext } from "../../providers/SnippetsProvider";
import { MODELS } from "../../utils/constants";
import { onPromise } from "../../utils/functions";
import { ROLE } from "../../utils/types";
import { messageSchema } from "../../utils/validation/schema";

import type { SubmitPromptInput } from "../../utils/types";

export const HomeView = () => {
  const { register, handleSubmit, reset, setFocus } =
    useForm<SubmitPromptInput>({
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

  useEffect(() => {
    if (!messages.at(-1)?.meta.loading) {
      setFocus("prompt");
    }
  }, [messages.at(-1)?.meta.loading]);

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
          <PaperPlaneIcon className="w-4 fill-black-100" />
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
