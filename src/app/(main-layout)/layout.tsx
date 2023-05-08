import { Header } from "@/src/components/Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div data-tauri-drag-region className="w-full pb-6 cursor-grab"></div>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
