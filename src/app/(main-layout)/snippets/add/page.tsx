"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/src/components/Input";
import { Textarea } from "@/src/components/Textarea";
import { snippetSchema } from "@/src/utils/validation/schema";

import type { CreateSnippetInput } from "@/src/utils/types";

const AddSnippet = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSnippetInput>({
    resolver: zodResolver(snippetSchema),
  });

  const createSnippet = (data: CreateSnippetInput) => {
    console.log(data);
  };

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <form
        className="flex flex-col justify-start gap-4"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(createSnippet)}
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
            Add snippet
          </span>
        </button>
      </form>
    </main>
  );
};

export default AddSnippet;