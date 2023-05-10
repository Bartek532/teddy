"use client";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { SnippetForm } from "@/src/components/snippets/SnippetForm";
import { useSnippetsContext } from "@/src/providers/SnippetsProvider";

import type { CreateSnippetInput } from "@/src/utils/types";

const EditSnippet = () => {
  const { reset } = useForm<CreateSnippetInput>();
  const params = useParams();
  const router = useRouter();
  const { getSnippet, editSnippet } = useSnippetsContext();

  const snippet = getSnippet(params.id);

  const updateSnippet = (data: CreateSnippetInput) => {
    editSnippet(params.id, data);
    reset();
    return router.back();
  };

  if (!snippet) {
    return null;
  }

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <SnippetForm
        onSubmit={updateSnippet}
        defaultValues={snippet}
        type="edit"
      />
    </main>
  );
};

export default EditSnippet;
