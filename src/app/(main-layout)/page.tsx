"use client";

import PaperPlaneIcon from "@/public/svg/paper-plane.svg";
import { Snippets } from "@/src/components/snippets/Snippets";
import { Textarea } from "@/src/components/Textarea";
import { useSnippetsContext } from "@/src/providers/SnippetsProvider";

const Home = () => {
  const { snippets, activeSnippet, activateSnippet, deactivateSnippet } =
    useSnippetsContext();

  return (
    <main className="px-7 h-full flex flex-col justify-between grow">
      <Snippets
        snippets={snippets}
        active={activeSnippet}
        onActivate={activateSnippet}
        onDeactivate={deactivateSnippet}
      />

      <form className="relative">
        <Textarea className="pr-12" placeholder="Ask me anything..." />

        <button className="absolute bottom-6 right-6">
          <PaperPlaneIcon className="w-4" />
        </button>
      </form>
    </main>
  );
};

export default Home;
