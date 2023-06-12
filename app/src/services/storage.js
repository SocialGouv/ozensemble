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

export const hasCleanConsoAndCatalog = storage.getBoolean('@hasCleanedAndFixedCatalog2');
export async function cleanConsosAndCatalog() {
  // 3 steps:
  // 1. clean catalog

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
export const hasRepairedNicosConsos = storage.getBoolean('@hasRepairedNicosConsos');

export async function repairNicosConsos() {
  const matomoId = storage.getString('@UserIdv2');
  if (matomoId !== 'F0e5A847183cb3C4') {
    storage.set('@hasRepairedNicosConsos', true);
    return;
  }
  try {
    const fixedLargeStellaCatalog = {
      drinkKey: 'Stella -50-5',
      icon: 'Pint',
      categoryKey: 'ownDrink',
      volume: '50 cl',
      isDeleted: false,
      kcal: 140,
      doses: 2,
      displayFeed: 'Stella -50-5',
      displayDrinkModal: 'Stella -50-5',
      custom: true,
      alcoolPercentage: 5,
      price: 5,
    };
    const fixedSmallStellaCatalog = {
      drinkKey: 'Stella -25-5',
      icon: 'HalfBeer',
      categoryKey: 'ownDrink',
      volume: '25 cl',
      isDeleted: false,
      kcal: 140,
      doses: 1,
      displayFeed: 'Stella -25-5',
      displayDrinkModal: 'Stella -25-5',
      custom: true,
      alcoolPercentage: 5,
      price: 5,
    };
    const fixedMediumStellaCatalog = {
      drinkKey: 'Stella -33-5',
      icon: 'SmallCan',
      categoryKey: 'ownDrink',
      volume: '33 cl',
      isDeleted: false,
      kcal: Math.round(((5 * 0.8 * 33) / 10) * 7),
      doses: Math.round((5 * 0.8 * 33) / 10) / 10,
      displayFeed: 'Stella -33-5',
      displayDrinkModal: 'Stella -33-5',
      custom: true,
      alcoolPercentage: 5,
      price: 5,
    };
    const newOwnDrinkCatalog = [fixedLargeStellaCatalog, fixedSmallStellaCatalog, fixedMediumStellaCatalog];
    const drinks = [
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1686355200000, id: '0578c0be-b5a7-43fa-a772-877ca17116fc' },
      {
        drinkKey: 'Stella',
        quantity: 3,
        id: '8b495a7a-fd3a-4e0c-97e0-b161599c4438',
        isOwnDrink: true,
        timestamp: 1686289980000,
      },
      {
        drinkKey: 'beer-half',
        quantity: 1,
        id: '1d0197e7-a920-44d5-9fb9-d161f6e39d6b',
        isOwnDrink: false,
        timestamp: 1686255422000,
      },
      {
        drinkKey: 'beer-half',
        quantity: 1,
        id: '0c5d266f-e9c3-48cf-9576-c6c51245ce21',
        isOwnDrink: false,
        timestamp: 1686169020000,
      },
      {
        drinkKey: 'Stella ',
        quantity: 1,
        id: 'cbb2c32a-f314-4216-80f1-c1247ee83d21',
        isOwnDrink: true,
        timestamp: 1686004440000,
      },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1685923200000, id: 'd5357923-7f73-4d68-94e8-98d21c4f3d40' },
      {
        drinkKey: 'beer-half',
        quantity: 1,
        id: '8bd7a2e0-a570-4b50-9705-ff7e4775152c',
        isOwnDrink: false,
        timestamp: 1685831640000,
      },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1685750400000, id: '6b3196d7-dfea-461d-953a-3007162d8551' },
      {
        drinkKey: 'beer-half',
        quantity: 4,
        id: 'cf65b34f-0b85-405c-946c-df4e4c0c17f1',
        isOwnDrink: false,
        timestamp: 1685658900000,
      },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1685577600000, id: 'd90af48e-90d4-4831-a515-0d0fa13890e4' },
      {
        drinkKey: 'Stella ',
        quantity: 3,
        id: '9ef8f298-ea9e-4a4d-b066-6c87c6677cf7',
        isOwnDrink: true,
        timestamp: 1685542620000,
      },
      {
        drinkKey: 'Stella-25-5',
        quantity: 1,
        id: '0e6e242c-95d1-4c11-90c2-b7395b2d355e',
        isOwnDrink: true,
        timestamp: 1683765240000,
      },
      {
        drinkKey: 'beer-pint',
        quantity: 1,
        id: '560d97e8-9867-40ca-b957-da3eb8db1d6c',
        isOwnDrink: false,
        timestamp: 1683765240000,
      },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1683678900000, id: 'f06dfd55-f678-477f-b30a-3317c0b067df' },
      {
        drinkKey: 'beer-pint',
        quantity: 1,
        id: '5fa3d18f-a1dc-4d26-9f88-0856c6212df0',
        isOwnDrink: false,
        timestamp: 1683592740000,
      },
      {
        drinkKey: 'Stella-25-5',
        quantity: 1,
        id: '1aa236d1-f579-4b5e-ae38-801ea7c70327',
        isOwnDrink: true,
        timestamp: 1683592740000,
      },
      {
        drinkKey: 'Stella-25-5',
        quantity: 1,
        id: '19e80b03-330e-4aa7-94ee-37db45466634',
        isOwnDrink: true,
        timestamp: 1683506580000,
      },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1683506460000, id: '3cd56d3a-6f39-429a-994f-f2bf8b3e0fca' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1683506460000, id: '5e7abd41-3a06-4f26-99d8-996f17fab2a2' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1683506280000, id: 'f0359374-0cd2-43f9-bfd1-e2857a437777' },
      {
        drinkKey: 'champagne-glass',
        quantity: 1,
        id: '6b203976-2628-4494-ac18-cf77a354123f',
        isOwnDrink: false,
        timestamp: 1683420180000,
      },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1683417600000, id: 'd7796cce-b2c7-4415-89ee-505cbc0c3102' },
      {
        drinkKey: 'hard-cocktail',
        quantity: 1,
        id: 'd26d4b8a-1ac2-4fec-bf2a-221ecf009505',
        isOwnDrink: false,
        timestamp: 1683333840000,
      },
      {
        drinkKey: 'Stella-25-5',
        quantity: 3,
        id: '9eaa32cb-04e8-4461-a718-65c005585c12',
        isOwnDrink: true,
        timestamp: 1683333840000,
      },
      {
        drinkKey: 'beer-pint',
        quantity: 2,
        id: 'd39a1c7d-e483-4517-bb1b-c17162fc9a63',
        isOwnDrink: false,
        timestamp: 1683247560000,
      },
      {
        drinkKey: 'Stella-25-5',
        quantity: 2,
        id: '0e987d99-9d89-41ef-a6a6-c991696d3e14',
        isOwnDrink: true,
        timestamp: 1683247560000,
      },
      { drinkKey: 'beer-pint', quantity: 1, id: '585a749a-7530-490e-9df1-db5b49962911', timestamp: 1683178740000 },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1683143415000, id: '64c44c48-ce34-4138-b728-96ec2b2a01a8' },
      { drinkKey: 'Stella-25-5', quantity: 1, id: '32486dd7-e184-43fe-b328-47eac44f8a85', timestamp: 1683057000000 },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682970600000, id: '2047e689-1081-4015-96c3-e5d08454234a' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682862018000, id: '50c50f11-5d77-42d3-96a5-988fb351e5a5' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682861990000, id: '98e9789a-36ca-4e95-9a34-6d377349893c' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682861964000, id: 'c49fa973-6a6e-487d-894d-00cd5d40f076' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682861909000, id: 'f8c039e7-fa56-45ca-9fdf-2aa6be4a75e7' },
      { drinkKey: 'Stella -33-5', quantity: 1, id: '058da50b-9b10-4d47-9424-9768a95fd315', timestamp: 1682775480000 },
      { drinkKey: 'beer-pint', quantity: 1, id: '5e0ae798-efd6-444a-818b-eb8e64cfeab2', timestamp: 1682689080000 },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682547060000, id: 'd91cf06d-5f08-4097-ae09-64d401705562' },
      { drinkKey: 'beer-pint', quantity: 1, id: 'dd22a548-64e6-46a5-bf0b-ef4cd44fa7c6', timestamp: 1682542011000 },
      { drinkKey: 'Stella-25-5', quantity: 1, id: '7e5aea3c-e7bb-4e40-bd27-20871a74c3f6', timestamp: 1682455620000 },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682290140000, id: '0c9583ae-6188-4fe3-9ad3-816de5ecc9a6' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682235480000, id: 'ae3b0224-efaa-4c0a-9946-d45b8cf1627f' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1682170200000, id: 'ddeed26a-a702-417c-a512-51190df33194' },
      { drinkKey: 'beer-pint', quantity: 3, id: 'c25e585d-c88c-4bb3-a2ec-9b19291c08ec', timestamp: 1682083680000 },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1681982799000, id: 'b017fef3-9d57-4888-aa85-dbd355d621fb' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1681885797000, id: 'c27fbd08-d4f9-477b-b2be-fe9dc727b0af' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1681795566000, id: '15d3b99a-7b42-48eb-b7f5-f92cda836fc7' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1681709160000, id: 'a97222a1-b9f0-43cb-9781-c448b61e4fab' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1681682082000, id: '738a688a-0fe1-4f6f-b7b9-813661108aec' },
      { drinkKey: 'no-conso', quantity: 1, timestamp: 1681589163000, id: '336295d5-3408-4d08-b2bd-b1d662dcd5e6' },
      { drinkKey: 'Stella-25-5', quantity: 1, id: '6f9fd815-cc5e-470a-bfbb-b21654190609', timestamp: 1681502430000 },
    ];
    const newDrinks = [];

    drinks.forEach((drink) => {
      if (drink.drinkKey === 'Stella') {
        const newDrink = { ...drink, drinkKey: 'Stella -50-5' };
        newDrinks.push(newDrink);
      } else if (drink.drinkKey === 'Stella ' || drink.drinkKey === 'Stella-25-5') {
        const newDrink = { ...drink, drinkKey: 'Stella -25-5' };
        newDrinks.push(newDrink);
      } else {
        newDrinks.push(drink);
      }
    });
    storage.set('@OwnDrinks', JSON.stringify(newOwnDrinkCatalog));
    storage.set('@Drinks', JSON.stringify(newDrinks));
    storage.set('@hasRepairedNicosConsos', true);
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'repairNicosConsos',
        '@Drinks': storage.getString('@Drinks'),
        '@OwnDrinks': storage.getString('@OwnDrinks'),
        hasSentPreviousDrinksToDB: storage.getBoolean('@hasRepairedNicosConsos'),
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
