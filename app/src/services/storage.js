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

export const hasMigrateOwnDrinksCatalog = storage.getBoolean('@hasMigrateOwnDrinksCatalog');

// export function migrateOwnDrinksCatalog() {
//   const catalog = storage.getString('@OwnDrinks');

//   if (catalog) {
//     const oldDrinkCatalog = JSON.parse(catalog);
//     let newOwnDrinksCatalog = [];
//     oldDrinkCatalog.forEach((oldDrink) => {
//       if (oldDrink.custom === true) {
//         const icon = mapIconOfToIconName(oldDrink.iconOf);
//         const categoryKey = 'ownDrink';
//         const volume = Number(oldDrink.categoryKey.split('-')[1]);
//         const isDeleted = false;
//         const alcoolPercentage = Number(oldDrink.categoryKey.split('-')[2]);
//         const kcal = Math.round(((alcoolPercentage * 0.8 * volume) / 10) * 7);
//         const doses = Math.round((alcoolPercentage * 0.8 * volume) / 10) / 10;

//         newOwnDrinksCatalog = [
//           ...newOwnDrinksCatalog,
//           {
//             drinkKey: oldDrink.categoryKey,
//             icon: icon,
//             categoryKey: categoryKey,
//             volume: volume + ' cl',
//             isDeleted: isDeleted,
//             kcal: kcal,
//             doses: doses,
//             displayFeed: oldDrink.displayFeed,
//             displayDrinkModal: oldDrink.displayDrinkModal,
//             custom: true,
//             alcoolPercentage: Number(alcoolPercentage),
//           },
//         ];
//       }
//     });
//     storage.set('@OwnDrinks', JSON.stringify(newOwnDrinksCatalog));
//   }
//   storage.set('@hasMigrateOwnDrinksCatalog', true);
// }

export function cleanConsoAndCatalog() {
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
      const isDeleted = false;
      const alcoolPercentage = Number(oldDrink.categoryKey.split('-')[2]);
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
  storage.set('@hascleanConsoAndCatalog', true);
}

export function addMissingConsosToBD() {
  const matomoId = storage.getString('@UserIdv2');
  const drinks = JSON.parse(storage.getString('@Drinks') || '[]');
  const ownDrinksCatalog = JSON.parse(storage.getString('@OwnDrinks') || '[]');

  if (drinks.length) {
    API.post({
      path: '/consommation/post',
      body: {
        matomoId,
        drinks,
        drinksCatalog: [...ownDrinksCatalog, ...drinksCatalog],
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
