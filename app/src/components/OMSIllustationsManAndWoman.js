import React from 'react';
import styled from 'styled-components';
import { screenWidth } from '../styles/theme';
import TextStyled from './TextStyled';
import ManAndWoman from '../components/illustrations/ManAndWoman';

const OMSIllustationsManAndWoman = ({}) => {
  return (
    <OMSContainer>
      <ManAndWoman size={120} />
      <TextOMSContainer>
        <TextDescription>
          <TextStyled bold textAlign={'center'}>
            Pour votre santé, l'alcool c'est
            <TextStyled color="#4030a5"> maximum 2 verres par jour et pas tous les jours.</TextStyled>{' '}
          </TextStyled>
        </TextDescription>
      </TextOMSContainer>
    </OMSContainer>
  );
};

const OMSContainer = styled.View`
  border: 1px solid #4030a5;
  border-radius: 3px;
  flex-direction: row;
  justify-content:space-around
  padding: 10px;
  margin-bottom: 25px;
`;

const TextOMSContainer = styled.View`
  width: ${screenWidth * 0.5 - 20}px;
  justify-content: center;
  align-items: center;
`;

const TextDescription = styled(TextStyled)`
  text-align: center;
`;
export default OMSIllustationsManAndWoman;
