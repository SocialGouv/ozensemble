import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import { Defi5_Day2_Answers_State, Defi5_Day2_ResultState } from '../../../recoil/quizzs';
import { setValidatedDays } from '../utils';
import WrapperContainer from '../../../components/WrapperContainer';
import Element from '../../../components/ElementDayDefi';
import CheckboxLabelled from '../../../components/CheckboxLabelled';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { Spacer } from '../../../components/Articles';

export const answersDefi5Day2 = [
  { answerKey: '1.1', content: 'Quand je suis triste ou déprimé(e)' },
  { answerKey: '1.2', content: "Quand j'ai envie de dire à quelqu'un ce que je pense vraiment" },
  { answerKey: '1.3', content: 'Quand je suis fâché(e) ou frustré(e) contre moi-même' },
  { answerKey: '1.4', content: 'Quand je veux me récompenser' },
  { answerKey: '1.5', content: 'Aucune' },
];

const interieurAndExterieur = (answers) =>
  (answers.includes('1.1') || answers.includes('1.2')) && (answers.includes('1.3') || answers.includes('1.4'));

const interieurOnly = (answers) =>
  (answers.includes('1.1') || answers.includes('1.2')) && !answers.includes('1.3') && !answers.includes('1.4');

const exterieurOnly = (answers) =>
  !answers.includes('1.1') && !answers.includes('1.2') && (answers.includes('1.3') || answers.includes('1.4'));

const aucune = (answers) => answers.includes('1.5');

const QuestionnaireDefi5Day2Stack = createStackNavigator();

