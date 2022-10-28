import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import styled from 'styled-components';
import H2 from '../../../components/H2';
import { Image } from 'react-native';

const Defi3_Day7 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi3) setValidatedDays(route?.params?.day, '@Defi3');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Bilan de ma semaine">
      <Element
        content={
          <>
            Ce n’est pas facile de modifier tout d’un coup votre consommation habituelle d’alcool.{'\n'}
            {'\n'}
            <TextStyled bold>Il est nécessaire de changer pas à pas</TextStyled> pour atteindre progressivement une
            stabilité.
          </>
        }
      />

      <ImageView>
        <Image source={require('../../../assets/images/Defi3_Day7.png')} />
      </ImageView>

      <H2 color="#4030A5">Les conseils d’Oz Ensemble</H2>
      <BulletPoint>
        <TextStyled>{'\u2022'} Prenez de la hauteur et cherchez de nouvelles activités.</TextStyled>
      </BulletPoint>
      <BulletPoint>
        <TextStyled>{'\u2022'} Faites un pas de coté pour penser à votre contexte actuel.</TextStyled>
      </BulletPoint>
      <BulletPoint>
        <TextStyled>
          {'\u2022'} Demandez de l’aide à un proche ou à un professionnel s’il vous est difficile d’atteindre seul votre
          objectif.
        </TextStyled>
      </BulletPoint>
      <BulletPoint>
        <TextStyled>
          {'\u2022'} Sachez qu’il existe des traitements qui peuvent réduire les envies d’alcool et vous soulager.
        </TextStyled>
      </BulletPoint>
      <ButtonPrimaryStyled content="J'échange avec un professionnel" onPress={() => navigation.navigate('CONTACT')} />
    </WrapperContainer>
  );
};

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

const BulletPoint = styled.View`
  margin: 20px;
`;

const ImageView = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export default Defi3_Day7;
