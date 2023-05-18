import { QueryClient, QueryClientProvider } from "react-query";

import { SettingsProvider } from "./SettingsProvider";
import { SnippetsProvider } from "./SnippetsProvider";
import { ThemeProvider } from "./ThemeProvider";

import type { ReactNode } from "react";

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SettingsProvider>
        <SnippetsProvider>{children}</SnippetsProvider>
      </SettingsProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
