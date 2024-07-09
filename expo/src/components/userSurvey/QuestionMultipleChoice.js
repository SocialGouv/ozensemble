import React from "react";
import styled, { css } from "styled-components/native";
import H2 from "../H2";
import H3 from "../H3";
import { defaultPaddingFontScale, screenWidth } from "../../styles/theme";
import WrapperContainer from "../WrapperContainer";
import ButtonPrimary from "../ButtonPrimary";
import { showBootSplashState } from "../CustomBootsplash";
import { useSetRecoilState } from "recoil";
import { TouchableOpacity } from "react-native";
import BackButton from "../BackButton";
import ProgressBar from "../ProgressBar";
import CloseButton from "../CloseButton";
import { logEvent } from "../../services/logEventsWithMatomo";

const QuestionMultipleChoice = ({
  questionIndex,
  numberOfQuestions,
  questionKey,
  questionTitle,
  selectedAnswerKey,
  answers,
  saveMultipleAnswer,
  logMultipleAnswer,
  navigation,
  from,
  progress,
  event,
}) => {
  const setShowBootsplash = useSetRecoilState(showBootSplashState);

  return (
    <>
      {questionIndex > 0 ? (
        <HeaderContainer>
          <BackButton
            onPress={() => {
              navigation.goBack();
              logEvent({
                category: `QUIZZ${event}`,
                action: "QUIZZ_BACK_BUTTON",
                name: questionKey,
              });
            }}
            marginLeft
            marginTop
          />
          <TouchableOpacity
            onPress={() => {
              logEvent({
                category: `QUIZZ${event}`,
                action: "QUIZZ_CLOSE_BUTTON",
                name: questionKey,
              });
              navigation.navigate("TABS");
            }}>
            <CloseButton />
          </TouchableOpacity>
        </HeaderContainer>
      ) : (
        <CloseOnlyContainer>
          <TouchableOpacity
            onPress={() => {
              logEvent({
                category: `QUIZZ${event}`,
                action: "QUIZZ_CLOSE_BUTTON",
                name: questionKey,
              });
              navigation.navigate("TABS");
            }}>
            <CloseButton />
          </TouchableOpacity>
        </CloseOnlyContainer>
      )}
      <ProgressBar progress={progress} />
      <WrapperContainer noPaddingTop>
        <QuestionNumber>
          Question {questionIndex + 1} / {numberOfQuestions}
        </QuestionNumber>
        <QuestionTitle reduceSize={questionTitle.length > 100}>{questionTitle}</QuestionTitle>
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
              <AnswerContent selected={selectedAnswerKey?.includes(answerKey)}>
                {content}
              </AnswerContent>
            </AnswerButton>
          ))}

          <ButtonPrimary
            onPress={() => {
              setTimeout(async () => {
                logMultipleAnswer(
                  questionIndex,
                  questionKey,
                  getAnswerScores(selectedAnswerKey, answers)
                );
                const endOfQuestions = questionIndex === numberOfQuestions - 1;
                if (!endOfQuestions) {
                  navigation.push(`QUIZZ_QUESTION_${questionIndex + 1 + 1}`);
                } else {
                  if (from === "NEW_USER") {
                    navigation.navigate("TABS");
                    await new Promise((res) => setTimeout(res));
                    setShowBootsplash(true);
                    return;
                  }
                  navigation.navigate("QUIZZ_RESULTS");
                }
              }, 500);
            }}
            content="Suivant"
            disabled={!selectedAnswerKey || selectedAnswerKey.length === 0}
          />
        </AnswersContainer>
      </WrapperContainer>
    </>
  );
};

const getAnswerScores = (selectedAnswerKey, answers) => {
  const answerScores = [];

  for (let i = 0; i < selectedAnswerKey.length; i++) {
    const answerKey = selectedAnswerKey[i];
    const answer = answers.find((a) => a.answerKey === answerKey);
    const score = answer.score;
    answerScores.push(score);
  }

  return answerScores;
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
  background-color: ${({ selected }) => (selected ? "#5352a3" : "#f3f3f6")};
  border-color: ${({ selected }) => (selected ? "#4030a5" : "#dbdbe9")};
  border-width: 1px;
  border-radius: 7px;
  padding-left: 15px;
  justify-content: center;
  margin-bottom: ${({ last }) => (last ? 50 : 10)}px;
`;

const AnswerContent = styled(H2)`
  font-weight: 500;
  color: ${({ selected }) => (selected ? "#f9f9f9" : "#191919")};
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
  ${({ reduceSize }) => reduceSize && "font-size: 18px;"}
  margin-bottom: ${Math.min(30, screenWidth * 0.05)}px;
`;
const QuestionSubtitle = styled(H3)`
  ${commonCss}
  font-style: italic;
  margin-bottom: ${Math.min(30, screenWidth * 0.05)}px;
`;

export default QuestionMultipleChoice;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: ${defaultPaddingFontScale()}px;
`;

const CloseOnlyContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  padding-top: 20px;
  margin-right: ${defaultPaddingFontScale()}px;
`;
