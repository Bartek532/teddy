import { fetcher } from "../utils/fetcher";
import { isAction } from "../utils/validation/validator";

import type { Action, CreateActionInput } from "../utils/types";

export const loadActions = async ({ url }: { url: string }) => {
  const response = await fetcher(url, { method: "GET" });

  const actions: unknown = await response.json();

  const filteredActions = Array.isArray(actions)
    ? actions.filter(isAction)
    : [];

  return filteredActions;
};

export const getAction = async ({ url, id }: { url: string; id: string }) => {
  const response = await fetcher(url, { method: "GET", body: { id } });

  const action: unknown = await response.json();

  if (isAction(action)) {
    return action;
  }

  return null;
};

export const addAction = async ({
  url,
  action,
}: {
  url: string;
  action: CreateActionInput;
}) => {
  const response = await fetcher(url, { method: "POST", body: { ...action } });

  const newAction: unknown = await response.json();

  if (isAction(newAction)) {
    return newAction;
  }

  return null;
};

export const deleteAction = async ({
  url,
  id,
}: {
  url: string;
  id: string;
}) => {
  const response = await fetcher(url, { method: "DELETE", body: { id } });

  const deletedAction: unknown = await response.json();

  if (
    typeof deletedAction === "object" &&
    deletedAction &&
    "id" in deletedAction
  ) {
    return deletedAction;
  }

  return null;
};

export const updateAction = async ({
  url,
  id,
  data,
}: {
  url: string;
  id: string;
  data: Partial<Action>;
}) => {
  const response = await fetcher(url, {
    method: "POST",
    body: { ...data, id },
  });

  const editedAction: unknown = await response.json();

  if (isAction(editedAction)) {
    return editedAction;
  }

  return null;
};
