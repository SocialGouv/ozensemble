import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import ResultsQuestionnaireDefi3Day3 from './ResultsQuestionnaireDefi3Day3';
import Section from './Section';
import sections from './sections';
import {
  defi3_Day3_Answers_Difficulties_State,
  defi3_Day3_Answers_Help_State,
  defi3_Day3_ResultState,
} from '../../../../recoil/quizzs';
import { setValidatedDays } from '../../utils';
import WrapperContainer from '../../../../components/WrapperContainer';
import Element from '../../../../components/ElementDayDefi';
import AddCircle from '../../../../components/illustrations/icons/AddCircle';
import MinusCircle from '../../../../components/illustrations/icons/MinusCircle';
import { screenWidth } from '../../../../styles/theme';

const QuestionnaireDefi3Day3Stack = createStackNavigator();

const QuestionnaireDefi3Day3 = ({ navigation, route }) => {
  const [defi3_Day3_answers_Difficulties, setDefi3_Day3_Answers_Difficulties_State] = useRecoilState(
    defi3_Day3_Answers_Difficulties_State
  );
  const [defi3_Day3_answers_Help, setDefi3_Day3_Answers_Help_State] = useRecoilState(defi3_Day3_Answers_Help_State);
  const setDefi3_Day3_ResultState = useSetRecoilState(defi3_Day3_ResultState);

  const toggleAnswerDifficulties = async (answerKey, checked) => {
    setDefi3_Day3_Answers_Difficulties_State((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) return [...prevAnswers, answerKey];
      if (!checked && prevAnswers.includes(answerKey)) return prevAnswers.filter((key) => key !== answerKey);
      return prevAnswers;
    });
  };

  const toggleAnswerHelp = async (answerKey, checked) => {
    setDefi3_Day3_Answers_Help_State((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) return [...prevAnswers, answerKey];
      if (!checked && prevAnswers.includes(answerKey)) return prevAnswers.filter((key) => key !== answerKey);
      return prevAnswers;
    });
  };

  const validateAnswers = async () => {
    setDefi3_Day3_ResultState(true);
    setValidatedDays(route?.params?.day, '@Defi3');
    navigation.push('QUIZZ_RESULTS');
  };

  return (
    <QuestionnaireDefi3Day3Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuestionnaireDefi3Day3Stack.Screen name="EXPLICATIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Les facteurs influençant ma motivation">
            <Element
              content={
                <>
                  <TextStyled>
                    Pour poursuivre au mieux votre réduction, il faut vous interroger sur vos{' '}
                    <TextStyled bold>difficultés</TextStyled> et vos{' '}
                    <TextStyled bold>sources d'aide et de motivation au quotidien</TextStyled>.
                  </TextStyled>
                </>
              }
            />
            <Element
              contentView={
                <>
                  <TextStyled>Procédons en deux étapes en identifiant : {'\n\n'}</TextStyled>
                  <CircleContainer>
                    <AddCircleStyled />
                    <TextStyledWidth>
                      Les éléments ayant rendu votre réduction difficile à maintenir dans le temps malgré votre objectif
                      (appelés{' '}
                      <TextStyled bold italic>
                        facteurs de risque
                      </TextStyled>
                      ).
                    </TextStyledWidth>
                  </CircleContainer>
                  <CircleContainer>
                    <MinusCircleStyled />
                    <TextStyledWidth>
                      Les sources d'aide et d'inspiration que vous avez trouvé dans votre quotidien (appelés{' '}
                      <TextStyled bold italic>
                        facteurs protecteurs
                      </TextStyled>
                      ).
                    </TextStyledWidth>
                  </CircleContainer>
                </>
              }
            />
            <ImageView>
              <ImageStyled source={require('../../../../assets/illustrations/Defi3_day3.png')} />
            </ImageView>

            <Legend>Ma motivation</Legend>
            <Element
              content={
                <>
                  <TextStyled>
                    A la fin ce cet exercice, vous comprendrez mieux les raisons qui peuvent vous pousser à consommer de
                    l'alcool et qui sont liées à votre environnement.
                  </TextStyled>
                </>
              }
            />
            <ButtonsContainer>
              <ButtonPrimary onPress={() => navigation.push('QUIZZ_QUESTIONS_1')} content="J'ai compris" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi3Day3Stack.Screen>
      <QuestionnaireDefi3Day3Stack.Screen name="QUIZZ_QUESTIONS_1">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Les facteurs influençant ma consommation">
            <Paragraph>
              <TextStyled>
                Parmi ces exemples, quels facteurs ont pu rendre{' '}
                <TextStyled bold>plus difficile votre réduction de consommation</TextStyled> d'alcool ? Je sélectionne
                les facteurs de risque les plus pertinents.{' '}
              </TextStyled>
            </Paragraph>
            {sections.difficulties.map((section, id) => (
              <Section
                key={id}
                section={section}
                onToggle={toggleAnswerDifficulties}
                answers={defi3_Day3_answers_Difficulties}
              />
            ))}
            <ButtonsContainer>
              <ButtonPrimary onPress={() => navigation.push('QUIZZ_QUESTIONS_2')} content="Suivant" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi3Day3Stack.Screen>
      <QuestionnaireDefi3Day3Stack.Screen name="QUIZZ_QUESTIONS_2">
        {({ navigation }) => (
          <WrapperContainer
            onPressBackButton={navigation.goBack}
            title="Quelles raisons vous motivent à changer votre consommation ?">
            <Paragraph>
              <TextStyled>Sélectionnez vos principales raisons pour changer votre consommation d'alcool</TextStyled>
            </Paragraph>
            {sections.help.map((section, id) => (
              <Section key={id} section={section} onToggle={toggleAnswerHelp} answers={defi3_Day3_answers_Help} />
            ))}
            <ButtonsContainer>
              <ButtonPrimary onPress={validateAnswers} content="Suivant" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi3Day3Stack.Screen>
      <QuestionnaireDefi3Day3Stack.Screen
        name="QUIZZ_RESULTS"
        initialParams={{ ...route?.params }}
        component={ResultsQuestionnaireDefi3Day3}
      />
    </QuestionnaireDefi3Day3Stack.Navigator>
  );
};

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const ButtonsContainer = styled.View`
  margin-top: 10px;
  align-items: center;
  width: 100%;
`;

const CircleContainer = styled.View`
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 10px;
`;

const TextStyledWidth = styled(TextStyled)`
  flex-shrink: 1;
`;

const AddCircleStyled = styled(AddCircle)`
  margin-right: 10px;
`;

const MinusCircleStyled = styled(MinusCircle)`
  margin-right: 10px;
`;

const Legend = styled(TextStyled)`
  color: #575656;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
`;

const ImageView = styled.View`
  margin-top: 10px;
  align-items: center;
  margin-bottom: 15px;
`;

const ImageStyled = styled.Image`
  width: ${screenWidth * 0.8}px;
  height: ${screenWidth * 0.4}px;
`;

export default QuestionnaireDefi3Day3;
