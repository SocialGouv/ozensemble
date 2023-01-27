import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import H1 from '../../components/H1';
import Economy from '../../components/illustrations/Economy';
import InfosIcon from '../../components/illustrations/InfoObjectif';
import InfoRoundIcon from '../../components/illustrations/icons/InfoRoundIcon';
import TextStyled from '../../components/TextStyled';
import GainsCalendar from './GainsCalendar';
import CocktailGlass from '../../components/illustrations/drinksAndFood/CocktailGlassTriangle';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import { daysWithGoalNoDrinkState, maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../recoil/gains';
import OnBoardingModal from '../../components/OnBoardingModal';
import { dailyDosesSelector, drinksState, feedDaysSelector } from '../../recoil/consos';
import ReminderIcon from '../../components/illustrations/ReminderIcon';
import HelpModalCountConsumption from './HelpModalCountConsumption';
import {
  reminderGain,
  reminderGainMode,
  reminderGainsHasBeenSetState,
  reminderGainWeekDay,
} from '../../recoil/reminder';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import GainsGauge from './GainsGauge';
import PeriodSelector from '../../components/PeriodSelector';

dayjs.extend(isBetween);

const MyGains = () => {
  const [firstDay, setFirstDay] = useState(dayjs().startOf('week'));
  const lastDay = useMemo(() => dayjs(firstDay).endOf('week'), [firstDay]);

  const navigation = useNavigation();
  const drinks = useRecoilValue(drinksState);
  const days = useRecoilValue(feedDaysSelector);
  const dailyDoses = useRecoilValue(dailyDosesSelector());
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const daysNoDrink = useRecoilValue(daysWithGoalNoDrinkState)?.length;

  const reminder = useRecoilValue(reminderGain);
  const mode = useRecoilValue(reminderGainMode);
  const weekDay = useRecoilValue(reminderGainWeekDay);
  const reminderHasBeenSet = useRecoilValue(reminderGainsHasBeenSetState);

  const [showOnboardingGainModal, setShowOnboardingGainModal] = useState(false);
  const navigateToFirstStep = () => {
    logEvent({
      category: 'GAINS',
      action: 'GOAL_OPEN',
    });
    navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION');
    setShowOnboardingGainModal(false);
  };
  const isOnboarded = useMemo(
    () => !!maxDrinksPerWeekGoal && !!previousDrinksPerWeek.length,
    [maxDrinksPerWeekGoal, previousDrinksPerWeek]
  );

  const beginDateOfOz = useMemo(() => {
    if (!days.length) return null;
    return dayjs(days[days.length - 1]);
  }, [days]);

  const numberDrinkInCurrentWeek = useMemo(
    () =>
      days
        .filter((day) => dayjs(day).isBetween(firstDay, firstDay.add(1, 'week'), 'day', '[)'))
        .reduce((sum, day) => sum + (dailyDoses[day] ? dailyDoses[day] : 0), 0),
    [days, dailyDoses, firstDay]
  );

  const numberOfDrinkingDaysInCurrentWeek = useMemo(
    () =>
      days
        .filter((day) => dayjs(day).isBetween(firstDay, firstDay.add(1, 'week'), 'day', '[)'))
        .reduce((sum, day) => sum + (dailyDoses[day] > 0 ? 1 : 0), 0),
    [days, dailyDoses, firstDay]
  );

  const myWeeklyNumberOfDrinksBeforeObjective = useMemo(() => {
    return previousDrinksPerWeek.reduce(
      (sum, drink) =>
        sum + drink.quantity * drinksCatalog.find((drinkcatalog) => drinkcatalog.drinkKey === drink.drinkKey).doses,
      0
    );
  }, [previousDrinksPerWeek]);

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

  const goToReminder = () => {
    logEvent({
      category: 'REMINDER',
      action: 'REMINDER_OPEN',
      name: 'GAIN',
    });
    navigation.navigate('GAINS_REMINDER', {
      enableContinueButton: true,
      onPressContinueNavigation: ['GAINS_MAIN_VIEW'],
    });
  };

  const appOpenEvent = useRef(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && !appOpenEvent.current) {
      appOpenEvent.current = true;
      const eventTimeout = setTimeout(() => {
        logEvent({
          action: 'GAINS_MAIN_VIEW',
          category: 'NAVIGATION',
        });
      }, 5000);
      return () => {
        clearTimeout(eventTimeout);
      };
    }
  }, [isFocused]);

  return (
    <>
      <WrapperContainer title={'Mon objectif cette semaine'}>
        {!isOnboarded ? (
          <TouchableOpacity
            onPress={() => {
              logEvent({
                category: 'GAINS',
                action: 'TOOLTIP_GOAL',
              });
              navigateToFirstStep();
            }}>
            <Description>
              <InfosIcon size={24} />
              <TextDescritpion>
                <Text>
                  Pour calculer vos gains{'\n'}financiers et en kilocalories,{'\n'}fixez-vous un <Bold>objectif</Bold>
                </Text>
              </TextDescritpion>
              <Arrow>{'>'}</Arrow>
            </Description>
          </TouchableOpacity>
        ) : (
          <>
            <PeriodSelector
              firstDay={firstDay}
              setFirstDay={setFirstDay}
              lastDay={lastDay}
              logEventCategory={'GAINS'}
              logEventAction={'CHANGE_DATE'}
            />

            <GainsGauge title={'Unités d’alcool'} value={numberDrinkInCurrentWeek} goal={maxDrinksPerWeekGoal} />
            <GainsGauge title={'Jours où j’ai bu'} value={numberOfDrinkingDaysInCurrentWeek} goal={7 - daysNoDrink} />
            <Spacer size={10} />
            <ButtonTouchable onPress={() => navigation.navigate('GAINS_MY_OBJECTIVE')}>
              <TextModify>Modifier l'objectif</TextModify>
            </ButtonTouchable>

            <Container>
              <TopTitle>
                <H1 color="#4030a5">Mes gains depuis le début</H1>
                <GainsFromStartInfoButton onPress={() => navigation.push('GAINS_FROM_START_MODALE')}>
                  <InfoRoundIcon size={25} />
                </GainsFromStartInfoButton>
              </TopTitle>

              <CategoriesContainer>
                <Categorie>
                  <View>
                    <CategorieText>Euros économisés</CategorieText>
                  </View>
                  <Spacer size={5} />
                  <TextStyled bold size={35}>
                    {mySavingsSinceBeginning > 0 ? mySavingsSinceBeginning : 0}
                  </TextStyled>
                </Categorie>
                <Spacer size={20} />
                <Categorie>
                  <View>
                    <CategorieText>Calories économisées</CategorieText>
                  </View>
                  <Spacer size={5} />
                  <TextStyled bold size={35}>
                    {myKcalSavingsSinceBeginning > 0 ? myKcalSavingsSinceBeginning : 0}
                  </TextStyled>
                </Categorie>
              </CategoriesContainer>
            </Container>
          </>
        )}

        <GainsCalendar isOnboarded={isOnboarded} setShowOnboardingGainModal={setShowOnboardingGainModal} />

        {isOnboarded && (
          <>
            <Title>
              <H1 color="#4030a5">Mon estimation hebdo avant de réduire</H1>
            </Title>
            <MyGoalSubContainer>
              <MyGoalSubContainerInside>
                <PartContainer>
                  <Economy size={20} />
                  <TextStyled>
                    {'   '}
                    {myWeeklyExpensesBeforeObjective} €
                  </TextStyled>
                </PartContainer>
                <PartContainer>
                  <CocktailGlass size={20} />
                  <TextStyled>
                    {'   '}
                    {myWeeklyNumberOfDrinksBeforeObjective} unité
                    {myWeeklyNumberOfDrinksBeforeObjective > 1 ? 's' : ''} d'alcool{'  '}
                  </TextStyled>
                  <HelpModalCountConsumption event="ESTIMATION">
                    <InfosIcon size={15} color={'#000000'} />
                  </HelpModalCountConsumption>
                </PartContainer>
              </MyGoalSubContainerInside>
            </MyGoalSubContainer>
            <ButtonTouchable onPress={() => navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION')}>
              <TextModify>
                <TextStyled>Modifier l'estimation</TextStyled>
              </TextModify>
            </ButtonTouchable>

            <Title>
              <H1 color="#4030a5">Mon rappel</H1>
            </Title>
            <MyGoalSubContainer>
              <MyGoalSubContainerInside>
                <PartContainer>
                  <ReminderIcon size={20} color="#000" selected />
                  <TextStyled>
                    {'   '}
                    {!reminderHasBeenSet || !dayjs(reminder).isValid() ? (
                      'Pas de rappel encore'
                    ) : (
                      <>
                        {mode === 'day'
                          ? 'Tous les jours '
                          : `Tous les ${dayjs()
                              .day(weekDay + 1)
                              .format('dddd')}s `}
                        à {dayjs(reminder).format('HH:mm')}
                      </>
                    )}
                  </TextStyled>
                </PartContainer>
              </MyGoalSubContainerInside>
            </MyGoalSubContainer>
            <ButtonTouchable onPress={goToReminder}>
              <TextModify>
                <TextStyled>
                  {!reminderHasBeenSet || !dayjs(reminder).isValid() ? 'Ajouter un rappel' : 'Modifier le rappel'}
                </TextStyled>
              </TextModify>
            </ButtonTouchable>
          </>
        )}
      </WrapperContainer>
      <OnBoardingModal
        title="Sans objectif, pas de gains"
        description="En 3 étapes, je peux me fixer un objectif pour réduire ma consommation d'alcool."
        boutonTitle="Je me fixe un objectif"
        onPress={navigateToFirstStep}
        visible={showOnboardingGainModal}
        hide={() => {
          setShowOnboardingGainModal(false);
        }}
      />
    </>
  );
};

