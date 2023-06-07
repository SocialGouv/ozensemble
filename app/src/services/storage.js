import { MMKV } from 'react-native-mmkv';
import API from './api';
import { drinksCatalog } from '../scenes/ConsoFollowUp/drinksCatalog';
import { capture } from './sentry';

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

export const hasCleanConsoAndCatalog = storage.getBoolean('@hasCleanedAndFixedCatalog');
export async function cleanConsosAndCatalog() {
  // 3 steps:
  // 1. clean catalog

  try {
    if (hasCleanConsoAndCatalog) return;
    const matomoId = storage.getString('@UserIdv2');
    if (!matomoId?.length) {
      // new user - no drinks to send
      storage.set('@hasCleanedAndFixedCatalog', true);
      return;
    }
    const catalog = storage.getString('@OwnDrinks');
    if (!catalog?.length) {
      storage.set('@hasCleanedAndFixedCatalog', true);
      return;
    }
    const oldDrinkCatalog = JSON.parse(catalog);
    const newOwnDrinksCatalog = cleanCatalog(oldDrinkCatalog);
    storage.set('@OwnDrinks', JSON.stringify(newOwnDrinksCatalog));
    if (!newOwnDrinksCatalog?.length) {
      storage.set('@hasCleanedAndFixedCatalog', true);
      return;
    }
    const consoStored = storage.getString('@Drinks');
    if (!consoStored?.length) {
      storage.set('@hasCleanedAndFixedCatalog', true);
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
    storage.set('@hasCleanedAndFixedCatalog', true);
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'cleanConsosAndCatalog',
        '@OwnDrinks': storage.getString('@OwnDrinks'),
        '@Drinks': storage.getString('@Drinks'),
        hasCleanConsoAndCatalog: storage.getBoolean('@hasCleanedAndFixedCatalog'),
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
  }
}

export function cleanCatalog(oldDrinkCatalog) {
  const newOwnDrinksCatalog = [];
  for (const oldDrink of oldDrinkCatalog) {
    if (!oldDrink.custom) {
      continue;
    }
    const formatedPrice = oldDrink.price ? String(oldDrink.price).replace(',', '.') : 5;
    // two cases:
    // old style: categoryKey = 'ownDrink -70-40'
    // new style: categoryKey = 'ownDrink'
    const volume = oldDrink.categoryKey.split('-')[1]
      ? Number(oldDrink.categoryKey.split('-')[1])
      : Number(oldDrink.volume.split(' ')[0]);
    const alcoolPercentage = Number(oldDrink.categoryKey.split('-')[2])
      ? Number(oldDrink.categoryKey.split('-')[2])
      : 5;
    const formatedAlcoolPercentage = oldDrink.alcoolPercentage
      ? String(oldDrink.alcoolPercentage).replace(',', '.')
      : alcoolPercentage;
    const kcal = Math.round(((Number(formatedAlcoolPercentage) * 0.8 * volume) / 10) * 7);
    const doses = Math.round((Number(formatedAlcoolPercentage) * 0.8 * volume) / 10) / 10;
    const icon = oldDrink.iconOf ? mapIconOfToIconName(oldDrink.iconOf) : oldDrink.icon;

    // first migration:
    const drinkKeyEvolution1 = ['ownDrink', 'ownCocktail'].includes(oldDrink.categoryKey)
      ? oldDrink.drinkKey
      : oldDrink.categoryKey; // because back in 2020, categoryKey for ownDrinks was "drinkName -70-40";
    const drinkKeyEvolution2 = ['ownDrink', 'ownCocktail'].includes(oldDrink.drinkKey)
      ? oldDrink.displayFeed
      : oldDrink.drinkKey;

    const categoryKeyEvolution1 = ['ownDrink', 'ownCocktail'].includes(oldDrink.categoryKey)
      ? oldDrink.categoryKey
      : 'ownDrink';

    const categoryKeyEvolution2 = drinkKeyEvolution1 === 'ownCocktail' ? 'ownCocktail' : categoryKeyEvolution1;

    const checkedKcal = oldDrink.kcal ? oldDrink.kcal : kcal;
    const checkedDoses = oldDrink.doses ? oldDrink.doses : doses;
    const checkedAlcoolPercentage = oldDrink.alcoolPercentage ? oldDrink.alcoolPercentage : formatedAlcoolPercentage;

    newOwnDrinksCatalog.push({
      drinkKey: drinkKeyEvolution2,
      icon: icon,
      categoryKey: categoryKeyEvolution2,
      volume: volume + ' cl',
      isDeleted: oldDrink.isDeleted === undefined ? false : oldDrink.isDeleted,
      kcal: checkedKcal,
      doses: checkedDoses,
      displayFeed: oldDrink.displayFeed,
      displayDrinkModal: oldDrink.displayDrinkModal,
      custom: true,
      alcoolPercentage: Number(formatedAlcoolPercentage),
      price: formatedPrice ? Number(formatedPrice) : 5,
    });
  }
  return newOwnDrinksCatalog;
}

export const hasMigrateFromDailyGoalToWeekly = storage.getBoolean('hasMigrateFromDailyGoalToWeekly');
export async function migrateFromDailyGoalToWeekly() {
  try {
    const drinksByDrinkingDayString = storage.getString('@StoredDetailedDrinksByDrinkingDay');
    if (drinksByDrinkingDayString) {
      const drinkingDaysString = storage.getString('@DaysWithGoalNoDrink');
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
