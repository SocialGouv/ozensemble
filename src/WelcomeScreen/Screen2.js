import React from 'react';
import TextStyled from '../components/TextStyled';
import { ScreenBgStyled, Title, SubTitle, StyledScreen2 } from './styles';

const Screen2 = () => (
  <ScreenBgStyled>
    <StyledScreen2 />
    <Title>
      <TextStyled type="title">Détectez les risques d'addiction</TextStyled>
    </Title>
    <SubTitle>
      <TextStyled type="basicText">Identifiez des consommations excessives ou votre dépendance</TextStyled>
    </SubTitle>
  </ScreenBgStyled>
);

export default Screen2;
