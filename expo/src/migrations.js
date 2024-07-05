import { MMKV } from 'react-native-mmkv';
import API from './services/api';
import { drinksCatalog } from './scenes/ConsoFollowUp/drinksCatalog';
import { capture } from './services/sentry';

export const storage = new MMKV();

export const hasSentPreviousDrinksToDB = storage.getBoolean('hasSentPreviousDrinksToDB');
export async function sendPreviousDrinksToDB() {
  try {
    if (hasSentPreviousDrinksToDB) return;
    const matomoId = storage.getString('@UserIdv2');
    if (!matomoId?.length) {
      // new user - no drinks to send
      storage.set('hasSentPreviousDrinksToDB', true);
      return;
    }
    // @Drinks
    const drinks = JSON.parse(storage.getString('@Drinks') || '[]');
    const ownDrinksCatalog = JSON.parse(storage.getString('@OwnDrinks') || '[]');

    if (drinks.length) {
      await API.post({
        path: '/consommation/init',
        body: {
          matomoId,
          drinks,
          drinksCatalog: [...ownDrinksCatalog, ...drinksCatalog],
        },
      });
    }
    storage.set('hasSentPreviousDrinksToDB', true);
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'sendPreviousDrinksToDB',
        '@Drinks': storage.getString('@Drinks'),
        '@OwnDrinks': storage.getString('@OwnDrinks'),
        hasSentPreviousDrinksToDB: storage.getBoolean('hasSentPreviousDrinksToDB'),
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
  }
}

export const hasCleanConsoAndCatalog = storage.getBoolean('@hasCleanedAndFixedCatalog2');
export async function cleanConsosAndCatalog() {
  // original target of thes migration: get the old own drinks catalog from 2020 to the new spec of 2023
  // original target changed because we fucked up the first migration
  // so we have to fix our problems too
  try {
    if (hasCleanConsoAndCatalog) return;
    const matomoId = storage.getString('@UserIdv2');
    if (!matomoId?.length) {
      // new user - no drinks to send
      storage.set('@hasCleanedAndFixedCatalog2', true);
      return;
    }
    const catalog = storage.getString('@OwnDrinks');
    if (!catalog?.length) {
      storage.set('@hasCleanedAndFixedCatalog2', true);
      return;
    }
    const oldDrinkCatalog = JSON.parse(catalog);
    const newOwnDrinksCatalog = cleanCatalog(oldDrinkCatalog);
    storage.set('@OwnDrinks', JSON.stringify(newOwnDrinksCatalog));
    if (!newOwnDrinksCatalog?.length) {
      storage.set('@hasCleanedAndFixedCatalog2', true);
      return;
    }
    const consoStored = storage.getString('@Drinks');
    if (!consoStored?.length) {
      storage.set('@hasCleanedAndFixedCatalog2', true);
      return;
    }
    const drinks = JSON.parse(consoStored);
    for (const ownDrink of newOwnDrinksCatalog) {
      const drinkList = drinks.filter((conso) => conso.drinkKey === ownDrink.drinkKey);
      if (!drinkList.length) {
        continue;
      }
      for (const conso of drinkList) {
        API.post({
          path: '/consommation',
          body: {
            matomoId: matomoId,
            id: conso.id,
            name: ownDrink.displayDrinkModal,
            drinkKey: ownDrink.drinkKey,
            quantity: Number(conso.quantity),
            date: conso.timestamp,
            doses: ownDrink.doses,
            kcal: ownDrink.kcal,
            price: ownDrink.price,
            volume: ownDrink.volume,
          },
        });
      }
    }
    storage.set('@hasCleanedAndFixedCatalog2', true);
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'cleanConsosAndCatalog2',
        '@OwnDrinks': storage.getString('@OwnDrinks'),
        '@Drinks': storage.getString('@Drinks'),
        hasCleanConsoAndCatalog: storage.getBoolean('@hasCleanedAndFixedCatalog2'),
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
  }
}

