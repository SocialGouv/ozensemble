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
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
    const allData = {};
    for (const key of storage.getAllKeys()) {
      allData[key] = storage.getString(key);
    }
    capture('data for sendPreviousDrinksToDB', {
      extra: { allData, migration: 'sendPreviousDrinksToDB' },
      user: { id: storage.getString('@UserIdv2') },
    });
  }
}

export const hasCleanConsoAndCatalog = storage.getBoolean('@hasCleanedAndFixedCatalog');
export async function cleanConsosAndCatalog() {
  catalog = storage.getString('@OwnDrinks');
  if (catalog) {
    const oldDrinkCatalog = JSON.parse(catalog);
    let newOwnDrinksCatalog = [];
    oldDrinkCatalog.forEach((oldDrink) => {
      if (oldDrink.custom === true) {
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
        newOwnDrinksCatalog = [
          ...newOwnDrinksCatalog,
          {
            drinkKey: ['ownDrink', 'ownCocktail'].includes(oldDrink.categoryKey)
              ? oldDrink.drinkKey
              : oldDrink.categoryKey, // because back in 2020, categoryKey for ownDrinks was "drinkName -70-40"
            icon: icon,
            categoryKey: ['ownDrink', 'ownCocktail'].includes(oldDrink.categoryKey) ? oldDrink.categoryKey : 'ownDrink',
            volume: volume + ' cl',
            isDeleted: oldDrink.isDeleted === undefined ? false : oldDrink.isDeleted,
            kcal: kcal,
            doses: doses,
            displayFeed: oldDrink.displayFeed,
            displayDrinkModal: oldDrink.displayDrinkModal,
            custom: true,
            alcoolPercentage: Number(formatedAlcoolPercentage),
            price: formatedPrice ? Number(formatedPrice) : 5,
          },
        ];
      }
    });
    const fixedNewOwnDrinksCatalog = fixConsosAndCatalog(newOwnDrinksCatalog);
    storage.set('@OwnDrinks', JSON.stringify(fixedNewOwnDrinksCatalog));
    if (fixedNewOwnDrinksCatalog) {
      const consoStored = storage.getString('@Drinks');
      if (consoStored) {
        const drinks = JSON.parse(consoStored);
        const matomoId = storage.getString('@UserIdv2');
        fixedNewOwnDrinksCatalog.forEach((ownDrink) => {
          const drinkList = drinks.filter((conso) => conso.drinkKey === ownDrink.drinkKey);
          if (drinkList.length) {
            drinkList.forEach((conso) => {
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
            });
          }
        });
      }
    }
  }
  //storage.set('@hasCleanedAndFixedCatalog', true);
}

export function fixConsosAndCatalog(oldDrinkCatalog) {
  try {
    if (oldDrinkCatalog) {
      let newOwnDrinksCatalog = [];
      oldDrinkCatalog.forEach((oldDrink) => {
        if (oldDrink.custom === true) {
          newOwnDrinksCatalog = [
            ...newOwnDrinksCatalog,
            {
              ...oldDrink,
              drinkKey: ['ownDrink', 'ownCocktail'].includes(oldDrink.drinkKey)
                ? oldDrink.displayFeed
                : oldDrink.drinkKey,
              categoryKey: oldDrink.drinkKey === 'ownCocktail' ? 'ownCocktail' : oldDrink.categoryKey,
            },
          ];
        }
      });
      return newOwnDrinksCatalog;
    }
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'fixConsosAndCatalog',
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
    const allData = {};
    for (const key of storage.getAllKeys()) {
      allData[key] = storage.getString(key);
    }
    capture('data for fixConsosAndCatalog', {
      extra: { allData, migration: 'fixConsosAndCatalog' },
      user: { id: storage.getString('@UserIdv2') },
    });
  }
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
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
    const allData = {};
    for (const key of storage.getAllKeys()) {
      allData[key] = storage.getString(key);
    }
    capture('data for hasMigrateFromDailyGoalToWeekly', {
      extra: { allData, migration: 'hasMigrateFromDailyGoalToWeekly' },
      user: { id: storage.getString('@UserIdv2') },
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
