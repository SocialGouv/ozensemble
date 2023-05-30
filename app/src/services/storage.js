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

export const hasRectifiedCocktailProblem = storage.getBoolean('hasRectifiedCocktailProblem');
export async function rectifyCocktailProblem() {
  try {
    const oldDrinkCatalog = [
      {
        drinkKey: 'ownCocktail',
        icon: 'CocktailGlass',
        categoryKey: 'ownDrink',
        volume: '5 cl',
        isDeleted: false,
        kcal: 14,
        doses: 0.2,
        displayFeed: 'Cocktail Gin Tonic',
        displayDrinkModal: 'Cocktail Gin Tonic',
        custom: true,
        alcoolPercentage: 5,
        price: 5,
      },
      {
        drinkKey: 'Non',
        icon: 'WineGlass',
        categoryKey: 'ownDrink',
        volume: '10 cl',
        isDeleted: false,
        kcal: 19,
        doses: 0.3,
        displayFeed: 'Non',
        displayDrinkModal: 'Non',
        custom: true,
        alcoolPercentage: 3.4,
        price: 2.3,
      },
      {
        categoryKey: 'Bière (5%)',
        drinkKey: 'beer-half',
        displayDrinkModal: 'demi',
        volume: '25 cl',
        doses: 1,
        icon: 'HalfBeer',
        price: 3.5,
        kcal: 70,
      },
      {
        categoryKey: 'Bière (5%)',
        drinkKey: 'beer-pint',
        displayDrinkModal: 'pinte',
        volume: '50 cl',
        doses: 2,
        icon: 'Pint',
        price: 7,
        kcal: 140,
      },
      {
        categoryKey: 'Cidre (5%)',
        drinkKey: 'cider-half',
        displayDrinkModal: 'demi',
        volume: '25 cl',
        doses: 1,
        icon: 'HalfCider',
        price: 2,
        kcal: 70,
      },
      {
        categoryKey: 'Cidre (5%)',
        drinkKey: 'cider-pint',
        displayDrinkModal: 'pinte',
        volume: '50 cl',
        doses: 2,
        icon: 'PintCider',
        price: 4,
        kcal: 140,
        style: {
          marginBottom: 10,
        },
      },
      {
        categoryKey: 'Vin (12,5%)',
        drinkKey: 'wine-glass',
        displayDrinkModal: 'verre',
        volume: '10 cl',
        doses: 1,
        icon: 'WineGlass',
        price: 4,
        kcal: 70,
      },
      {
        categoryKey: 'Vin (12,5%)',
        drinkKey: 'wine-bottle',
        displayDrinkModal: 'bouteille',
        volume: '75 cl',
        doses: 7.5,
        icon: 'WineBottle',
        price: 10,
        kcal: 525,
        style: {
          marginBottom: 20,
          transform: [
            {
              scale: 1.2,
            },
          ],
        },
      },
      {
        categoryKey: 'Champagne (12,5%)',
        drinkKey: 'champagne-glass',
        displayDrinkModal: 'coupe',
        volume: '10 cl',
        doses: 1,
        icon: 'ChampagneGlass',
        price: 5,
        kcal: 70,
      },
      {
        categoryKey: 'Champagne (12,5%)',
        drinkKey: 'champagne-bottle',
        displayDrinkModal: 'bouteille',
        volume: '75 cl',
        doses: 7.5,
        icon: 'ChampagneBottle',
        price: 20,
        kcal: 525,
        style: {
          marginBottom: 20,
        },
      },
      {
        categoryKey: 'Apéritif (15 à 18%) : porto, vermouth...',
        drinkKey: 'aperitive-glass',
        displayDrinkModal: 'verre',
        volume: '7 cl',
        doses: 1,
        icon: 'AperitiveGlass',
        price: 4,
        kcal: 71,
      },
      {
        categoryKey: 'Apéritif (15 à 18%) : porto, vermouth...',
        drinkKey: 'aperitive-bottle',
        displayDrinkModal: 'bouteille',
        volume: '75 cl',
        doses: 10.8,
        icon: 'AperitiveBottle',
        price: 10,
        kcal: 756,
        style: {
          marginBottom: 20,
        },
      },
      {
        categoryKey: 'Spiritueux (38% et +) : pastis, vodka, gin, whisky...',
        drinkKey: 'hard-shot',
        displayDrinkModal: 'shot',
        volume: '3 cl',
        doses: 1,
        icon: 'Shoot',
        price: 2,
        kcal: 67,
      },
      {
        categoryKey: 'Spiritueux (38% et +) : pastis, vodka, gin, whisky...',
        drinkKey: 'hard-cocktail',
        displayDrinkModal: 'verre',
        volume: '5 cl + diluant',
        doses: 1.6,
        icon: 'CocktailGlass',
        price: 8,
        kcal: 133,
      },
      {
        categoryKey: 'Spiritueux (38% et +) : pastis, vodka, gin, whisky...',
        drinkKey: 'hard-flasque',
        displayDrinkModal: 'flasque',
        volume: '20 cl',
        doses: 6.4,
        icon: 'Flasque',
        price: 4,
        kcal: 750,
      },
      {
        categoryKey: 'Spiritueux (38% et +) : pastis, vodka, gin, whisky...',
        drinkKey: 'hard-bottle',
        displayDrinkModal: 'bouteille',
        volume: '75 cl',
        doses: 24,
        icon: 'CocktailBottle',
        price: 15,
        kcal: 1680,
      },
    ];
    let newOwnDrinksCatalog = [];
    oldDrinkCatalog.forEach((oldDrink) => {
      if (oldDrink.drinkKey === 'ownCocktail') {
        newOwnDrinksCatalog = [
          ...newOwnDrinksCatalog,
          {
            drinkKey: oldDrink.displayFeed,
            icon: oldDrink.icon,
            categoryKey: oldDrink.categoryKey,
            volume: oldDrink.volume,
            isDeleted: oldDrink.isDeleted,
            kcal: oldDrink.kcal,
            doses: oldDrink.doses,
            displayFeed: oldDrink.displayFeed,
            displayDrinkModal: oldDrink.displayDrinkModal,
            custom: true,
            alcoolPercentage: oldDrink.alcoolPercentage,
            price: oldDrink.price,
          },
        ];
      } else {
        newOwnDrinksCatalog = [...newOwnDrinksCatalog, oldDrink];
      }
    });
    storage.set('hasRectifiedCocktailProblem', true);
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'rectifyCocktailProblem',
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
    const allData = {};
    for (const key of storage.getAllKeys()) {
      allData[key] = storage.getString(key);
    }
    capture('data for rectifyCocktailProblem', {
      extra: { allData, migration: 'rectifyCocktailProblem' },
      user: { id: storage.getString('@UserIdv2') },
    });
  }
}

