import React, { useState } from "react";

interface SupportedSitesProps {
  title: string;
  supportedSite: string;
  setShowSuggestion: (e: boolean) => void;
}
export const SupportedSites: any = (props: SupportedSitesProps) => {
  const [showSites, setShowSites] = useState<boolean>(false);

  const listOfSites = [
    { id: "1", site: "H&M", logo: "https://1000logos.net/wp-content/uploads/2017/02/HM-Logo.png" },
    {
      id: "2",
      site: "Amazon",
      logo: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
    },
    {
      id: "3",
      site: "Myntra",
      logo: "https://1000logos.net/wp-content/uploads/2022/08/Myntra-Logo.png",
    },
  ];

  const handleListofSites = () => {
    // setShowSites(!showSites);
    props.setShowSuggestion(true);
  };

  return (
    <div>
      <div className="max-w-sm relative bg-[#f2e4d8] left-[12%] top-[24px] mt-4 flex flex-col items-center border-2 border-[#d84559] p-3">
        <p className="text-[#d84559] font-semibold text-base">{props.title}</p>
        <div onClick={() => handleListofSites()} role="presentation">
          <p className="text-[#333] underline mt-1 text-[13px] capitalize cursor-pointer font-semibold">
            {props.supportedSite}
          </p>

          <div className="flex flex-wrap mt-3">
            {showSites
              ? listOfSites.map((item) => {
                  return (
                    <div className="flex mr-3 items-center gap-3" key={item.id}>
                      <p className="text-black text-sm "> {item.site}</p>
                      <img src={`${item.logo}`} alt="logo" className="w-[20px] h-[20px]" />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
