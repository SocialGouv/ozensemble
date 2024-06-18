import { MMKV } from 'react-native-mmkv';
import API from './services/api';
import { drinksCatalog } from './scenes/ConsoFollowUp/drinksCatalog';
import { capture } from './services/sentry';

export const storage = new MMKV();

export async function reconciliateDrinksToDB() {
  try {
    const matomoId = storage.getString('@UserIdv2');
    if (!matomoId?.length) {
      // new user - no drinks to send
      return;
    }
    // @Drinks
    const drinks = JSON.parse(storage.getString('@Drinks') || '[]');
    const ownDrinksCatalog = JSON.parse(storage.getString('@OwnDrinks') || '[]');

    const unsyncedDrinks = drinks.filter((drink) => !drink.isSyncedWithDB);

    await API.post({
      path: '/consommation/sync',
      body: {
        matomoId,
        drinks: unsyncedDrinks,
        drinksCatalog: [...ownDrinksCatalog, ...drinksCatalog],
      },
    }).then((response) => {
      if (response?.ok) {
        storage.set('@Drinks', JSON.stringify(drinks.map((drink) => ({ ...drink, isSyncedWithDB: true }))));
      }
    });
  } catch (e) {
    capture(e, {
      extra: {
        migration: 'reconciliateDrinksToDB',
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
