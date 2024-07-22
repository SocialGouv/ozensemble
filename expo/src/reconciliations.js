import { getMaxDrinksPerWeek, getTotalDrinksByDrinkingDay } from "./helpers/gainsHelpers";
import { drinksCatalog } from "./scenes/ConsoFollowUp/drinksCatalog";
import API from "./services/api";
import { capture } from "./services/sentry";
import { storage } from "./services/storage";

export async function reconciliateDrinksToDB() {
  try {
    const matomoId = storage.getString("@UserIdv2");
    if (!matomoId?.length) {
      // new user - no drinks to send
      return;
    }
    // @Drinks
    const drinks = JSON.parse(storage.getString("@Drinks") || "[]");
    const ownDrinksCatalog = JSON.parse(storage.getString("@OwnDrinks") || "[]");

    const unsyncedDrinks = drinks.filter((drink) => !drink.isSyncedWithDB);

    await API.post({
      path: "/consommation/sync",
      body: {
        matomoId,
        drinks: unsyncedDrinks,
        drinksCatalog: [...ownDrinksCatalog, ...drinksCatalog],
      },
    }).then((response) => {
      if (response?.ok) {
        storage.set(
          "@Drinks",
          JSON.stringify(drinks.map((drink) => ({ ...drink, isSyncedWithDB: true })))
        );
      }
    });
  } catch (e) {
    capture(e, {
      extra: {
        migration: "reconciliateDrinksToDB",
        "@Drinks": storage.getString("@Drinks"),
        "@OwnDrinks": storage.getString("@OwnDrinks"),
        hasSentPreviousDrinksToDB: storage.getBoolean("hasSentPreviousDrinksToDB"),
      },
      user: {
        id: storage.getString("@UserIdv2"),
      },
    });
  }
}

export async function reconciliateGoalToDB() {
  try {
    const matomoId = storage.getString("@UserIdv2");
    if (!matomoId?.length) {
      // new user - no drinks to send
      return;
    }
    // @Drinks
    const daysWithGoalNoDrink = JSON.parse(storage.getString("@DaysWithGoalNoDrink") || "[]");
    const drinksByWeek = JSON.parse(storage.getString("@StoredDetaileddrinksByWeekState") || "[]");
    const maxDrinksPerWeek = getMaxDrinksPerWeek(drinksByWeek);
    const totalDrinksByDrinkingDay = getTotalDrinksByDrinkingDay(
      maxDrinksPerWeek,
      daysWithGoalNoDrink
    );

    await API.post({
      path: "/goal/sync",
      body: {
        matomoId,
        daysWithGoalNoDrink,
        dosesByDrinkingDay: totalDrinksByDrinkingDay,
        dosesPerWeek: maxDrinksPerWeek,
        noDisplayBadge: true,
      },
    }).then((response) => {
      if (response?.ok && response.data) {
        storage.set("goalsState", JSON.stringify(response.data));
      }
    });
  } catch (e) {
    capture(e, {
      extra: {
        migration: "reconciliateGoalToDB",
        "@DaysWithGoalNoDrink": storage.getString("@DaysWithGoalNoDrink"),
        "@StoredDetaileddrinksByWeekState": storage.getString("@StoredDetaileddrinksByWeekState"),
      },
      user: {
        id: storage.getString("@UserIdv2"),
      },
    });
  }
}
