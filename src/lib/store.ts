import { Store } from "tauri-plugin-store-api";

import type { Settings, Snippet } from "../utils/types";

const store = new Store(".store.dat");

export interface State {
  readonly settings: Settings;
  readonly snippets: Snippet[];
}

export const saveState = async (value: Partial<State>) => {
  try {
    await store.set("state", value);
    await store.save();
  } catch (error) {
    console.error(error);
  }
};

export const getState = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const state = (await store.get("state")) as Partial<State>;
    return state;
  } catch (error) {
    console.error(error);
  }
};
