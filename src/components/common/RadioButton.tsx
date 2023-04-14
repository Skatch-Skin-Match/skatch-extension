import React, { ChangeEvent, useState } from "react";

interface RadioButtonProps {
  label: string;
  value?: string;
  id: string;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = (props: RadioButtonProps) => {
  return (
    <>
      <div className="p-3 flex flex-col gap-3 items-start">
        <div className="flex items-center">
          <input
            id={props.id}
            type="radio"
            value={props.label}
            name="name"
            onChange={props.changeHandler}
            className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-600 focus:ring-blue-500"
          />
          <label
            htmlFor="radiobutton"
            className="ml-2 text-sm font-normal text-white dark:text-gray-300"
          >
            {props.label}
          </label>
        </div>
      </div>
    </>
  );
};

export default RadioButton;
