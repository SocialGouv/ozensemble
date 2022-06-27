import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../../utils';
import TextStyled from '../../../../components/TextStyled';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import ElementDayDefi from '../../../../components/ElementDayDefi';
import WrapperContainer from '../../../../components/WrapperContainer';

const Defi2_Day5_OnBoarding = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Affronter une situation à risque">
      <ElementDayDefi
        content={
          <TextStyled>
            Nous vous proposons un exercice basé sur l'identification de vos situations à risque. Commençons par{' '}
            <TextStyled bold>
              la plus facile (celle pour laquelle votre motivation à changer est la plus forte)
            </TextStyled>{' '}
            car c'est aussi la plus accessible pour vous au changement.
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Vous allez <TextStyled bold>réfléchir à l'émotion que vous ressentez</TextStyled>. {'\n\n'}
            Il est plus facile de{' '}
            <TextStyled bold>se préparer en amont de la situation en ayant planifié ces stratégies</TextStyled>, que de
            devoir réagir sur de l'émotionnel lorsque l'on est pris par la situation.{'\n\n'}Comme pour un sportif, il
            est nécessaire de s'entraîner avant une compétition pour pouvoir la gagner.
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Vous trouverez des{' '}
            <TextStyled bold>
              conseils adaptés à l'émotion que vous ressentez dans cette situation : prévoyez ceux que vous utiliserez
              avant d'affronter la situation.
            </TextStyled>
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Les gens réussissant à boire modérément, utilisent un plus grand nombre de stratégies que ceux qui ne
            réussissent pas.
          </TextStyled>
        }
      />
      <ButtonPrimary
        content="Je sélectionne mon émotion"
        widthSmall
        onPress={() => navigation.navigate('DEFI2_DAY5')}
      />
    </WrapperContainer>
  );
};

export default Defi2_Day5_OnBoarding;
