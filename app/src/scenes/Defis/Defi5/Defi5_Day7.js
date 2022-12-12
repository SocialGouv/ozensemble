import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import Element from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import { defaultPaddingFontScale, screenWidth } from '../../../styles/theme';
import { ReevaluateConsoResult } from './Defi5_Day1';
import H2 from '../../../components/H2';
import { ResultsReLifeQuality } from './Defi5_Day3';

const Defi5_Day7 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi5) setValidatedDays(route?.params?.day, '@Defi5');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Mon bilan après 4 semaines">
      <Subtitle color="#4030a5">Mon score de consommation</Subtitle>
      <ReevaluateConsoResult onlyScore noShadow />
      <Subtitle color="#4030a5">Ma qualité de vie</Subtitle>
      <ResultsReLifeQuality />
      <Subtitle color="#4030a5">Quel sera mon prochain défi{'\u00A0'}?</Subtitle>
      <Element
        content={
          <>
            Maintenant que vous avez commencé à changer votre comportement, atteint ou presque votre objectif de
            consommation,{' '}
            <TextStyled bold>votre prochain défi consistera à maintenir le changement effectué.</TextStyled>
          </>
        }
      />
      <Element
        content={
          <>
            Il est important de ne pas sous-estimer ce dernier défi.{' '}
            <TextStyled bold>
              Les occasions de boire trop et les tentations peuvent parfois se présenter au moment où on s'y attend le
              moins.
            </TextStyled>{' '}
            Il n'est donc pas étonnant que la majorité des gens retournent à leurs anciennes habitudes au moins une fois
            avant d'arriver à modifier durablement leur consommation d'alcool.
          </>
        }
      />
      <FullScreenImage source={require('../../../assets/images/Defi5Day7.png')} />
      <Subtitle color="#4030a5">Comment envisager l'avenir{'\u00A0'}?</Subtitle>
      <Element
        content={
          <>
            Il n'est jamais facile de modifier un comportement. La progression se fait rarement en ligne droite, elle
            s'effectue plutôt en dents-de-scie.
          </>
        }
      />
      <Element
        content={
          <>
            <TextStyled bold>
              Alors que certains jours, les nouvelles habitudes semblent faire partie d'un nouveau mode de vie, d'autres
              moments peuvent être plus difficiles à surmonter.
            </TextStyled>{' '}
            Il est possible qu'un jour vous dépassiez votre objectif de consommation et que vous vous repreniez en main
            le lendemain.
          </>
        }
      />
      <Subtitle color="#4030a5">Et si j'ai besoin d'aide{'\u00A0'}?</Subtitle>
      <Element
        content={
          <>
            Si vous n'êtes pas satisfait(e) des résultats obtenus jusqu'à maintenant, rappelez-vous que{' '}
            <TextStyled bold>
              vous pouvez{' '}
              <TextStyled onPress={() => navigation.navigate('CONTACT')} underline bold color="#4030A5">
                en parler avec un professionnel
              </TextStyled>
            </TextStyled>{' '}
            afin de discuter de votre situation.
          </>
        }
      />
      <Element
        content={
          <>
            Il pourra envisager <TextStyled bold>d'autres solutions{'\u00A0'}:</TextStyled> un accompagnement
            individualisé, des groupes, une adaptation du programme de réduction à votre situation ou encore l'essai
            d'un autre programme.
          </>
        }
      />
    </WrapperContainer>
  );
};

const FullScreenImage = styled.Image`
  width: ${screenWidth}px;
  height: ${(screenWidth * 200) / 375}px;
  margin-horizontal: -${defaultPaddingFontScale()}px;
  margin-bottom: 20px;
`;

const Subtitle = styled(H2)`
  margin-top: 10px;
  margin-bottom: 5px;
`;

export default Defi5_Day7;
