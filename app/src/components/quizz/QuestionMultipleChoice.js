import React from 'react';
import styled, { css } from 'styled-components';
import H2 from '../H2';
import H3 from '../H3';
import { screenWidth } from '../../styles/theme';
import WrapperContainer from '../WrapperContainer';
import ButtonPrimary from '../ButtonPrimary';
import { showBootSplashState } from '../CustomBootsplash';
import { useSetRecoilState } from 'recoil';

const QuestionMultipleChoice = ({
  questionIndex,
  numberOfQuestions,
  questionKey,
  questionTitle,
  selectedAnswerKey,
  answers,
  saveAnswer,
  saveMultipleAnswer,
  navigation,
  from,
}) => {
  const setShowBootsplash = useSetRecoilState(showBootSplashState);

  return (
    <WrapperContainer noPaddingTop>
      <QuestionNumber>
        Question {questionIndex + 1} / {numberOfQuestions}
      </QuestionNumber>
      <QuestionTitle>{questionTitle}</QuestionTitle>
      <QuestionSubtitle>(plusieurs choix autorisés)</QuestionSubtitle>
      <AnswersContainer>
        {answers.map(({ answerKey, content, score }, i) => (
          <AnswerButton
            key={answerKey}
            onPress={async () => {
              saveMultipleAnswer(
                questionIndex,
                questionKey,
                selectedAnswerKey?.includes(answerKey)
                  ? selectedAnswerKey.filter((key) => key !== answerKey)
                  : selectedAnswerKey
                  ? [...selectedAnswerKey, answerKey]
                  : [answerKey],
                score
              );
            }}
            selected={selectedAnswerKey?.includes(answerKey)}
            last={i === answers.length - 1}>
            <AnswerContent selected={selectedAnswerKey?.includes(answerKey)}>{content}</AnswerContent>
          </AnswerButton>
        ))}

        <ButtonPrimary
          onPress={() => {
            saveAnswer(questionIndex, questionKey, selectedAnswerKey, 0);
            setTimeout(async () => {
              const endOfQuestions = questionIndex === numberOfQuestions - 1;
              if (!endOfQuestions) {
                navigation.push(`QUIZZ_QUESTION_${questionIndex + 1 + 1}`);
              } else {
                if (from == 'NEW_USER') {
                  // TODO: fix user survey still appearing after bootsplash hide
                  setShowBootsplash(true);
                  await new Promise((res) => setTimeout(res, 250));
                  navigation.navigate('TABS');
                  await new Promise((res) => setTimeout(res, 750));
                  // RNBootSplash.hide({ fade: true });
                  setShowBootsplash(false);
                  return;
                }
                navigation.navigate('QUIZZ_RESULTS');
              }
            }, 500);
          }}
          content="Valider"
          disabled={!selectedAnswerKey || selectedAnswerKey.length === 0}
        />
      </AnswersContainer>
    </WrapperContainer>
  );
};

const AnswersContainer = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 0;
  padding-right: 10px;
  border: 1px solid transparent;
`;

const AnswerButton = styled.TouchableOpacity`
  width: 100%;
  /* min-height: 50px; */
  padding-vertical: 8px;
  background-color: ${({ selected }) => (selected ? '#5352a3' : '#f3f3f6')};
  border-color: ${({ selected }) => (selected ? '#4030a5' : '#dbdbe9')};
  border-width: 1px;
  border-radius: 7px;
  padding-left: 15px;
  justify-content: center;
  margin-bottom: ${({ last }) => (last ? 50 : 10)}px;
`;

const AnswerContent = styled(H2)`
  font-weight: 500;
  color: ${({ selected }) => (selected ? '#f9f9f9' : '#191919')};
`;

/*
QUESTION
*/

const commonCss = css`
  margin-bottom: 15px;
  flex-shrink: 0;
`;

const QuestionNumber = styled(H2)`
  ${commonCss}
`;

const QuestionTitle = styled(H2)`
  color: #4030a5;
  ${commonCss}
  margin-bottom: 10;
`;
const QuestionSubtitle = styled(H3)`
  ${commonCss}
  font-style: italic;
  margin-bottom: ${Math.min(30, screenWidth * 0.05)}px;
`;

export default QuestionMultipleChoice;
