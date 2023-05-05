import { forwardRef } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  JSX.IntrinsicElements["textarea"]
>(({ children, ...props }, ref) => {
  return (
    <label>
      {children}
      <textarea
        ref={ref}
        {...props}
        className="rounded-2xl h-auto pl-5 py-3 pr-12 bg-gray-400 w-full outline-none border-gray-100 border focus:border-gray-300"
      ></textarea>
    </label>
  );
});

Textarea.displayName = "Textarea";
