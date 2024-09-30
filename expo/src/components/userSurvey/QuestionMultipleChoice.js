import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import H2 from "../H2";
import H3 from "../H3";
import WrapperContainer from "../WrapperContainer";
import ButtonPrimary from "../ButtonPrimary";
import { showBootSplashState } from "../CustomBootsplash";
import { useSetRecoilState } from "recoil";
import BackButton from "../BackButton";
import ProgressBar from "../ProgressBar";
import CloseButton from "../CloseButton";
import { logEvent } from "../../services/logEventsWithMatomo";

export default function QuestionMultipleChoice({
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
}) {
  const setShowBootsplash = useSetRecoilState(showBootSplashState);

  const handleClose = () => {
    logEvent({
      category: `QUIZZ${event}`,
      action: "QUIZZ_CLOSE_BUTTON",
      name: questionKey,
    });
    navigation.navigate("TABS");
  };

  return (
    <>
      {questionIndex > 0 ? (
        <View className="flex-row justify-between items-end px-4">
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
          <TouchableOpacity onPress={handleClose}>
            <CloseButton />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row justify-end items-end pt-5 px-4">
          <TouchableOpacity onPress={handleClose}>
            <CloseButton />
          </TouchableOpacity>
        </View>
      )}
      <ProgressBar progress={progress} />
      <WrapperContainer noPaddingTop>
        <H2 className="mb-4">
          Question {questionIndex + 1} / {numberOfQuestions}
        </H2>
        <H2 className={["mb-5 text-[#4030a5]", questionTitle.length > 100 ? "text-[18px]" : ""].join(" ")}>
          {questionTitle}
        </H2>
        <H3 className="mb-5 italic">(plusieurs choix autorisés)</H3>
        <ScrollView className="bg-[#f9f9f9] flex-shrink-1 flex-grow-0 pr-2.5 border border-transparent">
          {answers.map(({ answerKey, content, score }, i) => (
            <TouchableOpacity
              key={answerKey}
              onPress={() => {
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
              className={[
                "w-full py-2 px-4 rounded-lg mb-2.5 border",
                selectedAnswerKey?.includes(answerKey)
                  ? "bg-[#5352a3] border-[#4030a5]"
                  : "bg-[#f3f3f6] border-[#dbdbe9]",
                i === answers.length - 1 ? "mb-[50px]" : "",
              ].join(" ")}
            >
              <H2
                className={[
                  "font-medium",
                  selectedAnswerKey?.includes(answerKey) ? "text-[#f9f9f9]" : "text-[#191919]",
                ].join(" ")}
              >
                {content}
              </H2>
            </TouchableOpacity>
          ))}

          <ButtonPrimary
            onPress={() => {
              setTimeout(async () => {
                logMultipleAnswer(questionIndex, questionKey, getAnswerScores(selectedAnswerKey, answers));
                const endOfQuestions = questionIndex === numberOfQuestions - 1;
                if (!endOfQuestions) {
                  navigation.push(`QUIZZ_QUESTION_${questionIndex + 1 + 1}`);
                } else {
                  if (from === "NEW_USER") {
                    setShowBootsplash(true);
                    await new Promise((res) => setTimeout(res, 100));
                    navigation.navigate("TABS");
                    return;
                  }
                  navigation.navigate("QUIZZ_RESULTS");
                }
              }, 500);
            }}
            content="Suivant"
            disabled={!selectedAnswerKey || selectedAnswerKey.length === 0}
          />
        </ScrollView>
      </WrapperContainer>
    </>
  );
}

function getAnswerScores(selectedAnswerKey, answers) {
  return selectedAnswerKey?.map((key) => answers.find((a) => a.answerKey === key)?.score).filter(Boolean) || [];
}
