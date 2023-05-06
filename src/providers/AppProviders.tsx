"use client";

import { ChatProvider } from "./ChatProvider";
import { SnippetsProvider } from "./SnippetsProvider";

import type { ReactNode } from "react";

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ChatProvider>
    <SnippetsProvider>{children}</SnippetsProvider>
  </ChatProvider>
);
