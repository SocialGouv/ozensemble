import { MMKV } from 'react-native-mmkv';
import API from './api';
import { drinksCatalog } from '../scenes/ConsoFollowUp/drinksCatalog';

export const storage = new MMKV();

export const hasSentPreviousDrinksToDB = storage.getBoolean('hasSentPreviousDrinksToDB');

export async function sendPreviousDrinksToDB() {
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
    API.post({
      path: '/consommation/init',
      body: {
        matomoId,
        drinks,
        drinksCatalog: [...ownDrinksCatalog, ...drinksCatalog],
      },
    });
  }
  storage.set('hasSentPreviousDrinksToDB', true);
}
export const hasSentObjectifToDB = storage.getBoolean('hasSentObjectifToDB');

export async function sendObjectifToDB() {
  if (hasSentObjectifToDB) return;
  const matomoId = storage.getString('@UserIdv2');
  if (!matomoId?.length) {
    // new user - no drinks to send
    storage.set('hasSentObjectifToDB', true);
    return;
  }
  // @Drinks
  const daysWithGoalNoDrinkJSON = storage.getString('@DaysWithGoalNoDrink');
  const drinksByDrinkingDayJSON = storage.getString('@StoredDetailedDrinksByDrinkingDay');

  if (!daysWithGoalNoDrinkJSON || !drinksByDrinkingDayJSON) {
    storage.set('hasSentObjectifToDB', true);
    return;
  }

  const daysWithGoalNoDrink = JSON.parse(daysWithGoalNoDrinkJSON);
  const drinksByDrinkingDay = JSON.parse(drinksByDrinkingDayJSON);

  const dosesByDrinkingDay = drinksByDrinkingDay.reduce(
    (sum, drink) =>
      sum + drink.quantity * drinksCatalog.find((drinkcatalog) => drinkcatalog.drinkKey === drink.drinkKey).doses,
    0
  );
  const dosesPerWeek = (7 - daysWithGoalNoDrink.length) * dosesByDrinkingDay;

  API.post({
    path: '/goal',
    body: {
      matomoId: matomoId,
      daysWithGoalNoDrink,
      drinksByDrinkingDay,
      dosesByDrinkingDay,
      dosesPerWeek,
      noDisplayBadge: true,
      calculateBadges: true,
    },
  });
  storage.set('hasSentObjectifToDB', true);
}

export const hasSentNPSDoneToDB = storage.getBoolean('hasSentNPSDoneToDB');

export async function sendNPSDoneToDB() {
  if (hasSentNPSDoneToDB) return;
  const matomoId = storage.getString('@UserIdv2');
  if (!matomoId?.length) {
    // new user - no drinks to send
    storage.set('hasSentNPSDoneToDB', true);
    return;
  }

  const NPSDone = storage.getString('@NPSDone');
  if (!NPSDone) {
    storage.set('hasSentNPSDoneToDB', true);
    return;
  }

  API.post({
    path: '/appUserMilestone',
    body: {
      matomoId,
      appUserMilestone: '@NPSDone',
    },
  });
  storage.set('hasSentNPSDoneToDB', true);
}

export const hasMigrateOwnDrinksCatalog = storage.getBoolean('@hasMigrateOwnDrinksCatalog');

export async function migrateOwnDrinksCatalog() {
  const catalog = storage.getString('@OwnDrinks');

  if (catalog) {
    const oldDrinkCatalog = JSON.parse(catalog);
    let newOwnDrinksCatalog = [];
    oldDrinkCatalog.forEach((oldDrink) => {
      if (oldDrink.custom === true) {
        const icon = mapIconOfToIconName(oldDrink.iconOf);
        const categoryKey = 'ownDrink';
        const volume = Number(oldDrink.categoryKey.split('-')[1]);
        const isDeleted = false;
        const alcoolPercentage = Number(oldDrink.categoryKey.split('-')[2]);
        const kcal = Math.round(((alcoolPercentage * 0.8 * volume) / 10) * 7);
        const doses = Math.round((alcoolPercentage * 0.8 * volume) / 10) / 10;

        newOwnDrinksCatalog = [
          ...newOwnDrinksCatalog,
          {
            drinkKey: oldDrink.categoryKey,
            icon: icon,
            categoryKey: categoryKey,
            volume: volume + ' cl',
            isDeleted: isDeleted,
            kcal: kcal,
            doses: doses,
            displayFeed: oldDrink.displayFeed,
            displayDrinkModal: oldDrink.displayDrinkModal,
            custom: true,
            alcoolPercentage: Number(alcoolPercentage),
          },
        ];
      }
    });
    storage.set('@OwnDrinks', JSON.stringify(newOwnDrinksCatalog));
  }
  storage.set('@hasMigrateOwnDrinksCatalog', true);
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
