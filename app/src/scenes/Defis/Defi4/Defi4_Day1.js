import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ElementDayDefi from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import styled from 'styled-components';
import { Linking } from 'react-native';

const Defi4_Day1 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi4) setValidatedDays(route?.params?.day, '@Defi4');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Un objectif qui protège ma santé">
      <ElementDayDefi
        contentView={
          <>
            <TextSizeStyled>
              Lors du choix d’un objectif de consommation d’alccol, trois éléments principaux sont à considérer :{'\n'}
            </TextSizeStyled>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} Une <TextStyled bold>limite hebdomadaire</TextStyled> pour diminuer les risques associés à
                l’usage répété d’alcool, par exemple les maladies du foie.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} Une <TextStyled bold>limite quotidienne</TextStyled> afin de réduire les risques associés à
                un épisode de consommation élevée, par exemple les accidents de la route.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} Des <TextStyled bold>journées sans alcool</TextStyled> afin d’éviter de développer une
                dépendance.
              </TextSizeStyled>
            </BulletPoint>
          </>
        }
      />
      <ElementDayDefi
        contentView={
          <>
            <TextSizeStyled>Santé Public France (SPF) a tracé les lignes directrices suivantes :{'\n'}</TextSizeStyled>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} Ne pas consommer <TextStyled bold>plus de 10 verres standard par semaine</TextStyled>.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} Ne pas consommer <TextStyled bold>plus de 2 verres standard par jour</TextStyled>.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} Avoir des jours dans la semaine <TextStyled bold>sans consommation</TextStyled>.
              </TextSizeStyled>
            </BulletPoint>
          </>
        }
      />
      <ElementDayDefi
        contentView={
          <>
            <TextSizeStyled>De plus, pour chaque occasion de consommation, il est recommandé de :{'\n'}</TextSizeStyled>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} <TextStyled bold>Réduire la quantité</TextStyled> totale d’alcool que vous buvez.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} <TextStyled bold>Boire lentement</TextStyled>, en mangeant et en alternant avec de l’eau.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} <TextStyled bold>Éviter les lieux et les activités à risque</TextStyled> d’induire une
                consommation d’alcool.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} S'assurer que vous avez <TextStyled bold>des personnes que vous connaissez</TextStyled> près
                de vous.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} S’assurer que vous pouvez <TextStyled bold>rentrer chez vous en toute sécurité</TextStyled>.
              </TextSizeStyled>
            </BulletPoint>
          </>
        }
      />
      <ButtonPrimaryStyled content="J'ai compris" widthSmall onPress={() => navigation.navigate('DEFI4_MENU')} />
      <SmallTextStyled>
        <SmallTextStyled italic>Sources :</SmallTextStyled>
        {'\n'}
        {'\n'}
        Santé Publique France : De nouveaux repères de consommation d'alcool pour limiter les risques sur sa santé,
        2021.
        {'\n'}
        {'\n'}
        <SmallTextStyled
          color="#4030a5"
          onPress={() => {
            Linking.openURL(
              'https://www.santepubliquefrance.fr/determinants-de-sante/alcool/documents/article/de-nouveaux-reperes-de-consommation-d-alcool-pour-limiter-les-risques-sur-sa-sante'
            );
          }}>
          https://www.santepubliquefrance.fr/determinants-de-sante/alcool/documents/article/de-nouveaux-reperes-de-consommation-d-alcool-pour-limiter-les-risques-sur-sa-sante
        </SmallTextStyled>
      </SmallTextStyled>
    </WrapperContainer>
  );
};

const TextSizeStyled = styled(TextStyled)`
  font-size: 16px;
  line-height: 24px;
`;

const BulletPoint = styled.View`
  margin: 10px;
`;

const SmallTextStyled = styled(TextStyled)`
  font-size: 12px;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-bottom: 50px;
`;

export default Defi4_Day1;
