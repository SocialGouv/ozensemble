import React from 'react';
import TextStyled from '../components/TextStyled';
import { ScreenBgStyled, Title, SubTitle, StyledScreen1 } from './styles';

const Screen1 = () => (
  <ScreenBgStyled>
    <StyledScreen1 />
    <Title>
      <TextStyled type="title">Évaluez votre consommation d'alcool</TextStyled>
    </Title>
    <SubTitle>
      <TextStyled type="basicText">Un outil </TextStyled>
      <TextStyled type="title">gratuit </TextStyled>
      <TextStyled type="basicText">et </TextStyled>
      <TextStyled type="title">anonyme </TextStyled>
      <TextStyled type="basicText">de suivi de consommation d'alcool</TextStyled>
    </SubTitle>
  </ScreenBgStyled>
);

export default Screen1;
