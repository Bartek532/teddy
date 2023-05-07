import { Store } from "tauri-plugin-store-api";

const store = new Store(".store.dat");

export const save = async (key: string, value: any) => {
  try {
    await store.set(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const get = async (key: string) => {
  try {
    return await store.get(key);
  } catch (error) {
    console.error(error);
  }
};
