"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SnippetForm } from "@/src/components/snippets/SnippetForm";
import { useSnippetsContext } from "@/src/providers/SnippetsProvider";

import type { CreateSnippetInput } from "@/src/utils/types";

const AddSnippet = () => {
  const { addSnippet } = useSnippetsContext();
  const router = useRouter();
  const { reset } = useForm<CreateSnippetInput>();

  const createSnippet = (data: CreateSnippetInput) => {
    addSnippet(data);
    reset();
    return router.back();
  };

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <SnippetForm onSubmit={createSnippet} />
    </main>
  );
};

export default AddSnippet;
