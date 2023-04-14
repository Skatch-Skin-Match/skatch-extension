import { useEffect, useRef } from "react";

export function UseOutsideClick(props: any) {
  const menuRef = useRef<any>();
  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        props.onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return <div ref={menuRef}>{props.children}</div>;
}
