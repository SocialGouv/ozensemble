import React from 'react';
import styled from 'styled-components';

import TextStyled from '../../components/TextStyled';
import {
  ScreenBgStyled,
  TopContainer,
  Title,
  FeedDay,
  FeedContainer,
  FeedDayContent,
  FeedCTAContainer,
  FeedCTAButton,
} from './styles';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import TopTimeline from './TopTimeline';
import Timeline from './Timeline';
import DayModule from './DayModule';
import { getTitle, getTagline, getOnPressCTA, getTextCTA } from './utils';
import Day1 from './day1';
import { createStackNavigator } from '@react-navigation/stack';

const DefiStack = createStackNavigator();

export default () => (
  <DefiStack.Navigator headerMode="none" initialRouteName="MENU">
    <DefiStack.Screen name="MENU" component={Menu} />
    <DefiStack.Screen name="DAY_1" component={Day1} />
    <DefiStack.Screen name="DAY_2" component={Day1} />
    <DefiStack.Screen name="DAY_3" component={Day1} />
    <DefiStack.Screen name="DAY_4" component={Day1} />
    <DefiStack.Screen name="DAY_5" component={Day1} />
    <DefiStack.Screen name="DAY_6" component={Day1} />
    <DefiStack.Screen name="DAY_7" component={Day1} />
  </DefiStack.Navigator>
);

const Menu = ({ navigation, nbdays = 7, validatedDays = 0, unlockedDays = 0, activeDay = 0 }) => {
  const getTitleColor = (i) => {
    if (unlockedDays < i) return '#c4c4c4';
    if (validatedDays > i) return '#4030a5';
    if (activeDay === i) return '#de285e';
  };
  const getSubtitleColor = (i) => {
    if (unlockedDays < i) return '#c4c4c4';
    if (validatedDays > i) return '#191919';
    if (activeDay === i) return '#191919';
  };
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ScreenBgStyled>
        <TopContainer>
          <Title>
            <TextStyled color="#4030a5">Faire le point sur 7 jours</TextStyled>
          </Title>
        </TopContainer>
        <TopTimeline nbdays={nbdays} validatedDays={validatedDays} unlockedDays={unlockedDays} activeDay={activeDay} />
        <FeedCTAContainer zIndex={10}>
          {getOnPressCTA(activeDay) ? (
            <FeedCTAButton content={getTextCTA(activeDay)} onPress={() => navigation.push('DAY_1')} />
          ) : (
            <FeedCTAButton content="Ajouter une consommation" />
          )}
        </FeedCTAContainer>
        <FeedContainer>
          <DayModule day={activeDay} />
          <Separator />
          {[...Array(nbdays)].map((_, i) => {
            return (
              <FeedDay key={i}>
                <Timeline
                  first={i === 0}
                  last={i === nbdays - 1}
                  done={validatedDays > i}
                  locked={unlockedDays < i}
                  active={activeDay === i}
                />
                <FeedDayContent>
                  <TitleDay color={getTitleColor(i)}>{getTitle(i)}</TitleDay>
                  <SubtitleDay color={getSubtitleColor(i)}>{getTagline(i)}</SubtitleDay>
                </FeedDayContent>
              </FeedDay>
            );
          })}
        </FeedContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const TitleDay = styled(TextStyled)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ color }) => color || '#c4c4c4'};
`;
const SubtitleDay = styled(TextStyled)`
  color: ${({ color }) => color || '#c4c4c4'};
`;
const Separator = styled.View`
  background-color: #c4c4c4;
  height: 1px;
  margin: 15px;
  text-align: center;
`;
