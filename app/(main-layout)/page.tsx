import { Textarea } from "@/components/Textarea";
import PaperPlaneIcon from "@/public/svg/paper-plane.svg";

const Home = () => {
  return (
    <main className="px-7 h-full flex flex-col justify-end grow">
      <form className="relative">
        <Textarea className="pr-12" />

        <button className="absolute bottom-6 right-6">
          <PaperPlaneIcon class="w-4" />
        </button>
      </form>
    </main>
  );
};

export default Home;
