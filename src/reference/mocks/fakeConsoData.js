import { dateWithoutTime, today } from '../../helpers/dateHelpers';

export const fakeConsoData = {
  empty: {
    startDate: today(),
    drinks: [],
  },
  full: {
    startDate: Date.parse(dateWithoutTime(new Date(), -14)),
    drinks: [
      {
        timestamp: Date.parse(dateWithoutTime(new Date())) + 0,
        drinkKey: 'beer-half',
        quantity: 1,
        id: 1,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
        id: 2,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -2)),
        drinkKey: 'beer-half',
        quantity: 3,
        id: 3,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'beer-half',
        quantity: 4,
        id: 4,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 5,
        id: 5,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'beer-half',
        quantity: 6,
        id: 6,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -6)),
        drinkKey: 'beer-half',
        quantity: 7,
        id: 7,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -7)),
        drinkKey: 'beer-half',
        quantity: 8,
        id: 8,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -8)),
        drinkKey: 'beer-half',
        quantity: 9,
        id: 9,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -9)),
        drinkKey: 'beer-half',
        quantity: 10,
        id: 10,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -10)),
        drinkKey: 'beer-half',
        quantity: 11,
        id: 11,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -11)),
        drinkKey: 'beer-half',
        quantity: 12,
        id: 12,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -12)),
        drinkKey: 'beer-half',
        quantity: 13,
        id: 13,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -13)),
        drinkKey: 'beer-half',
        quantity: 14,
        id: 14,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -14)),
        drinkKey: 'beer-half',
        quantity: 15,
        id: 15,
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
        id: 16,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
        id: 17,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -2)),
        drinkKey: 'no-conso',
        quantity: 1,
        id: 18,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'wine-glass',
        quantity: 3,
        id: 19,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'wine-glass',
        quantity: 1,
        id: 20,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'beer-half',
        quantity: 5,
        id: 21,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 6,
        id: 22,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 3,
        id: 23,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'hard-shot',
        quantity: 1,
        id: 24,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -8)),
        drinkKey: 'hard-shot',
        quantity: 2,
        id: 25,
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
        id: 26,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
        id: 27,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'wine-glass',
        quantity: 1,
        id: 28,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'beer-half',
        quantity: 2,
        id: 29,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 1,
        id: 30,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 2,
        id: 31,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'hard-shot',
        quantity: 1,
        id: 32,
      },
    ],
  },
};
