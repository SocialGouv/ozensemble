import React from 'react';
import TextStyled from '../components/TextStyled';
import { ScreenBgStyled, Title, SubTitle, StyledScreen2 } from './styles';

const Screen2 = () => (
  <ScreenBgStyled>
    <StyledScreen2 />
    <Title>
      <TextStyled color="#4030a5">Détectez les risques d'addiction</TextStyled>
    </Title>
    <SubTitle>
      <TextStyled color="#191919">
        Identifiez des consommations excessives ou votre dépendance
      </TextStyled>
    </SubTitle>
  </ScreenBgStyled>
);

export default Screen2;
