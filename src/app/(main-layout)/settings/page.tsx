"use client";
import PlusIcon from "@/public/svg/plus.svg";
import { Input } from "@/src/components/Input";
import { Radio } from "@/src/components/Radio";
import { Shortcuts } from "@/src/components/snippets/Shortcuts";

const Settings = () => {
  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
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

      <h2 className="text-sm mt-4">Snippets</h2>
      <button className="text-sm rounded-2xl border-2 p-2.5 border-gray-100 bg-gray-100 w-full flex justify-center gap-3 items-center">
        <PlusIcon className="w-3" />
        Create snippet
      </button>

      <Shortcuts
        snippets={[
          {
            id: "1",
            title: "Weather",
            icon: "FaReact",
            prompt: "What is the weather like today?",
            color: "#FFA500",
          },
          {
            id: "2",
            title: "Food",
            icon: "FaReact",
            prompt: "What did you have for breakfast?",
            color: "#008000",
          },
          {
            id: "3",
            title: "Translate to Polish",
            icon: "FaReact",
            prompt: "Did you exercise today? If so, what did you do?",
            color: "#0000FF",
          },
          {
            id: "4",
            title: "Mood",
            icon: "FaReact",
            prompt: "How are you feeling today?",
            color: "#FFFF00",
          },
          {
            id: "5",
            title: "Music",
            icon: "FaReact",
            prompt: "What song are you currently listening to?",
            color: "#800080",
          },
        ]}
      />
    </main>
  );
};

export default Settings;
