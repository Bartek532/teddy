import { useEffect, useMemo, useState } from "react";

import { add, get, load, remove, sync, update } from "../lib/actions";
import { createSafeContext } from "../lib/context";
import { DEFAULT_STATE } from "../utils/constants";

import type { Action } from "../utils/types";
import type { ReactNode } from "react";

interface ActionsContextValue {
  readonly actions: Action[];
  readonly addAction: (action: Omit<Action, "id">) => void;
  readonly removeAction: (actionId: string) => void;
  readonly getAction: (actionId: string) => Action | null;
  readonly editAction: (actionId: string, data: Partial<Omit<Action, "id">>) => void;
}

const [useActionsContext, ActionsContextProvider] = createSafeContext<ActionsContextValue>();

const ActionsProvider = ({ children }: { readonly children: ReactNode }) => {
  const [actions, setActions] = useState<Action[]>(DEFAULT_STATE.actions);

  const addAction = (action: Omit<Action, "id">) => {
    setActions((prev) => add(prev, action));
  };

  const removeAction = (actionId: string) => {
    setActions((prev) => remove(prev, actionId));
  };

  const getAction = (actionId: string) => get(actions, actionId) ?? null;

  const editAction = (actionId: string, data: Partial<Omit<Action, "id">>) => {
    setActions((prev) => update(prev, actionId, data));
  };

  useEffect(() => {
    void sync(actions);
  }, [actions]);

  useEffect(() => {
    const loadActions = async () => {
      const actions = await load();

      if (actions) {
        setActions(actions);
      }
    };

    void loadActions();
  }, []);

  const value = useMemo(
    () => ({
      actions,
      addAction,
      removeAction,
      getAction,
      editAction,
    }),
    [actions, addAction, removeAction, getAction, editAction],
  );

  return <ActionsContextProvider value={value}>{children}</ActionsContextProvider>;
};

export { useActionsContext, ActionsProvider };
