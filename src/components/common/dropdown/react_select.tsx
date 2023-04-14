import { UseOutsideClick } from "@/components/utils/UseOutsideClick";
import React, { ChangeEvent, useState } from "react";

interface OptionsProps {
  value: { value: number | string; label: string };
  updateValue: (opt: { value: number | string; label: string }) => void;
  options: { value: number | string; label: string }[];
  isSearch: boolean;
  setSearchValue: (data: string) => void;
  setSearchOpt: React.Dispatch<
    React.SetStateAction<
      {
        value: number | string;
        label: string;
      }[]
    >
  >;
}

const SelectOption = (props: OptionsProps) => {
  const handleChange = () => {
    props.updateValue(props.value);
    if (props.isSearch == true) {
      props.setSearchValue("");
      props.setSearchOpt([]);
    }
  };

  return (
    <div role="presentation" onClick={handleChange}>
      <li className="text-white w-full cursor-default hover:bg-gray-700/60 select-none relative py-2 px-3">
        <div className="flex items-center w-[90%]">
          <span className="ml-1 block text-xs font-normal">{props.value.label}</span>
        </div>
      </li>
    </div>
  );
};

interface SelectProps {
  name?: string;
  isSearch: boolean;
  value: { value: number | string; label: string };
  options: { value: number | string; label: string }[];
  setData: (data: { value: number | string; label: string }) => void;
}

export const ReactSelect = (props: SelectProps) => {
  const [state, setState] = useState<{ showOptions: boolean }>({
    showOptions: false,
  });

  const [sortOpt, setSortOpt] = useState<{ value: number | string; label: string }[]>(
    props.options,
  );

  const [searchValue, setSearchValue] = useState<string>("");

  const handleClick = () => {
    setState((p) => ({ ...p, showOptions: !state.showOptions }));
    if (props.isSearch == true) {
      setSearchValue("");
      setSortOpt([]);
    }
  };

  const updateValue = (value: { value: number | string; label: string }) => {
    props.setData(value);
    setSearchValue("");
    setState({ showOptions: false });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const searchOp = e.target.value;
    const findopt = searchOp.toUpperCase();
    const filteropt = props.options.filter((opt) => opt.label.toUpperCase().includes(findopt));
    setSortOpt(filteropt);
  };

  return (
    <div className="relative -top-[2px]">
      <UseOutsideClick
        onOutsideClick={() => {
          setState({ showOptions: false });
          if (props.isSearch == true) setSortOpt([]);
        }}
      >
        <button
          type="button"
          className="transition relative appearance-none rounded-md w-[170px] top-[5px] text-gray-800 border border-gray-400/60 bg-transparent py-[5px] px-2 pr-8  leading-tight focus:outline-none"
          onClick={handleClick}
        >
          <span className="flex items-center">
            <span className="block truncate text-sm">{props.value.label}</span>
          </span>
          <span className="ml-3 absolute text-gray-800 inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {
              <svg
                className="h-5 w-5 text-gray-800"
                fill="#3d3b3b"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            }
          </span>
        </button>
        {state.showOptions && (
          <div className="h-auto absolute bg-gray-800 mt-1 w-full z-10 rounded-b-sm shadow-lg top-[32px]">
            <ul className="rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.isSearch ? (
                <input
                  type="text"
                  className="bg-gray-800 border border-gray-200 text-white h-[29px] px-2 w-[90%] mx-3 mb-2 rounded text-sm focus:outline-none "
                  placeholder="Search here"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              ) : (
                ""
              )}
              {sortOpt.length > 0 &&
                sortOpt.map((option, idx) => (
                  <SelectOption
                    key={idx}
                    value={option}
                    updateValue={updateValue}
                    setSearchValue={setSearchValue}
                    options={props.options}
                    setSearchOpt={setSortOpt}
                    isSearch={props.isSearch}
                  />
                ))}
            </ul>
          </div>
        )}
      </UseOutsideClick>
    </div>
  );
};
