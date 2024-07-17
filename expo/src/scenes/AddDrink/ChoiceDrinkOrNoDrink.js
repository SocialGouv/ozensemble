import React, { useState } from "react";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import CocktailGlassTriangle from "../../components/illustrations/drinksAndFood/CocktailGlassTriangle";
import NoDrink from "../../components/illustrations/drinksAndFood/NoDrink";
import { screenHeight } from "../../styles/theme";
import { makeSureTimestamp } from "../../helpers/dateHelpers";
import { drinksState } from "../../recoil/consos";
import { NO_CONSO } from "../ConsoFollowUp/drinksCatalog";
import { logEvent } from "../../services/logEventsWithMatomo";
import { P } from "../../components/Articles";
import DateAndTimePickers from "./DateAndTimePickers";
import WrapperContainer from "../../components/WrapperContainer";
import { storage } from "../../services/storage";
import API from "../../services/api";
import { sortConsosByTimestamp } from "../../helpers/consosHelpers";

const ChoiceDrinkOrNoDrink = ({ navigation, route }) => {
  const setGlobalDrinksState = useSetRecoilState(drinksState);
  const [addDrinkModalTimestamp, setDrinkModalTimestamp] = useState(() => route.params.timestamp);

  return (
    <SafeWrapper>
      <WrapperContainer
        title={"Mes consommations"}
        onPressBackButton={() => {
          navigation.goBack();
          logEvent({
            category: "CONSO",
            action: "CONSO_CLOSE_CONSO_ADDSCREEN",
          });
        }}>
        <DateAndTimePickers
          addDrinkModalTimestamp={addDrinkModalTimestamp}
          setDrinkModalTimestamp={setDrinkModalTimestamp}
        />
        <Option
          icon={<NoDrink size={40} />}
          value={"Je n'ai pas bu"}
          onPress={() => {
            const noConso = {
              drinkKey: NO_CONSO,
              quantity: 1,
              timestamp: makeSureTimestamp(addDrinkModalTimestamp),
              id: uuidv4(),
            };
            logEvent({
              category: "CONSO",
              action: "NO_CONSO",
              dimension6: noConso.timestamp,
            });
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
            }).then((response) => {
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
            });
            navigation.goBack();
          }}
        />
        <Option
          icon={<CocktailGlassTriangle size={40} />}
          value={"J'ai bu"}
          onPress={() => {
            logEvent({
              category: "CONSO",
              action: "CONSO_DRINK",
            });
            navigation.replace("CONSOS_LIST", { timestamp: addDrinkModalTimestamp });
          }}
        />
      </WrapperContainer>
    </SafeWrapper>
  );
};

const Option = ({ icon, value, onPress }) => {
  return (
    <AskDrinkContainer>
      <ButtonTouchable onPress={onPress}>
        <Box>{icon}</Box>
      </ButtonTouchable>
      <P> {value}</P>
    </AskDrinkContainer>
  );
};

const SafeWrapper = styled(SafeAreaView)`
  flex: 1;
`;

export const DateAndTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonTouchable = styled.TouchableOpacity``;

const Box = styled.View`
  border: 1px solid #de285e;
  border-radius: 5px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const AskDrinkContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${screenHeight * 0.1}px;
`;

export default ChoiceDrinkOrNoDrink;
