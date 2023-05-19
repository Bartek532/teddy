import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

import { ActionForm } from "../../../components/actions/ActionForm";
import { deleteAction, getAction, updateAction } from "../../../lib/actions";
import { useSettingsContext } from "../../../providers/SettingsProvider";

import type { CreateActionInput } from "../../../utils/types";

export const EditActionView = () => {
  const {
    settings: { actionsUrl },
  } = useSettingsContext();
  const editActionMutation = useMutation("editAction", updateAction, {
    onSuccess: () => {
      reset();
      return navigate(-1);
    },
  });
  const removeActionMutation = useMutation("deleteAction", deleteAction, {
    onSuccess: () => {
      reset();
      return navigate(-1);
    },
  });
  const { data: action, isLoading } = useQuery("action", () =>
    getAction({ id: params.id!, url: actionsUrl }),
  );

  const { reset } = useForm<CreateActionInput>();
  const params = useParams();
  const navigate = useNavigate();

  if (isLoading || !action) {
    return (
      <main className="w-full grow h-full flex justify-center items-center">
        <p className="text-xl">Loading...</p>
      </main>
    );
  }

  const editAction = async (data: CreateActionInput) => {
    await toast.promise(
      editActionMutation.mutateAsync({
        id: params.id!,
        url: actionsUrl,
        data,
      }),
      {
        loading: "Editing action...",
        success: "Successfully learnt edited action!",
        error: (err: Error) => err.message,
      },
    );
  };

  const removeAction = async (id: string) => {
    await toast.promise(
      removeActionMutation.mutateAsync({
        id,
        url: actionsUrl,
      }),
      {
        loading: "Deleting action...",
        success: "Successfully forgot action!",
        error: (err: Error) => err.message,
      },
    );
  };

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <ActionForm
        onSubmit={editAction}
        onDelete={removeAction}
        defaultValues={action}
        type="edit"
      />
    </main>
  );
};
