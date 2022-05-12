import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Background from '../../../components/Background';
import ButtonPrimary from '../../../components/ButtonPrimary';
import GoBackButton from '../../../components/GoBackButton';
import { fetchStoredAnswers } from '../../../components/Quizz/utils';
import TextStyled from '../../../components/TextStyled';
import Results from './ResultsMotivations';
import Section from './Section';
import sections from './sections';
import { Paragraph, ScreenBgStyled, TopContainer, TopTitle, TopTitleContainer } from './styles';
import { storage } from '../../../services/storage';

const QuizzMotivationsStack = createStackNavigator();

const QuizzMotivations = ({ navigation, route }) => {
  const initialState = route.params.initialState || {};

  const [answers, setAnswers] = useState(initialState.answers);

  const memoryKeyAnswers = '@QuizzMotivations_answers';
  const memoryKeyResult = '@QuizzMotivations_result';

  const setInitAnswers = async () => {
    const fetchedInitialState = await fetchStoredAnswers({ memoryKeyAnswers, memoryKeyResult });
    if (fetchedInitialState?.answers || fetchedInitialState?.result) {
      setAnswers(fetchedInitialState.answers);
    }
  };

  useEffect(() => {
    if (!answers) setInitAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAnswer = async (answerKey, checked) => {
    setAnswers((prevAnswers) => {
      return {
        ...prevAnswers,
        [answerKey]: checked,
      };
    });
  };

  const validateAnswers = async () => {
    storage.set(memoryKeyAnswers, JSON.stringify(answers));
    storage.set(memoryKeyResult, true);
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
                <TopTitleContainer>
                  <GoBackButton onPress={navigation.goBack} />
                  <TopTitle>
                    <TextStyled color="#4030a5">
                      Quelles raisons vous motivent à changer votre consommation ?
                    </TextStyled>
                  </TopTitle>
                </TopTitleContainer>
                <Paragraph>
                  <TextStyled>Sélectionnez vos principales raisons pour changer votre consommation d’alcool</TextStyled>
                </Paragraph>
                {sections.map((section, id) => (
                  <Section
                    key={id}
                    section={section}
                    onToggle={toggleAnswer}
                    answers={answers}
                    navigation={navigation}
                  />
                ))}
                <ButtonPrimary onPress={validateAnswers} content="Valider mes réponses" />
              </TopContainer>
            </ScreenBgStyled>
          )}
        </QuizzMotivationsStack.Screen>
        <QuizzMotivationsStack.Screen name="QUIZZ_RESULTS" initialParams={route?.params}>
          {(props) => <Results results={answers} {...props} />}
        </QuizzMotivationsStack.Screen>
      </QuizzMotivationsStack.Navigator>
    </Background>
  );
};

export default QuizzMotivations;
