import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import hnM from "../../../public/H&M.png";
import gymShark from "../../../public/gymshark.png";
import { sugggestedSites } from "../../utils/suggestedSitesData";

// type Props = {};
type SupportedSitesPageProps = {
  height?: string;
};

const SupportedSitesPage = (props: SupportedSitesPageProps) => {
  const { height } = props;
  const [data, setData] = useState(sugggestedSites);
  const [inpVal, setInpval] = useState("");
  //   const hnM: string = require("../img/H&M.png");
  const handleInpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInpval(e.target.value);
    const filteredArr = sugggestedSites.filter((el) =>
      el.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()),
    );
    // console.log(filteredArr);

    setData(filteredArr);
  };
  return (
    <div className="w-full" style={{ height: height ? height : "" }}>
      <div
        //    style={{ display: "flex" }}
        className="flex items-center mx-[10px] "
      >
        <button className="bg-transparent border-none text-[19px] p-[5px]">
          <BiSearch />
        </button>
        <input
          type="text"
          placeholder="Search stores"
          onChange={handleInpChange}
          value={inpVal}
          className="p-[16px] w-full text-base outline-none"
          // style={{ padding: "16px", width: "100%", fontSize: "16px", outline: "none" }}
        />
        <button
          className="bg-transparent border-none text-[19px] p-[5px]"
          onClick={() => {
            setInpval("");
            setData(sugggestedSites);
          }}
        >
          <RxCross2 />
        </button>
      </div>
      <hr />
      <div className="mt-3">
        <p className="text-black font-semibold text-[20px] text-center">Supported Stores</p>
        <div className="flex-center flex-wrap h-[379px] overflow-y-auto my-3 gap-2">
          {data.map((el) => (
            <div
              className="flex border border-black/40 items-center gap-3 flex-col w-[45%] h-[214px]"
              //   style={{ border: "solid 1px black", padding: "5px" }}
              key={el.id}
            >
              <div
                // style={{
                //   border: "solid 1px black",
                //   borderRadius: "50%",
                //   padding: "5px",
                //   marginTop: "22px",
                //   width: "112px",
                //   height: "118px",
                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "center",
                // }}
                className="border border-black/40 rounded-full p-[5px] mt-[22px] w-[90px] h-[90px] flex items-center justify-center"
              >
                <Image src={el.logo} alt="logo" width={"60px"} height={"60px"} />
              </div>
              {/* <p className="text-black text-sm ">H&M</p> */}
              <p className="text-sm text-black">{el.name}</p>
              <button
                // style={{
                //   background: "#ff8da1",
                //   padding: "8px",
                //   borderRadius: "8px",
                //   color: "white",
                //   width: "118px",
                //   fontSize: "18px",
                //   fontWeight: "800",
                // }}
                className="bg-[#333] py-1 rounded-md text-white w-[118px] text-base capitalize"
                onClick={() => window.open(el.link)}
              >
                Shop
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportedSitesPage;
