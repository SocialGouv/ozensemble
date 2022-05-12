/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components';

import CocktailGlass from './Illustrations/CocktailGlass';
import Dose from './Illustrations/Dose';
import HalfBeer from './Illustrations/HalfBeer';
import WineGlass from './Illustrations/WineGlass';
import TextStyled from './TextStyled';

const doses = [
  { Icon: HalfBeer, name: 'bière', volume: 25, degrees: 5 },
  { Icon: WineGlass, name: 'vin', volume: 10, degrees: 12 },
  { Icon: CocktailGlass, name: 'spiritueux', volume: 3, degrees: 40 },
];

const OneDoseAlcoolExplanation = ({ backgroundColor }) => {
  return (
    <ScreenBgStyled backgroundColor={backgroundColor}>
      <IconsContainer>
        {doses.map(({ Icon, volume, name, degrees }, i) => (
          <React.Fragment key={i}>
            <IconWrapper>
              <Icon size={50} style={{ borderWidth: 0 }} />
              <Volume color="#4030a5">{name}</Volume>
              <Volume color="#4030a5">{volume}cl</Volume>
              <Volume color="#4030a5">{degrees}%</Volume>
            </IconWrapper>
            {i < doses.length - 1 && (
              <EqualWrapper>
                <TextStyled color="#191919">=</TextStyled>
              </EqualWrapper>
            )}
          </React.Fragment>
        ))}
        <EqualWrapper>
          <TextStyled color="#191919">≈</TextStyled>
        </EqualWrapper>
        <IconWrapper>
          <Dose size={25} style={{ borderWidth: 0 }} />
          <Volume color="#4030a5">1 dose</Volume>
          <Volume color="#4030a5">10g d'alcool</Volume>
          <Volume color="#4030a5"> </Volume>
        </IconWrapper>
      </IconsContainer>
    </ScreenBgStyled>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#f9f9f9')};
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 50px;
`;
const IconWrapper = styled.View`
  align-items: center;
`;
const Volume = styled(TextStyled)`
  margin-top: 5px;
`;
const EqualWrapper = styled.View`
  padding: 10px;
  padding-bottom: 50px;
`;

export default OneDoseAlcoolExplanation;
