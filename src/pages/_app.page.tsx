import "../../public/assets/tailwind.css";
import "../../public/assets/app.css";

import type { CustomAppProps } from "next/app";
import { Provider } from "react-redux";
import { memo } from "react";

import * as amplitude from "@amplitude/analytics-browser";
import { AlertContextProvider } from "@/components/common/toast/AlertContextProvider";
import { store } from "@/app/store";

// amplitude.init('9680096f8726dd6bca250554a6f39474');
// amplitude.track("Button Clicked");
const App = memo((props: CustomAppProps) => {
  const getLayout =
    props.Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <AlertContextProvider autoHideError>
      <Provider store={store}>{getLayout(<props.Component {...props.pageProps} />)}</Provider>
    </AlertContextProvider>
  );
});

export default App;

App.displayName = "App";
