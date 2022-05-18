import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import H3 from '../../components/H3';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import { drinksState } from '../../recoil/consos';
import matomo from '../../services/matomo';
import { NO_CONSO } from './drinksCatalog';
import { FeedButtonStyled, FeedNoDrinkTodayTopButton } from './styles';

const NoConsoYetFeedDisplay = ({ selected, timestamp }) => {
  return (
    <FeedButtonStyled showAsSelected={selected}>
      <Content>
        <Caption>Vous n'avez pas saisi de consommation</Caption>
        <NoDrinkTodayButton disabled={!selected} timestamp={timestamp} />
      </Content>
    </FeedButtonStyled>
  );
};

export const NoDrinkTodayButton = ({ content = "Je n'ai rien bu !", timestamp, disabled }) => {
  const setDrinksState = useSetRecoilState(drinksState);
  return (
    <FeedNoDrinkTodayTopButton
      content={content}
      disabled={disabled}
      onPress={() => {
        matomo.logNoConso();
        setDrinksState((state) => [
          ...state,
          { drinkKey: NO_CONSO, quantity: 1, timestamp: makeSureTimestamp(timestamp), id: uuidv4() },
        ]);
      }}
    />
  );
};

const Content = styled.View`
  padding-top: 15px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-horizontal: 5px;
`;

const Caption = styled(H3)`
  text-align: center;
`;

export default NoConsoYetFeedDisplay;
