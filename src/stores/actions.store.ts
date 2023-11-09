import { create } from "zustand";

import { add, get, load, remove, sync, update } from "../lib/actions";
import { DEFAULT_STATE } from "../utils/constants";

import type { Action } from "../utils/types";

interface ActionsStore {
  readonly actions: Action[];
  readonly addAction: (action: Omit<Action, "id">) => void;
  readonly removeAction: (actionId: string) => void;
  readonly getAction: (actionId: string) => Action | null;
  readonly editAction: (actionId: string, data: Partial<Omit<Action, "id">>) => void;
}

export const useActions = create<ActionsStore>((set, getState) => ({
  actions: DEFAULT_STATE.actions,
  addAction: (action) => set(({ actions }) => ({ actions: add(actions, action) })),
  removeAction: (actionId) => set(({ actions }) => ({ actions: remove(actions, actionId) })),
  getAction: (actionId) => get(getState().actions, actionId) ?? null,
  editAction: (actionId, data) =>
    set(({ actions }) => ({ actions: update(actions, actionId, data) })),
}));

useActions.subscribe(({ actions }) => void sync(actions));

const loadActions = async () => {
  const actions = await load();
  useActions.setState({ actions });
};

void loadActions();
