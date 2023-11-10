import { debounce } from "lodash";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { getValidatedState, saveState } from "../lib/store";
import { DEFAULT_STATE } from "../utils/constants";

import type { Settings } from "../utils/types";

interface SettingsStore {
  readonly settings: Settings;
}

const syncSettings = debounce(async (settings: Settings) => {
  const prev = await getValidatedState();
  await saveState({ ...prev, settings });
}, 1000);

const useSettings = create(
  subscribeWithSelector<SettingsStore>(() => ({
    settings: DEFAULT_STATE.settings,
  })),
);

const updateSettings = (settings: Partial<Settings>) =>
  useSettings.setState((state) => ({
    settings: { ...state.settings, ...settings },
  }));

useSettings.subscribe(
  ({ settings }) => settings,
  (settings) => void syncSettings(settings),
);

const loadSettings = async () => {
  const { settings } = await getValidatedState();
  useSettings.setState({ settings });
};

void loadSettings();

export { useSettings, updateSettings };
