import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { SnippetForm } from "../../../components/snippets/SnippetForm";
import { addSnippet } from "../../../stores/snippets.store";

import type { CreateSnippetInput } from "../../../utils/types";

export const AddSnippetView = () => {
  const navigate = useNavigate();
  const { reset } = useForm<CreateSnippetInput>();

  const createSnippet = (data: CreateSnippetInput) => {
    addSnippet(data);
    reset();
    return navigate(-1);
  };

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <SnippetForm onSubmit={createSnippet} />
    </main>
  );
};
