import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import { Defi5_Day5_Answers_State, Defi5_Day5_ResultState } from '../../../recoil/quizzs';
import { setValidatedDays } from '../utils';
import WrapperContainer from '../../../components/WrapperContainer';
import Element from '../../../components/ElementDayDefi';
import CheckboxLabelled from '../../../components/CheckboxLabelled';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { P, Spacer } from '../../../components/Articles';
import Clap from '../../../components/illustrations/Clap';
import NeedHelp from '../../../components/illustrations/NeedHelp';

export const answersDefi5Day5 = [
  { answerKey: '1.1', content: "Je suis satisfait(e) de ma progression et je n'ai aucune hésitation à continuer." },
  { answerKey: '1.2', content: "J'ai fait des progrès mais c'est plus difficile que prévu." },
  { answerKey: '1.3', content: "J'ai envie de tout lâcher car je n'avance pas comme je l'avais espéré." },
];

const QuestionnaireDefi5Day5Stack = createStackNavigator();

const Defi5_Day5 = ({ navigation, route }) => {
  const [defi5_Day5_Answers, setDefi5_Day5_Answers] = useRecoilState(Defi5_Day5_Answers_State);
  const setDefi5_Day5_ResultState = useSetRecoilState(Defi5_Day5_ResultState);

  const toggleAnswer = async (answerKey, checked) => {
    setDefi5_Day5_Answers(checked ? answerKey : '');
  };

  const validateAnswers = async () => {
    setDefi5_Day5_ResultState(true);
    if (route?.params?.inDefi5) setValidatedDays(route?.params?.day, '@Defi5');
    navigation.navigate('DEFI5_DAY5_CONSEIL');
  };

  return (
    <QuestionnaireDefi5Day5Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuestionnaireDefi5Day5Stack.Screen name="DEFI5_DAY5_QUIZZ_QUESTIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Je me fais plaisir autrement">
            <Paragraph>
              <P>
                Après quatre semaines d'effort, quelle est{' '}
                <P bold> ma principale conclusion par rapport à l'évolution de ma situation{'\u00A0'}?</P>
              </P>
            </Paragraph>
            <CheckBoxes>
              {answersDefi5Day5.map((item) => {
                const checked = !!defi5_Day5_Answers?.includes(item.answerKey);
                return (
                  <CheckboxLabelled
                    key={item.answerKey}
                    answerKey={item.answerKey}
                    content={item.content}
                    alertText={item.alertText}
                    onPress={() => {
                      toggleAnswer(item.answerKey, !checked);
                    }}
                    checked={checked}
                  />
                );
              })}
            </CheckBoxes>
            <ButtonsContainer>
              <ButtonPrimary onPress={validateAnswers} content="Je valide" disabled={!defi5_Day5_Answers?.length} />
            </ButtonsContainer>
          </WrapperContainer>
        )}
      </QuestionnaireDefi5Day5Stack.Screen>
      <QuestionnaireDefi5Day5Stack.Screen name="DEFI5_DAY5_CONSEIL">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="Mon résultat">
            <>
              {!!['1.1', '1.2'].includes(defi5_Day5_Answers) && (
                <>
                  <Clap />
                  <Element
                    content={
                      <TextStyled bold>
                        Félicitations{'\u00A0'}!{'\n'}Vous progressez vers la réussite de votre objectif.
                      </TextStyled>
                    }
                  />
                </>
              )}
              {!!['1.3'].includes(defi5_Day5_Answers) && (
                <>
                  <NeedHelp />
                  <Element
                    content={
                      <>
                        <TouchableOpacity onPress={() => navigation.navigate('CONTACT')}>
                          <P bold>
                            Nous vous suggérons de{' '}
                            <TextStyled underline color="#4030A5">
                              communiquer avec un professionnel d'Oz Ensemble{' '}
                            </TextStyled>{' '}
                            afin de parler de votre situation.
                          </P>
                        </TouchableOpacity>
                        {'\n\n'}
                        Il pourra envisager avec vous d'autres solutions et vous proposer une orientation plus adaptée
                        en télé-consultation, en présentiel ou en groupe.
                        {'\n\n'}
                        Vous pourrez aussi reprendre ce parcours à un autre moment ou essayer un autre programme de
                        réduction de consommation.
                      </>
                    }
                  />
                </>
              )}
            </>
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
      </QuestionnaireDefi5Day5Stack.Screen>
    </QuestionnaireDefi5Day5Stack.Navigator>
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

export default Defi5_Day5;
