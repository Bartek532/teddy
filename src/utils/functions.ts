import type { SyntheticEvent } from "react";

export function onPromise<T>(promise: (event: SyntheticEvent) => Promise<T>) {
  return (event: SyntheticEvent) => {
    promise(event).catch((error) => {
      console.log("Unexpected error", error);
    });
  };
}

export const updateLastItem =
  <T>(msgFn: (message: T) => T) =>
  (currentMessages: T[]) =>
    currentMessages.map((msg, i) => {
      if (currentMessages.length - 1 === i) {
        return msgFn(msg);
      }
      return msg;
    });
