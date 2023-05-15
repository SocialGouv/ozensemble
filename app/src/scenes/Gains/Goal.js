import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import ButtonPrimary from '../../components/ButtonPrimary';
import Calendar from '../../components/illustrations/Calendar';
import CocktailGlassTriangle from '../../components/illustrations/drinksAndFood/CocktailGlassTriangle';
import TextStyled from '../../components/TextStyled';
import { defaultPaddingFontScale, hitSlop, screenHeight } from '../../styles/theme';
import {
  daysWithGoalNoDrinkState,
  drinksByDrinkingDayState,
  maxDrinksPerWeekSelector,
  totalDrinksByDrinkingDaySelector,
  previousDrinksPerWeekState,
} from '../../recoil/gains';

import HelpModalCountConsumption from './HelpModalCountConsumption';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import DrinksCategory from '../../components/DrinksCategory';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import { Modal, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoalSetup from '../../components/illustrations/icons/GoalSetup';
import ModalGoalValidation from '../../components/ModalGoalValidation';
import { setValidatedDays } from '../Defis/utils';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const Goal = ({ navigation, route }) => {
  const [daysWithGoalNoDrink, setDaysWithGoalNoDrink] = useRecoilState(daysWithGoalNoDrinkState);

  const toggleDayWithGoalNoDrink = (day) =>
    setDaysWithGoalNoDrink((days) => (days.includes(day) ? days.filter((d) => d !== day) : [...days, day]));
  const [modalVisible, setModalVisible] = useState(true);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const numberDrinkEstimation = useMemo(() => {
    return previousDrinksPerWeek.reduce(
      (sum, drink) =>
        sum + drink.quantity * drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey).doses, //sum + drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey).doses,
      0
    );
  }, [previousDrinksPerWeek]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setModalVisible(true);
    }
  }, [isFocused]);
  const [drinksByDrinkingDay, setDrinksByDrinkingDay] = useRecoilState(drinksByDrinkingDayState);
  const dosesByDrinkingDay = useRecoilValue(totalDrinksByDrinkingDaySelector);
  const dosesPerWeek = useRecoilValue(maxDrinksPerWeekSelector);
  const [modalValidationVisible, setModalValidationVisible] = useState(false);
  const isOnboarded = !route.params?.forOnboarding;
  const setDrinkQuantityRequest = (drinkKey, quantity) => {
    const oldDrink = drinksByDrinkingDay.find((drink) => drink.drinkKey === drinkKey);
    if (oldDrink) {
      setDrinksByDrinkingDay([
        ...drinksByDrinkingDay.filter((drink) => drink.drinkKey !== drinkKey),
        {
          ...drinksByDrinkingDay.find((drink) => drink.drinkKey === drinkKey),
          quantity,
        },
      ]);
    } else {
      setDrinksByDrinkingDay([
        ...drinksByDrinkingDay,
        {
          drinkKey,
          quantity,
          id: uuidv4(),
        },
      ]);
    }
  };

  return (
    <>
      <View>
        <WrapperContainer
          noPaddingHorizontal
          onPressBackButton={navigation.goBack}
          title="Mon objectif semaine"
          Icon={GoalSetup}>
          <Container>
            <View className="p-5 border rounded-md border-[#4030A5] bg-[#E8E8F3] mb-8">
              <Text className="mb-4">
                Maintenant fixez-vous un <Text className="font-bold">objectif réaliste</Text> en{' '}
                <Text className="font-bold">nombre de jours sans boire</Text> et en{' '}
                <Text className="font-bold">unités autorisées par semaine</Text> afin de réduire votre consommation et
                de diminuer les risques associés à l'usage répété de l'alcool.
              </Text>
              <HelpModalCountConsumption event="PREVIOUS_CONSUMPTION" />
            </View>
            <Row>
              <Calendar size={24} />
              <Text className={'font-bold ml-3'}>
                Jours où je m'engage à ne <Text className="underline">pas</Text> boire d'alcool
              </Text>
            </Row>
            <DayContainer>
              <DayButton
                content="L"
                active={daysWithGoalNoDrink.includes('monday')}
                onPress={() => toggleDayWithGoalNoDrink('monday')}
              />
              <DayButton
                content="M"
                active={daysWithGoalNoDrink.includes('tuesday')}
                onPress={() => toggleDayWithGoalNoDrink('tuesday')}
              />
              <DayButton
                content="M"
                active={daysWithGoalNoDrink.includes('wednesday')}
                onPress={() => toggleDayWithGoalNoDrink('wednesday')}
              />
              <DayButton
                content="J"
                active={daysWithGoalNoDrink.includes('thursday')}
                onPress={() => toggleDayWithGoalNoDrink('thursday')}
              />
              <DayButton
                content="V"
                active={daysWithGoalNoDrink.includes('friday')}
                onPress={() => toggleDayWithGoalNoDrink('friday')}
              />
              <DayButton
                content="S"
                active={daysWithGoalNoDrink.includes('saturday')}
                onPress={() => toggleDayWithGoalNoDrink('saturday')}
              />
              <DayButton
                content="D"
                active={daysWithGoalNoDrink.includes('sunday')}
                onPress={() => toggleDayWithGoalNoDrink('sunday')}
              />
            </DayContainer>
            <Row>
              <CocktailGlassTriangle size={24} />
              <Text className="font-bold ml-3">
                Unités <Text className="underline">par semaine</Text> que je m'autorise à boire{' '}
              </Text>
            </Row>
            <View className="bg-[#F5F6FA] p-2 mb-2">
              <Text className="text-center text-[#939EA6] text-xs">Rappel de ma consommation actuelle par semaine</Text>
              <View className="flex flex-row justify-center items-center mt-2">
                <Text className="text-center font-bold text-xl">{numberDrinkEstimation}</Text>
                <Text className="text-lg font-bold"> {Number(numberDrinkEstimation) > 1 ? 'unités' : 'unité'}</Text>
              </View>
            </View>
          </Container>
          {drinksCatalog
            .map(({ categoryKey }) => categoryKey)
            .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index)
            .map((category, index) => (
              <DrinksCategory
                key={index}
                drinksCatalog={drinksCatalog}
                category={category}
                index={index}
                drinks={drinksByDrinkingDay}
                setDrinkQuantity={setDrinkQuantityRequest}
              />
            ))}
          <Container>
            <View className=" p-2 mt-4">
              <Text>
                Pensez bien à ajouter vos consommations <Text className="font-bold">tous les jours</Text> même quand
                vous n'avez pas bu, pour que l'application puisse vous informer si vous avez réussi ou non votre
                objectif de la semaine !{' '}
              </Text>
            </View>
            <CTAButtonContainer>
              <ButtonPrimary
                content="Valider mon objectif"
                onPress={() => {
                  setModalVisible(false);

                  logEvent({
                    category: 'GAINS',
                    action: 'GOAL_DRINKLESS',
                    name: daysWithGoalNoDrink,
                    value: daysWithGoalNoDrink.length,
                  });
                  logEvent({
                    category: 'GAINS',
                    action: 'GOAL_DRINKWEEK',
                    value: dosesPerWeek,
                  });
                  if (isOnboarded) {
                    navigation.navigate('GAINS_SEVRAGE');
                    return;
                  }
                  logEvent({
                    category: 'REMINDER',
                    action: 'REMINDER_OPEN',
                    name: 'GOAL',
                  });
                  navigation.navigate('GAINS_REMINDER', {
                    enableContinueButton: true,
                    onPressContinueNavigation: ['GAINS_SEVRAGE'],
                  });
                }}
                disabled={!dosesByDrinkingDay || daysWithGoalNoDrink.length === 0}
              />
            </CTAButtonContainer>
          </Container>
        </WrapperContainer>
      </View>
      <ModalGoalValidation
        content={{
          drinksGoal: dosesPerWeek,
          daysGoal: 7 - daysWithGoalNoDrink.length,
        }}
        onUpdate={() => {
          setModalVisible(true);
          setModalValidationVisible(false);
        }}
        onValidate={() => {
          setModalValidationVisible(false);
          logEvent({
            category: 'GAINS',
            action: 'GOAL_DRINKLESS',
            name: daysWithGoalNoDrink,
            value: daysWithGoalNoDrink.length,
          });
          logEvent({
            category: 'GAINS',
            action: 'GOAL_DRINKWEEK',
            value: dosesPerWeek,
          });
          if (isOnboarded) {
            navigation.navigate('GAINS_SEVRAGE');
            return;
          }
          logEvent({
            category: 'REMINDER',
            action: 'REMINDER_OPEN',
            name: 'GOAL',
          });
          navigation.navigate('GAINS_REMINDER', {
            enableContinueButton: true,
            onPressContinueNavigation: ['GAINS_SEVRAGE'],
          });
        }}
        visible={modalValidationVisible}
      />
      <Modal visible={modalVisible}>
        <SafeAreaView className="bg-[#39cec0]"></SafeAreaView>
        <WrapperContainer
          noPaddingHorizontal
          onPressBackButton={navigation.goBack}
          title="Mon objectif semaine"
          Icon={GoalSetup}>
          <Container>
            <View className="p-5 border rounded-md border-[#4030A5] bg-[#E8E8F3] mb-8">
              <Text className="mb-4">
                Maintenant fixez-vous un <Text className="font-bold">objectif réaliste</Text> en{' '}
                <Text className="font-bold">nombre de jours sans boire</Text> et en{' '}
                <Text className="font-bold">unités autorisées par semaine</Text> afin de réduire votre consommation et
                de diminuer les risques associés à l'usage répété de l'alcool.
              </Text>
              <HelpModalCountConsumption event="PREVIOUS_CONSUMPTION" />
            </View>
            <Row>
              <Calendar size={24} />
              <Text className={'font-bold ml-3'}>
                Jours où je m'engage à ne <Text className="underline">pas</Text> boire d'alcool
              </Text>
            </Row>
            <DayContainer>
              <DayButton
                content="L"
                active={daysWithGoalNoDrink.includes('monday')}
                onPress={() => toggleDayWithGoalNoDrink('monday')}
              />
              <DayButton
                content="M"
                active={daysWithGoalNoDrink.includes('tuesday')}
                onPress={() => toggleDayWithGoalNoDrink('tuesday')}
              />
              <DayButton
                content="M"
                active={daysWithGoalNoDrink.includes('wednesday')}
                onPress={() => toggleDayWithGoalNoDrink('wednesday')}
              />
              <DayButton
                content="J"
                active={daysWithGoalNoDrink.includes('thursday')}
                onPress={() => toggleDayWithGoalNoDrink('thursday')}
              />
              <DayButton
                content="V"
                active={daysWithGoalNoDrink.includes('friday')}
                onPress={() => toggleDayWithGoalNoDrink('friday')}
              />
              <DayButton
                content="S"
                active={daysWithGoalNoDrink.includes('saturday')}
                onPress={() => toggleDayWithGoalNoDrink('saturday')}
              />
              <DayButton
                content="D"
                active={daysWithGoalNoDrink.includes('sunday')}
                onPress={() => toggleDayWithGoalNoDrink('sunday')}
              />
            </DayContainer>
            <Row>
              <CocktailGlassTriangle size={24} />
              <Text className="font-bold ml-3">
                Unités <Text className="underline">par semaine</Text> que je m'autorise à boire{' '}
              </Text>
            </Row>
            <View className="bg-[#F5F6FA] p-2 mb-2">
              <Text className="text-center text-[#939EA6] text-xs">Rappel de ma consommation actuelle par semaine</Text>
              <View className="flex flex-row justify-center items-center mt-2">
                <Text className="text-center font-bold text-xl">{numberDrinkEstimation}</Text>
                <Text className="text-lg font-bold"> {Number(numberDrinkEstimation) > 1 ? 'unités' : 'unité'}</Text>
              </View>
            </View>
          </Container>
          {drinksCatalog
            .map(({ categoryKey }) => categoryKey)
            .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index)
            .map((category, index) => (
              <DrinksCategory
                key={index}
                drinksCatalog={drinksCatalog}
                category={category}
                index={index}
                drinks={drinksByDrinkingDay}
                setDrinkQuantity={setDrinkQuantityRequest}
              />
            ))}
          <Container>
            <View className=" p-2 mt-4">
              <Text>
                Pensez bien à ajouter vos consommations <Text className="font-bold">tous les jours</Text> même quand
                vous n'avez pas bu, pour que l'application puisse vous informer si vous avez réussi ou non votre
                objectif de la semaine !{' '}
              </Text>
            </View>
            <CTAButtonContainer>
              <ButtonPrimary
                content="Valider mon objectif"
                onPress={() => {
                  setModalVisible(false);
                  setModalValidationVisible(true);
                }}
                disabled={!dosesByDrinkingDay || daysWithGoalNoDrink.length === 0}
              />
            </CTAButtonContainer>
          </Container>
        </WrapperContainer>
      </Modal>
    </>
  );
};

