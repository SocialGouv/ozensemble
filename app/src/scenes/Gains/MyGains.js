import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import { screenHeight, screenWidth } from '../../styles/theme';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import Economy from '../../components/illustrations/Economy';
import InfosIcon from '../../components/illustrations/InfoObjectif';
import NoDrink from '../../components/illustrations/drinksAndFood/NoDrink';
import Rocket from '../../components/illustrations/Rocket';
import TextStyled from '../../components/TextStyled';
import CategorieGain from './CategorieGain';
import GainsCalendar from './GainsCalendar';
import CocktailGlass from '../../components/illustrations/drinksAndFood/CocktailGlassTriangle';
import Done from '../../components/illustrations/Done';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import { daysWithGoalNoDrinkState, maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../recoil/gains';
import OnBoardingModal from '../../components/OnBoardingModal';
import { dailyDosesSelector, drinksState, feedDaysSelector } from '../../recoil/consos';
import { storage } from '../../services/storage';
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

const MyGains = () => {
  const navigation = useNavigation();
  const drinks = useRecoilValue(drinksState);
  const days = useRecoilValue(feedDaysSelector);
  const dailyDoses = useRecoilValue(dailyDosesSelector());
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const dayNoDrink = useRecoilValue(daysWithGoalNoDrinkState)?.length;

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
  const [showGoalfix, setShowGoalfix] = useState(storage.getBoolean('@ShowGoalFix') ?? true);

  const beginDateOfOz = useMemo(() => {
    if (!days.length) return null;
    return dayjs(days[days.length - 1]);
  }, [days]);

  const notDrinkDaythisWeek = useMemo(() => {
    return days
      .filter((day) => dayjs(day).isSameOrAfter(dayjs().startOf('week')))
      .filter((day) => dailyDoses[day] === 0).length;
  }, [days, dailyDoses]);

  const numberDrinkThisWeek = useMemo(
    () =>
      days
        .filter((day) => dayjs(day).isSameOrAfter(dayjs().startOf('week')))
        .reduce((sum, day) => sum + (dailyDoses[day] ? dailyDoses[day] : 0), 0),
    [days, dailyDoses]
  );
  const remaindrink = useMemo(
    () => (maxDrinksPerWeekGoal - numberDrinkThisWeek > 0 ? maxDrinksPerWeekGoal - numberDrinkThisWeek : 0),
    [maxDrinksPerWeekGoal, numberDrinkThisWeek]
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

  return (
    <WrapperContainer title={'Mes gains'}>
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
                Pour calculer vos gains, {'\n'}fixez-vous un <Bold>objectif</Bold>
              </Text>
            </TextDescritpion>
            <Arrow>{'>'}</Arrow>
          </Description>
        </TouchableOpacity>
      ) : (
        <>
          {showGoalfix && (
            <Description>
              <Rocket size={24} />
              <TextDescritpion>
                <Text>
                  Bravo, votre objectif est fixé, remplissez vos consommations et mesurez vos gains au fil du temps.
                </Text>
              </TextDescritpion>
              <CloseShowGoalfix
                onPress={() => {
                  storage.set('@ShowGoalFix', false);
                  setShowGoalfix(false);
                }}
                hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
                <Arrow>{'x'}</Arrow>
              </CloseShowGoalfix>
            </Description>
          )}
        </>
      )}
      <TextContainer>
        <TextForm>
          {!!isOnboarded && beginDateOfOz && (
            <TextStyled>
              Depuis le
              <TextStyled color="#DE285E">
                {' '}
                {beginDateOfOz.get('year') < dayjs().get('year')
                  ? beginDateOfOz.format('D MMMM YYYY')
                  : beginDateOfOz.format('D MMMM')}
              </TextStyled>
            </TextStyled>
          )}
        </TextForm>
      </TextContainer>
      <Categories>
        <CategorieGain
          unit={<Euros color="#191919">€</Euros>}
          description="Mes économies"
          value={isOnboarded ? (mySavingsSinceBeginning > 0 ? mySavingsSinceBeginning : 0) : '?'}
          maximize
          disabled={isOnboarded}
          onPress={() => {
            setShowOnboardingGainModal(true);
            logEvent({
              category: 'GAINS',
              action: 'EARNINGS_SECTION',
              name: 'euro',
            });
          }}
        />
        <CategorieGain
          unit={<Kcal color="#191919">kcal</Kcal>}
          description="Mes calories économisées"
          value={isOnboarded ? (myKcalSavingsSinceBeginning > 0 ? myKcalSavingsSinceBeginning : 0) : '?'}
          maximize
          disabled={isOnboarded}
          onPress={() => {
            setShowOnboardingGainModal(true);
            logEvent({
              category: 'GAINS',
              action: 'EARNINGS_SECTION',
              name: 'calories',
            });
          }}
        />
      </Categories>
      <TextContainer>
        <TextForm>
          {!!isOnboarded && (
            <TextStyled>
              Jusqu'à<TextStyled color="#DE285E"> dimanche soir</TextStyled>
            </TextStyled>
          )}
        </TextForm>
      </TextContainer>
      <Categories>
        <CategorieGain
          description={`Verre${remaindrink > 1 ? 's' : ''} restant${remaindrink > 1 ? 's' : ''}`}
          value={isOnboarded ? remaindrink : '?'}
          disabled={isOnboarded}
          onPress={() => {
            setShowOnboardingGainModal(true);
            logEvent({
              category: 'GAINS',
              action: 'EARNINGS_SECTION',
              name: 'drinks',
            });
          }}>
          <Speedometer
            value={isOnboarded ? remaindrink : 1}
            totalValue={isOnboarded ? maxDrinksPerWeekGoal : 1}
            size={screenWidth / 4}
            outerColor="#d3d3d3"
            innerColor="#f9f9f9"
            internalColor={`rgba(64, 48, 165, ${isOnboarded ? remaindrink / maxDrinksPerWeekGoal : 1})`}
          />
        </CategorieGain>
        <CategorieGain
          icon={<NoDrink size={24} />}
          description={`Jour${notDrinkDaythisWeek > 1 ? 's' : ''} où je n'ai pas\u00A0bu`}
          value={isOnboarded ? notDrinkDaythisWeek : '?'}
          disabled={isOnboarded}
          onPress={() => {
            setShowOnboardingGainModal(true);
            logEvent({
              category: 'GAINS',
              action: 'EARNINGS_SECTION',
              name: 'drinkless',
            });
          }}
        />
      </Categories>
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
      <GainsCalendar isOnboarded={isOnboarded} setShowOnboardingGainModal={setShowOnboardingGainModal} />
      {!isOnboarded ? (
        <>
          <TopTitle>
            <H1 color="#4030a5">Mon objectif</H1>
          </TopTitle>
          <TouchableOpacity onPress={navigateToFirstStep} hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
            <Description>
              <InfosIcon size={24} />
              <TextDescritpion>
                <Text>
                  Pour calculer vos gains, {'\n'}fixez-vous un <Bold>objectif</Bold>
                </Text>
              </TextDescritpion>
              <Arrow>{'>'}</Arrow>
            </Description>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Title>
            <H1 color="#4030a5">Mon objectif</H1>
          </Title>
          <MyGoalSubContainer>
            <MyGoalSubContainerInside>
              <PartContainer>
                <Done size={20} />
                <TextStyled>
                  {'  '}
                  {dayNoDrink} {dayNoDrink > 1 ? 'jours' : 'jour'} où je ne bois pas
                </TextStyled>
              </PartContainer>
              <PartContainer>
                <Done size={20} />
                <TextStyled>
                  {'  '}
                  {maxDrinksPerWeekGoal} {maxDrinksPerWeekGoal > 1 ? 'verres' : 'verre'} max par semaine
                </TextStyled>
              </PartContainer>
            </MyGoalSubContainerInside>
          </MyGoalSubContainer>
          <ButtonTouchable onPress={() => navigation.navigate('GAINS_MY_OBJECTIVE')}>
            <TextModify>Modifier l'objectif</TextModify>
          </ButtonTouchable>
          <Title>
            <H1 color="#4030a5">Ma conso actuelle avant objectif</H1>
            <H2>Estimation par semaine</H2>
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
  );
};

const TopTitle = styled.View`
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
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

const Arrow = styled.Text`
  color: #4030a5;
  font-weight: bold;
`;

const TextDescritpion = styled.Text`
  padding: 10px;
  font-size: 16px;
  line-height: 20px;
`;

const Categories = styled.View`
  justify-content: space-around;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 25px;
`;

const TextContainer = styled.View`
  align-items: center;
  margin-bottom: ${screenHeight * 0.01}px;
  margin-top: ${screenHeight * 0.01}px;
`;

const TextForm = styled(H2)``;

const Bold = styled.Text`
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

const TextModify = styled.Text`
  text-decoration: underline;
`;

const ButtonTouchable = styled.TouchableOpacity`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CloseShowGoalfix = styled.TouchableOpacity`
  align-self: flex-start;
`;

const Euros = styled(TextStyled)`
  font-weight: bold;
  font-size: 24px;
`;

const Kcal = styled(TextStyled)`
  font-weight: bold;
  font-size: 16px;
`;

export default MyGains;
