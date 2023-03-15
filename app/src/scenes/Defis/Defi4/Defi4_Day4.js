import { useIsFocused } from '@react-navigation/native';
import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import { P, Spacer } from '../../../components/Articles';
import Calculate from '../../../components/illustrations/icons/Calculate';
import { defaultPaddingFontScale, screenWidth } from '../../../styles/theme';
import { useRecoilValue } from 'recoil';
import { daysWithGoalNoDrinkState, maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../../recoil/gains';
import H1 from '../../../components/H1';
import Done from '../../../components/illustrations/Done';
import Goal from '../../Gains/Goal';
import Sevrage from '../../Gains/Sevrage';
import GainsPreviousConsumption from '../../Gains/GainsPreviousConsumption';
import GainsReminder from '../../Gains/GainsReminder';

const Defi4_Day4_Stack = createStackNavigator();

const Defi4_Day4 = ({ route }) => {
  const isFocused = useIsFocused();
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const dayNoDrink = useRecoilValue(daysWithGoalNoDrinkState)?.length;

  const isOnboarded = useMemo(
    () => !!maxDrinksPerWeekGoal && !!previousDrinksPerWeek.length,
    [maxDrinksPerWeekGoal, previousDrinksPerWeek]
  );

  useEffect(() => {
    if (route?.params?.inDefi4) setValidatedDays(route?.params?.day, '@Defi4');
  }, [route?.params, isFocused]);

  return (
    <Defi4_Day4_Stack.Navigator headerMode="none" initialRouteName={'DAY4_MAIN'}>
      <Defi4_Day4_Stack.Screen name="GAINS_ESTIMATE_PREVIOUS_CONSUMPTION" component={GainsPreviousConsumption} />
      <Defi4_Day4_Stack.Screen name="GAINS_MY_OBJECTIVE" component={Goal} />
      <Defi4_Day4_Stack.Screen name="GAINS_REMINDER" component={GainsReminder} />
      <Defi4_Day4_Stack.Screen
        name="GAINS_SEVRAGE"
        component={Sevrage}
        initialParams={{
          rootRoute: 'DEFI4_MENU',
        }}
      />

      <Defi4_Day4_Stack.Screen name="DAY4_MAIN">
        {({ navigation }) => (
          <WrapperContainer
            onPressBackButton={navigation.goBack}
            title="Comment me fixer un objectif réaliste ?"
            noPaddingHorizontal>
            <PaddingContainer>
              <Element
                content={
                  <>
                    Il peut être plus stimulant de se fixer un objectif à <TextStyled bold>court terme</TextStyled>{' '}
                    plutôt qu’un objectif à <TextStyled bold>long terme</TextStyled> d’emblée. En effet, il est plus
                    motivant d’atteindre plusieurs <TextStyled bold>objectifs intermédiaires par paliers</TextStyled>{' '}
                    que de se fixer d’emblée la barre trop haut.
                  </>
                }
              />
            </PaddingContainer>
            <TimelineContainer>
              <TimelineImage source={require('../../../assets/illustrations/timelineDefi4Day4.png')} />
            </TimelineContainer>
            <PaddingContainer>
              <Element
                contentView={
                  <>
                    <P>
                      Un objectif réaliste est celui qui a de très bonnes chances d’être atteint. Pour augmenter vos
                      chances de succès, nous vous suggérons de vous fixer des{' '}
                      <TextStyled bold>
                        objectifs intermédiaires réalistes : ni trop faciles, ni trop difficiles
                      </TextStyled>
                      .
                    </P>
                    <BulletPoint>
                      <P>
                        {'\u2022'} Si ils sont trop faciles, ils sont probablement trop bas et vous pourrez avoir besoin
                        de <TextStyled bold>plusieurs mois pour atteindre votre objectif final de réduction</TextStyled>
                        , ce qui risque de vous décourager.
                      </P>
                    </BulletPoint>
                    <BulletPoint>
                      <P>
                        {'\u2022'} Si ils sont trop difficiles, vous risquez de ne pas les atteindre et de{' '}
                        <TextStyled bold>diminuer votre confiance</TextStyled> en vos capacités de réussir. De plus,
                        réduire trop rapidement peut faire apparaître des{' '}
                        <TextStyled bold>symptômes de sevrage</TextStyled>.
                      </P>
                    </BulletPoint>
                  </>
                }
              />

              <Element
                noMarginBottom
                contentView={
                  <>
                    <P>
                      Pour <TextStyled bold>fixer votre objectif global</TextStyled> de façon réaliste, nous vous
                      suggérons :
                    </P>
                    <BulletPoint>
                      <P>
                        {'\u2022'} D’utiliser votre <TextStyled bold>bilan de la première semaine</TextStyled>{' '}
                        d'activité comme <TextStyled bold>point de départ</TextStyled>.
                      </P>
                    </BulletPoint>
                    <BulletPoint>
                      <P>
                        {'\u2022'} De penser à <TextStyled bold>un objectif de réduction qui vous motive</TextStyled>{' '}
                        pour des raisons personnelles ou de santé comme <TextStyled bold>point d’arrivée</TextStyled>.
                      </P>
                    </BulletPoint>
                    <P>
                      Calculez ensuite la <TextStyled bold>différence entre le nombre de consommations</TextStyled> de
                      votre point de départ et de votre point d’arrivée.{' '}
                    </P>
                    <P>
                      Enfin, <TextStyled bold>étalez la différence de verres sur 8 semaines</TextStyled>. Pour la
                      plupart des gens, une période de 6 à 8 semaines constitue un délai réaliste.{' '}
                    </P>
                  </>
                }
              />

              <GreenBackground>
                <KeyContainer>
                  <Calculate />
                  <TextContainer>
                    <P>
                      Exemple : une personne consomme <TextStyled bold>15 verres par semaine</TextStyled> et veut
                      atteindre <TextStyled bold>6 verres par semaine</TextStyled> pour protéger sa santé et rejoindre
                      les recommandations. Elle doit réduire de <TextStyled bold>15 - 6 = 9 verres</TextStyled>.Elle
                      étale sa réduction sur <TextStyled bold>8 semaines</TextStyled> et doit donc réduire chaque
                      semaine de <TextStyled bold>9/8 = un peu plus d'1 verre</TextStyled>.
                    </P>
                  </TextContainer>
                </KeyContainer>
              </GreenBackground>

              {!isOnboarded ? (
                <>
                  <Element
                    content={
                      <>
                        À la lumière de ces informations, vous pouvez maintenant{' '}
                        <TextStyled bold>définir votre objectif du mois prochain</TextStyled>.
                      </>
                    }
                  />
                  <ButtonPrimary
                    content="Je fixe mon objectif"
                    onPress={() => navigation.navigate('GAINS_ESTIMATE_PREVIOUS_CONSUMPTION')}
                  />
                </>
              ) : (
                <>
                  <Element
                    content={
                      <>
                        À la lumière de ces informations, vous pouvez maintenant{' '}
                        <TextStyled bold>mettre à jour votre objectif du mois prochain</TextStyled> si vous le
                        souhaitez.
                      </>
                    }
                  />
                  <Title>
                    <H1 color="#4030a5">Mon objectif actuel</H1>
                  </Title>
                  <MyGoalSubContainer>
                    <MyGoalSubContainerInside>
                      <PartContainer>
                        <Done size={20} />
                        <TextStyled>
                          {'  '}
                          {dayNoDrink} {dayNoDrink > 1 ? 'jours' : 'jour'} où je ne bois pas
                        </TextStyled>
                      </PartContainer>
                      <PartContainer>
                        <Done size={20} />
                        <TextStyled>
                          {'  '}
                          {maxDrinksPerWeekGoal} {maxDrinksPerWeekGoal > 1 ? 'verres' : 'verre'} max par semaine
                        </TextStyled>
                      </PartContainer>
                    </MyGoalSubContainerInside>
                  </MyGoalSubContainer>
                  <ButtonTouchable onPress={() => navigation.navigate('GAINS_MY_OBJECTIVE')}>
                    <TextModify>Mettre à jour l’objectif</TextModify>
                  </ButtonTouchable>
                  <Spacer size={30} />
                  <ButtonPrimary content="Je le garde" onPress={() => navigation.navigate('DEFI4_MENU')} />
                </>
              )}
            </PaddingContainer>
          </WrapperContainer>
        )}
      </Defi4_Day4_Stack.Screen>
    </Defi4_Day4_Stack.Navigator>
  );
};

const PaddingContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const TimelineContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const TimelineImage = styled.Image`
  width: ${screenWidth * 0.9};
  height: ${screenWidth * 0.9 * 0.56};
`;

const BulletPoint = styled.View`
  margin-top: 5px;
`;

const KeyPNG = styled.Image`
  width: 35px;
  height: ${(props) => props.height}px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  flex: 1;
  margin-left: 10px;
`;

const GreenBackground = styled.View`
  background-color: rgba(129, 219, 211, 0.15);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px #39cec1 dashed;
`;

const KeyContainer = styled.View`
  flex-direction: row;
`;

const Title = styled.View`
  flex-shrink: 0;
  margin-top: 35px;
  margin-bottom: 20px;
`;

const MyGoalSubContainer = styled.View`
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 5px 10px;
`;

const PartContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

const MyGoalSubContainerInside = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TextModify = styled(TextStyled)`
  text-decoration: underline;
`;

const ButtonTouchable = styled.TouchableOpacity`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default Defi4_Day4;
