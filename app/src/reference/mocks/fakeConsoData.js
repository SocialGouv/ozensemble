import { dateWithoutTime, today } from '../../helpers/dateHelpers';
import { v4 as uuid } from 'uuid';
import { drinksCatalog } from '../../scenes/ConsoFollowUp/drinksCatalog';

export const fakeConsoData = {
  empty: {
    startDate: today(),
    drinks: [],
  },
  long: () => {
    const startDate = Date.parse(dateWithoutTime(new Date(), -14));
    const drinks = [];
    for (let i = 0; i < 70; i++) {
      drinks.push({
        timestamp: Date.parse(dateWithoutTime(new Date(), -i)),
        drinkKey: drinksCatalog[Math.floor(Math.random() * drinksCatalog.length)].drinkKey,
        quantity: Math.floor(Math.random() * 10) + 1,
        id: uuid(),
      });
    }
    console.log('DONE', drinks.length);
    return {
      startDate,
      drinks,
    };
  },
  full: {
    startDate: Date.parse(dateWithoutTime(new Date(), -14)),
    drinks: [
      {
        timestamp: Date.parse(dateWithoutTime(new Date())) + 0,
        drinkKey: 'beer-half',
        quantity: 1,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -2)),
        drinkKey: 'cider-half',
        quantity: 3,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'cider-pint',
        quantity: 4,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'wine-glass',
        quantity: 5,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'wine-bottle',
        quantity: 6,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -6)),
        drinkKey: 'champagne-glass',
        quantity: 7,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -7)),
        drinkKey: 'champagne-bottle',
        quantity: 8,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -8)),
        drinkKey: 'hard-cocktail',
        quantity: 9,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -9)),
        drinkKey: 'hard-bottle',
        quantity: 10,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -10)),
        drinkKey: 'hard-shot',
        quantity: 11,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -11)),
        drinkKey: 'hard-flasque',
        quantity: 12,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -12)),
        drinkKey: 'beer-half',
        quantity: 13,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -13)),
        drinkKey: 'beer-half',
        quantity: 14,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -14)),
        drinkKey: 'beer-half',
        quantity: 15,
        id: uuid(),
      },
    ],
  },
  partial: {
    startDate: Date.parse(dateWithoutTime(new Date(), -10)),
    drinks: [
      {
        timestamp: Date.parse(dateWithoutTime(new Date())) + 0,
        drinkKey: 'beer-half',
        quantity: 1,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -2)),
        drinkKey: 'no-conso',
        quantity: 1,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'wine-glass',
        quantity: 3,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'wine-glass',
        quantity: 1,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'beer-half',
        quantity: 5,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 6,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 3,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'hard-shot',
        quantity: 1,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -8)),
        drinkKey: 'hard-shot',
        quantity: 2,
        id: uuid(),
      },
    ],
  },
  onlyBelow: {
    startDate: Date.parse(dateWithoutTime(new Date(), -10)),
    drinks: [
      {
        timestamp: Date.parse(dateWithoutTime(new Date())) + 0,
        drinkKey: 'beer-half',
        quantity: 1,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'wine-glass',
        quantity: 1,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'beer-half',
        quantity: 2,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 1,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 2,
        id: uuid(),
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'hard-shot',
        quantity: 1,
        id: uuid(),
      },
    ],
  },
};
