import { useEffect, useMemo, useState } from "react";

import { getTable } from "../lib/airtable";
import { createSafeContext } from "../lib/context";
import { isAction } from "../utils/validation/validator";

import { useSettingsContext } from "./SettingsProvider";

import type { Action } from "../utils/types";
import type { ReactNode } from "react";

interface ActionsContextValue {
  readonly actions: Action[];
}

const [useActionsContext, ActionsContextProvider] =
  createSafeContext<ActionsContextValue>();

const ActionsProvider = ({ children }: { readonly children: ReactNode }) => {
  const { settings } = useSettingsContext();
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    const loadActions = async () => {
      const actionsTable = getTable(settings.airtable);
      const actions = await actionsTable.select().all();

      const filteredActions = actions
        .map((action) => action.fields)
        .filter(isAction);

      setActions(filteredActions);
    };

    void loadActions();
  }, []);

  const value = useMemo(
    () => ({
      actions,
    }),
    [actions],
  );

  return (
    <ActionsContextProvider value={value}>{children}</ActionsContextProvider>
  );
};

export { useActionsContext, ActionsProvider };
