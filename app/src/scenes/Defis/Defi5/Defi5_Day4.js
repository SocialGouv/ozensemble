import React from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import { Defi5_Day4_Answers_State, Defi5_Day4_ResultState } from '../../../recoil/quizzs';
import { setValidatedDays } from '../utils';
import WrapperContainer from '../../../components/WrapperContainer';
import Element from '../../../components/ElementDayDefi';
import CheckboxLabelled from '../../../components/CheckboxLabelled';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { Spacer } from '../../../components/Articles';

export const answersDefi5Day2 = [
  { answerKey: '1.1', content: 'Moins de fatigue' },
  { answerKey: '1.2', content: 'Meilleure concentration' },
  { answerKey: '1.3', content: 'Perte de poids' },
  { answerKey: '1.4', content: "Plus de maux d'estomac" },
  { answerKey: '1.5', content: 'Appétit retrouvé' },
  { answerKey: '1.6', content: 'Peau plus belle' },
  { answerKey: '1.7', content: 'Meilleur sommeil' },
  { answerKey: '1.8', content: 'Plus de gueule de bois' },
  { answerKey: '1.9', content: 'Moins de sueurs' },
  { answerKey: '1.10', content: 'Moins de bouffées de chaleur' },
  { answerKey: '1.11', content: 'Aucune' },
];

const aucune = (answers) => answers.includes('1.11');

const QuestionnaireDefi5Day4Stack = createStackNavigator();

const Defi5_Day4 = ({ navigation, route }) => {
  const [defi5_Day4_Answers, setDefi5_Day4_Answers] = useRecoilState(Defi5_Day4_Answers_State);
  const setDefi5_Day4_ResultState = useSetRecoilState(Defi5_Day4_ResultState);

  const toggleAnswer = async (answerKey, checked) => {
    setDefi5_Day4_Answers((prevAnswers) => {
      if (checked && !prevAnswers.includes(answerKey)) {
        return [...prevAnswers, answerKey].filter((key) => key !== '1.11');
      }
      if (!checked && prevAnswers.includes(answerKey)) {
        return prevAnswers.filter((key) => key !== answerKey).filter((key) => key !== '1.11');
      }
      return prevAnswers;
    });
  };

  const validateAnswers = async () => {
    setDefi5_Day4_ResultState(true);
    if (route?.params?.inDefi5) setValidatedDays(route?.params?.day, '@Defi5');
    navigation.navigate('DEFI5_DAY4_CONSEIL');
  };

  return (
    <QuestionnaireDefi5Day4Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuestionnaireDefi5Day4Stack.Screen name="DEFI5_DAY2_EXPLICATIONS">
        {({ navigation }) => (
          <WrapperContainer
            onPressBackButton={navigation.goBack}
            title="Quelle est l'évolution de mon bien-être physique après quatre semaines d'effort ?">
            <Element
              content={
                <>
                  On le sait pertinemment,{' '}
                  <TextStyled bold> l'arrêt de l'alcool a de nombreux bienfaits pour la santé physique.</TextStyled> La
                  consommation excessive d'alcool entraîne des problèmes de santé pouvant avoir de graves conséquences.
                  {'\n\n'}
                  Que l'on cherche à améliorer son hygiène de vie, sa forme physique ou bien à sortir de sa dépendance,
                </>
              }
            />
            <Element
              content={
                <>
                  Nous vous proposons maintenant de déterminer à l'aide d'un questionnaire les effets physiques positifs
                  que vous avez pu constater suite à la diminution de votre consommation d'alcool.
                </>
              }
            />
            <ButtonsContainer>
              <ButtonPrimary
                onPress={() => navigation.navigate('DEFI5_DAY4_QUIZZ_QUESTIONS')}
                content="À vous de jouer"
              />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi5Day4Stack.Screen>
      <QuestionnaireDefi5Day4Stack.Screen name="DEFI5_DAY4_QUIZZ_QUESTIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Mes bénéfices physiques">
            <Paragraph>
              <TextStyled>
                Voici une liste des{' '}
                <TextStyled bold> changements que vous pouvez constater après ces 4 semaines de réduction </TextStyled>{' '}
                de votre consommation d'alcool. Veuillez sélectionner ceux que vous avez constaté.
              </TextStyled>
            </Paragraph>
            <CheckBoxes>
              <TextStyled bold color="#4030a5">
                Mes situations à risque
              </TextStyled>
              <Spacer size={25} />
              {answersDefi5Day2.map((item) => {
                const checked = !!defi5_Day4_Answers?.includes(item.answerKey);
                return (
                  <CheckboxLabelled
                    key={item.answerKey}
                    answerKey={item.answerKey}
                    content={item.content}
                    alertText={item.alertText}
                    onPress={() => {
                      if (item.content === 'Aucune') {
                        setDefi5_Day4_Answers(checked ? [] : [item.answerKey]);
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
      </QuestionnaireDefi5Day4Stack.Screen>
      <QuestionnaireDefi5Day4Stack.Screen name="DEFI5_DAY4_CONSEIL">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Le conseil d'Oz Ensemble">
            {!aucune(defi5_Day4_Answers) && (
              <>
                <Element
                  content={
                    <>
                      <TextStyled bold>
                        Ce sont des premiers signes encourageants !{'\n\n'}Maintenez vos efforts car ces bénéfices vont
                        se maintenir et s'amplifier dans le temps.
                      </TextStyled>{' '}
                      Les études scientifiques montrent des bénéfices à réduire sa consommation à court terme, mais
                      aussi à moyen terme et à long terme.
                    </>
                  }
                />
              </>
            )}
            {!!aucune(defi5_Day4_Answers) && (
              <>
                <Element
                  content={
                    <>
                      Si vous ne vous sentez pas en meilleure forme, cela peut être dû principalement{' '}
                      <TextStyled bold> à deux facteurs </TextStyled>
                      {'\u00A0'}:{'\n\n'}
                      {'   • '}{' '}
                      <TextStyled bold>
                        Votre réduction est encore récente ou trop modeste par rapport aux besoins de votre corps.
                      </TextStyled>{' '}
                      Poursuivez ce bilan pour voir si d'autres domaines se sont améliorés depuis le début de votre
                      réduction ou vos progrès sont trop faibles.{'\n\n'}
                      {'   • '} C'est un signal de votre corps. Sachez l'écouter. Il est peut-être temps d'utiliser
                      cette information pour vous orienter vers un bilan auprès d'un médecin{'\u00A0'}?{'\n'}
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
      </QuestionnaireDefi5Day4Stack.Screen>
    </QuestionnaireDefi5Day4Stack.Navigator>
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

export default Defi5_Day4;
