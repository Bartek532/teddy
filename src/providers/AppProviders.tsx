import { ChatProvider } from "./ChatProvider";
import { SnippetsProvider } from "./SnippetsProvider";
import { ThemeProvider } from "./ThemeProvider";

import type { ReactNode } from "react";

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ThemeProvider>
    <ChatProvider>
      <SnippetsProvider>{children}</SnippetsProvider>
    </ChatProvider>
  </ThemeProvider>
);
