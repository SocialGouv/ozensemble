import React from 'react';
import styled, { css } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Background from '../../../components/Background';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import ResultsMotivations from './ResultsMotivations';
import Section from './Section';
import sections from './sections';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import H1 from '../../../components/H1';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { motivationsQuizzAnswersState, motivationsQuizzResultState } from '../../../recoil/quizzs';
import { setValidatedDays } from '../../Defis/utils';

const QuizzMotivationsStack = createStackNavigator();

const QuizzMotivations = ({ navigation, route }) => {
  const [motivationsQuizzAnswers, setMotivationsQuizzAnswers] = useRecoilState(motivationsQuizzAnswersState);
  const setMotivationsQuizzResult = useSetRecoilState(motivationsQuizzResultState);

  const toggleAnswer = async (answerKey, checked) => {
    setMotivationsQuizzAnswers((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) return [...prevAnswers, answerKey];
      if (!checked && prevAnswers.includes(answerKey)) return prevAnswers.filter((key) => key !== answerKey);
      return prevAnswers;
    });
  };

  const validateAnswers = async () => {
    setMotivationsQuizzResult(true);
    setValidatedDays(route?.params?.day, '@Defi1');
    navigation.push('QUIZZ_RESULTS');
  };

  return (
    <Background color="#39cec0" withSwiperContainer>
      <QuizzMotivationsStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
        headerMode="none"
        initialRouteName={route?.params?.initialRouteName}>
        <QuizzMotivationsStack.Screen name="QUIZZ_QUESTIONS">
          {({ navigation }) => (
            <ScreenBgStyled>
              <TopContainer>
                <BackButton onPress={navigation.goBack} />
                <TopTitleContainer>
                  <TopTitle>
                    <TextStyled color="#4030a5">
                      Quelles raisons vous motivent à changer votre consommation ?
                    </TextStyled>
                  </TopTitle>
                </TopTitleContainer>
                <Paragraph>
                  <TextStyled>Sélectionnez vos principales raisons pour changer votre consommation d'alcool</TextStyled>
                </Paragraph>
                {sections.map((section, id) => (
                  <Section key={id} section={section} onToggle={toggleAnswer} answers={motivationsQuizzAnswers} />
                ))}
                <ButtonsContainer>
                  <ButtonPrimary onPress={validateAnswers} content="Je valide" />
                </ButtonsContainer>
              </TopContainer>
            </ScreenBgStyled>
          )}
        </QuizzMotivationsStack.Screen>
        <QuizzMotivationsStack.Screen
          name="QUIZZ_RESULTS"
          initialParams={route?.params}
          component={ResultsMotivations}
        />
      </QuizzMotivationsStack.Navigator>
    </Background>
  );
};

const commonCss = css`
  width: 100%;
  flex-shrink: 0;
`;

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const TopContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px ${(props) => (props.shortPaddingBottom ? 30 : 100)}px;
`;

const TopTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
  max-width: 95%;
`;

const ButtonsContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const TopTitle = styled(H1)``;

export default QuizzMotivations;