const Spacer = styled.View`
  height: ${({ size }) => size || 20}px;
  width: ${({ size }) => size || 20}px;
`;

const GainsFromStartInfoButton = styled.TouchableOpacity`
  justify-content: center;
`;

const CategorieText = styled(TextStyled)`
  text-align: center;
`;

const CategoriesContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Categorie = styled.View`
  border: 1px solid #dddddd;
  border-radius: 5px;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  padding: 10px 4px 10px 4px;
  min-height: 90px;
`;

const Container = styled.View`
  padding-top: 20px;
`;

const TopTitle = styled.View`
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const Description = styled.View`
  background-color: #c5f3ba29;
  border-style: solid;
  border-width: 1px;
  border-color: #81db9557;
  padding: 13px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Arrow = styled(TextStyled)`
  color: #4030a5;
  font-weight: bold;
`;

const TextDescritpion = styled(TextStyled)`
  padding: 10px;
  font-size: 16px;
  line-height: 20px;
`;

const Bold = styled(TextStyled)`
  font-weight: bold;
`;

const Title = styled.View`
  flex-shrink: 0;
  margin-top: 35px;
  margin-bottom: 20px;
`;

const MyGoalSubContainer = styled.View`
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 5px 10px;
`;

const PartContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

const MyGoalSubContainerInside = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TextModify = styled(TextStyled)`
  text-decoration: underline;
`;

const ButtonTouchable = styled.TouchableOpacity`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default MyGains;
