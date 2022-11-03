import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import styled from 'styled-components';
import { P, Spacer } from '../../../components/Articles';
import Calculate from '../../../components/illustrations/icons/Calculate';
import { defaultPaddingFontScale, screenWidth } from '../../../styles/theme';

const Defi4_Day4 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi4) setValidatedDays(route?.params?.day, '@Defi4');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer
      onPressBackButton={navigation.goBack}
      title="Comment me fixer un objectif réaliste ?"
      noPaddingHorizontal>
      <PaddingContainer>
        <Element
          content={
            <>
              Il peut être plus stimulant de se fixer un objectif à <TextStyled bold>court terme</TextStyled> plutôt
              qu’un objectif à <TextStyled bold>long terme</TextStyled> d’emblée. En effet, il est plus motivant
              d’atteindre plusieurs <TextStyled bold>objectifs intermédiaires par paliers</TextStyled> que de se fixer
              d’emblée la barre trop haut.
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
                Un objectif réaliste est celui qui a de très bonnes chances d’être atteint. Pour augmenter vos chances
                de succès, nous vous suggérons de vous fixer des{' '}
                <TextStyled bold>objectifs intermédiaires réalistes : ni trop faciles, ni trop difficiles</TextStyled>.
              </P>
              <BulletPoint>
                <P>
                  {'\u2022'} Si ils sont trop faciles, ils sont probablement trop bas et vous pourrez avoir besoin de{' '}
                  <TextStyled bold>plusieurs mois pour atteindre votre objectif final de réduction</TextStyled>, ce qui
                  risque de vous décourager.
                </P>
              </BulletPoint>
              <BulletPoint>
                <P>
                  {'\u2022'} Si ils sont trop difficiles, vous risquez de ne pas les atteindre et de{' '}
                  <TextStyled bold>diminuer votre confiance</TextStyled> en vos capacités de réussir. De plus, réduire
                  trop rapidement peut faire apparaître des <TextStyled bold>symptômes de sevrage</TextStyled>.
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
                Pour <TextStyled bold>fixer vos objectifs</TextStyled> de façon réaliste, nous vous suggérons :
              </P>
              <BulletPoint>
                <P>
                  {'\u2022'} D’utiliser votre <TextStyled bold>bilan de la première semaine</TextStyled> de défi comme{' '}
                  <TextStyled bold>point de départ</TextStyled>.
                </P>
              </BulletPoint>
              <BulletPoint>
                <P>
                  {'\u2022'} De penser à un <TextStyled bold>objectif qui vous motive</TextStyled> pour des raisons
                  personnelles ou de santé comme <TextStyled bold>point d’arrivée</TextStyled>.
                </P>
              </BulletPoint>
              <P>
                Calculez ensuite la <TextStyled bold>différence entre le nombre de consommations</TextStyled> de votre
                point de départ et de votre point d’arrivée.{' '}
              </P>
              <P>
                Enfin, <TextStyled bold>étalez la différence de verres sur 6 semaines</TextStyled>. Pour la plupart des
                gens, une période de cinq à six semaines constitue un délai réaliste.{' '}
              </P>
            </>
          }
        />

        <GreenBackground>
          <KeyContainer>
            <Calculate />
            <TextContainer>
              <P>
                Exemple : une personne consomme <TextStyled bold>15 verres par semaine</TextStyled> et veut atteindre{' '}
                <TextStyled bold>6 verres par semaine</TextStyled> pour protéger sa santé et rejoindre les
                recommandations.Elle doit réduire de <TextStyled bold>15 - 6 = 9 verres</TextStyled>.Elle étale sa
                réduction sur <TextStyled bold>6 semaines</TextStyled> et doit donc réduire chaque semaine de{' '}
                <TextStyled bold>9/6 = 1 verre et demi</TextStyled>.
              </P>
            </TextContainer>
          </KeyContainer>
        </GreenBackground>

        <Element
          content={
            <>
              A la lumière de ces informations, vous pouvez maintenant{' '}
              <TextStyled bold>mettre à jour votre objectif du mois prochain</TextStyled> si vous le souhaitez.
            </>
          }
        />

        <ButtonPrimaryStyled content="J’ai trouvé mes raisons" onPress={() => navigation.navigate('DEFI4_MENU')} />
      </PaddingContainer>
    </WrapperContainer>
  );
};

const PaddingContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const TimelineContainer = styled.View`
  align-items: center;
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

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

export default Defi4_Day4;
