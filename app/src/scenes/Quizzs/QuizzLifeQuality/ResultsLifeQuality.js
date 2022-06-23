import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components';
import { selector, useRecoilValue } from 'recoil';
import HeaderQuizzsResult from '../../Defis/HeaderQuizzsResult';
import { setValidatedDays } from '../../Defis/utils';
import Sources from '../Sources';
import { screenWidth } from '../../../styles/theme';
import { lifeQualityQuizzResultState } from '../../../recoil/quizzs';
import TextStyled from '../../../components/TextStyled';
import questionsLifeQuality from './questions';
import H3 from '../../../components/H3';
import { P } from '../../../components/Articles';

const resultsToDisplaySelector = selector({
  key: 'resultsToDisplaySelector',
  get: ({ get }) => {
    const resultKey = get(lifeQualityQuizzResultState);
    if (!resultKey?.length) return null;
    return [...resultKey]
      .sort((a, b) => Number(b.score) - Number(a.score))
      .map((result) => {
        const question = questionsLifeQuality.find((q) => q.resultLabel === result.title);
        const response = question?.answers.find((a) => a.score === result.score);

        //hide if good score for these questions
        if (['Handicap physique', 'Frein psychique'].includes(question.resultLabel) && response.score > 0) {
          return null;
        }

        return { response, question };
      })
      .filter(Boolean);
  },
});

const Wrapper = ({ children, wrapped, inMyTests }) => {
  const resultKey = useRecoilValue(lifeQualityQuizzResultState);
  if (!resultKey) return null;
  if (!wrapped) return <>{children}</>;
  return (
    <FullScreenBackground>
      <HeaderQuizzsResult inMyTests={inMyTests} />
      <ResultContainer>
        {resultKey ? (
          <>
            {children}
            <Sources>
              <TextStyled>
                “How to Score and Interpret Single-Item Health Status Measures: A Manual for Users of the SF-8 Health
                Survey” Ware, Kosinski, Dewey & Gandek, 2001
              </TextStyled>
            </Sources>
          </>
        ) : null}
      </ResultContainer>
    </FullScreenBackground>
  );
};

const ResultsLifeQuality = ({ wrapped = true, route }) => {
  const isFocused = useIsFocused();
  const resultKey = useRecoilValue(lifeQualityQuizzResultState);
  const resultsToDisplay = useRecoilValue(resultsToDisplaySelector);

  useEffect(() => {
    if (resultKey && route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused, resultKey]);

  if (!resultKey || !resultsToDisplay) return null;

  const inMyTests = route?.params?.rootRoute === 'QUIZZ_MENU';

  return (
    <Wrapper wrapped={wrapped} inMyTests={inMyTests}>
      <ContainerSection>
        <ResultTitle>Votre bilan "Qualité de vie"</ResultTitle>
        <ItemsContainer>
          {resultKey.length === 0 ? <P>Aucun élément à afficher.</P> : null}
          {resultsToDisplay.map(({ response, question }, i) => (
            <EmojiBlock key={i} response={response} question={question} />
          ))}
        </ItemsContainer>
      </ContainerSection>
    </Wrapper>
  );
};

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const ResultContainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
  height: 100%;
`;

const EmojiBlock = ({ response, question }) => {
  const scoreToColor = (score) => {
    if (score < 0) return '#c0184a';
    if (score > 0) return '#39cec0';
    if (score === 0) return '#FF9933';
  };
  return (
    <ItemContainer>
      <ItemStyled color={scoreToColor(response.score)}>
        <EmojiStyled>{response.emoji}</EmojiStyled>
      </ItemStyled>
      <TextStyled bold>{question.resultLabel}</TextStyled>
    </ItemContainer>
  );
};

const ItemStyled = styled.View`
  margin: 10px;
  max-width: ${screenWidth / 3}px;
  min-width: ${screenWidth / 3}px;
  max-height: ${screenWidth / 3}px;
  min-height: ${screenWidth / 3}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color || '#fff'};
  border-radius: 30px;
`;

const EmojiStyled = styled(TextStyled)`
  font-size: ${(screenWidth / 3) * 0.4}px;
  text-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
`;

const ItemContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
const ItemsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ContainerSection = styled.View`
  margin-top: 5px;
  margin-bottom: 20px;
`;

const ResultTitle = styled(H3)`
  width: 85%;
  flex-shrink: 0;
  font-weight: bold;
  color: #4030a5;
`;
export default ResultsLifeQuality;
