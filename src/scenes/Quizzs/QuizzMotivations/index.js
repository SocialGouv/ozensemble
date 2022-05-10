import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sections from './sections';
import { TopContainer, TopTitle, TopTitleContainer, ScreenBgStyled, Paragraph } from './styles';
import Background from '../../../components/Background';
import Results from './ResultsMotivations';
import { createStackNavigator } from '@react-navigation/stack';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import GoBackButton from '../../../components/GoBackButton';
import Section from './Section';
import { fetchStoredAnswers } from '../../../components/Quizz/utils';

const QuizzMotivationsStack = createStackNavigator();

const QuizzMotivations = ({ navigation, route }) => {
  const initialState = route.params.initialState || {};

  const [answers, setAnswers] = React.useState(initialState.answers);

  const memoryKeyAnswers = '@QuizzMotivations_answers';
  const memoryKeyResult = '@QuizzMotivations_result';

  const setInitAnswers = async () => {
    const fetchedInitialState = await fetchStoredAnswers({ memoryKeyAnswers, memoryKeyResult });
    if (fetchedInitialState?.answers || fetchedInitialState?.result) {
      setAnswers(fetchedInitialState.answers);
    }
  };

  React.useEffect(() => {
    if (!answers) setInitAnswers();
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
    await AsyncStorage.setItem(memoryKeyAnswers, JSON.stringify(answers));
    await AsyncStorage.setItem(memoryKeyResult, 'true');
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
