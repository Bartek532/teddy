import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Radio = forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ children, ...props }, ref) => {
  return (
    <label
      className={twMerge(
        "relative cursor-pointer text-sm rounded-2xl border-2 p-2 border-gray-100 w-full flex justify-center items-center",
        props.checked ? "bg-gray-100" : "",
        props.disabled ? "opacity-50 cursor-default" : "",
        props.className,
      )}
    >
      {children}
      <input
        ref={ref}
        {...props}
        className="absolute w-0 h-0 cursor-pointer opacity-0"
        type="radio"
      />
    </label>
  );
});

Radio.displayName = "Radio";
