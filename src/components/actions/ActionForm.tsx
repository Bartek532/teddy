import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";

import { ReactComponent as BinIcon } from "../../assets/svg/bin.svg";
import { onPromise } from "../../utils/functions";
import { createActionSchema } from "../../utils/validation/schema";
import { Input } from "../common/Input";
import { Textarea } from "../common/Textarea";

import type { Action, CreateActionInput } from "../../utils/types";

interface ActionFormProps {
  readonly onSubmit: (data: CreateActionInput) => Promise<void>;
  readonly onDelete?: (id: string) => Promise<void>;
  readonly defaultValues?: Action;
  readonly type?: "add" | "edit";
}

export const ActionForm = memo<ActionFormProps>(
  ({ onSubmit, onDelete, defaultValues, type = "add" }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CreateActionInput>({
      resolver: zodResolver(createActionSchema),
      defaultValues,
    });

    return (
      <form
        className="flex flex-col justify-start gap-4"
        onSubmit={onPromise(handleSubmit(onSubmit))}
      >
        <div>
          <Input {...register("name")}>
            <span className="text-sm block mb-1.5">Name</span>
          </Input>
          <ErrorMessage
            name="name"
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
          <Input {...register("url")}>
            <span className="text-sm block mb-1.5">Webhook url</span>
          </Input>

          <ErrorMessage
            name="url"
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

        <div className="mt-2 text-sm w-full flex gap-3">
          {type === "edit" && (
            <button
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => defaultValues?.id && onDelete?.(defaultValues.id)}
              className="rounded-2xl border-2 p-2.5 text-white-200 bg-red-100 w-full flex gap-3 justify-center items-center"
            >
              <BinIcon className="w-4 stroke-white-200" />
              <span>Delete action</span>
            </button>
          )}

          <button className="rounded-2xl border-2 p-2.5 bg-gray-100 w-full flex justify-center items-center">
            <span>{type === "add" ? "Add" : "Edit"} action</span>
          </button>
        </div>
      </form>
    );
  },
);

ActionForm.displayName = "ActionForm";
