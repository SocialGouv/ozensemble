import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import H2 from "../H2";
import WrapperContainer from "../WrapperContainer";

export default function Question({
  questionIndex,
  numberOfQuestions,
  questionKey,
  questionTitle,
  selectedAnswerKey,
  answers,
  saveAnswer,
  navigation,
}) {
  return (
    <WrapperContainer noPaddingTop>
      <H2 className="mb-4">
        Question {questionIndex + 1} / {numberOfQuestions}
      </H2>
      <H2 className="mb-5 text-[#4030a5]">{questionTitle}</H2>
      <ScrollView className="bg-[#f9f9f9] flex-shrink-1 flex-grow-0 pr-2.5 border border-transparent">
        {answers.map(({ answerKey, content, score }, i) => (
          <TouchableOpacity
            key={answerKey}
            onPress={async () => {
              saveAnswer(questionIndex, questionKey, answerKey, score);
              setTimeout(() => {
                const endOfQuestions = questionIndex === numberOfQuestions - 1;
                if (!endOfQuestions) {
                  navigation.push(`QUIZZ_QUESTION_${questionIndex + 1 + 1}`);
                } else {
                  navigation.navigate("QUIZZ_RESULTS");
                }
              }, 500);
            }}
            className={[
              "w-full py-2 px-4 rounded-lg mb-2.5 border",
              answerKey === selectedAnswerKey ? "bg-[#5352a3] border-[#4030a5]" : "bg-[#f3f3f6] border-[#dbdbe9]",
              i === answers.length - 1 ? "mb-14" : "",
            ].join(" ")}
          >
            <H2
              className={["font-medium", answerKey === selectedAnswerKey ? "text-[#f9f9f9]" : "text-[#191919]"].join(
                " "
              )}
            >
              {content}
            </H2>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </WrapperContainer>
  );
}
