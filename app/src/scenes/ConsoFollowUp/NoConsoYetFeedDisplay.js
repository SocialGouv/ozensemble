import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import H3 from '../../components/H3';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import { drinksState } from '../../recoil/consos';
import { logEvent } from '../../services/logEventsWithMatomo';
import { NO_CONSO } from './drinksCatalog';
import ButtonPrimary from '../../components/ButtonPrimary';
import { FeedButtonStyled } from '../../components/FeedButtonStyled';
import { storage } from '../../services/storage';
import API from '../../services/api';

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
  const setGlobalDrinksState = useSetRecoilState(drinksState);
  return (
    <FeedNoDrinkTodayTopButton
      content={content}
      disabled={disabled}
      onPress={() => {
        logEvent({
          category: 'CONSO',
          action: 'NO_CONSO',
          dimension6: makeSureTimestamp(timestamp),
        });
        const noConso = { drinkKey: NO_CONSO, quantity: 1, timestamp: makeSureTimestamp(timestamp), id: uuidv4() };
        setGlobalDrinksState((state) => [...state, noConso]);
        const matomoId = storage.getString('@UserIdv2');
        API.post({
          path: '/consommation',
          body: {
            matomoId: matomoId,
            id: noConso.id,
            name: noConso.displayDrinkModal,
            drinkKey: noConso.drinkKey,
            quantity: Number(noConso.quantity),
            date: noConso.timestamp,
          },
        });
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

const FeedNoDrinkTodayTopButton = styled(ButtonPrimary)`
  margin-vertical: 20px;
  flex-grow: 0;
`;

export default NoConsoYetFeedDisplay;
