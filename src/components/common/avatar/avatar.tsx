import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/app/modules/auth/slices/authSlice";
import { UseOutsideClick } from "@/components/utils/UseOutsideClick";
import { createPopper, VirtualElement } from "@popperjs/core";
import React, { useRef, useState } from "react";

interface AvatarProps {
  setShowModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Avatar = (props: AvatarProps) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state: any) => state.auth.userData);
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef<HTMLButtonElement | null>(null);
  const popoverDropdownRef = useRef<HTMLDivElement | any>();

  const openDropdownPopover = () => {
    createPopper(
      btnDropdownRef.current as Element | VirtualElement,
      popoverDropdownRef.current as HTMLDivElement,
      {
        placement: "bottom-start",
      },
    );
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <div>
      {/* avatar block starts --> add user is login or not condition here*/}
      {email?.length > 0 ? (
        <div className="flex items-center relative">
          <UseOutsideClick
            onOutsideClick={() => {
              setDropdownPopoverShow(false);
              ``;
            }}
          >
            <div className="flex gap-2 items-center">
              <p className="text-white text-sm">{email}</p>
              <button
                type="button"
                className="flex mr-3 text-sm bg-transparent rounded-full md:mr-0 border-none"
                ref={btnDropdownRef}
                onClick={() => {
                  dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://cdn-icons-png.flaticon.com/512/9706/9706583.png"
                  alt="user"
                />
              </button>
            </div>
            {/* Dropdown menu */}
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "z-50 w-[200px] absolute text-base list-none bg-gray-800 rounded shadow"
              }
            >
              <div className="px-4 py-3">
                <span className="block text-sm font-medium truncate text-gray-400">{email}</span>
              </div>
              <hr className="my-1 border-gray-600"></hr>
              <ul className="py-1" aria-labelledby="user-menu-button">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
                    type="button"
                    onClick={() => {
                      dispatch(logout());
                      props.setShowModel(true);
                      setDropdownPopoverShow(false);
                      //   window.close();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </UseOutsideClick>
        </div>
      ) : (
        <button
          type="button"
          className="text-white text-sm"
          onClick={() => props.setShowModel(true)}
        >
          Login/Sign Up
        </button>
      )}
    </div>
  );
};

export default Avatar;
