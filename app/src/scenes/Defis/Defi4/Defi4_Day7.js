import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Image, Linking, View } from 'react-native';
import { defaultPaddingFontScale, screenWidth } from '../../../styles/theme';
import { setValidatedDays } from '../utils';
import H2 from '../../../components/H2';
import Sources from '../../Quizzs/Sources';
import QButton from '../../../components/QButton';
import { Bold, P } from '../../../components/Articles';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import WrapperContainer from '../../../components/WrapperContainer';
import { daysWithGoalNoDrinkState, maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../../recoil/gains';
import Done from '../../../components/illustrations/Done';
import { Defi4_Day5_Answers_State } from '../../../recoil/quizzs';
import answersDefi4Day5 from './Day5/answers';

const Defi4_Day7 = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);
  const dayNoDrink = useRecoilValue(daysWithGoalNoDrinkState)?.length;
  const defi4_Day5_Answers = useRecoilValue(Defi4_Day5_Answers_State);
  const isOnboarded = useMemo(
    () => !!maxDrinksPerWeekGoal && !!previousDrinksPerWeek.length,
    [maxDrinksPerWeekGoal, previousDrinksPerWeek]
  );

  useEffect(() => {
    if (route?.params?.inDefi4) {
      setValidatedDays(route?.params?.day, '@Defi4');
    }
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer title="Bilan de la semaine" onPressBackButton={navigation.goBack} noPaddingHorizontal>
      <PaddingContainer>
        <SituationContainer>
          <QButtonCentered>
            <QButton content={1} disabled colorText="#ffffff" colorBorder="#4030A5" colorBackground=" #4030A5" />
          </QButtonCentered>
          <View>
            <H2 color="#4030a5">Ma stratégie</H2>
          </View>
        </SituationContainer>
        <SituationTextContainer>
          <P noMarginBottom>
            J’ai choisi entre <Bold>abstinence</Bold> ou <Bold>modération</Bold>
          </P>
        </SituationTextContainer>

        <SituationContainer>
          <QButtonCentered>
            <QButton content={2} disabled colorText="#ffffff" colorBorder="#4030A5" colorBackground=" #4030A5" />
          </QButtonCentered>
          <View>
            <H2 color="#4030a5">Mon premier objectif validé</H2>
          </View>
        </SituationContainer>
        {!isOnboarded ? (
          <>
            <SituationTextContainer>
              <P noMarginBottom>Vous n'avez pas encore fixé d'objectif !</P>
            </SituationTextContainer>
          </>
        ) : (
          <>
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
          </>
        )}

        <SituationContainer>
          <QButtonCentered>
            <QButton content={3} disabled colorText="#ffffff" colorBorder="#4030A5" colorBackground=" #4030A5" />
          </QButtonCentered>
          <View>
            <H2 color="#4030a5">Mes plaisirs alternatifs</H2>
          </View>
        </SituationContainer>
        <SituationTextContainer>
          <SituationInside>
            {defi4_Day5_Answers.map((answer) => (
              <P key={answer} noMarginBottom>
                {'• '} {answersDefi4Day5.find((item) => item.answerKey === answer).content}
              </P>
            ))}
          </SituationInside>
        </SituationTextContainer>

        <SituationContainer>
          <QButtonCentered>
            <QButton content={4} disabled colorText="#ffffff" colorBorder="#4030A5" colorBackground=" #4030A5" />
          </QButtonCentered>
          <View>
            <H2 color="#4030a5">Mes boissons alternatives</H2>
          </View>
        </SituationContainer>
        <MyGoalSubContainer>
          <MyGoalSubContainerInside>
            <PartContainer>
              <Done size={20} />
              <TextStyled>{'  '}Je bois 1,5 litres d’eau par jour</TextStyled>
            </PartContainer>
            <PartContainer>
              <Done size={20} />
              <TextStyled>{'  '}J’ai choisi des boissons alternatives</TextStyled>
            </PartContainer>
          </MyGoalSubContainerInside>
        </MyGoalSubContainer>
        <Spacer />
      </PaddingContainer>

      <ImageStyled source={require('../../../assets/images/juiceBar.png')} />

      <PaddingContainer>
        <Spacer size={40} />
        <H2 color="#4030a5">Les conseils d’Oz Ensemble</H2>
        <Spacer size={20} />
        <P>
          <Bold>{'• '} Autant que possible, ne changez votre objectif qu’après une période de réflexion.</Bold>
          {'\n\n'}
          <P>
            {'• '} Vous pouvez commencer à{' '}
            <Bold>réduire ou arrêter votre consommation dans les situations qui vous paraissent les plus faciles</Bold>{' '}
            et continuer à éviter les plus difficiles. Vos chances de succès seront meilleures !{' '}
          </P>
          {'\n\n'}
          <P>
            {'• '} Quand vous serez à l’aise avec les situations plus faciles, vous pourrez essayer des situations de
            plus en plus difficiles. Rappelez-vous que{' '}
            <Bold>
              modifier ses habitudes de consommation demande de la pratique et de la persévérance. Faites-vous confiance
              !
            </Bold>{' '}
            Vous y parviendrez, une situation à la fois.{' '}
          </P>
        </P>
        <Spacer />
        <Sources>
          <>
            <LinkContainer
              onPress={() => {
                Linking.openURL('https://www.thehealthy.com/addiction/drugs-alcohol/limit-alcohol/');
              }}>
              <TextStyled>
                {'\n    • '}
                <TextStyled color="#4030a5" italic underline>
                  Cut Back on Alcohol: 17 Tips to Drink a Little Less
                </TextStyled>
                , Reader's Digest, The Editors of The Healthy, 2021.
              </TextStyled>
            </LinkContainer>

            <LinkContainer
              onPress={() => {
                Linking.openURL(
                  'https://www.ameli.fr/val-de-marne/assure/sante/themes/alcool-sante/conseils-reduire-consommation'
                );
              }}>
              <TextStyled>
                {'\n    • '}
                <TextStyled color="#4030a5" underline>
                  Alcool : des conseils pour réduire sa consommation
                </TextStyled>
                , Assurance maladie, 2022.
              </TextStyled>
            </LinkContainer>

            <LinkContainer
              onPress={() => {
                Linking.openURL(
                  'https://www.alcool-info-service.fr/alcool-et-vous/arreter-consommation-alcool/Je-veux-reduire-ma-consommation-d-alcool'
                );
              }}>
              <TextStyled>
                {'\n    • '}
                <TextStyled color="#4030a5" underline>
                  Je veux réduire ma consommation d'alcool
                </TextStyled>
                , Alcool Info Service, 2022.
              </TextStyled>
            </LinkContainer>
          </>
        </Sources>

        <ButtonsContainer>
          <ButtonPrimary content="J’ai fini" onPress={() => navigation.navigate('DEFI4_MENU')} />
        </ButtonsContainer>
      </PaddingContainer>
    </WrapperContainer>
  );
};

const ImageStyled = styled.Image`
  width: 100%;
`;

const PaddingContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const Spacer = styled.View`
  height: ${({ size }) => size || 20}px;
`;

const QButtonCentered = styled.View`
  align-self: center;
  margin-right: 10px;
`;

const SituationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SituationTextContainer = styled.View`
  background-color: #ffffff;
  border: 1px solid #d3d3e8;
  border-radius: 3px;
  width: 100%;
  margin-left: 10px;
  padding: 7px;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const SituationInside = styled.View`
  width: 100%;
  padding-left: 10px;
`;

const LinkContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
`;

const ButtonsContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const MyGoalSubContainer = styled.View`
  background-color: #ffffff;
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

export default Defi4_Day7;
