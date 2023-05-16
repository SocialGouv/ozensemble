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
import CocktailGlass from '../../components/illustrations/drinksAndFood/CocktailGlassTriangle';
import { daysWithGoalNoDrinkState, maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../recoil/gains';
import OnBoardingModal from '../../components/OnBoardingModal';
import { dailyDosesSelector, drinksState, feedDaysSelector } from '../../recoil/consos';
import ReminderIcon from '../../components/illustrations/ReminderIcon';
import HelpModalCountConsumption from './HelpModalCountConsumption';
import BadgesStatus from '../Badges/BadgesStatus';
import {
  reminderGain,
  reminderGainMode,
  reminderGainsHasBeenSetState,
  reminderGainWeekDay,
} from '../../recoil/reminder';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import { badgesState } from '../../recoil/badges';
import H2 from '../../components/H2';
import { BEER, BEER_HALF, drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import DrinksCategory from '../../components/DrinksCategory';
import Diagram from '../ConsoFollowUp/Diagram';
import DiagramHelpModal from '../ConsoFollowUp/DiagramHelpModal';
import FollowUpConsos from '../../components/illustrations/icons/FollowUpConsos';
import GoalSetup from '../../components/illustrations/icons/GoalSetup';
import ArrowRight from '../../components/ArrowRight';
import IconAdd from '../../components/illustrations/IconAdd';
import GainsIcon from '../../components/illustrations/icons/GainsIcon';

const fakeDrinks = [{ drinkKey: BEER_HALF, quantity: 1 }];

dayjs.extend(isBetween);

const MyGains = () => {
  const firstDay = dayjs().startOf('week');
  const navigation = useNavigation();
  const drinks = useRecoilValue(drinksState);
  const days = useRecoilValue(feedDaysSelector);
  const dailyDoses = useRecoilValue(dailyDosesSelector);
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);

  const badges = useRecoilValue(badgesState);
  const reminder = useRecoilValue(reminderGain);
  const mode = useRecoilValue(reminderGainMode);
  const weekDay = useRecoilValue(reminderGainWeekDay);
  const reminderHasBeenSet = useRecoilValue(reminderGainsHasBeenSetState);

  const showWelcomeMessage = !useRecoilValue(drinksState)?.length;
  const [selectedBar, setSelectedBar] = useState({});

  useEffect(() => {
    logEvent({
      category: 'APP',
      action: 'APP_OPEN_IN_GAIN_VIEW',
    });
  }, []);

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
      <WrapperContainer title={'Suivi'}>
        {!isOnboarded && (
          <View className="mb-8">
            <View className="flex flex-row space-x-1 items-center mb-3">
              <GoalSetup size={25} />
              <H2 color={'#4030a5'}>Estimation et Objectif semaine</H2>
            </View>
            <TouchableOpacity
              onPress={() => {
                logEvent({
                  category: 'GAINS',
                  action: 'TOOLTIP_GOAL',
                });
                navigateToFirstStep();
              }}
              className="flex flex-row items-center justify-around bg-[#E8E8F3] rounded-lg px-4 py-2 border border-[#4030a5]">
              <IconAdd size={35} color={'#4030a5'} />
              <Text className="mx-6">
                Estimez votre consommation <Text className="font-bold">actuelle</Text> et fixez-vous un{' '}
                <Text className="font-bold">objectif</Text> pour calculer vos gains dans le temps&nbsp;!
              </Text>
              <View>
                <ArrowRight color="#4030a5" size={15} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <>
          <View>
            <View className="flex flex-row space-x-1 items-center mb-3">
              <FollowUpConsos size={25} />
              <H2 color={'#4030a5'}>Suivi des consommations</H2>
            </View>
            <Diagram
              onShowHelp={() => {
                logEvent({
                  category: 'CONSO',
                  action: 'CONSO_OPEN_HELP',
                });
                setShowHelpModal(true);
              }}
              selectedBar={selectedBar}
              setSelectedBar={setSelectedBar}
            />
          </View>

          <Container>
            <View className="flex flex-row space-x-1 items-center mb-3">
              <GainsIcon size={25} />
              <H2 color="#4030a5">Mes gains depuis le début</H2>
              <GainsFromStartInfoButton onPress={() => navigation.push('GAINS_FROM_START_MODALE')}>
                <InfoRoundIcon size={25} />
              </GainsFromStartInfoButton>
            </View>
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

        <BadgesStatus
          isOnboarded={isOnboarded}
          userBadges={badges}
          navigate={() => navigation.navigate('BADGES_LIST')}
        />
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

const MyReminder = ({ reminderHasBeenSet, reminder, goToReminder, mode, weekDay }) => (
  <>
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
);

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
