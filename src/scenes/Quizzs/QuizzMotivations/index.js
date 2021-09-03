import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sections from './sections';
import { TopContainer, TopTitle, TopTitleContainer, ScreenBgStyled, Paragraph } from './styles';
import CONSTANTS from '../../../reference/constants';
import Background from '../../../components/Background';
import Results from './ResultsMotivations';
import { createStackNavigator } from '@react-navigation/stack';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import GoBackButton from '../../../components/GoBackButton';
import Section from './Section';
import { fetchStoredAnswers } from '../../../components/Quizz/utils';

const QuizzAndResultsStack = createStackNavigator();

const QuizzMotivations = ({ navigation, route }) => {
  const initialState = route.params.initialState || {};

  const [answers, setAnswers] = React.useState(initialState.answers);

  const memoryKeyAnswers = CONSTANTS.STORE_KEY_QUIZZ_MOTIVATIONS_ANSWERS;
  const memoryKeyResult = CONSTANTS.STORE_KEY_QUIZZ_MOTIVATIONS_RESULT;

  React.useEffect(() => {
    fetchStoredAnswers({ memoryKeyAnswers, memoryKeyResult });
  }, []);

  const toggleAnswer = async (answerKey, checked) => {
    const newAnswers = {
      ...answers,
      [answerKey]: checked,
    };
    setAnswers(newAnswers);
  };

  const validateAnswers = async () => {
    await AsyncStorage.setItem(memoryKeyAnswers, JSON.stringify(answers));
    await AsyncStorage.setItem(memoryKeyResult, 'true');
    navigation.navigate('MOTIVATIONS_QUIZZ', { screen: 'QUIZZ_RESULTS' });
  };

  if (!answers) return null;

  return (
    <Background color="#39cec0" withSwiperContainer>
      <QuizzAndResultsStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
        headerMode="none"
        initialRouteName={route?.params?.initialRouteName}>
        <QuizzAndResultsStack.Screen name="QUIZZ_QUESTIONS">
          {({ navigation }) => (
            <ScreenBgStyled>
              <TopContainer>
                <TopTitleContainer>
                  <GoBackButton onPress={navigation.goBack} />
                  <TopTitle>
                    <TextStyled color="#4030a5">
                      Quelles raisons vous motivent à diminuer votre consommation ?
                    </TextStyled>
                  </TopTitle>
                </TopTitleContainer>
                <Paragraph>
                  <TextStyled>
                    Sélectionnez vos principales raisons pour diminuer votre consommation d’alcool{' '}
                  </TextStyled>
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
        </QuizzAndResultsStack.Screen>
        <QuizzAndResultsStack.Screen name="QUIZZ_RESULTS">
          {(props) => <Results results={answers} {...props} />}
        </QuizzAndResultsStack.Screen>
      </QuizzAndResultsStack.Navigator>
    </Background>
  );
};

export default QuizzMotivations;
