import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

import { createSafeContext } from "../lib/context";
import { getValidatedState, saveState } from "../lib/store";
import { DEFAULT_SETTINGS } from "../utils/constants";

import type { Settings } from "../utils/types";
import type { ReactNode } from "react";

interface SettingsContextValue {
  readonly settings: Settings;
  readonly updateSettings: (settings: Partial<Settings>) => void;
}

const [useSettingsContext, SettingsContextProvider] =
  createSafeContext<SettingsContextValue>();

const syncSettings = debounce(async (settings: Settings) => {
  const prev = await getValidatedState();
  await saveState({ ...prev, settings });
}, 1000);

const SettingsProvider = ({ children }: { readonly children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const updateSettings = (settings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, settings }));
  };

  useEffect(() => {
    const loadSettings = async () => {
      const { settings } = await getValidatedState();

      setSettings(settings);
    };

    void loadSettings();
  }, []);

  useEffect(() => {
    void syncSettings(settings);
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
    }),
    [settings, updateSettings],
  );

  return (
    <SettingsContextProvider value={value}>{children}</SettingsContextProvider>
  );
};

export { useSettingsContext, SettingsProvider };
