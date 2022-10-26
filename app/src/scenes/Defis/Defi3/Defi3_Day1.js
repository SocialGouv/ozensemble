import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ElementDayDefi from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import styled from 'styled-components';
import QuizzDefi3Day1 from '../../Quizzs/QuizzDefi3Day1';
import { createStackNavigator } from '@react-navigation/stack';

const QuizzStack = createStackNavigator();

const Defi3_Day1 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi3) setValidatedDays(route?.params?.day, '@Defi3');
  }, [route?.params, isFocused]);

  return (
    <QuizzStack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#f9f9f9' } }}
      headerMode="none"
      initialRouteName={route?.params?.initialRouteName}>
      <QuizzStack.Screen name="EXPLICATIONS">
        {({ navigation }) => (
          <WrapperContainer onPressBackButton={navigation.goBack} title="L’alcool en quelques chiffres">
            <ElementDayDefi
              contentView={
                <>
                  <TextSizeStyled>
                    En France, <TextSizeStyled bold>chaque année</TextSizeStyled>, l’alcool c’est :{'\n'}
                  </TextSizeStyled>
                  <BulletPoint>
                    <TextSizeStyled>
                      {'\u2022'} <TextSizeStyled bold>3ème</TextSizeStyled> cause de décès évitable.
                    </TextSizeStyled>
                  </BulletPoint>
                  <BulletPoint>
                    <TextSizeStyled>
                      {'\u2022'} <TextSizeStyled bold>12 à 13%</TextSizeStyled> de la mortalité annuelle en France,
                      toutes causes confondues.
                    </TextSizeStyled>
                  </BulletPoint>
                  <BulletPoint>
                    <TextSizeStyled>
                      {'\u2022'} <TextSizeStyled bold>41 000</TextSizeStyled> décès prématurés avant 65 ans ayant comme
                      cause directe la consommation d’alcool.
                    </TextSizeStyled>
                  </BulletPoint>
                  <RedCenteredView>
                    <TextSizeStyled color="#DE285E" center>
                      40% de ces décès surviennent chez des personnes non dépendantes.
                    </TextSizeStyled>
                  </RedCenteredView>
                  <BulletPoint>
                    <TextSizeStyled>
                      {'\u2022'} Un « coût social » de <TextSizeStyled bold>120</TextSizeStyled> milliards d’euros,
                      équivalant à celui du tabac et près de 15 fois supérieur à celui des drogues illicites.
                    </TextSizeStyled>
                  </BulletPoint>
                </>
              }
            />
            <ElementDayDefi
              content={
                <TextStyled>
                  Aujourd’hui, nous vous proposons de{' '}
                  <TextStyled bold>tester vos connaissances sur l’alcool</TextStyled> avec un quizz vrai/faux pour mieux
                  comprendre la place de l’alcool dans la société et dans votre vie.
                </TextStyled>
              }
            />
            <ButtonPrimaryStyled
              content="À vous de jouer"
              widthSmall
              onPress={() => navigation.navigate('QUIZZ_DEFI3_DAY3')}
            />
            <SmallTextStyled>
              <SmallTextStyled italic>Sources :</SmallTextStyled>
              {'\n'}
              {'\n'}
              <SmallTextStyled>
                {'\u2022'} Bonaldi C, Hill C. La mortalité attribuable à l’alcool en France en 2015. Bulletin
                Épidémiologique Hebdomadaire, 2019, 5-6 : 98-107.
              </SmallTextStyled>
              {'\n'}
              {'\n'}
              <SmallTextStyled>
                {'\u2022'} INSERM. Réduction des dommages associés à la consommation d’alcool. Synthèse et
                recommandations. Paris, INSERM, Expertise collective, 2021, 138 p.
              </SmallTextStyled>
              {'\n'}
              {'\n'}
              <SmallTextStyled>
                {'\u2022'} Palle C. Les personnes accueillies dans les CSAPA. Situation en 2019 et évolution sur la
                période 2015-2019. Tendances, OFDT, 2021, n° 146, 6 p.
              </SmallTextStyled>
            </SmallTextStyled>
          </WrapperContainer>
        )}
      </QuizzStack.Screen>
      <QuizzStack.Screen name="QUIZZ_DEFI3_DAY3">{({}) => <QuizzDefi3Day1 />}</QuizzStack.Screen>

      <QuizzStack.Screen name="RESULTS_DEFI3_DAY3">
        {({ navigation }) => <TextStyled>RESULTS</TextStyled>}
      </QuizzStack.Screen>
    </QuizzStack.Navigator>
  );
};

const TextSizeStyled = styled(TextStyled)`
  font-size: 16px;
  line-height: 24px;
`;

const BulletPoint = styled.View`
  margin: 10px;
`;

const RedCenteredView = styled.View`
  margin: 10px;
`;

const SmallTextStyled = styled(TextStyled)`
  font-size: 12px;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-bottom: 50px;
`;

export default Defi3_Day1;
