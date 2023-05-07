"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/src/components/Input";
import { Textarea } from "@/src/components/Textarea";
import { createSnippetSchema } from "@/src/utils/validation/schema";

import type { CreateSnippetInput } from "@/src/utils/types";

interface SnippetFormProps {
  readonly onSubmit: (data: CreateSnippetInput) => void;
  readonly defaultValues?: CreateSnippetInput;
  readonly type?: "add" | "edit";
}

export const SnippetForm = memo<SnippetFormProps>(
  ({ onSubmit, defaultValues, type = "add" }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateSnippetInput>({
      resolver: zodResolver(createSnippetSchema),
      defaultValues,
    });

    return (
      <form
        className="flex flex-col justify-start gap-4"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input {...register("title")}>
            <span className="text-sm block mb-1.5">Title</span>
          </Input>
          <ErrorMessage
            name="title"
            errors={errors}
            render={({ message }) => (
              <p className="text-red-100 text-xs pl-1 mt-1">{message}</p>
            )}
          />
        </div>

        <div>
          <Input {...register("icon")}>
            <span className="text-sm block mb-1.5">
              Icon, choose anything from{" "}
              <a
                href="https://react-icons.github.io/react-icons/"
                className="text-blue-200"
              >
                react-icons
              </a>
            </span>
          </Input>
          <ErrorMessage
            name="icon"
            errors={errors}
            render={({ message }) => (
              <p className="text-red-100 text-xs pl-1 mt-1">{message}</p>
            )}
          />
        </div>

        <div>
          <Input {...register("color")}>
            <span className="text-sm block mb-1.5">Color</span>
          </Input>

          <ErrorMessage
            name="color"
            errors={errors}
            render={({ message }) => (
              <p className="text-red-100 text-xs pl-1 mt-1">{message}</p>
            )}
          />
        </div>

        <div>
          <Textarea {...register("prompt")} className="text-sm" rows={3}>
            <span className="text-sm block mb-1.5">Prompt</span>
          </Textarea>
          <ErrorMessage
            name="prompt"
            errors={errors}
            render={({ message }) => (
              <p className="text-red-100 text-xs pl-1 -mt-1">{message}</p>
            )}
          />
        </div>

        <button className="mt-2">
          <span className="text-sm rounded-2xl border-2 p-2.5 border-gray-100 bg-gray-100 w-full flex justify-center gap-3 items-center">
            {type === "add" ? "Add" : "Edit"} snippet
          </span>
        </button>
      </form>
    );
  },
);

SnippetForm.displayName = "SnippetForm";
