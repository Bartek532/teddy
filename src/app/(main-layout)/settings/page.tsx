"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/src/components/Input";
import { Radio } from "@/src/components/Radio";
import { useChatContext } from "@/src/providers/ChatProvider";
import { MODELS } from "@/src/utils/constants";

const Settings = () => {
  const { settings, changeApiKey, changeModel } = useChatContext();
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
      <form
        className="flex flex-col justify-start gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
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
    </main>
  );
};

export default Settings;
