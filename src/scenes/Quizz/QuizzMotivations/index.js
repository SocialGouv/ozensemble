import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sections, { Section } from './sections';
import CONSTANTS from '../../../reference/constants';
import Background from '../../../components/Background';
import Results from './Results';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenBgStyled, TopContainer, TopTitle, Paragraph, SectionTitle } from './styles';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';

const QuizzAndResultsStack = createStackNavigator();

const Quizz = ({ navigation }) => {
  const [answers, setAnswers] = React.useState();

  const saveAnswer = async () => {
    await AsyncStorage.setItem(CONSTANTS.STORE_KEY_CHALLENGE7DAYS_QUIZZ_J6_ANSWERS, JSON.stringify(answers));
    navigation.navigate('MOTIVATIONS_QUIZZ', { screen: 'QUIZZ_RESULTS' });
  };

  React.useEffect(() => {
    const fetchStoredAnswers = async () => {
      try {
        const storedAnswers = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_CHALLENGE7DAYS_QUIZZ_J6_ANSWERS);
        if (storedAnswers !== null) {
          const newAnswers = JSON.parse(storedAnswers);
          setAnswers(newAnswers);
        } else {
          setAnswers([]);
        }
      } catch (e) {
        setAnswers([]);
        console.log('error catching stored answers', e);
      }
    };
    if (!answers) fetchStoredAnswers();
  }, []);

  const toggleAnswers = (e) => {
    let newAnswers = [...answers];
    const checkedBefore = newAnswers.find((a) => a.id === e.id);
    if (!checkedBefore) newAnswers.push(e);
    else newAnswers = newAnswers.filter((a) => a.id !== e.id);
    setAnswers(newAnswers);
  };

  if (!answers) return null;

  return (
    <Background color="#39cec0" withSwiperContainer>
      <QuizzAndResultsStack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
        headerMode="none"
        initialRouteName="QUIZZ_QUESTIONS">
        <QuizzAndResultsStack.Screen name="QUIZZ_QUESTIONS">
          {({ navigation }) => (
            <Background color="#39cec0" withSwiperContainer>
              <ScreenBgStyled>
                {/* <GoBackButton onPress={navigation.goBack()} /> */}
                <TopContainer>
                  <TopTitle>
                    <TextStyled color="#4030a5">
                      Quelles raisons vous motivent à diminuer votre consommation ?
                    </TextStyled>
                  </TopTitle>
                  <Paragraph>
                    <TextStyled>
                      Sélectionnez vos principales raisons pour diminuer votre consommation d’alcool{' '}
                    </TextStyled>
                  </Paragraph>
                  {sections.map((section, id) => (
                    <Section
                      key={id}
                      sectionTitle={section.sectionTitle}
                      sectionItems={section.sectionItems}
                      onPress={toggleAnswers}
                      answers={answers}
                    />
                  ))}
                </TopContainer>
                <ButtonPrimary onPress={saveAnswer} content="Valider mes réponses" />
              </ScreenBgStyled>
            </Background>
          )}
        </QuizzAndResultsStack.Screen>
        <QuizzAndResultsStack.Screen name="QUIZZ_RESULTS">
          {(props) => <Results results={answers} {...props} />}
        </QuizzAndResultsStack.Screen>
      </QuizzAndResultsStack.Navigator>
    </Background>
  );
};

export default Quizz;
