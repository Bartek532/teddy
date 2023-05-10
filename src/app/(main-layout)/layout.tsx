"use client";
import dynamic from "next/dynamic";

import { Header } from "@/src/components/Header";

const WindowControls = dynamic(
  () =>
    import("../../components/WindowControls").then(
      (component) => component.WindowControls,
    ),
  {
    ssr: false,
  },
);

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WindowControls />
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
