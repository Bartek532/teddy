import { Input } from "@/src/components/Input";
import { Radio } from "@/src/components/Radio";

const Settings = () => {
  return (
    <main className="px-7 flex flex-col gap-4">
      <h2 className="text-sm">General</h2>

      <div>
        <span className="text-sm block mb-1.5">
          API model, you could check details{" "}
          <a
            href="https://platform.openai.com/docs/models"
            className="text-blue-200"
          >
            here
          </a>
        </span>
        <div className="flex justify-center gap-2">
          <Radio name="model" checked>
            GPT 3.5 Turbo
          </Radio>
          <Radio name="model" disabled>
            GPT 4
          </Radio>
        </div>
      </div>

      <Input>
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
    </main>
  );
};

export default Settings;