const Container = styled.View`
  overflow: hidden;
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;
const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${screenHeight * 0.02}px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  ${(props) => props.margins && 'margin-top: 10px;'}
  ${(props) => props.margins && 'margin-bottom: 15px;'}
`;

const CTAButtonContainer = styled.View`
  margin-top: 30px;
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
`;

const DayContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${screenHeight * 0.06}px;
`;

const DayButton = ({ content, onPress, active }) => (
  <QButtonStyled onPress={onPress}>
    <QButtonContentContainer hitSlop={hitSlop(qButtonSize)} backgroundColor={active ? '#4030A5' : '#eeeeee'}>
      <QButtonContent color={active ? '#eeeeee' : '#000000'}>{content}</QButtonContent>
    </QButtonContentContainer>
  </QButtonStyled>
);

const qButtonSize = 35;
const QButtonStyled = styled.TouchableOpacity`
  padding: 1px;
`;

const QButtonContentContainer = styled.View`
  height: ${qButtonSize}px;
  width: ${qButtonSize}px;
  border-radius: ${qButtonSize}px;
  border: 1px solid #4030a5;
  justify-content: center;
  align-items: center;
`;

const QButtonContent = styled(TextStyled)`
  font-size: 16px;
  font-weight: bold;
  line-height: 25px;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;

export default Goal;
