import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import * as Sentry from "@sentry/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot, useSetRecoilState } from "recoil";
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
import {
  cleanConsosAndCatalog,
  hasCleanConsoAndCatalog,
  hasMigrateFromDailyGoalToWeekly,
  hasMigrateMissingDrinkKey,
  hasSentPreviousDrinksToDB,
  migrateFromDailyGoalToWeekly,
  migrateMissingDrinkKey,
  sendPreviousDrinksToDB,
} from "./src/migrations";
import { fixMissingDrinkKey, reconciliateDrinksToDB, reconciliateGoalToDB } from "./src/reconciliations";
import { drinksState, ownDrinksCatalogState } from "./src/recoil/consos";
import { drinksByWeekState, goalsState } from "./src/recoil/gains";
import { getInitValueFromStorage } from "./src/recoil/utils";

dayjs.locale("fr");
dayjs.extend(isSameOrAfter);
dayjs.extend(weekday);

SplashScreen.preventAutoHideAsync();

const release = getBundleId() + "@" + Application.nativeApplicationVersion + "+" + Application.nativeBuildVersion; // ex : com.addicto.v1@1.18.0+198

Sentry.init({
  dsn: __DEV__ ? "" : "https://0ef6896e639948fd9ba54b861186360d@sentry.fabrique.social.gouv.fr/80",
  release,
  attachViewHierarchy: true,
});

const App = () => {
  // sync everytime we open the app
  const [reconciliatedDrinksToDB, setReconciliatedDrinksToDB] = useState(false);
  const [fixedMissingDrinkKey, setFixedMissingDrinkKey] = useState(false);
  const [reconciliatedGoalsToDB, setReconciliatedGoalsToDB] = useState(false);

  // migrate only once if not yet done
  // TODO: clean migrations when it's time
  const [_hasSentPreviousDrinksToDB, setHasSentPreviousDrinksToDB] = useState(hasSentPreviousDrinksToDB);
  const [_hasCleanConsoAndCatalog, setHasCleanConsoAndCatalog] = useState(hasCleanConsoAndCatalog);
  const [_hasMigrateMissingDrinkKey, sethasMigrateMissingDrinkKey] = useState(hasMigrateMissingDrinkKey);
  const [_hasMigrateFromDailyGoalToWeekly, sethasMigrateFromDailyGoalToWeekly] = useState(
    hasMigrateFromDailyGoalToWeekly
  );

  useEffect(() => {
    initMatomo().then(async () => {
      if (!reconciliatedDrinksToDB) {
        await reconciliateDrinksToDB();
        setReconciliatedDrinksToDB(true);
      }
      if (!fixedMissingDrinkKey) {
        await fixMissingDrinkKey();
        setFixedMissingDrinkKey(true);
      }
      if (!reconciliatedGoalsToDB) {
        await reconciliateGoalToDB();
        setReconciliatedGoalsToDB(true);
      }
      if (!_hasCleanConsoAndCatalog) {
        await cleanConsosAndCatalog();
        setHasCleanConsoAndCatalog(true);
      }
      if (!_hasSentPreviousDrinksToDB) {
        await sendPreviousDrinksToDB();
        setHasSentPreviousDrinksToDB(true);
      }
      if (!_hasMigrateFromDailyGoalToWeekly) {
        await migrateFromDailyGoalToWeekly();
        sethasMigrateFromDailyGoalToWeekly(true);
      }
      if (!_hasMigrateMissingDrinkKey) {
        migrateMissingDrinkKey();
        sethasMigrateMissingDrinkKey(true);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    !reconciliatedDrinksToDB ||
    !fixedMissingDrinkKey ||
    !reconciliatedGoalsToDB ||
    !_hasSentPreviousDrinksToDB ||
    !_hasCleanConsoAndCatalog ||
    !_hasMigrateFromDailyGoalToWeekly ||
    !_hasMigrateMissingDrinkKey
  ) {
    return null;
  }

  return <RecoiledApp />;
};

function RecoiledApp() {
  return (
    <RecoilRoot>
      <ResetRecoilStatesAfterMigrationsAndReconciliations />
      <ToastProvider>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </ToastProvider>
    </RecoilRoot>
  );
}

// Why this function ?
// because we have a FUCKING HARD TIME to manage how and when recoil is initiated
// the default value of recoil's atoms is called AT FIRST, before any migration or reconciliation
// so we need to re-init the atoms we want to be initiated once the migrations/reconciliations are done
function ResetRecoilStatesAfterMigrationsAndReconciliations() {
  const resetOwnDrinks = useSetRecoilState(ownDrinksCatalogState);
  const resetDrinks = useSetRecoilState(drinksState);
  const resetDrinksByWeek = useSetRecoilState(drinksByWeekState);
  const resetGoals = useSetRecoilState(goalsState);
  useEffect(() => {
    resetOwnDrinks(getInitValueFromStorage("@OwnDrinks", []));
    resetDrinks(getInitValueFromStorage("@Drinks", []));
    resetDrinksByWeek(getInitValueFromStorage("@StoredDetaileddrinksByWeekState", []));
    resetGoals(getInitValueFromStorage("goalsState", []));
  }, []);
  return null;
}

export default Sentry.wrap(App);
