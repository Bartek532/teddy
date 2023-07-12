import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ActionForm } from "../../../components/actions/ActionForm";
import { useActionsContext } from "../../../providers/ActionsProvider";

import type { CreateActionInput } from "../../../utils/types";

export const AddActionView = () => {
  const navigate = useNavigate();
  const { reset } = useForm<CreateActionInput>();
  const { addAction } = useActionsContext();

  const createAction = (data: CreateActionInput) => {
    addAction(data);
    reset();
    return navigate(-1);
  };

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <ActionForm onSubmit={createAction} />
    </main>
  );
};
