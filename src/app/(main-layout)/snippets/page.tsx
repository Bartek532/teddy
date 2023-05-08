"use client";
import Link from "next/link";

import PlusIcon from "@/public/svg/plus.svg";
import { Shortcuts } from "@/src/components/snippets/Shortcuts";
import { useSnippetsContext } from "@/src/providers/SnippetsProvider";

const Settings = () => {
  const { snippets } = useSnippetsContext();

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
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
