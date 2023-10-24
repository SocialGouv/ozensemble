import React from 'react';
import Quizz from '../../../components/quizz';
import { userSurveyQuizzAnswersState, userSurveyQuizzResultState } from '../../../recoil/quizzs';
import questionsUserSurvey from './questions';
import ResultsUserSurvey from './ResultsUserSurvey';

const UserSurvey = ({ navigation, route }) => (
  <Quizz
    navigation={navigation}
    route={route}
    event={'_USER_SURVEY'}
    questions={questionsUserSurvey}
    recoilAnswersState={userSurveyQuizzAnswersState}
    recoilResultState={userSurveyQuizzResultState}
    calculateScore={false}
    Results={ResultsUserSurvey}
  />
);

export default UserSurvey;
