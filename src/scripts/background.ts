import { loadavg } from "os";

const INTERNAL_STAYALIVE_PORT = "CT_Internal_port_alive";
let alivePort: any = null;
const SECONDS = 1000;
let lastCall = Date.now();
let isFirstStart = true;
let timer = 4 * SECONDS;
// -------------------------------------------------------
let wakeup = setInterval(Highlander, timer);
// -------------------------------------------------------
async function Highlander() {
  const now = Date.now();
  const age = now - lastCall;
  // console.log(
  //   `(DEBUG Highlander) ------------- time elapsed from first start: ${convertNoDate(age)}`,
  // );
  if (alivePort == null) {
    alivePort = chrome.runtime.connect({ name: INTERNAL_STAYALIVE_PORT });
    alivePort.onDisconnect.addListener((p: any) => {
      if (chrome.runtime.lastError) {
        // console.log(
        //   `(DEBUG Highlander) Expected disconnect (on error). SW should be still running.`,
        // );
      } else {
        // console.log(`(DEBUG Highlander): port disconnected`);
      }
      alivePort = null;
    });
  }
  if (alivePort) {
    alivePort.postMessage({ content: "ping" });
    if (chrome.runtime.lastError) {
      // console.log(`(DEBUG Highlander): postMessage error: ${chrome.runtime.lastError.message}`);
    } else {
      // console.log(`(DEBUG Highlander): "ping" sent through ${alivePort.name} port`);
    }
  }
  //lastCall = Date.now();
  if (isFirstStart) {
    isFirstStart = false;
    clearInterval(wakeup);
    timer = 270 * SECONDS;
    wakeup = setInterval(Highlander, timer);
  }
}
function convertNoDate(long: any) {
  let dt = new Date(long).toISOString();
  return dt.slice(-13, -5); // HH:MM:SS only
}

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

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   if (namespace === "local") {
//     console.log("====================================");
//     console.log(changes);
//     console.log("====================================");
//   }
// });

// chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
//   console.log("====================================");
//   console.log(sender);
//   console.log("====================================");
//   if (request.message === "setTokenFb") {
//     chrome.tabs.update(sender.tab?.id || 0, { url: sender.tab?.url });
//   }
// });

export {};
