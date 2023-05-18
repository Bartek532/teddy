import { isAction } from "../utils/validation/validator";

import { getTable } from "./airtable";

import type { Action, Settings } from "../utils/types";

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
