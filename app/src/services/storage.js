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
      const formatedPrice = oldDrink.price.replace(',', '.');
      const formatedAlcoolPercentage = oldDrink.alcoolPercentage.replace(',', '.');
      const kcal = Math.round(((formatedAlcoolPercentage * 0.8 * oldDrink.volume) / 10) * 7);
      const doses = Math.round((formatedAlcoolPercentage * 0.8 * volume) / 10) / 10;
      const icon = mapIconOfToIconName(oldDrink.iconOf);
      const categoryKey = 'ownDrink';
      const volume = Number(oldDrink.categoryKey.split('-')[1]);
      newOwnDrinksCatalog = [
        ...newOwnDrinksCatalog,
        {
          drinkKey: oldDrink.categoryKey,
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
          price: Number(formatedPrice),
        },
      ];
    });
    storage.set('@OwnDrinks', JSON.stringify(newOwnDrinksCatalog));
  }
  addMissingConsosToBD();
  storage.set('@hasCleanConsoAndCatalog', true);
}

export function addMissingConsosToBD() {
  const ownDrinksCatalog = JSON.parse(storage.getString('@OwnDrinks'));
  if (ownDrinksCatalog) {
    const drinks = JSON.parse(storage.getString('@Drinks'));
    const matomoId = storage.getString('@UserIdv2');
    const consoList = [];
    ownDrinksCatalog.forEach((ownDrink) => {
      consoList = [
        ...consoList,
        drinks.filter((conso) => {
          conso.drinkKey === ownDrink.drinkKey;
        }),
      ];
    });
    if (drinks.length) {
      API.post({
        path: '/consommation/repare',
        body: {
          matomoId: matomoId,
          drinks: consoList,
        },
      });
    }
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
