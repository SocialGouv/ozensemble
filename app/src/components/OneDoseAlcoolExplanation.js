/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components';

import CocktailGlass from './illustrations/drinksAndFood/CocktailGlass';
import Dose from './illustrations/Dose';
import HalfBeer from './illustrations/drinksAndFood/HalfBeer';
import WineGlass from './illustrations/drinksAndFood/WineGlass';
import TextStyled from './TextStyled';

const doses = [
  { Icon: HalfBeer, name: 'bière', volume: 25, degrees: 5 },
  { Icon: WineGlass, name: 'vin', volume: 10, degrees: 12 },
  { Icon: CocktailGlass, name: 'spiritueux', volume: 3, degrees: 40 },
];

const OneDoseAlcoolExplanation = ({ backgroundColor, marginOffset = 0, noMinHeight }) => {
  return (
    <ContainerOneDoseAlcool backgroundColor={backgroundColor} marginOffset={marginOffset} noMinHeight={noMinHeight}>
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
          <Volume color="#4030a5">10g</Volume>
          <Volume color="#4030a5">d'alcool</Volume>
        </IconWrapper>
      </IconsContainer>
    </ContainerOneDoseAlcool>
  );
};

const ContainerOneDoseAlcool = styled.View`
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#f9f9f9')};
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  ${({ noMinHeight }) => !noMinHeight && 'min-height: 100%'}
  ${({ marginOffset }) => !!marginOffset && `margin-horizontal: -${marginOffset}px;`}
`;
const IconsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 50px;
  overflow: hidden;
`;
const IconWrapper = styled.View`
  align-items: center;
  overflow: hidden;
`;
const Volume = styled(TextStyled)`
  margin-top: 5px;
`;
const EqualWrapper = styled.View`
  padding: 10px;
  padding-bottom: 50px;
`;

export default OneDoseAlcoolExplanation;
