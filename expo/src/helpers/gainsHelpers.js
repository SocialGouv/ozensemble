import { drinksCatalogObject, mapDrinkToDose } from '../scenes/ConsoFollowUp/drinksCatalog';

export function getTotalDrinksByDrinkingDay(maxDrinksByWeek, daysWithGoalNoDrink) {
  const totalDrinksByDrinkingDay =
    daysWithGoalNoDrink.length === 7 ? 0 : maxDrinksByWeek / (7 - daysWithGoalNoDrink.length);
  return totalDrinksByDrinkingDay;
}

export function getMaxDrinksPerWeek(drinksByWeek) {
  return drinksByWeek.reduce((sum, drink) => {
    const dose = mapDrinkToDose(drink, drinksCatalogObject);
    return Math.ceil(sum + dose);
  }, 0);
}
