import { Link } from "react-router-dom";

import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { RootLayout } from "../../components/layout/root";
import SettingsLayout from "../../components/layout/settings";
import { Shortcuts } from "../../components/snippets/Shortcuts";
import { useSnippetsContext } from "../../providers/SnippetsProvider";

const Snippets = () => {
  const { snippets } = useSnippetsContext();

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <Link to="add">
        <span className="text-sm rounded-2xl border-2 p-2.5 border-gray-100 bg-gray-100 w-full flex justify-center gap-3 items-center">
          <PlusIcon className="w-3" />
          Create snippet
        </span>
      </Link>

      <Shortcuts snippets={snippets} />
    </main>
  );
};

export const SnippetsView = () => (
  <RootLayout>
    <SettingsLayout>
      <Snippets />
    </SettingsLayout>
  </RootLayout>
);
