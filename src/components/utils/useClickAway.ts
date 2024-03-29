import { useEffect, useRef } from "react";

export function useClickAway(ref: any, onClickAway: any) {
  // Keep a mutable reference to click away callback
  // and change it everytime the component using it changes
  // using 'useRef' here will make sure that we have a mutable
  // and single callback lying around.
  const callbackRef = useRef(onClickAway);

  useEffect(() => {
    callbackRef.current = onClickAway;
  }, [onClickAway]);

  // listen for click events on ref element
  // attaching a handler and calling the callback if necessary
  useEffect(() => {
    const onPointerDown = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current(event);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [ref]);
}
