import React from 'react';
import TextStyled from '../components/TextStyled';
import { ScreenBgStyled, Title, SubTitle, StyledScreen1 } from './styles';

const Screen1 = () => (
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

export default Screen1;
