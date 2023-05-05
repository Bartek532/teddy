import { Snippet } from "./Snippet";

const snippets = [
  {
    id: "1",
    title: "Weather",
    icon: "FaReact",
    prompt: "What is the weather like today?",
    color: "#FFA500",
  },
  {
    id: "2",
    title: "Food",
    icon: "FaReact",
    prompt: "What did you have for breakfast?",
    color: "#008000",
  },
  {
    id: "3",
    title: "Translate to Polish",
    icon: "FaReact",
    prompt: "Did you exercise today? If so, what did you do?",
    color: "#0000FF",
  },
  {
    id: "4",
    title: "Mood",
    icon: "FaReact",
    prompt: "How are you feeling today?",
    color: "#FFFF00",
  },
  {
    id: "5",
    title: "Music",
    icon: "FaReact",
    prompt: "What song are you currently listening to?",
    color: "#800080",
  },
];

export const Snippets = () => {
  return (
    <section>
      <ul className="flex justify-center items-center w-full flex-wrap gap-4 max-h-28 overflow-y-scroll">
        {snippets.map((snippet) => (
          <Snippet key={snippet.id} snippet={snippet} />
        ))}
      </ul>
    </section>
  );
};
