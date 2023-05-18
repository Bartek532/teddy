import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Input } from "../../components/common/Input";
import { Radio } from "../../components/common/Radio";
import { useSettingsContext } from "../../providers/SettingsProvider";
import { MODELS } from "../../utils/constants";
import { onPromise } from "../../utils/functions";

export const SettingsView = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const { settings, updateSettings } = useSettingsContext();
  const { register, control, getValues } = useForm({
    defaultValues: {
      model: settings.model,
      apiKey: settings.apiKey,
      airtable: settings.airtable,
      pinecone: settings.pinecone,
    },
  });

  const values = useWatch({
    name: ["model", "apiKey", "airtable", "pinecone"],
    control,
  });

  useEffect(() => {
    updateSettings(getValues());
  }, values);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      const permissionGranted = await isPermissionGranted();
      setIsNotificationEnabled(permissionGranted);
    };

    void checkNotificationPermission();
  }, []);

  return (
    <main className="px-7 flex flex-col justify-start gap-1 h-full grow">
      <div className="flex pt-1.5 mb-1.5 justify-between items-center">
        <span className="text-sm block ">Notifications</span>
        <div className="flex items-center justify-center gap-5">
          <span className="text-sm">
            {isNotificationEnabled ? "✅ Enabled" : "❌ Disabled"}
          </span>
          {isNotificationEnabled ? null : (
            <button
              className="text-sm rounded-2xl bg-gray-100 p-2 px-6"
              onClick={onPromise(() => requestPermission())}
            >
              Enable
            </button>
          )}
        </div>
      </div>

      <form
        className="flex flex-col justify-start gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-sm mt-2.5">OpenAI</h2>
        <Input {...register("apiKey")}>
          <span className="text-sm block mb-1.5">
            API key, you could receive it from your{" "}
            <a
              href="https://platform.openai.com/account/api-keys"
              className="text-blue-200"
              rel="noreferrer"
            >
              account
            </a>
          </span>
        </Input>

        <div>
          <span className="text-sm block mb-1.5">
            API model, details available{" "}
            <a
              href="https://platform.openai.com/docs/models"
              className="text-blue-200"
              rel="noreferrer"
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

        {/* TODO: add links to pages */}
        <h2 className="text-sm mt-2.5">Airtable</h2>
        <div className="flex gap-3 -mt-2">
          <Input {...register("airtable.apiKey")}>
            <span className="text-sm block mb-1.5">
              <a
                href="https://airtable.com/developers/web/guides/personal-access-tokens"
                className="text-blue-200"
              >
                API key
              </a>
            </span>
          </Input>

          <Input {...register("airtable.base")}>
            <span className="text-sm block mb-1.5">
              <a
                href="https://support.airtable.com/docs/finding-airtable-ids"
                className="text-blue-200"
              >
                Base id
              </a>
            </span>
          </Input>

          <Input {...register("airtable.table")}>
            <span className="text-sm block mb-1.5">
              <a
                href="https://support.airtable.com/docs/finding-airtable-ids"
                className="text-blue-200"
              >
                Table
              </a>{" "}
              (name or id)
            </span>
          </Input>
        </div>

        <h2 className="text-sm mt-2.5">Pinecone</h2>
        <div className="flex gap-3 -mt-2">
          <Input {...register("pinecone.apiKey")}>
            <span className="text-sm block mb-1.5">
              <a
                href="https://docs.pinecone.io/docs/quickstart#2-get-and-verify-your-pinecone-api-key"
                className="text-blue-200"
              >
                API key
              </a>
            </span>
          </Input>

          <Input {...register("pinecone.env")}>
            <span className="text-sm block mb-1.5">
              <a
                href="https://docs.pinecone.io/docs/projects#project-environment"
                className="text-blue-200"
              >
                Environment
              </a>
            </span>
          </Input>

          <Input {...register("pinecone.index")}>
            <span className="text-sm block mb-1.5">
              <a
                href="https://docs.pinecone.io/docs/indexes"
                className="text-blue-200"
              >
                Index
              </a>{" "}
              name
            </span>
          </Input>
        </div>
      </form>
    </main>
  );
};
