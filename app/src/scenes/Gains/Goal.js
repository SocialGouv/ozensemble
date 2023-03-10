import React from 'react';
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
} from '../../recoil/gains';
import HelpModalCountConsumption from './HelpModalCountConsumption';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import DrinksCategory from '../../components/DrinksCategory';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';

const Goal = ({ navigation, route }) => {
  const [daysWithGoalNoDrink, setDaysWithGoalNoDrink] = useRecoilState(daysWithGoalNoDrinkState);

  const toggleDayWithGoalNoDrink = (day) =>
    setDaysWithGoalNoDrink((days) => (days.includes(day) ? days.filter((d) => d !== day) : [...days, day]));

  const [drinksByDrinkingDay, setDrinksByDrinkingDay] = useRecoilState(drinksByDrinkingDayState);
  const dosesByDrinkingDay = useRecoilValue(totalDrinksByDrinkingDaySelector);
  const dosesPerWeek = useRecoilValue(maxDrinksPerWeekSelector);

  const isOnboarded = !route.params?.forOnboarding;

  const setDrinkQuantityRequest = (drinkKey, quantity) => {
    const oldDrink = drinksByDrinkingDay.find((drink) => drink.drinkKey === drinkKey);
    if (oldDrink) {
      [
        ...drinksByDrinkingDay.filter((drink) => drink.drinkKey !== drinkKey),
        {
          ...drinksByDrinkingDay.find((drink) => drink.drinkKey === drinkKey),
          quantity,
        },
      ];
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
    <WrapperContainer noPaddingHorizontal onPressBackButton={navigation.goBack} title="Mon objectif">
      <Container>
        <ContainerTime>
          <TextStyled>
            La durée de votre objectif est d'<TextStyled bold>un mois</TextStyled>
          </TextStyled>
        </ContainerTime>
        <Row>
          <Calendar size={24} />
          <TextSemiBold>
            <TextStyled>Jours où je m'engage à ne pas boire d'alcool</TextStyled>
          </TextSemiBold>
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
          <TextSemiBold>
            <TextStyled>Unité(s) par jour que je m'autorise quand je bois de l'alcool</TextStyled>
          </TextSemiBold>
        </Row>
        <Row margins>
          <HelpModalCountConsumption event="GOAL" />
        </Row>
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
        {!!dosesByDrinkingDay && (
          <DrinkByWeekContainer>
            <TextStyled>
              {' '}
              {7 - daysWithGoalNoDrink.length} jours avec {dosesByDrinkingDay} unité
              {dosesByDrinkingDay > 1 ? 's' : ''}
            </TextStyled>
            <TextStyled bold> soit {dosesPerWeek} unités par semaine</TextStyled>
          </DrinkByWeekContainer>
        )}
        <CTAButtonContainer>
          <ButtonPrimary
            content="Continuer"
            onPress={() => {
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
              console.log('Goal');
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
  );
};

const Container = styled.View`
  overflow: hidden;
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const ContainerTime = styled.View`
  margin-bottom: ${screenHeight * 0.03}px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${screenHeight * 0.02}px;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
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

const DrinkByWeekContainer = styled.View`
  align-items: center;
  margin-top: ${screenHeight * 0.01}px;
`;
const TextSemiBold = styled(TextStyled)`
  font-weight: 700;
  margin-left: 10px;
  flex-shrink: 1;
`;

export default Goal;
