import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { ActionForm } from "../../../components/actions/ActionForm";
import { addAction } from "../../../lib/actions";
import { useSettingsContext } from "../../../providers/SettingsProvider";

import type { CreateActionInput } from "../../../utils/types";

export const AddActionView = () => {
  const navigate = useNavigate();
  const { reset } = useForm<CreateActionInput>();
  const { settings } = useSettingsContext();
  const createActionMutation = useMutation("createAction", addAction, {
    onSuccess: () => {
      reset();
      return navigate(-1);
    },
  });

  const createAction = async (action: CreateActionInput) => {
    await toast.promise(
      createActionMutation.mutateAsync({
        settings,
        action,
      }),
      {
        loading: "Learning new action...",
        success: "Successfully learnt new action!",
        error: (err: Error) => err.message,
      },
    );
  };

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <ActionForm onSubmit={createAction} />
    </main>
  );
};
