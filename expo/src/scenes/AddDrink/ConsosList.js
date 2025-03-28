import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useIsFocused } from "@react-navigation/native";
import { BackHandler, Platform, View, Text, TouchableOpacity, InteractionManager } from "react-native";
import { selectorFamily, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ButtonPrimary from "../../components/ButtonPrimary";
import GoBackButtonText from "../../components/GoBackButtonText";
import DrinksCategory from "../../components/DrinksCategory";
import { drinksCategories, getDrinkQuantityFromDrinks, NO_CONSO } from "../ConsoFollowUp/drinksCatalog";
import { logEvent } from "../../services/logEventsWithMatomo";
import { useToast } from "../../services/toast";
import H2 from "../../components/H2";
import { consolidatedCatalogObjectSelector, drinksState, ownDrinksCatalogState } from "../../recoil/consos";
import { buttonHeight, defaultPaddingFontScale } from "../../styles/theme";
import DateAndTimePickers from "./DateAndTimePickers";
import { makeSureTimestamp } from "../../helpers/dateHelpers";
import dayjs from "dayjs";
import API from "../../services/api";
import { storage } from "../../services/storage";
import TextStyled from "../../components/TextStyled";
import OwnDrinkSelector from "../../components/OwnDrinkSelector";
import AddOwnDrink from "./AddOwnDrink";
import { capture } from "../../services/sentry";
import { sortConsosByTimestamp } from "../../helpers/consosHelpers";

const checkIfNoDrink = (drinks) => drinks.filter((d) => d && d.quantity > 0).length === 0;

// const initDrinkState = { name: '', volume: '', degrees: '', isNew: true, code: null };

const drinksPerCurrenTimestampSelector = selectorFamily({
  key: "drinksPerCurrenTimestampSelector",
  get:
    ({ modalTimestamp }) =>
    ({ get }) => {
      const drinks = get(drinksState);
      if (!modalTimestamp) return [];
      return drinks.filter((drink) => drink.timestamp === modalTimestamp);
    },
});

const ConsosList = ({ navigation, route, addDrinkModalTimestamp, setDrinkModalTimestamp }) => {
  const drinksPerCurrentaTimestamp = useRecoilValue(
    drinksPerCurrenTimestampSelector({ modalTimestamp: addDrinkModalTimestamp })
  );
  const setGlobalDrinksState = useSetRecoilState(drinksState);
  const [localDrinksState, setLocalDrinksState] = useState(drinksPerCurrentaTimestamp);
  const [ownDrinksModalVisible, setOwnDrinksModalVisible] = useState(false);
  const [updateOwnDrinkKey, setUpdateOwnDrinkKey] = useState(null);
  const toast = useToast();
  const ownDrinksCatalog = useRecoilValue(ownDrinksCatalogState);
  const availableOwnDrinksCatalog = ownDrinksCatalog.filter(
    (drink) => drink.isDeleted === false && drink.drinkKey !== NO_CONSO
  );
  const consolidatedCatalogObject = useRecoilValue(consolidatedCatalogObjectSelector);
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();
  const setDrinkQuantityRequest = (drinkKey, quantity, isOwnDrink = false) => {
    const oldDrink = localDrinksState.find((drink) => drink.drinkKey === drinkKey);
    if (oldDrink) {
      setLocalDrinksState([
        ...localDrinksState.filter((drink) => drink.drinkKey !== drinkKey),
        {
          ...localDrinksState.find((drink) => drink.drinkKey === drinkKey),
          quantity,
        },
      ]);
    } else {
      setLocalDrinksState([
        ...localDrinksState,
        {
          drinkKey,
          quantity,
          id: uuidv4(),
          isOwnDrink,
        },
      ]);
    }
  };
  const onValidateConsos = async () => {
    onNext();
    await new Promise((resolve) => setTimeout(resolve, 100));
    const drinksWithTimestamps = localDrinksState.map((drink) => ({
      ...drink,
      timestamp: makeSureTimestamp(addDrinkModalTimestamp),
    }));
    let showToast = true;
    const newDrinksIds = drinksWithTimestamps.map((drink) => drink.id);
    setGlobalDrinksState((prevState) => {
      const nextState = [
        ...prevState.filter((_drink) => !newDrinksIds.includes(_drink.id)),
        ...drinksWithTimestamps,
      ].filter((d) => d.quantity > 0);
      return sortConsosByTimestamp(nextState);
    });
    InteractionManager.runAfterInteractions(async () => {
      for (let newDrink of drinksWithTimestamps) {
        try {
          const body = {
            matomoId: storage.getString("@UserIdv2"),
            id: newDrink.id,
            name: newDrink.displayDrinkModal,
            drinkKey: newDrink.drinkKey,
            quantity: Number(newDrink.quantity),
            date: makeSureTimestamp(addDrinkModalTimestamp),
          };
          if (newDrink.drinkKey !== NO_CONSO) {
            const drinkFromCatalog = consolidatedCatalogObject[newDrink.drinkKey];
            body.doses = drinkFromCatalog.doses;
            body.kcal = drinkFromCatalog.kcal;
            body.price = drinkFromCatalog.price;
            body.volume = drinkFromCatalog.volume;
          } else {
            body.quantity = 0;
          }
          logEvent({
            category: "CONSO",
            action: "CONSO_ADD",
            name: newDrink.drinkKey,
            value: Number(newDrink.quantity),
            dimension6: makeSureTimestamp(addDrinkModalTimestamp),
          });
          const response = await API.post({
            path: "/consommation",
            body,
          });
          if (response.ok) {
            setGlobalDrinksState((oldState) => {
              const newState = oldState.map((savedDrink) => {
                if (savedDrink.id !== newDrink.id) return savedDrink;
                return {
                  ...newDrink,
                  isSyncedWithDB: true,
                };
              });
              return newState;
            });
          }
          if (response?.showNewBadge || response?.showInAppModal) showToast = false;
        } catch (e) {
          capture(e, {
            extra: {
              Notes: "Add conso in ConsoList",
              newDrink,
              consolidatedCatalogObject,
            },
            user: {
              id: storage.getString("@UserIdv2"),
            },
          });
        }
      }
      if (showToast) {
        toast.show(drinksWithTimestamps.length > 1 ? "Consommations ajoutées" : "Consommation ajoutée");
      }
    });
  };

  const onNext = useCallback(() => {
    navigation.push("DRINKS_CONTEXTS_LIST", {
      timestamp: makeSureTimestamp(addDrinkModalTimestamp),
    });
  }, [navigation, addDrinkModalTimestamp]);

  const onCancelConsos = useCallback(() => {
    navigation.goBack();
    setLocalDrinksState([]);
    logEvent({
      category: "CONSO",
      action: "CONSO_CLOSE_CONSO_ADDSCREEN",
    });
    return true;
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener("hardwareBackPress", onCancelConsos);
    }
    return () => BackHandler.removeEventListener("hardwareBackPress", onCancelConsos);
  }, [isFocused, onCancelConsos]);

  return (
    <>
      <Container>
        <ModalContent ref={scrollRef} disableHorizontal>
          <View className="h-2.5 flex-row w-full px-10">
            <View className="bg-[#4030A5] h-full flex-1 rounded-full mr-4" />
            <View className="bg-[#DBDBE8] h-full flex-1 rounded-full mr-2" />
          </View>
          <Title>Sélectionnez vos consommations</Title>
          <DateAndTimePickers
            addDrinkModalTimestamp={addDrinkModalTimestamp}
            setDrinkModalTimestamp={setDrinkModalTimestamp}
          />
          <ButtonPrimary
            className="mt-5 mb-7 self-center"
            small
            onPress={() => {
              onNext();
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
            }}
            content={
              dayjs(addDrinkModalTimestamp).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
                ? "Je n'ai rien bu aujourd'hui"
                : "Je n'ai rien bu ce jour"
            }
          />
          {availableOwnDrinksCatalog.length > 0 && (
            <>
              <View className="bg-[#EFEFEF] py-4 px-2">
                <TextStyled bold color="#4030a5" className="mb-5 px-4">
                  Mes boissons créées
                </TextStyled>
                {availableOwnDrinksCatalog.map((drink) => {
                  if (!drink.isDeleted) {
                    return (
                      <OwnDrinkSelector
                        key={drink.drinkKey}
                        onUpdateDrink={() => {
                          setOwnDrinksModalVisible(true);
                          setUpdateOwnDrinkKey(drink.drinkKey);
                        }}
                        drink={drink}
                        quantity={getDrinkQuantityFromDrinks(localDrinksState, drink.drinkKey)}
                        setDrinkQuantityRequest={setDrinkQuantityRequest}
                      />
                    );
                  }
                })}
                <TouchableOpacity
                  onPress={() => {
                    setOwnDrinksModalVisible(true);
                    setUpdateOwnDrinkKey(null);
                    logEvent({
                      category: "OWN_CONSO",
                      action: "OWN_CONSO_OPEN",
                    });
                  }}
                >
                  <Text className="text-[#4030A5] text-center underline text-base mt-2">
                    Créer une nouvelle boisson
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {availableOwnDrinksCatalog.length === 0 && (
            <View className=" bg-[#EFEFEF] p-4">
              <TextStyled color="#4030a5" bold center className="mb-4">
                Vous ne trouvez pas votre boisson dans la liste ?
              </TextStyled>
              <TouchableOpacity
                onPress={() => {
                  setUpdateOwnDrinkKey(null);
                  setOwnDrinksModalVisible(true);
                  logEvent({
                    category: "OWN_CONSO",
                    action: "OWN_CONSO_OPEN",
                  });
                }}
              >
                <Text className="text-[#4030A5] text-center underline text-base">Créer ma propre boisson</Text>
              </TouchableOpacity>
            </View>
          )}
          {drinksCategories.map((category, index) => (
            <DrinksCategory
              key={index}
              category={category}
              index={index}
              drinks={localDrinksState}
              setDrinkQuantity={setDrinkQuantityRequest}
            />
          ))}
          <MarginBottom />
        </ModalContent>
        <ButtonsContainerSafe>
          <ButtonsContainer>
            <BackButton content="Retour" bold onPress={onCancelConsos} />
            <ButtonPrimary content="Valider" onPress={onValidateConsos} disabled={checkIfNoDrink(localDrinksState)} />
          </ButtonsContainer>
        </ButtonsContainerSafe>
      </Container>
      <AddOwnDrink
        visible={ownDrinksModalVisible}
        hide={() => {
          setUpdateOwnDrinkKey(null);
          setOwnDrinksModalVisible(false);
        }}
        updateDrinkKey={updateOwnDrinkKey}
        key={ownDrinksModalVisible}
        setLocalDrinksState={setLocalDrinksState}
      />
    </>
  );
};

const BackButton = styled(GoBackButtonText)`
  margin-right: 0;
`;

const Container = styled.View`
  background-color: #f9f9f9;
  flex: 1;
  padding-top: 20px;
`;

const ModalContent = styled.ScrollView`
  width: 100%;
  background-color: #f9f9f9;
`;

const Title = styled(H2)`
  font-weight: ${Platform.OS === "android" ? "bold" : "800"};
  color: #4030a5;
  margin: 50px ${defaultPaddingFontScale()}px 15px;
`;

const buttonsPadding = 10;

const ButtonsContainerSafe = styled.SafeAreaView`
  position: absolute;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  border-top-color: #eee;
  border-top-width: 1px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props) => (props.flexStart ? "flex-start" : "space-around")};
  margin: 0;
  width: 100%;
  padding: ${buttonsPadding}px;
  align-items: center;
`;

const MarginBottom = styled.View`
  height: ${({ small }) => buttonHeight * (small ? 0 : 2) + 2 * buttonsPadding}px;
  flex-shrink: 0;
`;

export default ConsosList;