export const hasCleanConsoAndCatalog = storage.getBoolean('@hasCleanConsoAndCatalog');

export async function cleanConsosAndCatalog() {
  try {
    const catalog = storage.getString('@OwnDrinks');
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
          const categoryKey = 'ownDrink';
          newOwnDrinksCatalog = [
            ...newOwnDrinksCatalog,
            {
              drinkKey:
                oldDrink.categoryKey !== 'ownDrink' && oldDrink.categoryKey !== 'ownCocktail'
                  ? oldDrink.categoryKey
                  : oldDrink.drinkKey,
              icon: icon,
              categoryKey: categoryKey,
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
      storage.set('@OwnDrinks', JSON.stringify(newOwnDrinksCatalog));
      if (newOwnDrinksCatalog) {
        const consoStored = storage.getString('@Drinks');
        if (consoStored) {
          const drinks = JSON.parse(consoStored);
          const matomoId = storage.getString('@UserIdv2');
          newOwnDrinksCatalog.forEach((ownDrink) => {
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
    storage.set('@hasCleanConsoAndCatalog', true);
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'hasCleanConsoAndCatalog',
      },
      user: {
        id: storage.getString('@UserIdv2'),
      },
    });
    const allData = {};
    for (const key of storage.getAllKeys()) {
      allData[key] = storage.getString(key);
    }
    capture('data for hasCleanConsoAndCatalog', {
      extra: { allData, migration: 'hasCleanConsoAndCatalog' },
      user: { id: storage.getString('@UserIdv2') },
    });
  }
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
