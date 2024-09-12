import "react-native-get-random-values";
import React, { useEffect} from "react";
import * as Sentry from "@sentry/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import dayjs from "dayjs";
import * as SplashScreen from "expo-splash-screen";
import * as Application from "expo-application";
import "dayjs/locale/fr";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import weekday from "dayjs/plugin/weekday";
import Router from "./src/Router";
import "./src/services/polyfills";
import ToastProvider from "./src/services/toast";
import "./src/styles/theme";

import { getBundleId } from "react-native-device-info";
import { initMatomo } from "./src/services/logEventsWithMatomo";

dayjs.locale("fr");
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);

SplashScreen.preventAutoHideAsync();

const release =
  getBundleId() + "@" + Application.nativeApplicationVersion + "+" + Application.nativeBuildVersion; // ex : com.addicto.v1@1.18.0+198

Sentry.init({
  dsn: __DEV__ ? "" : "https://0ef6896e639948fd9ba54b861186360d@sentry.fabrique.social.gouv.fr/80",
  release,
  attachViewHierarchy: true,
});

const App = () => {


  useEffect(() => {
    initMatomo()
  }, []);


  return (
    <RecoilRoot>
      <ToastProvider>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </ToastProvider>
    </RecoilRoot>
  );
};

export default Sentry.wrap(App);
