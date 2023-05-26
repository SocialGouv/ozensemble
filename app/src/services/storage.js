import { MMKV } from 'react-native-mmkv';
import API from './api';
import { drinksCatalog } from '../scenes/ConsoFollowUp/drinksCatalog';
import { useRecoilValue } from 'recoil';
import { daysWithGoalNoDrinkState } from '../recoil/gains';

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
}

export const hasCleanConsoAndCatalog = storage.getBoolean('@hasCleanConsoAndCatalog');

export async function cleanConsosAndCatalog() {
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
            drinkKey: oldDrink.categoryKey !== 'ownDrink' ? oldDrink.categoryKey : oldDrink.drinkKey,
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
}

export const hasMigrateFromDailyGoalToWeekly = storage.getBoolean('hasMigrateFromDailyGoalToWeekly');

export async function migrateFromDailyGoalToWeekly() {
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
