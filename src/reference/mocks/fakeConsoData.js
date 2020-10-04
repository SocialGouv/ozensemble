import { dateWithoutTime, today } from '../../helpers/dateHelpers';

export const fakeConsoData = {
  empty: {
    startDate: today(),
    drinks: [],
  },
  full: {
    startDate: Date.parse(dateWithoutTime(new Date(), -14)),
    drinks: [
      { timestamp: Date.parse(dateWithoutTime(new Date())), drinkKey: 'beer-half', quantity: 1 },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -2)),
        drinkKey: 'beer-half',
        quantity: 3,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'beer-half',
        quantity: 4,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 5,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'beer-half',
        quantity: 6,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -6)),
        drinkKey: 'beer-half',
        quantity: 7,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -7)),
        drinkKey: 'beer-half',
        quantity: 8,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -8)),
        drinkKey: 'beer-half',
        quantity: 9,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -9)),
        drinkKey: 'beer-half',
        quantity: 10,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -10)),
        drinkKey: 'beer-half',
        quantity: 11,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -11)),
        drinkKey: 'beer-half',
        quantity: 12,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -12)),
        drinkKey: 'beer-half',
        quantity: 13,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -13)),
        drinkKey: 'beer-half',
        quantity: 14,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -14)),
        drinkKey: 'beer-half',
        quantity: 15,
      },
    ],
  },
  partial: {
    startDate: Date.parse(dateWithoutTime(new Date(), -10)),
    drinks: [
      { timestamp: Date.parse(dateWithoutTime(new Date())), drinkKey: 'beer-half', quantity: 1 },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'wine-glass',
        quantity: 3,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'wine-glass',
        quantity: 1,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'beer-half',
        quantity: 5,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 6,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 3,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'hard-shot',
        quantity: 1,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -8)),
        drinkKey: 'hard-shot',
        quantity: 2,
      },
    ],
  },
  onlyBelow: {
    startDate: Date.parse(dateWithoutTime(new Date(), -10)),
    drinks: [
      { timestamp: Date.parse(dateWithoutTime(new Date())), drinkKey: 'beer-half', quantity: 1 },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'beer-pint',
        quantity: 2,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -1)),
        drinkKey: 'wine-glass',
        quantity: 1,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -3)),
        drinkKey: 'beer-half',
        quantity: 2,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 1,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -4)),
        drinkKey: 'beer-half',
        quantity: 2,
      },
      {
        timestamp: Date.parse(dateWithoutTime(new Date(), -5)),
        drinkKey: 'hard-shot',
        quantity: 1,
      },
    ],
  },
};
