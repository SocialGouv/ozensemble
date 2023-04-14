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
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

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
        <View className="p-4 rounded-xl bg-[#E8E8F3] border border-[#4030A5] mt-8">
          <Svg
            width="40"
            height="40"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="m-auto shrink-0">
            <Path
              d="M21.4332 0.130302C21.3297 0.194986 20.3465 1.15232 19.2598 2.24548C17.4616 4.05665 17.274 4.27011 17.2352 4.50297C17.2093 4.64527 17.08 5.89368 16.9377 7.27793L16.6854 9.80062L13.6194 12.8731C11.9311 14.5679 10.5145 16.0168 10.4757 16.0944C10.4369 16.172 10.4045 16.392 10.4045 16.5795C10.4045 17.207 10.7991 17.6016 11.4266 17.6016C11.6141 17.6016 11.8341 17.5692 11.9117 17.5304C11.9893 17.4916 13.4382 16.075 15.133 14.3867L18.2055 11.3207L20.7282 11.0684C22.1124 10.9261 23.3608 10.7968 23.5031 10.7709C23.736 10.7321 23.9559 10.538 25.7865 8.71392C26.9055 7.60782 27.8564 6.62462 27.9081 6.52759C28.0504 6.24945 28.0246 5.69316 27.8499 5.44089C27.5718 5.02044 27.4877 5.00104 25.3466 4.83286C24.2729 4.7423 23.3802 4.65821 23.3608 4.64527C23.3479 4.62587 23.2638 3.73322 23.1732 2.65946C23.0051 0.51841 22.9857 0.434319 22.5652 0.156176C22.2871 -0.0378761 21.7178 -0.0508137 21.4332 0.130302ZM21.2004 4.79405C21.3362 6.66343 21.3685 6.69577 23.6002 6.83161C24.0077 6.85748 24.3828 6.89629 24.4217 6.92217C24.4734 6.94804 24.1953 7.27793 23.6325 7.83422L22.7593 8.70746L20.8317 8.90151L18.9105 9.09556L19.1046 7.17443L19.2986 5.24684L20.1719 4.3736C20.7217 3.81731 21.0581 3.5327 21.0839 3.58445C21.1033 3.62326 21.1616 4.17308 21.2004 4.79405Z"
              fill="#4030A5"
            />
            <Path
              d="M10.1469 5.18445C7.35896 5.50788 4.64221 6.92446 2.83751 9.0073C-1.71627 14.2532 -0.661914 22.2353 5.08853 26.0775C8.43919 28.3221 12.7472 28.6261 16.3954 26.8796C19.9595 25.1719 22.3852 21.7307 22.8185 17.7785C22.9544 16.5754 22.8897 15.4111 22.6245 14.1174C22.4304 13.1924 22.1652 12.8431 21.6089 12.7655C21.2532 12.7202 20.8004 12.8884 20.6193 13.1406C20.3541 13.5093 20.3476 13.7099 20.5352 14.609C20.6904 15.314 20.7163 15.5857 20.7163 16.5301C20.7163 17.3387 20.6904 17.785 20.5999 18.2119C19.9271 21.5949 17.6308 24.2599 14.4419 25.366C13.4328 25.7153 12.6825 25.8382 11.4729 25.8382C9.88812 25.8447 8.69145 25.573 7.35249 24.9067C4.68102 23.5742 2.86986 21.1874 2.28123 18.2119C2.11952 17.4098 2.11952 15.7151 2.28123 14.913C3.05097 11.0319 5.91002 8.17287 9.79109 7.40313C10.2115 7.31904 10.6708 7.2867 11.4729 7.2867C12.4237 7.2867 12.6825 7.31257 13.394 7.46135C14.2931 7.6554 14.4936 7.64893 14.8624 7.38372C15.1146 7.20261 15.2828 6.74982 15.2375 6.39405C15.1599 5.83777 14.8106 5.57256 13.8856 5.37851C12.6243 5.11977 11.3176 5.04862 10.1469 5.18445Z"
              fill="#4030A5"
            />
            <Path
              d="M10.1459 10.4521C7.84311 10.9567 6.07076 12.632 5.41098 14.9218C5.28161 15.3682 5.26221 15.5752 5.26221 16.5648C5.26221 17.5545 5.28161 17.7615 5.41098 18.2078C6.03842 20.3683 7.63612 21.966 9.79658 22.5934C10.2429 22.7228 10.4499 22.7422 11.4396 22.7422C12.4292 22.7422 12.6362 22.7228 13.0826 22.5934C15.2301 21.9724 16.8472 20.3683 17.4552 18.2402C17.5522 17.9232 17.604 17.5027 17.6299 16.9853C17.6557 16.2802 17.6428 16.1897 17.5264 15.9956C17.1189 15.3552 16.0774 15.3617 15.7023 16.015C15.6311 16.1314 15.56 16.4613 15.5212 16.8236C15.3853 18.1561 14.8161 19.1716 13.7876 19.909C11.4654 21.5649 8.17301 20.3295 7.45501 17.5286C7.37739 17.2246 7.35798 16.9271 7.37739 16.3708C7.40326 15.7304 7.4356 15.5557 7.61025 15.1094C8.09538 13.8869 9.18855 12.9102 10.4499 12.5867C10.6569 12.535 11.1808 12.4832 11.6142 12.4703C12.2934 12.4574 12.4228 12.438 12.5845 12.3215C13.2249 11.8429 13.2249 11.002 12.5845 10.5233C12.4228 10.4004 12.2999 10.3875 11.4848 10.3745C10.8833 10.3681 10.424 10.3939 10.1459 10.4521Z"
              fill="#4030A5"
            />
          </Svg>
          <TextStyled bold color={'#4030A5'} className="text-center mt-1">
            Mon objectif
          </TextStyled>
          {!!dosesByDrinkingDay && (
            <DrinkByWeekContainer lineHeight={20} className="mt-4 text-center">
              <TextStyled>
                {' '}
                {7 - daysWithGoalNoDrink.length} jours avec {dosesByDrinkingDay} unité
                {dosesByDrinkingDay > 1 ? 's' : ''} par jour
              </TextStyled>
              <TextStyled bold className="mt-1 text-center">
                {' '}
                soit {dosesPerWeek} unités par semaine maximum
              </TextStyled>
              <TextStyled italic className="mt-1 text-center">
                (unités arrondies au chiffre supérieur)
              </TextStyled>
            </DrinkByWeekContainer>
          )}
        </View>
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
