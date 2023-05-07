"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import PlusIcon from "@/public/svg/plus.svg";
import { Input } from "@/src/components/Input";
import { Radio } from "@/src/components/Radio";
import { Shortcuts } from "@/src/components/snippets/Shortcuts";
import { useChatContext } from "@/src/providers/ChatProvider";
import { useSnippetsContext } from "@/src/providers/SnippetsProvider";
import { MODELS } from "@/src/utils/constants";

export const metadata = {
  title: "Settings",
};

const Settings = () => {
  const { settings, changeApiKey, changeModel } = useChatContext();
  const { snippets } = useSnippetsContext();
  const { register, watch } = useForm({
    defaultValues: {
      model: settings.model,
      apiKey: settings.apiKey,
    },
  });

  const watchModel = watch("model");
  const watchApiKey = watch("apiKey");

  useEffect(() => {
    changeModel(watchModel);
  }, [watchModel]);

  useEffect(() => {
    watchApiKey && changeApiKey(watchApiKey);
  }, [watchApiKey]);

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <h2 className="text-sm">Chat</h2>

      <form className="flex flex-col justify-start gap-4">
        <div>
          <span className="text-sm block mb-1.5">
            API model, details available{" "}
            <a
              href="https://platform.openai.com/docs/models"
              className="text-blue-200"
            >
              here
            </a>
          </span>
          <div className="flex justify-center gap-2">
            {MODELS.map((model) => (
              <Radio
                value={model.value}
                {...register("model")}
                key={model.id}
                disabled={!model.isAvailable}
              >
                {model.label}
              </Radio>
            ))}
          </div>
        </div>

        <Input {...register("apiKey")}>
          <span className="text-sm block mb-1.5">
            OpenAI API key, you could receive it from your{" "}
            <a
              href="https://platform.openai.com/account/api-keys"
              className="text-blue-200"
            >
              account
            </a>
          </span>
        </Input>
      </form>

      <h2 className="text-sm mt-4">Snippets</h2>
      <Link href="/snippets/add" prefetch={false}>
        <span className="text-sm rounded-2xl border-2 p-2.5 border-gray-100 bg-gray-100 w-full flex justify-center gap-3 items-center">
          <PlusIcon className="w-3" />
          Create snippet
        </span>
      </Link>

      <Shortcuts snippets={snippets} />
    </main>
  );
};

export default Settings;
