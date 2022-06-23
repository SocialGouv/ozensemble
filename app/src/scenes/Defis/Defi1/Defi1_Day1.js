import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import ButtonPrimary from '../../../components/ButtonPrimary';
import OneDoseAlcoolExplanation from '../../../components/OneDoseAlcoolExplanation';
import TextStyled from '../../../components/TextStyled';
import Diagram from '../../ConsoFollowUp/Diagram';
import { setValidatedDays } from '../utils';
import { maxDrinksPerWeekSelector } from '../../../recoil/gains';
import ElementDayDefi from '../../../components/ElementDayDefi';
import { logEvent } from '../../../services/logEventsWithMatomo';
import WrapperContainer from '../../../components/WrapperContainer';
import { defaultPaddingFontScale } from '../../../styles/theme';

const Defi1_Day1 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const drinkByWeek = useRecoilValue(maxDrinksPerWeekSelector);

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer title={"Comment compter sa consommation d'alcool ?"} onPressBackButton={navigation.goBack}>
      <ElementDayDefi
        content={
          <>
            <TextStyled>
              Les consommations que vous saisissez dans le cadre du défi se retrouvent automatiquement dans votre agenda
              de consommation disponible dans l'onglet <TextStyled bold>Suivi</TextStyled>. Vous pouvez saisir une
              consommation depuis l'agenda ou en appuyant sur le bouton{' '}
            </TextStyled>
            <CTAContainer>
              <CTASubContainer>
                <PlusHorizontal />
                <PlusVertical />
              </CTASubContainer>
            </CTAContainer>
          </>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Quand vous saisissez une consommation d'alcool, celle-ci est automatiquement comptabilisée en unité
            d'alcool.{'\n\n'}À titre indicatif, chaque consommation ci-dessous compte pour une unité d'alcool :
          </TextStyled>
        }
      />
      <OneDoseAlcoolExplanation marginOffset={defaultPaddingFontScale()} noMinHeight />
      <ElementDayDefi
        content="Nous vous conseillons de noter vos consommations au fur et à mesure de la journée sans attendre le
              lendemain !"
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Un graphique vous permet de suivre vos consommations en unité d'alcool consommées sur une journée.
            {'\n\n'}
            {drinkByWeek
              ? `La ligne verte représente votre objectif (${drinkByWeek} unités d'alcool par jour)`
              : "La ligne verte représente le seuil de l'OMS (2 verres par jour) ou votre objectif quand il sera fixé"}
          </TextStyled>
        }
      />
      <Diagram asPreview />
      <ElementDayDefi
        content={
          <TextStyled>
            Retrouvez le détail de vos consommations dans le fil du journal de l'onglet{' '}
            <TextStyled bold>Suivi</TextStyled>. Vous pouvez les modifier ou les compléter pour les jours précédents.
          </TextStyled>
        }
      />
      <AddConsoCTAContainer>
        <ButtonPrimary
          onPress={() => {
            navigation.push('ADD_DRINK', { timestamp: Date.now() });
            logEvent({
              category: 'CONSO',
              action: 'CONSO_OPEN_CONSO_ADDSCREEN',
            });
          }}
          content="Ajouter une consommation"
        />
      </AddConsoCTAContainer>
    </WrapperContainer>
  );
};

const AddConsoCTAContainer = styled.View`
  align-items: center;
`;
const roundCss = (size) => css`
  height: ${size}px;
  width: ${size}px;
  border-radius: ${size}px;
`;
const iconSize = 12;
const CTASize = 2 * iconSize;
const plusThickness = 2;
const CTAInner = CTASize - 2 * plusThickness;
const plusSize = CTAInner / 2;

const CTAContainer = styled.View`
  position: absolute;
  ${Platform.OS === 'ios' ? `transform: translateY(-${CTAInner}px);` : `transform: translateY(${CTAInner / 2}px);`}
  ${roundCss(CTASize)}
  border: 1px solid #4030a533;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const CTASubContainer = styled.View`
  ${roundCss(CTAInner)}
  background-color: #de285e;
  justify-content: center;
  align-items: center;
`;

const PlusHorizontal = styled.View`
  width: ${plusSize}px;
  height: ${plusThickness}px;
  border-radius: ${plusThickness}px;
  position: absolute;
  top: ${CTAInner / 2 - plusThickness / 2}px;
  left: ${(CTAInner - plusSize) / 2}px;
  background: white;
`;

const PlusVertical = styled.View`
  width: ${plusThickness}px;
  height: ${plusSize}px;
  border-radius: ${plusThickness}px;
  position: absolute;
  left: ${CTAInner / 2 - plusThickness / 2}px;
  top: ${(CTAInner - plusSize) / 2}px;
  background: white;
`;

export default Defi1_Day1;
