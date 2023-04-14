import React from "react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Modal from "./modals/modalRegister";
import { Toggle } from "./common/toggle/Toggle";
import { HistoryAndPreset } from "./modules/historyAndPreset/HistoryAndPreset";
import { UploadSkinImage } from "./modules/uploadSkinImage/UploadSkinImage";
import { SupportedSites } from "./modules/supportedSites/SupportedSites";
import NavBar from "./modules/navbar/NavBar";
import SupportedSitesPage from "./supportedSitesPage/supportedSitesPage";
import { BsCart } from "react-icons/bs";
import skatchBlackLogo from "../../public/ss-icon.png";
import Image from "next/image";
import { updateConfigNoLogin } from "@/app/modules/auth/slices/authSlice";
export const Tabs: any = (props: any) => {
  const { configData, openNewTab } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const myStyle = {
    backgroundColor: "#fff",
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    overflow: "hidden",
  };
  const myStyle1 = {
    backgroundColor: "#fff",

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    overflow: "hidden",
    display: "flex",

    justifyContent: "center",
    alignItems: "center",

    boxShadow: "0px 0px 36px 15px rgba(0, 0, 0, 0.28)",
    borderRadius: "12px",
    padding: "5px",
  };
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toggleState, setToggleState] = useState<boolean>(false);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<boolean>(false);

  const initialConfigData = {
    presetColor: [
      {
        id: 1,
        colorCode: "#F0D3C5",
        colorName: "fair",
        hsv: ["20°, 18%, 94%"],
      },
      {
        id: 2,
        colorCode: "#E3B38D",
        colorName: "medium",
        hsv: ["27°, 38%, 89%"],
      },
      {
        id: 3,
        colorCode: "#A96C4F",
        colorName: "brown",
        hsv: ["19°, 53%, 66%"],
      },
      {
        id: 4,
        colorCode: "#704733",
        colorName: "black",
        hsv: ["20°, 54%, 44%"],
      },
    ],
    selectedColor: {
      id: 3,
      colorCode: "#A96C4F",
      colorName: "brown",
      hsv: ["19°, 53%, 66%"],
    },
    history: [],
  };

  useEffect(() => {
    let fetchToggleValue = async () => {
      let toggleValue = await chrome.storage.local.get("Toggle").then((res) => {
        return res.Toggle;
      });

      setToggleState(toggleValue);
      if (!configData) {
        await chrome.storage.local.set({ configData: initialConfigData }).then(() => {
          dispatch(updateConfigNoLogin(initialConfigData));
        });
      }
    };

    fetchToggleValue();
  }, [configData]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        if (
          tabs[0].url?.includes("https://www2.hm.com") ||
          tabs[0].url?.includes("https://us.shop.gymshark.com/") ||
          tabs[0].url?.includes("https://www.uniqlo.com/")
        ) {
          setCurrentUrl(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ Toggle: toggleState }).then(() => {
      // console.log()
      //   setToggleState(toggleValue);
    });
    let fetchToggleValue = async () => {
      let toggleValue = await chrome.storage.local.get("Toggle").then((res) => {
        return res.Toggle;
      });
    };

    fetchToggleValue();
  }, [toggleState]);

  const handleShowSuggestionClick = () => {
    setShowSuggestion(!showSuggestion);
  };
  return (
    <>
      {openNewTab ? (
        <div style={myStyle}>
          {/* nav sec */}
          <NavBar setShowModal={setShowModal} setShowSuggestion={(e) => setShowSuggestion(e)} />
          {/* card sec */}
          {!showSuggestion ? (
            <div className="w-full px-6 py-2 mx-auto my-auto">
              <div className="flex justify-between items-center gap-4">
                <HistoryAndPreset />
                <UploadSkinImage />
              </div>
              <div className="flex-center gap-3 mt-[30px]">
                <p className="text-gray-800 text-sm capitalize">toggle skin match</p>
                <div className="relative top-1">
                  <Toggle
                    // disable={false}
                    label="myLibrary"
                    checked={toggleState}
                    changeHandler={() =>
                      toggleState ? setToggleState(false) : setToggleState(true)
                    }
                  />
                </div>
              </div>

              {!currentUrl && (
                <SupportedSites
                  title={"This site is not supported by skatch"}
                  supportedSite={"see list of supported sites"}
                  setShowSuggestion={setShowSuggestion}
                />
              )}
            </div>
          ) : (
            <SupportedSitesPage />
          )}
          {showModal && <Modal setShowModal={setShowModal} showModal={showModal} />}
          <div className="flex fixed bottom-0 bg-white w-full">
            <button
              // style={{ padding: "12px", border: "solid 1px black", width: "50%" }}
              onClick={() => setShowSuggestion(false)}
              className={
                (!showSuggestion ? "bg-white " : "bg-gray-400/40 ") +
                "p-3 w-[50%] border border-gray-700"
              }
            >
              {/* <span className="text-center text-base font-semibold text-black">SkinShift</span> */}
              <Image src={skatchBlackLogo} width="28px" height="28px" />
            </button>
            <button
              className={
                (showSuggestion ? "bg-white " : "bg-gray-400/40 ") +
                "flex justify-center items-center p-3 w-[50%] border border-gray-700"
              }
              onClick={() => setShowSuggestion(true)}
            >
              <BsCart style={{ fontSize: "24px" }} />
            </button>
          </div>
        </div>
      ) : (
        <div className="px-6 py-2 flex-col" style={myStyle1}>
          {/* nav sec */}
          <NavBar
            setShowModal={setShowModal}
            setShowSuggestion={(e) => setShowSuggestion(e)}
            width={"-webkit-fill-available"}
          />
          {/* card sec */}
          {!showSuggestion ? (
            <div className="w-[630px] h-[527px] px-6 py-2">
              <div className="flex justify-between items-center gap-4">
                <HistoryAndPreset />
                <UploadSkinImage />
              </div>
              <div className="flex-center gap-3 mt-[30px]">
                <p className="text-gray-800 text-sm capitalize">toggle skin match</p>
                <div className="relative top-1">
                  <Toggle
                    // disable={false}
                    label="myLibrary"
                    checked={toggleState}
                    changeHandler={() =>
                      toggleState ? setToggleState(false) : setToggleState(true)
                    }
                  />
                </div>
              </div>
              {!currentUrl && (
                <SupportedSites
                  title={"This site is not supported by skatch"}
                  supportedSite={"see list of supported sites"}
                  setShowSuggestion={setShowSuggestion}
                />
              )}
            </div>
          ) : (
            <SupportedSitesPage height={"550px"} />
          )}
          {showModal && <Modal setShowModal={setShowModal} showModal={showModal} />}
          <div className="flex bg-white w-[630px]">
            <button
              // style={{ padding: "12px", border: "solid 1px black", width: "50%" }}
              onClick={() => setShowSuggestion(false)}
              className={
                (!showSuggestion ? "bg-white " : "bg-gray-400/40 ") +
                "p-3 w-[50%] border border-gray-700"
              }
            >
              {/* <span className="text-center text-base font-semibold text-black">SkinShift</span> */}
              <Image src={skatchBlackLogo} width="28px" height="28px" />
            </button>
            <button
              className={
                (showSuggestion ? "bg-white " : "bg-gray-400/40 ") +
                "flex justify-center items-center p-3 w-[50%] border border-gray-700"
              }
              onClick={() => setShowSuggestion(true)}
            >
              <BsCart style={{ fontSize: "24px" }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
