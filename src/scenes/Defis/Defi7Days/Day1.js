import React from 'react';
import styled, { css } from 'styled-components';
import { Platform } from 'react-native';

import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Background from '../../../components/Background';
import GoBackButton from '../../../components/GoBackButton';
import Diagram from '../../ConsoFollowUp/Diagram';
import Stars from '../../../components/Illustrations/Stars';
import { useFocusEffect } from '@react-navigation/native';
import { setValidatedDays } from './utils';
import OneDoseAlcoolExplanation from '../../../components/OneDoseAlcoolExplanation';

const Elem = ({ content, lineHeight = 20 }) => (
  <ElemContainer>
    <Stars color="#4030a5" style={{ marginRight: 10 }} size={20} />
    <TextStyled style={{ flex: 1, lineHeight }}>{content}</TextStyled>
  </ElemContainer>
);

export default ({ navigation, route }) => {
  useFocusEffect(() => {
    route?.params?.inDefi7Days && setValidatedDays(route?.params?.day);
  });
  return (
    <Background color="#39cec0" withSwiperContainer>
      {/* <HeaderBackground /> */}
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <GoBackButton onPress={navigation.goBack} />
            <Spacer />
            <H1 color="#4030a5">Comment compter sa consommation d'alcool ?</H1>
          </TopTitle>
          <Paragraph>
            <Elem
              content={
                <>
                  <TextStyled>
                    Les consommations que vous saisissez dans le cadre du défi se retrouvent automatiquement dans votre
                    agenda de consommation disponible dans l’onglet <TextStyled bold>Suivi</TextStyled>. Vous pouvez
                    saisir une consommation depuis l’agenda ou en appuyant sur le bouton{' '}
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
          </Paragraph>
          <Paragraph>
            <Elem
              content={
                'Quand vous saisissez une consommation d’alcool, celle-ci est automatiquement comptabilisée en unité d’alcool.\n\nÀ titre indicatif, chaque consommation ci-dessous compte pour une unité d’alcool :'
              }
            />
          </Paragraph>
          <OneDoseAlcoolExplanation></OneDoseAlcoolExplanation>
          <Paragraph>
            <Elem
              content="Si vous ne trouvez pas votre boisson dans les choix de base, vous pouvez en paramétrer une. Vous pouvez
              aussi scanner l’étiquette de la bouteille."
            />
          </Paragraph>
          <Paragraph>
            <Elem
              content="Nous vous conseillons de noter vos consommations au fur et à mesure de la journée sans attendre le
              lendemain !"
            />
          </Paragraph>
          <Paragraph>
            <Elem
              content={
                'Un graphique vous permet de suivre vos consommations en unité d’alcool consommées sur une journée. \n\nLa ligne verte représente le seuil de l’OMS (2 verres par jour).'
              }
            />
          </Paragraph>
          <Diagram asPreview />
          <Paragraph>
            <Elem
              content={
                <TextStyled>
                  Retrouvez le détail de vos consommations dans le fil du journal de l’onglet{' '}
                  <TextStyled bold>Suivi</TextStyled>. Vous pouvez les modifier ou les compléter pour les jours
                  précédents.
                </TextStyled>
              }
            />
          </Paragraph>
        </TopContainer>
        <AddConsoCTAContainer>
          <ButtonPrimary
            onPress={() => navigation.push('ADD_DRINK', { timestamp: Date.now() })}
            content="Ajouter une consommation"
          />
        </AddConsoCTAContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const TopContainer = styled.View`
  padding: 20px 30px 0px;
`;

const Spacer = styled.View`
  width: 5%;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const AddConsoCTAContainer = styled.View`
  margin-bottom: 100px;
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
