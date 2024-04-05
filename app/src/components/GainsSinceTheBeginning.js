import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { previousDrinksPerWeekState } from '../recoil/gains';
import { defaultPaddingFontScale } from '../styles/theme';
import { Spacer } from './Articles';
import H2 from './H2';
import EuroIcon from './illustrations/icons/EuroIcon';
import KcalIcon from './illustrations/icons/KcalIcon';
import { drinksCatalog } from '../scenes/ConsoFollowUp/drinksCatalog';
import { drinksState, feedDaysSelector, derivedDataFromDrinksState } from '../recoil/consos';
import dayjs from 'dayjs';

const GainSinceTheBeginning = ({ isOnboarded }) => {
  const drinks = useRecoilValue(drinksState);
  const days = useRecoilValue(feedDaysSelector);
  const { drinksByDay } = useRecoilValue(derivedDataFromDrinksState);
  const beginDateOfOz = useMemo(() => {
    if (!days.length) return null;
    return dayjs(days[days.length - 1]);
  }, [days]);

  const numberOfWeeksSinceBeginning = Math.abs(dayjs(beginDateOfOz).startOf('week').diff(dayjs(), 'weeks')) + 1;
  let weeksWithDrinks = 0;
  for (let i = 0; i < numberOfWeeksSinceBeginning; i++) {
    const startDay = dayjs(beginDateOfOz)
      .add(i * 7, 'days')
      .startOf('week');
    let hasEnteredDrinks;
    for (let j = 0; j < 7; j++) {
      if (drinksByDay[dayjs(startDay).add(j, 'days').format('YYYY-MM-DD')]) {
        hasEnteredDrinks = true;
        break;
      }
    }
    if (hasEnteredDrinks) {
      weeksWithDrinks++;
    }
  }
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);

  const myWeeklyExpensesBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) =>
          sum +
          drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.price || 0),
        0
      ),
    [previousDrinksPerWeek]
  );

  const myWeeklyKcalBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) =>
          sum +
          drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.kcal || 0),
        0
      ),
    [previousDrinksPerWeek]
  );
  const mySavingsSinceBeginning = useMemo(() => {
    if (!days.length) return null;
    const myExpensesSinceBegnining = drinks.reduce(
      (sum, drink) =>
        sum +
        drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.price || 0),
      0
    );
    return myWeeklyExpensesBeforeObjective * weeksWithDrinks - myExpensesSinceBegnining;
  }, [drinks, days, myWeeklyExpensesBeforeObjective, beginDateOfOz]);

  const myKcalSavingsSinceBeginning = useMemo(() => {
    if (!days.length) return null;
    const myKcalSinceBegnining = drinks.reduce(
      (sum, drink) =>
        sum +
        drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.kcal || 0),
      0
    );
    return myWeeklyKcalBeforeObjective * weeksWithDrinks - myKcalSinceBegnining;
  }, [drinks, days, myWeeklyKcalBeforeObjective, beginDateOfOz]);

  return (
    <>
      <View className="pt-5" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
        <H2 color="#4030a5">Total depuis que j'utilise Oz</H2>
        <View className="flex flex-row justify-between mt-4">
          <View className="flex flex-1 rounded-md items-center justify-center bg-[#FAFAFA]">
            <View>
              <EuroIcon size={25} />
            </View>
            <Spacer size={5} />
            {isOnboarded ? (
              <Text className="font-bold text-2xl">{mySavingsSinceBeginning > 0 ? mySavingsSinceBeginning : 0}€</Text>
            ) : (
              <Text className="font-bold text-2xl">-€</Text>
            )}

            <Text className="text-xs text-[#939EA6]">Euros épargnés</Text>
          </View>
          <Spacer size={20} />
          <View className="flex flex-1 rounded-md items-center justify-center bg-[#FAFAFA] p-3">
            <View>
              <KcalIcon size={25} />
            </View>
            <Spacer size={5} />
            {isOnboarded ? (
              <View className="flex flex-row justify-center items-baseline">
                <Text className="font-bold text-2xl">
                  {myKcalSavingsSinceBeginning > 0 ? myKcalSavingsSinceBeginning : 0}
                </Text>
                <Text className="font-bold text-lg "> KCAL</Text>
              </View>
            ) : (
              <>
                <Text className="text-lg font-bold">- KCAL</Text>
              </>
            )}
            <Text className="text-xs text-[#939EA6]">KCalories évitées</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default GainSinceTheBeginning;
