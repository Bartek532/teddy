import { Header } from "../Header";
import { WindowControls } from "../WindowControls";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WindowControls />
      <Header />
      {children}
    </>
  );
};
