import React from 'react';
import styled from 'styled-components';
import H3 from '../components/H3';
import { FeedButtonStyled } from './styles';
import Applause from '../components/Illustrations/Applause';

const NoConsoConfirmedFeedDisplay = ({ selected }) => {
  return (
    <FeedButtonStyled showAsSelected={selected}>
      <Content>
        <Applause size={25} />
        <Caption>Aucune consommation ce jour !</Caption>
      </Content>
    </FeedButtonStyled>
  );
};

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Caption = styled(H3)`
  margin-left: 5px;
`;

export default NoConsoConfirmedFeedDisplay;
