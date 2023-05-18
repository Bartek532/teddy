import { isAction } from "../utils/validation/validator";

import { getTable } from "./airtable";

import type { Action, CreateActionInput, Settings } from "../utils/types";

export const loadActions = async ({
  apiKey,
  base,
  table,
}: Settings["airtable"]): Promise<Action[]> => {
  const actionsTable = getTable({ apiKey, base, table });

  const actions = await actionsTable.select().all();

  const filteredActions = actions
    .map((action) => action.fields)
    .filter(isAction);

  return filteredActions;
};

export const getAction = async ({
  settings,
  actionId,
}: {
  settings: Settings["airtable"];
  actionId: string;
}) => {
  const actionsTable = getTable({ ...settings });

  const action = await actionsTable.find(actionId);

  return action;
};

export const addAction = async ({
  settings,
  action,
}: {
  settings: Settings["airtable"];
  action: CreateActionInput;
}) => {
  const actionsTable = getTable({ ...settings });

  const newAction = await actionsTable.create(action);

  return newAction;
};

export const deleteAction = async ({
  settings,
  actionId,
}: {
  settings: Settings["airtable"];
  actionId: string;
}) => {
  const actionsTable = getTable({ ...settings });

  const deletedAction = await actionsTable.destroy(actionId);

  return deletedAction;
};

export const updateAction = async ({
  settings,
  actionId,
  data,
}: {
  settings: Settings["airtable"];
  actionId: string;
  data: Partial<Action>;
}) => {
  const actionsTable = getTable({ ...settings });

  const updatedAction = await actionsTable.update(actionId, data);

  return updatedAction;
};
