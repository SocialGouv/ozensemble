import React from 'react';

import H2 from '../../components/H2';
import H3 from '../../components/H3';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';

const OnBoardingGain = ({ onPress }) => {

  return (
    <OnBoarding>
      <Title>
        <TextStyled bold>Sans objectif, pas de gains</TextStyled>
      </Title>
      <SubTitle>
        <TextStyled >En 3 étapes, je peux me fixer un objectif pour réduire ma consommation d'alcool</TextStyled>
      </SubTitle>
      <Continue>
        <ButtonTouchable onPress={onPress}>
          <ContinueText>
            <TextStyled color={"#5856D6"}> Je me fixe un objectif</TextStyled>
          </ContinueText>
        </ButtonTouchable>
      </Continue>
    </OnBoarding>
  )
}

const OnBoarding = styled.View`
  position: absolute;
  background-color: white ;
  margin-top: 24px;
  width: 95%;
  padding: 24px;
  border-style: solid;
  border-width: 1px;
  border-color: #00000020 ;
`;

const Continue = styled.View`
  alignItems: flex-end;
  margin-top: 30px;
`;
const ButtonTouchable = styled.TouchableOpacity`
`;

const ContinueText = styled.Text`
  text-transform: uppercase;

`;

const Title = styled(H2)`
  margin-bottom: 15px;
`;

const SubTitle = styled(H3)`
  margin-bottom: 15px;
`;

export default OnBoardingGain