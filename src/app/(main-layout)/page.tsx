import PaperPlaneIcon from "@/public/svg/paper-plane.svg";
import { Textarea } from "@/src/components/Textarea";

const Home = () => {
  return (
    <main className="px-7 h-full flex flex-col justify-end grow">
      <form className="relative">
        <Textarea className="pr-12" placeholder="Ask me anything..." />

        <button className="absolute bottom-6 right-6">
          <PaperPlaneIcon className="w-4" />
        </button>
      </form>
    </main>
  );
};

export default Home;
