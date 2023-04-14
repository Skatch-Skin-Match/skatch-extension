import { ChangeEvent } from "react";

interface ToggleProps {
  label: string;
  checked: boolean;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
}
export const Toggle = (props: ToggleProps) => {
  let toggleClassName = `w-[32px] h-[18px] bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600`;
  {
    props.checked
      ? (toggleClassName += ` peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-red-600`)
      : (toggleClassName += ` peer-checked:after:translate-x-0 peer-checked:after:border-yellow-500 peer-checked:bg-yellow-400`);
  }
  return (
    <>
      <div>
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            value={props.label}
            checked={props.checked}
            onChange={props.changeHandler}
            disabled={props.disable ? props.disable : false}
            className="sr-only peer"
          />
          <div className={toggleClassName}></div>
        </label>
      </div>
    </>
  );
};
