import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import answers from './answers';
import { Defi4_Day5_Answers_State, Defi4_Day5_ResultState } from '../../../../recoil/quizzs';
import { setValidatedDays } from '../../utils';
import WrapperContainer from '../../../../components/WrapperContainer';
import Element from '../../../../components/ElementDayDefi';
import CheckboxLabelled from '../../../../components/CheckboxLabelled';

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
    if (route?.params?.inDefi4) {
      setValidatedDays(route?.params?.day, '@Defi4');
      navigation.navigate('DEFI4_MENU');
    } else {
      navigation.push('TESTS_DEFIS');
    }
  };

  return (
    <QuestionnaireDefi4Day5Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuestionnaireDefi4Day5Stack.Screen name="EXPLICATIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Comment atteindre mon objectif ?">
            <Element
              content={
                <>
                  Le meilleur moyen de diminuer l’alcool est de{' '}
                  <TextStyled bold>vous faire plaisir autrement</TextStyled> ! Nous vous suggérons de faire appel à
                  votre imagination et, pourquoi pas à votre folie, pour dresser une liste de choses qui vous font
                  plaisir.
                </>
              }
            />
            <Element
              content={
                <>
                  <TextStyled bold>Comment avoir du plaisir tout en buvant moins ?</TextStyled>
                  {'\n'}
                  Le pire moment à passer est <TextStyled bold>la fin de semaine</TextStyled> pour la plupart des gens
                  qui désirent modifier leurs habitudes de consommation. Quand la fin de semaine arrive, vous pouvez
                  avoir l’impression de devoir vous priver d’une récompense et de ne pas pouvoir décompresser. Nous vous
                  suggérons donc de changer votre système de récompenses en développant de{' '}
                  <TextStyled bold>nouvelles façons de vous gâter</TextStyled>.
                </>
              }
            />
            <Element
              content={
                <>
                  <TextStyled bold>
                    Les plaisirs planifiés sont souvent les plus satisfaisants parce qu’ils demandent une préparation
                  </TextStyled>{' '}
                  et une attente plus longue avant de pouvoir en profiter comme par exemple quand on fait un voyage,
                  qu’on reçoit des amis à dîner ou que l’on va voir un spectacle. Ayez du plaisir à prévoir le plaisir
                  en évitant l’attitude « tout ou rien ». Pas besoin de gagner à la loterie pour avoir du plaisir.{' '}
                  <TextStyled bold>
                    Planifiez votre fin de semaine : la moitié du plaisir consiste à l’anticiper !{' '}
                  </TextStyled>
                </>
              }
            />
            <Element
              content={
                <>
                  Nous vous proposons maintenant de déterminer quelles activités pourraient vous procurer du plaisir à
                  travers un questionnaire.
                </>
              }
            />
            <ButtonsContainer>
              <ButtonPrimary onPress={() => navigation.push('QUIZZ_QUESTIONS')} content="À vous de jouer" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi4Day5Stack.Screen>
      <QuestionnaireDefi4Day5Stack.Screen name="QUIZZ_QUESTIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Je me fais plaisir autrement">
            <Paragraph>
              <TextStyled>
                Parmi ces exemples, quelles activités vous permettraient de vous faire plaisir autrement ? {'\n'}
                Je sélectionne les activités les plus pertinentes.
              </TextStyled>
            </Paragraph>
            {answers.map((item) => {
              const checked = !!defi4_Day5_Answers?.includes(item.answerKey);
              return (
                <CheckboxLabelled
                  key={item.answerKey}
                  answerKey={item.answerKey}
                  content={item.content}
                  alertText={item.alertText}
                  onPress={() => toggleAnswer(item.answerKey, !checked)}
                  checked={checked}
                />
              );
            })}
            <ButtonsContainer>
              <ButtonPrimary onPress={validateAnswers} content="Suivant" />
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

export default QuestionnaireDefi4Day5;
