import { Header } from "@/src/components/Header";

import { WindowControls } from "../../components/WindowControls";

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
