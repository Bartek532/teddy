import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default RootLayout;
