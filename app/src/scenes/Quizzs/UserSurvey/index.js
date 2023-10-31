import React from 'react';
import QuizzUserSurvey from '../../../components/userSurvey';
import { userSurveyQuizzAnswersState, userSurveyQuizzResultState } from '../../../recoil/quizzs';
import questionsUserSurvey from './questions';
import ResultsUserSurvey from './ResultsUserSurvey';

const UserSurvey = ({ navigation, route }) => (
  <QuizzUserSurvey
    navigation={navigation}
    route={route}
    event={'_USER_SURVEY'}
    questions={questionsUserSurvey}
    recoilAnswersState={userSurveyQuizzAnswersState}
    recoilResultState={userSurveyQuizzResultState}
    calculateScore={false}
    Results={ResultsUserSurvey}
    closeButton={true}
  />
);

export default UserSurvey;
