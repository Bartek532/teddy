"use client";

import { SettingsProvider } from "./SettingsProvider";
import { SnippetsProvider } from "./SnippetsProvider";

import type { ReactNode } from "react";

type AppProvidersProps = Readonly<{
  children: ReactNode;
}>;

export const AppProviders = ({ children }: AppProvidersProps) => (
  <SettingsProvider>
    <SnippetsProvider>{children}</SnippetsProvider>
  </SettingsProvider>
);
