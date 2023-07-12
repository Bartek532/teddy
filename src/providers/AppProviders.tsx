import { ActionsProvider } from "./ActionsProvider";
import { ChatProvider } from "./ChatProvider";
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
      <ChatProvider>
        <ActionsProvider>
          <SnippetsProvider>{children}</SnippetsProvider>
        </ActionsProvider>
      </ChatProvider>
    </SettingsProvider>
  </ThemeProvider>
);
