import { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { previousDrinksPerWeekState } from '../recoil/gains';
import { logEvent } from '../services/logEventsWithMatomo';
import { defaultPaddingFontScale } from '../styles/theme';
import { Spacer } from './Articles';
import H2 from './H2';
import EuroIcon from './illustrations/icons/EuroIcon';
import KcalIcon from './illustrations/icons/KcalIcon';
import TargetGoal from './illustrations/icons/TargetGoal';
import { drinksCatalog } from '../scenes/ConsoFollowUp/drinksCatalog';
import { drinksState, feedDaysSelector } from '../recoil/consos';
import dayjs from 'dayjs';
import ArrowRight from './ArrowRight';

const GainSinceTheBeginning = ({ isOnboarded, navigation }) => {
  const drinks = useRecoilValue(drinksState);
  const days = useRecoilValue(feedDaysSelector);
  const beginDateOfOz = useMemo(() => {
    if (!days.length) return null;
    return dayjs(days[days.length - 1]);
  }, [days]);

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
    const numberOfDaysSinceBeginning = Math.abs(dayjs(beginDateOfOz).diff(dayjs(), 'days'));
    const averageDailyExpenses = myExpensesSinceBegnining / numberOfDaysSinceBeginning;
    const averageDailyExpensesBeforeObjective = myWeeklyExpensesBeforeObjective / 7;
    return Math.ceil(averageDailyExpensesBeforeObjective - averageDailyExpenses) * numberOfDaysSinceBeginning;
  }, [drinks, days, myWeeklyExpensesBeforeObjective, beginDateOfOz]);

  const myKcalSavingsSinceBeginning = useMemo(() => {
    if (!days.length) return null;
    const myKcalSinceBegnining = drinks.reduce(
      (sum, drink) =>
        sum +
        drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.kcal || 0),
      0
    );
    const numberOfDaysSinceBeginning = Math.abs(dayjs(beginDateOfOz).diff(dayjs(), 'days'));
    const averageDailyKcal = myKcalSinceBegnining / numberOfDaysSinceBeginning;
    const averageDailyKcalBeforeObjective = myWeeklyKcalBeforeObjective / 7;
    return Math.ceil(averageDailyKcalBeforeObjective - averageDailyKcal) * numberOfDaysSinceBeginning;
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
