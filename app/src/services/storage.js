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

export function addMissingConsosToBD(ownDrinksCatalog) {
  if (ownDrinksCatalog) {
    const drinks = JSON.parse(storage.getString('@Drinks'));
    const matomoId = storage.getString('@UserIdv2');
    ownDrinksCatalog.forEach((ownDrink) => {
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

export const hasCleanConsoAndCatalog = storage.getBoolean('@hasCleanConsoAndCatalog');

export async function cleanConsosAndCatalog() {
  const catalog = storage.getString('@OwnDrinks');
  if (catalog) {
    const oldDrinkCatalog = [
      {
        active: true,
        categoryKey: 'Coupe de champagne -12-12',
        custom: true,
        displayDrinkModal: 'Coupe de champagne ',
        displayFeed: 'Coupe de champagne ',
        doses: 1,
        drinkKey: 'Coupe de champagne -12-12',
        iconOf: 'wine-glass',
        volume: '12 cl - 12˚',
      },
      {
        active: true,
        categoryKey: 'Rhum-4-35',
        custom: true,
        displayDrinkModal: 'Rhum',
        displayFeed: 'Rhum',
        doses: 1,
        drinkKey: 'Rhum-4-35',
        iconOf: 'hard-shot',
        volume: '4 cl - 35˚',
      },
      {
        categoryKey: 'Bières',
        displayDrinkModal: 'demi',
        doses: 1,
        drinkKey: 'beer-half',
        kcal: 105,
        price: 3.5,
        volume: '25 cl',
      },
      {
        categoryKey: 'Bières',
        displayDrinkModal: 'pinte',
        doses: 2,
        drinkKey: 'beer-pint',
        kcal: 210,
        price: 7,
        volume: '50 cl',
      },
      {
        categoryKey: 'Cidre',
        displayDrinkModal: 'demi',
        doses: 1,
        drinkKey: 'cider-half',
        kcal: 102,
        price: 2,
        volume: '25 cl',
      },
      {
        categoryKey: 'Cidre',
        displayDrinkModal: 'pinte',
        doses: 2,
        drinkKey: 'cider-pint',
        kcal: 204,
        price: 4,
        style: {
          marginBottom: 10,
        },
        volume: '50 cl',
      },
      {
        categoryKey: 'Vins',
        displayDrinkModal: 'verre',
        doses: 1,
        drinkKey: 'wine-glass',
        kcal: 100,
        price: 4,
        volume: '12 cl',
      },
      {
        categoryKey: 'Vins',
        displayDrinkModal: 'bouteille',
        doses: 8,
        drinkKey: 'wine-bottle',
        kcal: 600,
        price: 10,
        style: {
          marginBottom: 20,
        },
        volume: '75 cl',
      },
      {
        categoryKey: 'Champagne',
        displayDrinkModal: 'coupe',
        doses: 1,
        drinkKey: 'champagne-glass',
        kcal: 90,
        price: 5,
        volume: '12cl',
      },
      {
        categoryKey: 'Champagne',
        displayDrinkModal: 'bouteille',
        doses: 8,
        drinkKey: 'champagne-bottle',
        kcal: 622,
        price: 20,
        style: {
          marginBottom: 20,
        },
        volume: '75cl',
      },
      {
        categoryKey: 'Shot et Cocktail',
        displayDrinkModal: 'shot',
        doses: 1,
        drinkKey: 'hard-shot',
        kcal: 100,
        price: 2,
        volume: '3 cl',
      },
      {
        categoryKey: 'Shot et Cocktail',
        displayDrinkModal: 'cocktail',
        doses: 1,
        drinkKey: 'hard-cocktail',
        kcal: 133,
        price: 8,
        volume: '5 cl',
      },
      {
        categoryKey: 'Spiritueux',
        displayDrinkModal: 'flasque',
        doses: 7,
        drinkKey: 'hard-flasque',
        kcal: 750,
        price: 4,
        volume: '20 cl',
      },
      {
        categoryKey: 'Spiritueux',
        displayDrinkModal: 'bouteille',
        doses: 22,
        drinkKey: 'hard-bottle',
        kcal: 1875,
        price: 15,
        volume: '75 cl',
      },
      {
        alcoolPercentage: '5,5',
        categoryKey: 'ownDrink',
        custom: true,
        displayDrinkModal: 'Suree',
        displayFeed: 'Suree',
        doses: 1.5,
        drinkKey: 'Suree',
        icon: 'SmallCan',
        isDeleted: false,
        kcal: 102,
        price: 9.4,
        volume: '33 cl',
      },
      {
        alcoolPercentage: 4,
        categoryKey: 'ownDrink',
        custom: true,
        displayDrinkModal: 'Biere',
        displayFeed: 'Biere',
        doses: null,
        drinkKey: 'Biere',
        icon: 'Pint',
        isDeleted: false,
        kcal: 112,
        price: '4,4',
        volume: '50 cl',
      },
    ];
    let newOwnDrinksCatalog = [];
    oldDrinkCatalog.forEach((oldDrink) => {
      if (oldDrink.custom === true) {
        const formatedPrice = oldDrink.price ? String(oldDrink.price).replace(',', '.') : 1;
        console.log('formatedPrice', oldDrink.price);
        const volume = oldDrink.categoryKey.split('-')[1]
          ? Number(oldDrink.categoryKey.split('-')[1])
          : Number(oldDrink.volume.split(' ')[0]);
        const alcoolPercentage = Number(oldDrink.categoryKey.split('-')[2]);
        const formatedAlcoolPercentage = oldDrink.alcoolPercentage
          ? String(oldDrink.alcoolPercentage).replace(',', '.')
          : alcoolPercentage;
        console.log(formatedAlcoolPercentage);
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
            price: Number(formatedPrice),
          },
        ];
      }
    });
    storage.set('@OwnDrinks', JSON.stringify(newOwnDrinksCatalog));
    console.log('newOwnDrinksCatalog', newOwnDrinksCatalog);
    addMissingConsosToBD(newOwnDrinksCatalog);
  }
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
