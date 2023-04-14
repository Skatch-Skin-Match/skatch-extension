import { useAppDispatch } from "@/app/hooks";
import { isOpenNewTab, setUser } from "@/app/modules/auth/slices/authSlice";
import { Tabs } from "@/components/Tabs";
import type { CustomNextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Layout } from "../layout";

const IndexPage: CustomNextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getData = async () => {
      let newUserData = await chrome.storage.local.get(["userData"]).then((result) => {
        return result.userData;
      });
      let newConfigData = await chrome.storage.local.get(["configData"]).then((result) => {
        return result.configData;
      });

      let newToken = await chrome.storage.local.get(["token"]).then((result) => {
        return result.token;
      });

      const newLoginData = {
        statusCode: 0,
        data: { token: newToken, userData: newUserData, configData: newConfigData },
        message: "",
      };

      if (!newConfigData) {
        let obj = {
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
        const newDataConfig = {
          statusCode: 0,
          data: { token: newToken, userData: newUserData, configData: obj },
          message: "",
        };
        dispatch(setUser(newLoginData));
      }

      dispatch(setUser(newLoginData));
    };

    getData();

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request === "loginSuccessGoogle") {
        sendResponse("reloadPage");
        chrome.runtime.sendMessage("reloadPage");
      }
    });
    const views = chrome.extension.getViews({ type: "popup" });

    if (views.length > 0) {
      let obj = {
        openNewTab: true,
      };
      dispatch(isOpenNewTab(obj));
    } else {
      // console.log("This window was opened in a new tab");
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //   setCurrentUrl(tabs[0].url);
    });
    chrome.tabs.query(
      {
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        highlighted: true,
        active: true,
        currentWindow: true,
      },
      async (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab?.url;
        const title = currentTab?.title;
      },
    );
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Head>
        <title>New Tab</title>
        {/* <div class="product-detail-main-image-container">
          <img
            width="768"
            height="1152"
            alt="Relaxed Fit Printed T-shirt - Pink/Brooklyn 01 - Men | H&amp;M IN"
            srcset="//lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2F3f%2F6c3f255829ec3e85df66cd63a4fcf34a4fd5b8cc.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&amp;call=url[file:/product/main] 396w,
		//lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2F3f%2F6c3f255829ec3e85df66cd63a4fcf34a4fd5b8cc.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&amp;call=url[file:/product/main] 564w, 
        //lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2F3f%2F6c3f255829ec3e85df66cd63a4fcf34a4fd5b8cc.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&amp;call=url[file:/product/main] 657w, 
        //lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2F3f%2F6c3f255829ec3e85df66cd63a4fcf34a4fd5b8cc.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&amp;call=url[file:/product/main] 820w"
            sizes="(max-width: 767px) 100vw, 50vw"
            src="//lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F6c%2F3f%2F6c3f255829ec3e85df66cd63a4fcf34a4fd5b8cc.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&amp;call=url[file:/product/main]"
          />
        </div> */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Tabs />
    </div>
  );
};

export default IndexPage;

IndexPage.getLayout = Layout;
