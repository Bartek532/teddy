import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ReactComponent as PlusIcon } from "../../assets/svg/plus.svg";
import { ReactComponent as SyncIcon } from "../../assets/svg/sync.svg";
import { ActionsList } from "../../components/actions/ActionsList";
import { loadActions } from "../../lib/actions";
import { useSettingsContext } from "../../providers/SettingsProvider";
import { onPromise } from "../../utils/functions";

export const ActionsView = () => {
  const {
    settings: { actionsUrl },
  } = useSettingsContext();
  const {
    isLoading,
    data: actions,
    refetch,
  } = useQuery("actions", () => loadActions({ url: actionsUrl }));

  return (
    <main className="px-7 flex flex-col justify-start gap-4 h-full grow">
      <div className="flex gap-5">
        <Link to="add" className="grow">
          <span className="text-sm rounded-xl border-2 p-2.5 border-gray-100 bg-gray-100 w-full flex justify-center gap-3 items-center">
            <PlusIcon className="w-3 fill-black-100" />
            Add action
          </span>
        </Link>
        <button onClick={onPromise(() => refetch())}>
          <span className="sr-only">Refresh actions</span>
          <SyncIcon
            className={twMerge(
              "w-4 fill-black-100",
              isLoading && "animate-spin",
            )}
          />
        </button>
      </div>

      {actions && <ActionsList actions={actions} />}
    </main>
  );
};
