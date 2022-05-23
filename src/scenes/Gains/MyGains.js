import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import { defaultPaddingFontScale, screenHeight, screenWidth } from '../../styles/theme';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import Economy from '../../components/Illustrations/Economy';
import InfosIcon from '../../components/Illustrations/InfoObjectif';
import NoDrink from '../../components/Illustrations/NoDrink';
import Rocket from '../../components/Illustrations/Rocket';
import TextStyled from '../../components/TextStyled';
import CategorieGain from './CategorieGain';
import GainsCalendar from './GainsCalendar';
import CocktailGlass from '../../components/Illustrations/CocktailGlassTriangle';
import Done from '../../components/Illustrations/Done';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import { daysWithGoalNoDrinkState, maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../recoil/gains';
import OnBoardingGainModal from './OnBoardingGainModal';
import { dailyDosesSelector, drinksState, feedDaysSelector } from '../../recoil/consos';
import { storage } from '../../services/storage';
import ReminderIcon from '../../components/Illustrations/ReminderIcon';
import HelpModalCountConsumption from './HelpModalCountConsumption';
import { reminderGain, reminderGainMode, reminderGainWeekDay } from '../../recoil/reminder';
import matomo from '../../services/matomo';

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

  const [helpVisible, setHelpVisible] = useState(false);

  const [showOnboardingGainModal, setShowOnboardingGainModal] = useState(false);
  const navigateToGoal = () => {
    navigation.navigate('GAINS_MY_OBJECTIVE');
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
    return days.filter((day) => dayjs(day).isSameOrAfter(dayjs().startOf('week'))).filter((day) => !dailyDoses[day])
      .length;
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

  const goToReminder = () =>
    navigation.navigate('GAINS_REMINDER', {
      enableContinueButton: true,
      onPressContinueNavigation: ['GAINS_MAIN_VIEW'],
    });

  return (
    <ScreenBgStyled>
      <Container>
        <TopTitle>
          <H1 color="#4030a5">Mes gains</H1>
        </TopTitle>
        {!isOnboarded ? (
          <TouchableOpacity
            onPress={() => {
              matomo.logTooltipGoal();
              navigation.navigate('GAINS_MY_OBJECTIVE');
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
      </Container>
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
            matomo.logEarningsSection('euro');
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
            matomo.logEarningsSection('calories');
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
            matomo.logEarningsSection('drinks');
          }}>
          <Speedometer
            value={isOnboarded ? remaindrink : 1}
            totalValue={isOnboarded ? maxDrinksPerWeekGoal : 1}
            size={screenWidth / 4}
            outerColor="#d3d3d3"
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
            matomo.logEarningsSection('drinkless');
          }}
        />
      </Categories>
      <OnBoardingGainModal
        onPress={() => {
          matomo.logGoalOpen();
          navigateToGoal();
        }}
        visible={showOnboardingGainModal}
        hide={() => {
          setShowOnboardingGainModal(false);
        }}
      />
      <GainsCalendar isOnboarded={isOnboarded} setShowOnboardingGainModal={setShowOnboardingGainModal} />
      {!isOnboarded ? (
        <BottomContainer>
          <TopTitle>
            <H1 color="#4030a5">Mon objectif</H1>
          </TopTitle>
          <TouchableOpacity
            onPress={() => navigation.navigate('GAINS_MY_OBJECTIVE')}
            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
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
        </BottomContainer>
      ) : (
        <MyGoalContainer>
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
          <ButtonTouchable onPress={navigateToGoal}>
            <TextModify>Modifier l'objectif</TextModify>
          </ButtonTouchable>
          <Title>
            <H1 color="#4030a5">Ma consommation avant OzEnsemble</H1>
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
                  {myWeeklyNumberOfDrinksBeforeObjective > 1 ? 's' : ''} d'alcool
                </TextStyled>
                <InfoContainer
                  onPress={() => {
                    matomo.logGoalDrinkHelp();
                    setHelpVisible(true);
                  }}>
                  <InfosIcon size={15} color={'#000000'} />
                </InfoContainer>
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
                  {!dayjs(reminder).isValid() ? (
                    'Pas de rappel encore'
                  ) : (
                    <>
                      {mode === 'day' ? 'Tous les jours ' : `Tous les ${dayjs().day(weekDay).format('dddd')}s `}à{' '}
                      {dayjs(reminder).format('HH:mm')}
                    </>
                  )}
                </TextStyled>
              </PartContainer>
            </MyGoalSubContainerInside>
          </MyGoalSubContainer>
          <ButtonTouchable onPress={goToReminder}>
            <TextModify>
              <TextStyled>{!reminder ? 'Ajouter un rappel' : 'Modifier le rappel'}</TextStyled>
            </TextModify>
          </ButtonTouchable>
        </MyGoalContainer>
      )}
      <HelpModalCountConsumption visible={helpVisible} onClose={() => setHelpVisible(false)} />
    </ScreenBgStyled>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: white;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const Container = styled.View`
  padding: 20px ${defaultPaddingFontScale()}px 0px;
`;

const BottomContainer = styled.View`
  padding: 20px ${defaultPaddingFontScale()}px 100px;
`;

const TopTitle = styled.View`
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 15px;
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
  margin-top: ${screenHeight * 0.02}px;
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
  margin-top: 30px;
  margin-bottom: 15px;
`;

const MyGoalContainer = styled.View`
  padding: 20px ${defaultPaddingFontScale()}px 100px;
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

const InfoContainer = styled.TouchableOpacity`
  padding-left: 10px;
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