export function cleanCatalog(oldDrinkCatalog) {
  // old drink is either
  // a. a drink from the old catalog from 2020
  // b. a drink that has been created in april/may 2023 but might has been bugged by the migration
  const newOwnDrinksCatalog = [];
  for (const oldDrink of oldDrinkCatalog) {
    if (!oldDrink.custom) {
      continue;
    }
    // 1. clean price because of the "," instead of "."
    // if isNan we don't know the price, so we put 5
    const formatedPrice = oldDrink.price ? String(oldDrink.price).replace(',', '.') : 5;

    // 2. clean the volume
    // two cases:
    // a. create the volume for the old drinks catalog, extracted from old style from 2020: categoryKey = 'MyDrinkName -70-40'
    // b. the original volume was stored as "X cL" and we want to keep it as "X" as a number
    // NOTE: for old drinks from 2020, the `categoryKey`and `drinkKey` is the same
    // we choose `categoryKey` here so that we know it's an old drink from 2020
    const volume = oldDrink.categoryKey.split('-')[1]
      ? Number(oldDrink.categoryKey.split('-')[1])
      : Number(oldDrink.volume.split(' ')[0]);

    // 3. clean alcoolPercentage because of the "," instead of "."
    // two cases:
    // a. create the alcoolPercentage for the old drinks catalog, extracted from old style from 2020: categoryKey = 'MyDrinkName -70-40'
    // b. clean alcoolPercentage because of the "," instead of "."
    const alcoolPercentage = Number(oldDrink.categoryKey.split('-')[2])
      ? Number(oldDrink.categoryKey.split('-')[2])
      : oldDrink.alcoolPercentage
      ? String(oldDrink.alcoolPercentage).replace(',', '.')
      : 5;

    // 4. create kcal and doses if they don't exist
    const kcal = Math.round(((Number(alcoolPercentage) * 0.8 * volume) / 10) * 7);
    const doses = Math.round((Number(alcoolPercentage) * 0.8 * volume) / 10) / 10;

    // 5. migrate the icon
    const icon = oldDrink.iconOf ? mapIconOfToIconName(oldDrink.iconOf) : oldDrink.icon;

    // 6. first migration: migrate the old 2020 own drinks catalog to the new 2023 own drinks catalog
    // if the categoryKey is `ownDrinks` or `ownCocktail`, the drink was created in april/may 2023 so we don'ttouch the drinkKey
    // if the categoryKey is `drinkName -70-40`, the drink was created in 2020 so we have to migrate the drinkKey to be the old categoryKey
    const drinkKeyEvolution1 = ['ownDrink', 'ownCocktail'].includes(oldDrink.categoryKey)
      ? oldDrink.drinkKey
      : oldDrink.categoryKey; // because back in 2020, categoryKey for ownDrinks was "drinkName -70-40";

    // 7. second migration: we forgot the `ownCocktail` in step 6 so all the new cocktails were broken
    // this one is to fix the new cocktails
    const drinkKeyEvolution2 = ['ownDrink', 'ownCocktail'].includes(oldDrink.drinkKey)
      ? oldDrink.displayFeed
      : oldDrink.drinkKey;

    // 8. we switch the old categoryKey from 2020 to the new one
    const categoryKeyEvolution1 = ['ownDrink', 'ownCocktail'].includes(oldDrink.categoryKey)
      ? oldDrink.categoryKey
      : 'ownDrink';

    //  9. we fix the bug of the new cocktails
    const categoryKeyEvolution2 = drinkKeyEvolution1 === 'ownCocktail' ? 'ownCocktail' : categoryKeyEvolution1;

    newOwnDrinksCatalog.push({
      drinkKey: drinkKeyEvolution2,
      icon: icon,
      categoryKey: categoryKeyEvolution2,
      volume: volume + ' cl',
      isDeleted: oldDrink.isDeleted === undefined ? false : oldDrink.isDeleted,
      kcal,
      doses,
      displayFeed: oldDrink.displayFeed,
      displayDrinkModal: oldDrink.displayDrinkModal,
      custom: true,
      alcoolPercentage: Number(alcoolPercentage),
      price: formatedPrice ? Number(formatedPrice) : 5,
    });
  }
  return newOwnDrinksCatalog;
}

export const hasMigrateFromDailyGoalToWeekly = storage.getBoolean('hasMigrateFromDailyGoalToWeekly');
export async function migrateFromDailyGoalToWeekly() {
  try {
    const drinksByDrinkingDayString = storage.getString('@StoredDetailedDrinksByDrinkingDay');
    const drinkingDaysString = storage.getString('@DaysWithGoalNoDrink');

    if (drinksByDrinkingDayString && drinkingDaysString) {
      const drinkingDays = JSON.parse(drinkingDaysString);
      const drinksByDrinkingDay = JSON.parse(drinksByDrinkingDayString);
      let drinksByWeek = [];
      drinksByDrinkingDay.forEach((drink) => {
        const migratedDrink = { ...drink, quantity: drink.quantity * (7 - drinkingDays.length) };
        drinksByWeek = [...drinksByWeek, migratedDrink];
      });
      storage.set('@StoredDetaileddrinksByWeekState', JSON.stringify(drinksByWeek));
    }
    storage.set('hasMigrateFromDailyGoalToWeekly', true);
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'hasMigrateFromDailyGoalToWeekly',
        '@StoredDetailedDrinksByDrinkingDay': storage.getString('@StoredDetailedDrinksByDrinkingDay'),
        '@DaysWithGoalNoDrink': storage.getString('@DaysWithGoalNoDrink'),
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
  }
}

