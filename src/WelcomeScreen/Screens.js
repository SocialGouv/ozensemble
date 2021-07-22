import React from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../components/TextStyled';
import H2 from '../components/H2';
import H1 from '../components/H1';
import Screen1Image from '../components/Illustrations/Screen1';
import Screen2Image from '../components/Illustrations/Screen2';
import Screen3Image from '../components/Illustrations/Screen3';
import { screenHeight, screenWidth } from '../styles/theme';
import { mediaHeight } from '../styles/mediaQueries';

export const Screen1 = () => (
  <ScreenBgStyled>
    <StyledScreen1 />
    <Title>
      <TextStyled color="#4030a5">Évaluez votre consommation d'alcool</TextStyled>
    </Title>
    <SubTitle>
      <TextStyled color="#191919">Un outil </TextStyled>
      <TextStyled color="#4030a5">gratuit </TextStyled>
      <TextStyled color="#191919">et </TextStyled>
      <TextStyled color="#4030a5">anonyme </TextStyled>
      <TextStyled color="#191919">de suivi de consommation d'alcool</TextStyled>
    </SubTitle>
  </ScreenBgStyled>
);

export const Screen2 = () => (
  <ScreenBgStyled>
    <StyledScreen2 />
    <Title>
      <TextStyled color="#4030a5">Détectez les risques d'addiction</TextStyled>
    </Title>
    <SubTitle>
      <TextStyled color="#191919">Identifiez des consommations excessives ou votre dépendance</TextStyled>
    </SubTitle>
  </ScreenBgStyled>
);

export const Screen3 = () => (
  <ScreenBgStyled>
    <StyledScreen3 />
    <Title>
      <TextStyled color="#4030a5">Faites-vous accompagner par un professionnel</TextStyled>
    </Title>
    <SubTitle>
      <TextStyled color="#191919">
        Discutez gratuitement avec un professionnel et obtenez des conseils personnalisés
      </TextStyled>
    </SubTitle>
  </ScreenBgStyled>
);

const ScreenBgStyled = styled.View`
  background-color: #f9f9f9;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const Title = styled(H1)`
  margin-bottom: ${screenHeight * 0.025}px;
  width: 75%;
  flex-shrink: 0;
`;

const SubTitle = styled(H2)`
  width: 75%;
  margin-bottom: ${screenHeight * 0.25}px;
  flex-shrink: 0;
`;

const bigImage = css`
  height: 200px;
`;
const mediumImage = css`
  height: 150px;
`;
const smallImage = css`
  height: 65px;
`;

const imageCss = css`
  margin-bottom: ${screenHeight * 0.05}px;
  width: ${screenWidth}px;
  flex-shrink: 0;
  ${bigImage}
  ${mediaHeight.medium`${mediumImage}`}
  ${mediaHeight.small`${smallImage}`}
`;

const StyledScreen1 = styled(Screen1Image)`
  ${imageCss}
`;

const StyledScreen2 = styled(Screen2Image)`
  ${imageCss}
`;

const StyledScreen3 = styled(Screen3Image)`
  ${imageCss}
  margin-bottom: 0px;
`;
