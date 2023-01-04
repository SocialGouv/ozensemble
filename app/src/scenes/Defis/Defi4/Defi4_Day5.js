import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import { defi4_Day5_Answers_State, defi4_Day5_ResultState } from '../../../recoil/quizzs';
import { setValidatedDays } from '../utils';
import WrapperContainer from '../../../components/WrapperContainer';
import Element from '../../../components/ElementDayDefi';
import CheckboxLabelled from '../../../components/CheckboxLabelled';

export const answersDefi4Day5 = [
  { answerKey: '1.1', content: 'Aller chez le coiffeur' },
  { answerKey: '1.2', content: 'Faire des essais vestimentaires' },
  { answerKey: '1.3', content: 'Faire une promenade' },
  { answerKey: '1.4', content: 'Écouter de la musique' },
  { answerKey: '1.5', content: 'Cuisiner' },
  { answerKey: '1.6', content: 'Modifier l’agencement de ses meubles' },
  { answerKey: '1.7', content: 'Lire un livre' },
  { answerKey: '1.8', content: 'Écrire ses rêves' },
  { answerKey: '1.9', content: 'Inviter des amis' },
  { answerKey: '1.10', content: 'Essayer un nouveau maquillage' },
  { answerKey: '1.11', content: 'Chanter' },
  { answerKey: '1.12', content: 'Faire du sport' },
  { answerKey: '1.13', content: 'Jardiner' },
  { answerKey: '1.14', content: 'Bricoler' },
  { answerKey: '1.15', content: 'Aller au cinéma' },
  { answerKey: '1.16', content: 'S’inscrire à un club' },
  { answerKey: '1.17', content: 'Jouer en famille' },
  { answerKey: '1.18', content: 'S’autoriser à ne rien faire' },
  { answerKey: '1.19', content: 'Regarder son émission préférée à la télé' },
];

const QuestionnaireDefi4Day5Stack = createStackNavigator();

const Defi4_Day5 = ({ navigation, route }) => {
  const [defi4_Day5_Answers, setDefi4_Day5_Answers] = useRecoilState(defi4_Day5_Answers_State);
  const setDefi4_Day5_ResultState = useSetRecoilState(defi4_Day5_ResultState);

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
      navigation.goBack();
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
            {answersDefi4Day5.map((item) => {
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
  margin-top: 40px;
  align-items: center;
  width: 100%;
`;

export default Defi4_Day5;
