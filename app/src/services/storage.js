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

export function addMissingConsosToBD() {
  console.log('addMissingConsosToBD');
  const ownDrinksCatalog = JSON.parse(storage.getString('@OwnDrinks'));
  if (ownDrinksCatalog) {
    const drinks = JSON.parse(storage.getString('@Drinks'));
    const matomoId = storage.getString('@UserIdv2');
    let consoList = [];
    ownDrinksCatalog.forEach((ownDrink) => {
      consoList = [
        ...consoList,
        drinks.filter((conso) => {
          conso.drinkKey === ownDrink.drinkKey;
        }),
      ];
    });
    console.log('consoList', consoList);
    // if (drinks.length) {
    //   API.post({
    //     path: '/consommation/repare',
    //     body: {
    //       matomoId: matomoId,
    //       drinks: consoList,
    //     },
    //   });
    // }
  }
}
export const hasCleanConsoAndCatalog = storage.getBoolean('@hasCleanConsoAndCatalog');

export async function cleanConsosAndCatalog() {
  console.log('cleanConsosAndCatalog');
  const catalog = storage.getString('@OwnDrinks');
  if (catalog) {
    const oldDrinkCatalog = JSON.parse(catalog);
    let newOwnDrinksCatalog = [];
    oldDrinkCatalog.forEach((oldDrink) => {
      if (oldDrink.custom === true) {
        console.log('oldDrink', String(oldDrink.price).replace(',', '.'));
        const formatedPrice = String(oldDrink.price).replace(',', '.');
        const volume = Number(oldDrink.categoryKey.split('-')[1])
          ? Number(oldDrink.categoryKey.split('-')[1])
          : Number(oldDrink.volume.split(' ')[0]);
        const formatedAlcoolPercentage = String(oldDrink.alcoolPercentage).replace(',', '.');
        const kcal = Math.round(((Number(formatedAlcoolPercentage) * 0.8 * oldDrink.volume) / 10) * 7);
        const doses = Math.round((Number(formatedAlcoolPercentage) * 0.8 * volume) / 10) / 10;
        const icon = oldDrink.iconOff ? mapIconOfToIconName(oldDrink.iconOf) : oldDrink.icon;
        const categoryKey = 'ownDrink';

        console.log('Icon', oldDrink.drinkKey);
        newOwnDrinksCatalog = [
          ...newOwnDrinksCatalog,
          {
            drinkKey: oldDrink.categoryKey ? oldDrink.categoryKey : oldDrink.drinkKey,
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
      }
    });
    storage.set('@OwnDrinks', JSON.stringify(newOwnDrinksCatalog));
  }
  console.log('storage.getString(@OwnDrinks)');
  addMissingConsosToBD();
  //storage.set('@hasCleanConsoAndCatalog', true);
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
