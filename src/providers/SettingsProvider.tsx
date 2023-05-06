import { useMemo, useState } from "react";

import { createSafeContext } from "../lib/createSafeContext";
import { AI_MODEL } from "../utils/types";

import type { ReactNode, Dispatch, SetStateAction } from "react";

interface SettingsContextValue {
  readonly model: AI_MODEL;
  readonly setModel: Dispatch<SetStateAction<AI_MODEL>>;
  readonly apiKey: string;
  readonly setApiKey: Dispatch<SetStateAction<string>>;
}

const [useSettingsContext, SettingsContextProvider] =
  createSafeContext<SettingsContextValue>();

const SettingsProvider = ({ children }: { readonly children: ReactNode }) => {
  const [model, setModel] = useState<AI_MODEL>(AI_MODEL.GPT_3_5);
  const [apiKey, setApiKey] = useState<string>("");

  const value = useMemo(
    () => ({
      model,
      setModel,
      apiKey,
      setApiKey,
    }),
    [model, apiKey],
  );

  return (
    <SettingsContextProvider value={value}>{children}</SettingsContextProvider>
  );
};

export { useSettingsContext, SettingsProvider };
