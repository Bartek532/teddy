import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { ReactComponent as PaperPlaneIcon } from "../../assets/svg/paper-plane.svg";
import { Textarea } from "../../components/common/Textarea";
import { MessagesList } from "../../components/messages/MessagesList";
import { SnippetsList } from "../../components/snippets/SnippetsList";
import { useChatContext } from "../../providers/ChatProvider";
import { useSettingsContext } from "../../providers/SettingsProvider";
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
  const { settings } = useSettingsContext();
  const { snippets, activeSnippet, deactivateSnippet, activateSnippet } =
    useSnippetsContext();
  const { messages, resetMessages, tokens, submitPrompt, isLoading } =
    useChatContext();

  const maxTokens =
    MODELS.find(({ value }) => value === settings.ai.model)?.tokenLimit ?? 0;

  const onPromptSubmit = ({ prompt }: SubmitPromptInput) => {
    reset();
    return submitPrompt([
      {
        content: prompt,
        role: ROLE.USER,
      },
    ]);
  };

  useEffect(() => {
    if (!isLoading) {
      setFocus("prompt");
    }
  }, [isLoading]);

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
      <SnippetsList
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
          disabled={isLoading}
        />

        <button
          className="absolute bottom-6 right-6 disabled:opacity-50"
          disabled={isLoading}
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
