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

export default ({ nbdays = 7, validatedDays = 3, unlockedDays = 3, activeDay = 0 }) => {
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
            <FeedCTAButton content={getTextCTA(activeDay)} onPress={getOnPressCTA(activeDay)} />
          ) : (
            <FeedCTAButton content="Ajouter une consommation" />
          )}
        </FeedCTAContainer>
        <FeedContainer>
          <DayModule day={activeDay} />
          <Separator />
          {[...Array(nbdays)].map((_, i) => {
            return (
              <FeedDay>
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
