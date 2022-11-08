import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import Section from './Section';
import answers from './answers';
import { Defi4_Day5_Answers_State, Defi4_Day5_ResultState } from '../../../../recoil/quizzs';
import { setValidatedDays } from '../../utils';
import WrapperContainer from '../../../../components/WrapperContainer';
import Element from '../../../../components/ElementDayDefi';
import AddCircle from '../../../../components/illustrations/icons/AddCircle';
import MinusCircle from '../../../../components/illustrations/icons/MinusCircle';
import { screenWidth } from '../../../../styles/theme';

const QuestionnaireDefi4Day5Stack = createStackNavigator();

const QuestionnaireDefi4Day5 = ({ navigation, route }) => {
  const [defi4_Day5_Answers, setDefi4_Day5_Answers] = useRecoilState(Defi4_Day5_Answers_State);
  const setDefi4_Day5_ResultState = useSetRecoilState(Defi4_Day5_ResultState);

  const toggleAnswer = async (answerKey, checked) => {
    setDefi4_Day5_Answers((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) return [...prevAnswers, answerKey];
      if (!checked && prevAnswers.includes(answerKey)) return prevAnswers.filter((key) => key !== answerKey);
      return prevAnswers;
    });
  };

  const validateAnswers = async () => {
    setDefi4_Day5_ResultState(true);
    setValidatedDays(route?.params?.day, '@Defi4');
    navigation.push('QUIZZ_RESULTS');
  };

  return (
    <QuestionnaireDefi4Day5Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuestionnaireDefi4Day5Stack.Screen name="EXPLICATIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Les facteurs influençant ma motivation">
            <Element
              content={
                <>
                  <TextStyled>
                    Pour poursuivre au mieux votre réduction, il faut vous interroger sur vos{' '}
                    <TextStyled bold>difficultés</TextStyled> et vos{' '}
                    <TextStyled bold>sources d’aide et de motivation au quotidien</TextStyled>.
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
                      Les sources d’aide et d’inspiration que vous avez trouvé dans votre quotidien (appelés{' '}
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
                    l’alcool et qui sont liées à votre environnement.
                  </TextStyled>
                </>
              }
            />
            <ButtonsContainer>
              <ButtonPrimary onPress={() => navigation.push('QUIZZ_QUESTIONS')} content="J’ai compris" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi4Day5Stack.Screen>
      <QuestionnaireDefi4Day5Stack.Screen name="QUIZZ_QUESTIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Les facteurs influençant ma consommation">
            <Paragraph>
              <TextStyled>
                Parmi ces exemples, quels facteurs ont pu rendre{' '}
                <TextStyled bold>plus difficile votre réduction de consommation</TextStyled> d’alcool ? Je sélectionne
                les facteurs de risque les plus pertinents.{' '}
              </TextStyled>
            </Paragraph>
            {answers.map((section, id) => (
              <Section key={id} section={section} onToggle={toggleAnswer} answers={defi4_Day5_Answers} />
            ))}
            <ButtonsContainer>
              <ButtonPrimary onPress={() => navigation.push('DEFI4_MENU')} content="Suivant" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi4Day5Stack.Screen>
    </QuestionnaireDefi4Day5Stack.Navigator>
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

export default QuestionnaireDefi4Day5;
