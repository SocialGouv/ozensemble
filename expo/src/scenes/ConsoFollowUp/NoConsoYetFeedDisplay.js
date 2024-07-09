import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { v4 as uuidv4 } from "uuid";
import H3 from "../../components/H3";
import { makeSureTimestamp } from "../../helpers/dateHelpers";
import { drinksState } from "../../recoil/consos";
import { logEvent } from "../../services/logEventsWithMatomo";
import { NO_CONSO } from "./drinksCatalog";
import ButtonPrimary from "../../components/ButtonPrimary";
import { FeedButtonStyled } from "../../components/FeedButtonStyled";
import { storage } from "../../services/storage";
import API from "../../services/api";
import { goalsState } from "../../recoil/gains";
import { sortConsosByTimestamp } from "../../helpers/consosHelpers";

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
  const [goals, setGoals] = useRecoilState(goalsState);
  return (
    <FeedNoDrinkTodayTopButton
      content={content}
      disabled={disabled}
      onPress={() => {
        logEvent({
          category: "CONSO",
          action: "NO_CONSO",
          dimension6: makeSureTimestamp(timestamp),
        });
        const noConso = {
          drinkKey: NO_CONSO,
          quantity: 1,
          timestamp: makeSureTimestamp(timestamp),
          id: uuidv4(),
        };
        setGlobalDrinksState((state) => sortConsosByTimestamp([...state, noConso]));
        const matomoId = storage.getString("@UserIdv2");
        API.post({
          path: "/consommation",
          body: {
            matomoId: matomoId,
            id: noConso.id,
            name: noConso.displayDrinkModal,
            drinkKey: noConso.drinkKey,
            quantity: Number(noConso.quantity),
            date: noConso.timestamp,
          },
        })
          .then((response) => {
            if (response.ok) {
              setGlobalDrinksState((state) => {
                return state.map((drink) => {
                  if (drink.id === noConso.id) {
                    return {
                      ...drink,
                      isSyncedWithDB: true,
                    };
                  }
                  return drink;
                });
              });
            }
          })
          .then(() => {
            API.get({
              path: "/goal/list",
              query: {
                matomoId: matomoId,
              },
            })
              .then((res) => {
                if (res.ok) {
                  if (JSON.stringify(res.data) !== JSON.stringify(goals)) {
                    setGoals(res.data);
                  }
                }
              })
              .catch((err) => console.log("Get goals err", err));
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
