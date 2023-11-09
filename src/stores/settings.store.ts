import { debounce } from "lodash";
import { create } from "zustand";

import { getValidatedState, saveState } from "../lib/store";
import { DEFAULT_STATE } from "../utils/constants";

import type { Settings } from "../utils/types";

interface SettingsStore {
  readonly settings: Settings;
  readonly updateSettings: (settings: Partial<Settings>) => void;
}

const syncSettings = debounce(async (settings: Settings) => {
  const prev = await getValidatedState();
  await saveState({ ...prev, settings });
}, 1000);

export const useSettings = create<SettingsStore>((set) => ({
  settings: DEFAULT_STATE.settings,
  updateSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
}));

useSettings.subscribe(({ settings }) => void syncSettings(settings));

const loadSettings = async () => {
  const { settings } = await getValidatedState();
  useSettings.setState({ settings });
};

void loadSettings();
