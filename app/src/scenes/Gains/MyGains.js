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
import GainsGauge from './GainsGauge';
import PeriodSelector from '../../components/PeriodSelector';
import { badgesState } from '../../recoil/badges';
import H2 from '../../components/H2';
import { BEER, BEER_HALF, drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import DrinksCategory from '../../components/DrinksCategory';
import Diagram from '../ConsoFollowUp/Diagram';
import DiagramHelpModal from '../ConsoFollowUp/DiagramHelpModal';
import GoalSetup from '../../components/illustrations/icons/GoalSetup';
const fakeDrinks = [{ drinkKey: BEER_HALF, quantity: 1 }];

dayjs.extend(isBetween);

const MyGains = () => {
  const [firstDay, setFirstDay] = useState(dayjs().startOf('week'));
  const lastDay = useMemo(() => dayjs(firstDay).endOf('week'), [firstDay]);

  const navigation = useNavigation();
  const drinks = useRecoilValue(drinksState);
  const days = useRecoilValue(feedDaysSelector);
  const dailyDoses = useRecoilValue(dailyDosesSelector);
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const daysNoDrink = useRecoilValue(daysWithGoalNoDrinkState)?.length;

  const badges = useRecoilValue(badgesState);
  const reminder = useRecoilValue(reminderGain);
  const mode = useRecoilValue(reminderGainMode);
  const weekDay = useRecoilValue(reminderGainWeekDay);
  const reminderHasBeenSet = useRecoilValue(reminderGainsHasBeenSetState);

  const showWelcomeMessage = !useRecoilValue(drinksState)?.length;
  const [showHelpModal, setShowHelpModal] = useState(false);
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

  const numberDrinkInCurrentWeek = useMemo(
    () =>
      days
        .filter((day) => dayjs(day).isBetween(firstDay, firstDay.add(1, 'week'), 'day', '[)'))
        .reduce((sum, day) => Math.ceil(sum + (dailyDoses[day] ? dailyDoses[day] : 0)), 0),
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
      <WrapperContainer title={'Suivi'}>
        {!isOnboarded ? (
          <View>
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
            <View className="mt-10">
              <H1>Mon suivi de consommation</H1>
              <SubtitleContainer>
                <Help
                  onPress={() => {
                    logEvent({
                      category: 'CONSO',
                      action: 'CONSO_OPEN_HELP',
                    });
                    setShowHelpModal(true);
                  }}
                  hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
                  <HelpText>?</HelpText>
                </Help>
                <DiagramHelpModal visible={showHelpModal} onCloseHelp={() => setShowHelpModal(false)} />

                <DiagramTitle color="#191919">Nombre d'unités d'alcool consommées</DiagramTitle>
              </SubtitleContainer>
              {showWelcomeMessage ? (
                <>
                  <SubTitle>
                    <TextStyled color="#191919">
                      Voici un outil simple pour se rendre compte de sa consommation.{'\n\n'}
                    </TextStyled>
                    <TextStyled color="#191919">Tous les jours vous renseignez votre consommation.{'\n'}</TextStyled>
                  </SubTitle>
                  {drinksCatalog
                    .filter(({ categoryKey }) => categoryKey === BEER)
                    .map(({ categoryKey }) => categoryKey)
                    .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index)
                    .map((category, index) => (
                      <DrinksCategory
                        drinksCatalog={drinksCatalog}
                        key={category}
                        category={category}
                        index={index + 1}
                        drinks={fakeDrinks}
                      />
                    ))}
                  <SubTitle>
                    <TextStyled color="#191919">
                      Un graphique récapitule vos consommations en unité d'alcool{'\n'}
                    </TextStyled>
                  </SubTitle>
                  <Diagram />
                  <SubTitle last>
                    <TextStyled color="#191919">Le rouge représente ce qui est supérieur au seuil de l'OMS</TextStyled>
                  </SubTitle>
                </>
              ) : null}
              {!showWelcomeMessage && (
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
              )}
            </View>
          </View>
        ) : (
          <>
            <View>
              <H2 color={'#4030a5'}>Mon suivi de consommation</H2>
              {/* <SubtitleContainer>
                <Help
                  onPress={() => {
                    logEvent({
                      category: 'CONSO',
                      action: 'CONSO_OPEN_HELP',
                    });
                    setShowHelpModal(true);
                  }}
                  hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
                  <HelpText>?</HelpText>
                </Help>
                <DiagramHelpModal visible={showHelpModal} onCloseHelp={() => setShowHelpModal(false)} /> // recuperer la modal d'aide

                <DiagramTitle color="#191919">Nombre d'unités d'alcool consommées</DiagramTitle>
              </SubtitleContainer> */}
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

        <BadgesStatus
          isOnboarded={isOnboarded}
          userBadges={badges}
          navigate={() => navigation.navigate('BADGES_LIST')}
        />
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

            <MyReminder
              reminderHasBeenSet={reminderHasBeenSet}
              reminder={reminder}
              goToReminder={goToReminder}
              mode={mode}
              weekDay={weekDay}
            />
          </>
        )}

        {!isOnboarded && reminderHasBeenSet && (
          <MyReminder
            reminderHasBeenSet={reminderHasBeenSet}
            reminder={reminder}
            goToReminder={goToReminder}
            mode={mode}
            weekDay={weekDay}
          />
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

const SubTitle = styled(H2)`
  flex-shrink: 0;
  font-weight: 500;
  ${(props) => props.last && 'margin-bottom: 40px;'}
`;

const SubtitleContainer = styled.View`
  flex-direction: row-reverse;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
`;

const DiagramTitle = styled(H2)`
  font-weight: 500;
  flex-shrink: 1;
`;
const helpsize = 25;

const HelpText = styled(TextStyled)`
  color: #de285e;
  font-weight: bold;
  font-size: ${helpsize * 0.5}px;
`;
const Help = styled.TouchableOpacity`
  width: ${helpsize}px;
  height: ${helpsize}px;
  border-radius: ${helpsize}px;
  border: 1px solid #de285e;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 5px;
`;
export default MyGains;
