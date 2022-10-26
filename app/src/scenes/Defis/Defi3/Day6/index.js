import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../../utils';
import { createStackNavigator } from '@react-navigation/stack';
import { riskSituationsAnswersKeysSelector } from '../../../../recoil/quizzs';
import { defi2EmotionState } from '../../../../recoil/defis';
import emotions from '../../../../components/emotions';
import { useRecoilValue } from 'recoil';
import Doctolib from '../../../Health/Doctolib';
import ContactForm from '../../../Health/ContactForm';
import { Conseils, Explications } from './Screens';

const Day6Stack = createStackNavigator();

const Defi3_Day6 = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const answersRiskSituations = useRecoilValue(riskSituationsAnswersKeysSelector);
  const emotionValue = useRecoilValue(defi2EmotionState);
  const emotion = emotions.find((e) => e.value === emotionValue);
  const answerSection = answersRiskSituations[0]?.answerKey.split('.')[0];
  const situationText = answerSection == 1 ? 'C’est une situation extérieure' : 'C’est une situation intérieure';
  const conseil =
    emotion?.value === 2
      ? answersRiskSituations[0]?.consommationReasonPositiveEmotion
      : answersRiskSituations[0]?.consommationReasonNegativeEmotion;
  useEffect(() => {
    if (route?.params?.inDefi3) setValidatedDays(route?.params?.day, '@Defi3');
  }, [route?.params, isFocused]);

  return (
    <Day6Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <Day6Stack.Screen name="EXPLICATIONS">
        {({ navigation }) => (
          <Explications answersRiskSituations={answersRiskSituations} emotion={emotion} navigation={navigation} />
        )}
      </Day6Stack.Screen>

      <Day6Stack.Screen name="CONSEILS" emotion={emotion} situationText={situationText}>
        {({ navigation }) => (
          <Conseils
            answersRiskSituations={answersRiskSituations}
            emotion={emotion}
            situationText={situationText}
            conseil={conseil}
            navigation={navigation}
          />
        )}
      </Day6Stack.Screen>

      <Day6Stack.Screen name="CONTACT" component={ContactForm} />
      <Day6Stack.Screen name="DOCTOLIB" component={Doctolib} />
    </Day6Stack.Navigator>
  );
};

export default Defi3_Day6;
