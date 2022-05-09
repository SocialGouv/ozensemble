import React from 'react';
import { Text } from 'react-native';
import { css } from 'styled-components';

import H1 from '../../components/H1';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';

const GainsCalendar = ({ init }) => {
  return (
    <TopContainer>
      <TopTitle>
        <H1 color="#4030a5">Mon Calendrier</H1>
      </TopTitle>
      <Text>Calendrier</Text>
      <TextStyled color="#4030a5">État de ma consommation</TextStyled>
      <PartDescription value={"Je n'ai pas bu"} color={"#28A745"} />
      <PartDescription value={"J'ai bu"} color={"#DE285E"} />
      {!init &&
        <>
          <TextStyled color="#4030a5">Total verres par semaine</TextStyled>
          <PartDescription value={"J'ai respecté mon objectif"} color={"#02594C"} />
          <PartDescription value={"Je n'ai pas respecté mon objectif"} color={"#960031"} />
        </>
      }
    </TopContainer>
  )
}

const TopContainer = styled.View`
  padding: 20px 30px 0px;
`;

const TopTitle = styled.View`
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
`;

const PartDescription = ({ color, value }) => (
  <PartContainer>
    <Dot color={color} />
    <TextStyled>{value}</TextStyled>
  </PartContainer>
)

const PartContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const dotSize = 30

const dotCss = css`
  width: ${dotSize}px;
  height: ${dotSize}px;
  border-radius: ${dotSize}px;
  margin-right: 20px;
  margin-bottom: 2px;
  margin-top: 2px;
  overflow: hidden;
`;

const Dot = styled.View`
  ${dotCss}
  margin-top: ${dotSize * 0.12}px;
  background-color: ${({ color }) => color};
`;



export default GainsCalendar

