import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../../../components/TextStyled';
import WrapperContainer from '../../../components/WrapperContainer';
import ButtonPrimary from '../../../components/ButtonPrimary';
import BackButton from '../../../components/BackButton';
import ProgressBar from '../../../components/ProgressBar';
import H2 from '../../../components/H2';
import TextInputStyled from '../../../components/TextInputStyled';
import { Platform, TouchableOpacity } from 'react-native';
import { logEvent } from '../../../services/logEventsWithMatomo';
import { sendMail } from '../../../services/mail';
import pck from '../../../../package.json';
import { storage } from '../../../services/storage';

const ResultsUserSurvey = ({ navigation, route }) => {
  const [feedback, setFeedback] = useState('');

  return (
    <>
      <BackButton onPress={navigation.goBack} marginLeft marginTop />
      <ProgressBar progress={1} />
      <WrapperContainer noPaddingTop>
        <QuestionNumber>Question facultative</QuestionNumber>
        <QuestionTitle>Pour améliorer l’application, avez-vous des recommandations à nous faire ?</QuestionTitle>

        <FeedBackStyled
          onChangeText={setFeedback}
          placeholder="Idées de nouvelles fonctionnalités ou d’améliorations (facultatif)"
          value={feedback}
          multiline
          textAlignVertical="top"
          returnKeyType="next"
          placeholderTextColor="#c9c9cc"
        />

        <ButtonPrimaryStyled
          content={'Envoyer'}
          disabled={feedback.length === 0}
          onPress={async () => {
            // send
            logEvent({ category: 'QUIZZ_USER_SURVEY', action: 'SEND_LAST_QUESTION' });
            const userId = storage.getString('@UserIdv2');
            await sendMail({
              subject: 'User Survey',
              text: formatText(feedback, userId),
            })
              .then((res) => res.json())
              .catch((err) => console.log('sendMail User Survey err', err));
            navigation.navigate('TABS');
          }}
        />
        <TouchableOpacity
          onPress={() => {
            logEvent({ category: 'QUIZZ_USER_SURVEY', action: 'SKIP_LAST_QUESTION' });
            navigation.navigate('TABS');
          }}>
          <Skip>Passer</Skip>
        </TouchableOpacity>
      </WrapperContainer>
    </>
  );
};

const formatText = (feedback, userId) =>
  `
userId: ${userId}
Version: ${pck.version}
OS: ${Platform.OS}
Appelé depuis: User Survey
Pour améliorer notre application, avez-vous des recommandations à nous faire ? : ${feedback}
`;

export default ResultsUserSurvey;

const Skip = styled(TextStyled)`
  margin-top: 20px;
  margin-bottom: 20px;
  align-self: center;
  text-decoration: underline;
  color: #4030a5;
`;

const FeedBackStyled = styled(TextInputStyled)`
  width: 100%;
  height: 150px;
  border-radius: 3px;
  border: 1px solid #dbdbe9;
  background-color: #f3f3f6;
  border-radius: 7px;
  padding: 15px;
  margin-top: 15px;
  justify-content: flex-start;
  align-items: flex-start;
  color: #4030a5;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
  align-self: center;
`;

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
  margin-bottom: 10px;
`;
