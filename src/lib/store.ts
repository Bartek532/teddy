import { Store } from "tauri-plugin-store-api";

const chat = new Store(".chat.dat");
const snippets = new Store(".snippets.dat");

export const save = async (store: Store, key: string, value: any) => {
  try {
    await store.set(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const get = async (store: Store, key: string) => {
  try {
    return await store.get(key);
  } catch (error) {
    console.error(error);
  }
};

export const store = { chat, snippets };