const Defi5_Day2 = ({ navigation, route }) => {
  const [defi5_Day2_Answers, setDefi5_Day2_Answers] = useRecoilState(Defi5_Day2_Answers_State);
  const setDefi5_Day2_ResultState = useSetRecoilState(Defi5_Day2_ResultState);

  const toggleAnswer = async (answerKey, checked) => {
    setDefi5_Day2_Answers((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) {
        return [...prevAnswers, answerKey].filter((key) => key !== '1.5');
      }
      if (!checked && prevAnswers.includes(answerKey)) {
        return prevAnswers.filter((key) => key !== answerKey).filter((key) => key !== '1.5');
      }
      return prevAnswers;
    });
  };

  const validateAnswers = async () => {
    setDefi5_Day2_ResultState(true);
    if (route?.params?.inDefi5) setValidatedDays(route?.params?.day, '@Defi5');
    navigation.navigate('DEFI5_DAY2_CONSEIL');
  };

  return (
    <QuestionnaireDefi5Day2Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuestionnaireDefi5Day2Stack.Screen name="DEFI5_DAY2_EXPLICATIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Comment atteindre mon objectif ?">
            <Element
              content={
                <>
                  Vous aviez identifié des <TextStyled bold> situations à risque</TextStyled> lors de votre semaine de{' '}
                  <TextStyled bold> défi 2</TextStyled>. Vous aviez sélectionné les 2 situations à risque{' '}
                  <TextStyled bold>extérieures</TextStyled> et les 2 situations à risque{' '}
                  <TextStyled bold>intérieures</TextStyled> pour vous.{'\n\n'}Souvenons-nous qu'une situation à risque
                  est un moment dans lequel une personne à l'impression qu'elle a{' '}
                  <TextStyled bold> moins de contrôle sur son envie de boire de l'alcool.</TextStyled>
                </>
              }
            />
            <Element
              content={
                <>
                  Nous vous proposons maintenant d'évaluer vos progrès dans la gestion de vos situations à risque à
                  travers un questionnaire.
                </>
              }
            />
            <ButtonsContainer>
              <ButtonPrimary
                onPress={() => navigation.navigate('DEFI5_DAY2_QUIZZ_QUESTIONS')}
                content="À vous de jouer"
              />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi5Day2Stack.Screen>
      <QuestionnaireDefi5Day2Stack.Screen name="DEFI5_DAY2_QUIZZ_QUESTIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Je me fais plaisir autrement">
            <Paragraph>
              <TextStyled>
                Veuillez sélectionner parmi vos situations à risque celles que vous avez la perception de{' '}
                <TextStyled bold> mieux gérer ou de gérer différemment{'\u00A0'}:</TextStyled>
              </TextStyled>
            </Paragraph>
            <CheckBoxes>
              <TextStyled bold color="#4030a5">
                Mes situations à risque
              </TextStyled>
              <Spacer size={25} />
              {answersDefi5Day2.map((item) => {
                const checked = !!defi5_Day2_Answers?.includes(item.answerKey);
                return (
                  <CheckboxLabelled
                    key={item.answerKey}
                    answerKey={item.answerKey}
                    content={item.content}
                    alertText={item.alertText}
                    onPress={() => {
                      if (item.content === 'Aucune') {
                        setDefi5_Day2_Answers(checked ? [] : [item.answerKey]);
                      } else {
                        toggleAnswer(item.answerKey, !checked);
                      }
                    }}
                    checked={checked}
                  />
                );
              })}
            </CheckBoxes>
            <ButtonsContainer>
              <ButtonPrimary onPress={validateAnswers} content="Suivant" />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi5Day2Stack.Screen>
      <QuestionnaireDefi5Day2Stack.Screen name="DEFI5_DAY2_CONSEIL">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Le conseil d'Oz Ensemble">
            {!!interieurAndExterieur(defi5_Day2_Answers) && (
              <>
                <Element
                  content={
                    <>
                      Depuis le début de votre défi,{' '}
                      <TextStyled bold>
                        {' '}
                        vous avez pris conscience des causes extérieures pouvant contribuer à votre consommation
                        d'alcool.
                      </TextStyled>
                      {'\n\n'}Vous avez davantage de chances de réfléchir de manière critique à votre décision de
                      consommer désormais. Vous avez également pris conscience des causes intérieures pouvant contribuer
                      à votre consommation d'alcool. Il est très important d'être attentif au fait que votre état
                      intérieur peut entraîner des envies de consommer de l'alcool. C'est en traitant ces tensions
                      internes que vous aurez la possibilité de réduire votre consommation.
                    </>
                  }
                />
                <Element
                  content={
                    <>
                      Vous avez également pris conscience des{' '}
                      <TextStyled bold>
                        {' '}
                        causes intérieures pouvant contribuer à votre consommation d'alcool.
                      </TextStyled>
                      {'\n\n'}Il est très important d'être attentif au fait que votre état intérieur peut entraîner des
                      envies de consommer de l'alcool. C'est en traitant ces tensions internes que vous aurez la
                      possibilité de réduire votre consommation.
                    </>
                  }
                />
              </>
            )}
            {!!interieurOnly(defi5_Day2_Answers) && (
              <>
                <Element
                  content={
                    <>
                      Depuis le début de votre défi,{' '}
                      <TextStyled bold>
                        {' '}
                        vous avez pris conscience des causes extérieures pouvant contribuer à votre consommation
                        d'alcool.
                      </TextStyled>
                      {'\n\n'}Vous avez davantage de chances de réfléchir de manière critique à votre décision de
                      consommer désormais. Vous avez également pris conscience des causes intérieures pouvant contribuer
                      à votre consommation d'alcool. Il est très important d'être attentif au fait que votre état
                      intérieur peut entraîner des envies de consommer de l'alcool. C'est en traitant ces tensions
                      internes que vous aurez la possibilité de réduire votre consommation.
                    </>
                  }
                />
              </>
            )}
            {!!exterieurOnly(defi5_Day2_Answers) && (
              <>
                <Element
                  content={
                    <>
                      Depuis le début de votre défi,{' '}
                      <TextStyled bold>
                        {' '}
                        vous avez pris conscience des causes intérieures pouvant contribuer à votre consommation
                        d'alcool.
                      </TextStyled>
                      {'\n\n'}Il est très important d'être attentif au fait que votre état intérieur peut entraîner des
                      envies de consommer de l'alcool. C'est en traitant ces tensions internes que vous aurez la
                      possibilité de réduire votre consommation.
                    </>
                  }
                />
              </>
            )}
            {!!aucune(defi5_Day2_Answers) && (
              <>
                <Element
                  content={
                    <>
                      <TextStyled bold>Ne culpabilisez pas</TextStyled> si vous n'arrivez pas à mieux contrôler vos
                      envies dans les situations que vous avez choisies.{'\n\n'}L'autocontrôle reste difficile. Il est
                      peut-être temps de questionner votre{' '}
                      <TextStyled bold> besoin d'aide par rapport à l'alcool.</TextStyled>
                      {'\n\n'}
                      {'   • '} Ce mode de consommation, est-il pour vous une façon de décompresser{'\u00A0'}? D'évacuer
                      un trop plein de stress{'\u00A0'}?{'\n'}
                      {'   • '} Buvez-vous pour vous mettre à l'aise en société{'\u00A0'}? En soirée{'\u00A0'}?{'\n'}
                      {'   • '} Avez-vous le sentiment que l'alcool devient un remède aux difficultés que vous
                      rencontrez{'\u00A0'}?{'\n\n'}
                      Vous pouvez{' '}
                      <TextStyled underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                        échanger avec un professionnel de manière anonyme et gratuite.
                      </TextStyled>
                    </>
                  }
                />
              </>
            )}
            <ButtonsContainer>
              <ButtonPrimary
                onPress={() => {
                  if (route?.params?.inDefi5) {
                    navigation.navigate('DEFI5_MENU');
                  } else {
                    navigation.navigate('TESTS_DEFIS');
                  }
                }}
                content="J'ai compris"
              />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi5Day2Stack.Screen>
    </QuestionnaireDefi5Day2Stack.Navigator>
  );
};

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const CheckBoxes = styled.View`
  padding: 25px;
  margin-horizontal: ${-defaultPaddingFontScale()}px;
  background-color: #efefef;
`;

const ButtonsContainer = styled.View`
  margin-top: 40px;
  align-items: center;
  width: 100%;
`;

export default Defi5_Day2;
