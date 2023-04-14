import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/app/modules/auth/slices/authSlice";
import Avatar from "@/components/common/avatar/avatar";
import { UseOutsideClick } from "@/components/utils/UseOutsideClick";
import { createPopper, VirtualElement } from "@popperjs/core";
import Image from "next/image";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import skinLogo from "../../../../public/logo-white.png";

// interface Props {}
interface NavBarProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuggestion: (e: boolean) => void;
  width?: string;
}

function NavBar(props: NavBarProps) {
  const { setShowModal, setShowSuggestion, width } = props;
  return (
    <nav
      className={"px-6 py-2 bg-grad"}
      style={{ width: width ? width : "", padding: width ? "10px" : "" }}
    >
      <div className="container flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <button
            className="flex items-center w-[108px] h-[30px] ml-[-10px]"
            onClick={() => setShowSuggestion(false)}
          >
            {/* <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              SkinShift
            </span> */}
            <Image src={skinLogo} />
          </button>
          {/* {loginData()} */}
        </div>
        <Avatar setShowModel={setShowModal} />
      </div>
    </nav>
  );
}

export default NavBar;
