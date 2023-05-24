import { QueryClient, QueryClientProvider } from "react-query";

import { ChatProvider } from "./ChatProvider";
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
        <ChatProvider>
          <SnippetsProvider>{children}</SnippetsProvider>
        </ChatProvider>
      </SettingsProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
