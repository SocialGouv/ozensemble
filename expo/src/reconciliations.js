import { getMaxDrinksPerWeek, getTotalDrinksByDrinkingDay } from "./helpers/gainsHelpers";
import { alcoolQuantityCatalog } from "./scenes/AddDrink/alcoolQuantityCatalog";
import { drinksCatalog, NO_CONSO } from "./scenes/ConsoFollowUp/drinksCatalog";
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
        storage.set("@Drinks", JSON.stringify(drinks.map((drink) => ({ ...drink, isSyncedWithDB: true }))));
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
    const totalDrinksByDrinkingDay = getTotalDrinksByDrinkingDay(maxDrinksPerWeek, daysWithGoalNoDrink);

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

export async function fixMissingDrinkKey() {
  const drinks = JSON.parse(storage.getString("@Drinks"));
  const ownDrinksCatalog = JSON.parse(storage.getString("@OwnDrinks") || "[]");
  const objectCatalog = {};
  for (const ownDrink of ownDrinksCatalog) {
    objectCatalog[ownDrink.drinkKey] = ownDrink;
  }
  for (const catalogDrink of drinksCatalog) {
    objectCatalog[catalogDrink.drinkKey] = catalogDrink;
  }
  for (const drink of drinks) {
    if (drink.drinkKey === NO_CONSO) {
      continue;
    }
    if (!objectCatalog[drink.drinkKey]) {
      const response = await API.post({
        path: "/consommation/find-missing-own-drink",
        body: {
          drinkKey: drink.drinkKey,
          matomoId: storage.getString("@UserIdv2"),
        },
      });
      if (response.ok && response.data) {
        const missingDrink = {
          categoryKey: "ownDrink",
          drinkKey: drink.drinkKey,
          displayFeed: drink.drinkKey,
          displayDrinkModal: drink.drinkKey,
          volume: response.data.volume,
          price: Number(response.data.price),
          doses: response.data.doses,
          icon: alcoolQuantityCatalog.find((catalog) => catalog.volume === response.data.volume)?.icon,
          // const doses = Math.round((formatedAlcoolPercentage * 0.8 * formatedVolume) / 10) / 10;
          alcoolPercentage: (response.data.doses * 10 * 10) / (response.data.volume * 0.8),
          kcal: response.data.kcal,
          custom: true,
          isDeleted: false,
        };
        ownDrinksCatalog.push(missingDrink);
        objectCatalog[drink.drinkKey] = missingDrink;
        storage.set("@OwnDrinks", JSON.stringify(ownDrinksCatalog));
      }
    }
  }
}
