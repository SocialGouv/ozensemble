import React from 'react';
import TextStyled from '../../../components/TextStyled';
import { Spacer } from '../../../components/Articles';
import { View } from 'react-native';
import styled from 'styled-components';

const BulletPoint = styled.View`
  margin: 10px;
`;

const TextResult = ({ questionKey }) => {
  switch (questionKey) {
    case 0:
      return (
        <>
          <View>
            <TextStyled bold>Un verre de vin par jour n’est pas bon pour la santé !</TextStyled>
            <Spacer size={10} />
            <TextStyled>Parfois, on entend dire que le vin protège de certaines maladies (French Paradoxe).</TextStyled>

            <Spacer size={20} />
            <TextStyled bold>SAUF QUE :</TextStyled>
            <Spacer size={10} />
          </View>
          <BulletPoint>
            <TextStyled>
              {'\u2022'} Comme pour tout type d’alcool, boire un verre de vin chaque jour{' '}
              <TextStyled bold>augmente les risques de développer certains cancers</TextStyled> (bouche, gorge, colon,
              rectum, œsophage et sein).
            </TextStyled>
          </BulletPoint>
          <BulletPoint>
            <TextStyled>
              {'\u2022'} Le <TextStyled bold>French Paradoxe</TextStyled> n’est pas un bon modèle : votre verre de vin
              quotidien{' '}
              <TextStyled bold>
                protègera faiblement votre appareil cardiovasculaire et abîmera tout le reste
              </TextStyled>{' '}
              de votre organisme !
            </TextStyled>
          </BulletPoint>
          <BulletPoint>
            <TextStyled>
              {'\u2022'} Même consommé en petite quantité, les risques sur la santé du vin sont bien plus nombreux que
              ses effets protecteurs.
            </TextStyled>
          </BulletPoint>
        </>
      );

    case 1:
      return (
        <>
          <View>
            <TextStyled bold>L’alcool bénéficie à tort d’une bonne réputation vis-à-vis du sommeil !</TextStyled>
            <Spacer size={10} />
            <TextStyled>
              La recherche scientifique conforte l’expérience personnelle, à savoir que l’alcool favorise
              l’endormissement.
            </TextStyled>

            <Spacer size={20} />
            <TextStyled bold>SAUF QUE :</TextStyled>
            <Spacer size={10} />
          </View>

          <BulletPoint>
            <TextStyled>
              {'\u2022'} L’alcool et le sommeil ne font pas bon ménage pour autant. Ses{' '}
              <TextStyled bold>effets négatifs</TextStyled> surviennent plus tard dans la nuit et{' '}
              <TextStyled bold>agissent sur la qualité et la durée du sommeil</TextStyled>.
            </TextStyled>
          </BulletPoint>
          <BulletPoint>
            <TextStyled>
              {'\u2022'} Le sommeil se caractérise par une alternance de sommeil profond (paradoxal), durant lequel le
              sujet rêve, et une phase de sommeil lent. La succession de ces deux phases est essentielle à l’équilibre
              de l'individu.{' '}
              <TextStyled bold>
                L’alcool perturbe grandement cette séquence en réduisant notamment le sommeil profond
              </TextStyled>
              . C'est pourquoi le sujet alcoolique est fréquemment en manque chronique de sommeil.
            </TextStyled>
          </BulletPoint>
        </>
      );

    case 2:
      return (
        <>
          <View>
            <TextStyled bold>
              Le lobby de l’alcool est puissant en France et freine la propagation des messages de santé publique
              promouvant la réduction de sa consommation.
            </TextStyled>
            <Spacer size={10} />
          </View>

          <BulletPoint>
            <TextStyled>
              {'\u2022'} Le <TextStyled bold>chiffre d’affaires</TextStyled> de la filière Française de l’alcool
              représentait <TextStyled bold>19,6 milliards d’euros</TextStyled> en 2011 (OFDT) :{'\n'}- 15 milliards
              d’euros pour le secteur de la viticulture,{'\n'}- 2,5 milliards d’euros pour les spiritueux et les eaux de
              vie naturelles,{'\n'}- 2,1 milliards d’euros pour le secteur de la bière.
            </TextStyled>
          </BulletPoint>
          <BulletPoint>
            <TextStyled>
              {'\u2022'} En 2008, les <TextStyled bold>ménages Français</TextStyled> ont consacré à l’alcool 15
              milliards d’euros, soit 1 % de leur budget ou encore{' '}
              <TextStyled bold>8,6 % du budget alimentation</TextStyled> (Insee).
            </TextStyled>
          </BulletPoint>
          <BulletPoint>
            <TextStyled>
              {'\u2022'} La filière alcool représente près de <TextStyled bold>665 000 emplois</TextStyled> directs ou
              indirects en France (OFDT).
            </TextStyled>
          </BulletPoint>
          <BulletPoint>
            <TextStyled>
              {'\u2022'} Les <TextStyled bold>investissements publicitaires</TextStyled> en faveur des boissons
              alcooliques représentaient <TextStyled bold>306 millions d’euros</TextStyled> en 2006 (TNS Media
              Intelligence).
            </TextStyled>
          </BulletPoint>
        </>
      );

    default:
      return <></>;
  }
};

export default TextResult;
