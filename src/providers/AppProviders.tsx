import { SettingsProvider } from "./SettingsProvider";
import { SnippetsProvider } from "./SnippetsProvider";
import { ThemeProvider } from "./ThemeProvider";

import type { ReactNode } from "react";

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <SettingsProvider>
      <SnippetsProvider>{children}</SnippetsProvider>
    </SettingsProvider>
  </ThemeProvider>
);
