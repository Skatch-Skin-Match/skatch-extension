import React from "react";
import { ImSpinner8 } from "react-icons/im";
interface ButtonProps {
  className?: string;
  title: string;
  img?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  socialLoading?: boolean;
  isDisabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      {props.img && (
        <button
          //   className="flex relative justify-center items-center py-2 px-4 mr-1 mb-1 w-full text-xs font-medium text-white bg-transparent rounded-md border border-gray-500 shadow hover:shadow-md transition-all duration-150 ease-linear cursor-pointer outline-none focus:outline-none"
          type={props.type}
          onClick={props.onClick}
          className={props.className}
          disabled={props.isDisabled}
        >
          <img className="absolute left-4 w-4 h-4" src={props.img} alt="google" />
          <span>{props.title}</span>
          {props.socialLoading && (
            <ImSpinner8 className="inline ml-3 animate-spin text-sm text-white" />
          )}
        </button>
      )}
      {!props.img && (
        <button
          className={props.className}
          type="submit"
          onClick={props.onClick}
          disabled={props.isDisabled}
        >
          <p>{props.title}</p>
          {props.isLoading && (
            <ImSpinner8 className="inline animate-spin text-sm text-white" />
          )}
        </button>
      )}
    </>
  );
};

export default Button;

interface props {
  Icon: React.ElementType;
  title?: string;
  className?: string;
  textClass?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export const IconButton = (props: props) => {
  return (
    <>
      <button className={props.className} onClick={props.onClick} type="button">
        {props.Icon && <props.Icon className="text-[15px]" />}
        <span className={props.textClass + "hidden"}>{props.title}</span>
      </button>
    </>
  );
};
