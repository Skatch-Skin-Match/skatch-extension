import { ChangeEvent } from "react";

interface ToggleProps {
  label: string;
  checked: boolean;
  changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
}
export const Toggle = (props: ToggleProps) => {
  return (
    <>
      <div>
        {props.checked == true ? (
          // <label className="inline-flex relative items-center cursor-default">
          //   <input
          //     type="checkbox"
          //     value={props.label}
          //     checked={props.checked}
          //     onChange={props.changeHandler}
          //     // disabled
          //     className="sr-only peer"
          //   />

          //   <div
          //     className="opacity-40 w-[32px] h-[18px]
          //    bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-800 rounded-full peer
          //     dark:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
          //     after:absolute after:top-[1px] after:left-[1px] after:bg-[#f594b7] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          //   ></div>
          // </label>

          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value={props.label}
              checked={props.checked}
              onChange={props.changeHandler}
              className="sr-only peer"
            />
            <div className="w-[40px] h-[18px] bg-red-400 peer-focus:outline-none rounded-full peer dark:bg-red-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[-3px] after:left-[-3px] after:bg-[#d94d3d] after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#ec9d80]"></div>
          </label>
        ) : (
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              value={props.label}
              checked={props.checked}
              onChange={props.changeHandler}
              className="sr-only peer"
            />
            <div className="w-[40px] h-[18px] bg-gray-400 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[-3px] after:left-[-3px] after:bg-[#333] after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#bfbfbf]"></div>
          </label>
        )}
      </div>
    </>
  );
};
