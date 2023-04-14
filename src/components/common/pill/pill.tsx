import React from "react";

type Props = {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
};

export const Pill = (props: Props) => {
  return (
    <>
      <button className={props.className} onClick={props.onClick}>
        {props.title}
      </button>
    </>
  );
};
