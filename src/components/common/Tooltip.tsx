import React, { useRef, useState } from "react";
import { createPopper, VirtualElement } from "@popperjs/core";

const Tooltip = (props: any) => {
  const [tooltipShow, setTooltipShow] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement | any>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const openLeftTooltip = () => {
    if (props.place.length > 12) {
      createPopper(btnRef.current as Element | VirtualElement, tooltipRef.current as HTMLDivElement, {
        placement: "top",
      });
      setTooltipShow(true);
    }
  };
  const closeLeftTooltip = () => {
    setTooltipShow(false);
  };
  return (
    <>
      <h4
        className="text-sm text-gray-400 b-shadow w-[100px] truncate"
        onMouseEnter={openLeftTooltip}
        onMouseLeave={closeLeftTooltip}
        ref={btnRef}
      >
        {props.place}
      </h4>
      <div
        className={
          (tooltipShow ? "" : "hidden ") +
          "bg-gray-900 absolute top-[15px] border-0 mb-3 block z-50 font-normal break-words text-sm text-left rounded-lg"
        }
        ref={tooltipRef}
      >
        <div>
          <p className="text-white p-2 w-full">{props.place}</p>
        </div>
      </div>
    </>
  );
};
export default Tooltip;