import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { View, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ElementDayDefi from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import QuizzDefi3Day5 from '../../Quizzs/QuizzDefi3Day5';
import { Spacer } from '../../../components/Articles';

const QuizzStack = createStackNavigator();

const Defi3_Day5 = ({ route }) => {
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
          <WrapperContainer onPressBackButton={navigation.goBack} title="Halte aux idées reçues !">
            <TextStyled>
              Certaines phrases trop prononcées dédramatisent la consommation d'alcool et nécessite d'être expliquée
              pour <TextStyled bold>déconstruire certains clichés.</TextStyled>
            </TextStyled>
            <Spacer size={20} />
            <ElementDayDefi
              contentView={
                <>
                  <View>
                    <TextStyled bold>
                      "<TextStyled italic>Oh ça va, un verre d'alcool n'a jamais tué personne</TextStyled>"
                    </TextStyled>
                    <Spacer size={20} />
                    <TextStyled bold color="#DE285E">
                      SAUF QUE :
                    </TextStyled>
                    <Spacer size={10} />
                  </View>
                  <BulletPoint>
                    <TextStyled>
                      {'\u2022'} L'alcool, {' '}
                      <TextStyled bold>même consommé en petite quantité est mauvais pour la santé</TextStyled>.
                    </TextStyled>
                  </BulletPoint>
                  <BulletPoint>
                    <TextStyled>
                      {'\u2022'} L’alcool est responsable de 30% des accidents mortels sur la route.
                    </TextStyled>
                  </BulletPoint>
                  <BulletPoint>
                    <TextStyled>
                      {'\u2022'} "<TextStyled italic>Une cuite de temps en temps</TextStyled>" peut poser problème. Pas
                      forcément en terme de dépendance, mais simplement d'effets secondaires en désinhibant, en rendant
                      vulnérable ou malade.
                    </TextStyled>
                  </BulletPoint>
                </>
              }
            />
            <ElementDayDefi
              contentView={
                <>
                  <View>
                    <TextStyled bold>
                      "<TextStyled italic>Oui mais moi ça va, je ne bois que du vin !</TextStyled>"
                    </TextStyled>

                    <Spacer size={20} />
                    <TextStyled bold color="#DE285E">
                      SAUF QUE :
                    </TextStyled>
                    <Spacer size={10} />
                  </View>
                  <BulletPoint>
                    <TextStyled>
                      {'\u2022'} Un verre de vin n'est pas meilleur pour la santé qu'un verre de whisky.
                    </TextStyled>
                  </BulletPoint>
                  <BulletPoint>
                    <TextStyled>
                      {'\u2022'} Le vin (comme tous les alcools) est calorique et a tendance à entraîner un stockage des
                      graisses. Le ventre à bière n'est pas un mythe.
                    </TextStyled>
                  </BulletPoint>
                </>
              }
            />
            <ElementDayDefi
              contentView={
                <>
                  <TextStyled>
                    Aujourd’hui, nous vous proposons de{' '}
                    <TextStyled bold>
                      tester vos connaissances sur les mythes qui circulent autour de l’alcool
                    </TextStyled>{' '}
                    avec un quizz de 3 questions.
                  </TextStyled>
                </>
              }
            />
            <ButtonPrimaryStyled
              content="Je fais le quizz"
              widthSmall
              onPress={() => navigation.navigate('QUIZZ_DEFI3_DAY5')}
            />
            <SmallTextStyled>
              <SmallTextStyled italic>Source :</SmallTextStyled>
              {'\n\n'}
              <SmallTextStyled>
                {'\u2022'} Les dangers de la route - Alcool et conduite :{' '}
                <TextStyled
                  underline
                  onPress={() => {
                    Linking.openURL('https://www.securite-routiere.gouv.fr/dangers-de-la-route/lalcool-et-la-conduite');
                  }}>
                  https://www.securite-routiere.gouv.fr/dangers-de-la-route/lalcool-et-la-conduite
                </TextStyled>
              </SmallTextStyled>
            </SmallTextStyled>
          </WrapperContainer>
        )}
      </QuizzStack.Screen>
      <QuizzStack.Screen initialParams={route.params} name="QUIZZ_DEFI3_DAY5" component={QuizzDefi3Day5} />
    </QuizzStack.Navigator>
  );
};

const BulletPoint = styled.View`
  margin: 10px;
`;

const SmallTextStyled = styled(TextStyled)`
  font-size: 12px;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-bottom: 50px;
  align-self: center;
`;

export default Defi3_Day5;
