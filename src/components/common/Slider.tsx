import React, { ChangeEvent } from "react";

type SliderProps = {
  name: string;
  min: number;
  max: number;
  defaultValue: number;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Slider = (props: SliderProps): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
      <input
        type="range"
        defaultValue={props.defaultValue}
        min={props.min}
        name={props.name}
        max={props.max}
        className="w-[129px] ml-2 h-[3px] bg-white/30 appearance-none"
        onChange={props.changeHandler}
      />
    </div>
  );
};

export default Slider;