export const hasMigrateMissingDrinkKey = storage.getBoolean('@hasMigrateMissingDrinkKey');
export const migrateMissingDrinkKey = () => {
  // this migration is to fix a few drinks that have bugs-impossible-to-solve

  try {
    if (hasMigrateMissingDrinkKey) return;
    const matomoId = storage.getString('@UserIdv2');
    if (!matomoId?.length) {
      // new user - no drinks to send
      storage.set('@hasMigrateMissingDrinkKey', true);
      return;
    }
    const catalog = storage.getString('@OwnDrinks');
    if (!catalog?.length) {
      storage.set('@hasMigrateMissingDrinkKey', true);
      return;
    }
    const oldDrinkCatalog = JSON.parse(catalog);
    if (!oldDrinkCatalog?.length) {
      storage.set('@hasMigrateMissingDrinkKey', true);
      return;
    }
    const drinks = storage.getString('@Drinks');
    if (!drinks?.length) {
      storage.set('@hasMigrateMissingDrinkKey', true);
      return;
    }
    const drinksParsed = JSON.parse(drinks);
    if (!drinksParsed?.length) {
      storage.set('@hasMigrateMissingDrinkKey', true);
      return;
    }
    const ownDrinksCatalogObject = {};
    for (const drink of oldDrinkCatalog) {
      ownDrinksCatalogObject[drink.drinkKey] = drink;
    }
    const drinksCatalogObject = {};
    for (const drink of drinksCatalog) {
      drinksCatalogObject[drink.drinkKey] = drink;
    }
    const allDrinksObject = {
      ...ownDrinksCatalogObject,
      ...drinksCatalogObject,
    };
    const drinksFixed = [];
    const drinksWithMistake = [];
    const newDrinks = drinksParsed.map((drink) => {
      if (drink.drinkKey === 'no-conso') return drink;
      if (allDrinksObject[drink.drinkKey]) return drink;
      if (drink.drinkKey === 'Stella-25-5') {
        drinksFixed.push({
          ...drink,
          drinkKey: 'Stella ',
        });
        return {
          ...drink,
          drinkKey: 'Stella ',
        };
      }
      if (drink.drinkKey === 'Stella -33-5') {
        drinksFixed.push({
          ...drink,
          drinkKey: 'Stella ',
        });
        return {
          ...drink,
          drinkKey: 'Stella ',
        };
      }
      drinksWithMistake.push(drink);
      return drink;
    });
    if (drinksFixed.length) {
      for (const conso of drinksFixed) {
        API.post({
          path: '/consommation/fix-missing-key',
          body: {
            matomoId: matomoId,
            id: conso.id,
            drinkKey: conso.drinkKey,
          },
        });
      }
      storage.set('@Drinks', JSON.stringify(newDrinks));
    }
    if (!drinksWithMistake.length) {
      storage.set('@hasMigrateMissingDrinkKey', true);
      return;
    }
    // if there is any problem with missing drink key, we'll do a manual migration later on following L276
    for (const drink of drinksWithMistake) {
      capture('Problem with missing drink key(s)', {
        extra: {
          drinksWithMistake,
          drink,
          // allDrinksObject,
        },
        tags: {
          drinkKey: drink.drinkKey,
        },
        user: {
          id: storage.getString('@UserIdv2'),
        },
      });
    }
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'hasMigrateMissingDrinkKey',
        '@OwnDrinks': storage.getString('@OwnDrinks'),
        '@Drinks': storage.getString('@Drinks'),
        hasMigrateMissingDrinkKey: storage.getBoolean('@hasMigrateMissingDrinkKey'),
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
  }
};

const mapIconOfToIconName = (iconOf) => {
  switch (iconOf) {
    case 'beer-pint':
      return 'Pint';
    case 'beer-half':
      return 'HalfBeer';
    case 'hard-shot':
      return 'Shoot';
    case 'hard-bottle':
      return 'Flasque';
    case 'wine-glass':
      return 'WineGlass';
    case 'wine-bottle':
      return 'WineBottle';
    case 'champagne-glass':
      return 'ChampagneGlass';
    case 'champagne-bottle':
      return 'ChampagneBottle';
    case 'cocktail-glass':
      return 'CocktailGlass';
    case 'cockatil-bottle':
      return 'CocktailBotte';
    case 'cider-half':
      return 'CiderHalf';
    case 'cider-pint':
      return 'CiderPint';
  }
};
