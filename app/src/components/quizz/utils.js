// Utils
export const findQuestion = (questions, questionKey) =>
  questions.find((question) => question.questionKey === questionKey);
const findAnswer = ({ answers }, answerKey) => answers.find((answer) => answer.answerKey === answerKey);
export const getAnswerScore = (questions, answers, questionKey) =>
  findAnswer(findQuestion(questions, questionKey), answers[questionKey])?.score;
