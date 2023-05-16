import { Store } from "tauri-plugin-store-api";

import { stateSchema } from "../utils/validation/schema";

import type { State } from "../utils/types";

const store = new Store(".store.dat");

export const saveState = async (value: Partial<State>) => {
  try {
    await store.set("state", value);
    await store.save();
  } catch (error) {
    console.error(error);
  }
};

const getState = () => store.get("state");

export const getValidatedState = async () => {
  const state = await getState();

  return stateSchema.parse(state);
};
