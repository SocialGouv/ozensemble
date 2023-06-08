import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import AddCircle from '../../../components/illustrations/icons/AddCircle';
import MinusCircle from '../../../components/illustrations/icons/MinusCircle';
import Defi3_day2_Schema from '../../../components/Defi3_day2_Schema';
import ToggleContent from '../../../components/ToggleContent';

const Defi3_Day2 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi3) setValidatedDays(route?.params?.day, '@Defi3');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Comment maintenir ma motivation ?">
      <Element
        content={
          <>
            Changer votre <TextStyled bold>environnement</TextStyled> peut influencer votre capacité à réduire votre
            consommation d’alcool :{'\n'}
            {'\n'}
            <CircleContainer>
              <AddCircleStyled />
              <TextStyled>Positivement</TextStyled>
            </CircleContainer>
            {'\n'}
            <CircleContainer>
              <MinusCircleStyled />
              <TextStyled>Négativement</TextStyled>
            </CircleContainer>
          </>
        }
      />

      <Element
        content={
          <>
            Ce shéma peut vous aider à comprendre les différents{' '}
            <TextStyled bold>facteurs qui influencent la motivation. </TextStyled>
          </>
        }
      />
      <Defi3_day2_Schema />

      <Dropdown>
        <ToggleContent title="1. Mon environnement">
          <Element
            content={
              <>
                <TextStyled>
                  Réfléchissez plus largement à vos <TextStyled bold>contextes de consommation</TextStyled> et leur
                  impact :{'\n'}
                </TextStyled>
                {'\n'}
                {'\u2022'} Environnement social
                {'\n'}
                {'\n'}
                {'\u2022'} Situation familiale
                {'\n'}
                {'\n'}
                {'\u2022'} Contexte professionnel
                {'\n'}
                {'\n'}
                {'\u2022'} Raisons culturelles
              </>
            }
          />
        </ToggleContent>
        <ToggleContent title="2. Ma consommation ">
          <Element
            content={
              <>
                <TextStyled>
                  Demandez-vous si vous ne pouvez pas <TextStyled bold>changer votre boisson alcoolisée</TextStyled>{' '}
                  habituelle par une autre, moins forte et de meilleure qualité gustative. {'\n'}
                  {'\n'}
                </TextStyled>
                <TextStyled bold>Changer votre habitude va changer votre consommation.</TextStyled>
              </>
            }
          />
        </ToggleContent>
        <ToggleContent title="3. Moi-même">
          <Element
            content={
              <>
                Nous sommes tous nés différents, avec une <TextStyled bold>fragilité plus ou moins grande</TextStyled>{' '}
                face à l’alcool. Elle est liée à :{'\n'}
                {'\n'}
                {'\u2022'} Notre caractère
                {'\n'}
                {'\n'}
                {'\u2022'} Notre patrimoine génétique
                {'\n'}
                {'\n'}
                {'\u2022'} Des évènements de vie plus ou moins douloureux
              </>
            }
          />
        </ToggleContent>
      </Dropdown>

      <TextStyled bold>
        Rappelez-vous que les envies de consommer ne sont pas seulement dûes à vous-même et à votre motivation !{'\n\n'}
      </TextStyled>

      <TouchableOpacity onPress={() => navigation.navigate('ALCOHOL_AND_MOTIVATION')}>
        <TextStyled>
          Pour <TextStyled bold>aller plus loin</TextStyled>, lisez notre article sur{' '}
          <TextStyled color="#4030A5" underline>
            les motivations à réduire l’alcool
          </TextStyled>
        </TextStyled>
      </TouchableOpacity>

      <ButtonPrimaryStyled content="J’ai compris" onPress={() => navigation.navigate('DEFI3_MENU')} />
    </WrapperContainer>
  );
};

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
  align-self: center;
`;

const CircleContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
`;

const AddCircleStyled = styled(AddCircle)`
  margin-right: 10px;
`;

const MinusCircleStyled = styled(MinusCircle)`
  margin-right: 10px;
`;

const Dropdown = styled.View`
  margin-bottom: 40px;
`;

export default Defi3_Day2;
