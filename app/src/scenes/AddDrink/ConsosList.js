import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native';
import { BackHandler, Platform, View, Text, TouchableOpacity } from 'react-native';
import { selectorFamily, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import GoBackButtonText from '../../components/GoBackButtonText';
import DrinksCategory from '../../components/DrinksCategory';
import { drinksCatalog, getDrinkQuantityFromDrinks, NO_CONSO } from '../ConsoFollowUp/drinksCatalog';
import { logEvent } from '../../services/logEventsWithMatomo';
import { useToast } from '../../services/toast';
import H2 from '../../components/H2';
import { drinksState, ownDrinksCatalogState } from '../../recoil/consos';
import { buttonHeight, defaultPaddingFontScale } from '../../styles/theme';
import DateAndTimePickers from './DateAndTimePickers';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import dayjs from 'dayjs';
import API from '../../services/api';
import { storage } from '../../services/storage';
import TextStyled from '../../components/TextStyled';
import OwnDrinkSelector from '../../components/OwnDrinkSelector';
import AddOwnDrink from './AddOwnDrink';

const checkIfNoDrink = (drinks) => drinks.filter((d) => d && d.quantity > 0).length === 0;

// const initDrinkState = { name: '', volume: '', degrees: '', isNew: true, code: null };

const drinksPerCurrenTimestampSelector = selectorFamily({
  key: 'drinksPerCurrenTimestampSelector',
  get:
    ({ modalTimestamp }) =>
    ({ get }) => {
      const drinks = get(drinksState);
      return drinks.filter((drink) => drink.timestamp === modalTimestamp);
    },
});

const ConsosList = ({ navigation, route }) => {
  const timestamp = route?.params?.timestamp || new Date();
  const [addDrinkModalTimestamp, setDrinkModalTimestamp] = useState(() => timestamp);
  const drinksPerCurrentaTimestamp = useRecoilValue(
    drinksPerCurrenTimestampSelector({ modalTimestamp: addDrinkModalTimestamp })
  );
  // const testDrinksToAdd = [
  //   {
  //     drinkKey: 'wine-glass',
  //     id: '91b05cc4-6547-4769-80e7-33167e28f856',
  //     quantity: 1,
  //     timestamp: 1644355550340,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: '5bd394d2-522b-42a6-b364-8c2439b39733',
  //     quantity: 1,
  //     timestamp: 1644359180436,
  //   },
  //   {
  //     drinkKey: 'Coupe de champagne -12-12',
  //     id: 'a8139cf9-0757-4c50-bc25-bb8296068afd',
  //     quantity: 1,
  //     timestamp: 1644360979235,
  //   },
  //   {
  //     drinkKey: 'beer-half',
  //     id: 'd3af1bb6-0ac5-41a8-bfee-c4cecfa21f5b',
  //     quantity: 1,
  //     timestamp: 1644406804333,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: 'c206a215-7d7e-45cc-8016-0b089432b760',
  //     quantity: 1,
  //     timestamp: 1644406804333,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: 'eb79f932-5977-4aa7-a543-57566af12507',
  //     quantity: 1,
  //     timestamp: 1644408155798,
  //   },
  //   {
  //     drinkKey: 'Rhum-4-35',
  //     id: 'ee5fe4b2-e30f-447f-a512-dd50db23ed7d',
  //     quantity: 1,
  //     timestamp: 1644419386892,
  //   },
  //   {
  //     drinkKey: 'Coupe de champagne -12-12',
  //     id: '3b9cf2dd-260e-49a5-aabf-0844affe222e',
  //     quantity: 2,
  //     timestamp: 1644436798531,
  //   },
  //   {
  //     drinkKey: 'hard-shot',
  //     id: 'c85bfb7b-aade-42c1-aa44-51090ef68bbf',
  //     quantity: 1,
  //     timestamp: 1644523901588,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: '73f00e69-eff3-4994-ad4e-4b367983dc13',
  //     quantity: 2,
  //     timestamp: 1644523901588,
  //   },
  //   {
  //     drinkKey: 'hard-shot',
  //     id: 'b316f1e8-8446-4fa4-b4ef-d7efce15a0c2',
  //     quantity: 1,
  //     timestamp: 1644704620147,
  //   },
  //   {
  //     drinkKey: 'no-conso',
  //     id: 1654,
  //     quantity: 1,
  //     timestamp: 1644534000000,
  //   },
  //   {
  //     drinkKey: 'hard-shot',
  //     id: '9f6c7a03-48fc-49d2-b093-3f466761aae6',
  //     quantity: 1,
  //     timestamp: 1644620640000,
  //   },
  //   {
  //     drinkKey: 'Coupe de champagne -12-12',
  //     id: '6eb75f86-b268-4f6e-8e8b-554748485fd1',
  //     quantity: 1,
  //     timestamp: 1644774140168,
  //   },
  //   {
  //     drinkKey: 'Rhum-4-35',
  //     id: '94929f0b-d6b7-44ad-9974-286fc50d936d',
  //     quantity: 1,
  //     timestamp: 1644774140168,
  //   },
  //   {
  //     drinkKey: 'beer-half',
  //     id: '1cca58ca-6f00-4a4f-b713-f7700450193e',
  //     quantity: 3,
  //     timestamp: 1644774140168,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: '1bc9593d-138f-4b54-8a83-ac2fe8d44b86',
  //     quantity: 1,
  //     timestamp: 1644774140168,
  //   },
  //   {
  //     drinkKey: 'hard-shot',
  //     id: '6f4547d3-a929-4250-a3e3-a4381cb71c27',
  //     quantity: 2,
  //     timestamp: 1644774140168,
  //   },
  //   {
  //     drinkKey: 'beer-half',
  //     id: 'a06a388d-25a2-4c45-9b97-32e03ef24284',
  //     quantity: 5,
  //     timestamp: 1644799080000,
  //   },
  //   {
  //     drinkKey: 'Coupe de champagne -12-12',
  //     id: 'ab0868d5-f5ea-421d-998e-10a6947c621b',
  //     quantity: 2,
  //     timestamp: 1644799080000,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: '1465446a-4549-4c1b-8b6d-a070f74a4214',
  //     quantity: 1,
  //     timestamp: 1644799080000,
  //   },
  //   {
  //     drinkKey: 'Coupe de champagne -12-12',
  //     id: 'ebdef64c-7c62-46e2-bdd2-32eb21d5dda5',
  //     quantity: 1,
  //     timestamp: 1644947160000,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: '74a89e45-7fa3-43a5-a7d6-5726804211c7',
  //     quantity: 2,
  //     timestamp: 1644947160000,
  //   },
  //   {
  //     drinkKey: 'Rhum-4-35',
  //     id: '0e11b812-8a4b-4eb0-b56a-b6cf75e47462',
  //     quantity: 2,
  //     timestamp: 1645033620000,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: '3f569ce3-0438-459d-98cc-0fe587ee33b1',
  //     quantity: 4,
  //     timestamp: 1645033620000,
  //   },
  //   {
  //     drinkKey: 'beer-half',
  //     id: '4a8445f3-aadb-420f-b9b5-b33945c65849',
  //     quantity: 1,
  //     timestamp: 1645033620000,
  //   },
  //   {
  //     drinkKey: 'beer-half',
  //     id: '18743a62-e7e8-480a-8424-dbffaffdcd04',
  //     quantity: 1,
  //     timestamp: 1645120059883,
  //   },
  //   {
  //     drinkKey: 'wine-glass',
  //     id: 'd8c32e26-8928-4b07-9fe5-1822134dc042',
  //     quantity: 1,
  //     timestamp: 1645141980000,
  //   },
  //   {
  //     drinkKey: 'hard-shot',
  //     id: '09e74a21-fc15-4d36-9317-9c6777d5820f',
  //     quantity: 1,
  //     timestamp: 1645141980000,
  //   },
  //   {
  //     drinkKey: 'Rhum-4-35',
  //     id: 'a81cab33-2520-41a4-bb97-aff1399f64cd',
  //     quantity: 3,
  //     timestamp: 1645228860000,
  //   },
  //   {
  //     drinkKey: 'beer-half',
  //     id: '5c6f1028-72b4-4ade-b83c-7bca06205168',
  //     quantity: 4,
  //     timestamp: 1645228860000,
  //   },
  //   {
  //     drinkKey: 'beer-half',
  //     id: '5cff9aea-26fa-43cf-ba70-e76826572a5c',
  //     quantity: 2,
  //     timestamp: 1675171043000,
  //   },
  //   {
  //     drinkKey: 'beer-pint',
  //     id: '1a551556-5fda-466b-a083-584c3d7e9df4',
  //     quantity: 1,
  //     timestamp: 1675184550000,
  //   },
  // ];

  const setGlobalDrinksState = useSetRecoilState(drinksState);
  const [localDrinksState, setLocalDrinksState] = useState(drinksPerCurrentaTimestamp);
  const [ownDrinksModalVisible, setOwnDrinksModalVisible] = useState(false);
  const [updateOwnDrinkKey, setUpdateOwnDrinkKey] = useState(null);
  const toast = useToast();

  const ownDrinksCatalog = useRecoilValue(ownDrinksCatalogState);
  const availableOwnDrinksCatalog = ownDrinksCatalog.filter((drink) => drink.isDeleted === false);

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
    onClose();
    const drinksWithTimestamps = localDrinksState.map((drink) => ({
      ...drink,
      timestamp: makeSureTimestamp(addDrinkModalTimestamp),
    }));
    let drinkNumber = 0;
    let showToast = true;
    for (let drink of testDrinksToAdd) {
      drinkNumber++;
      setGlobalDrinksState((state) =>
        [
          ...state.filter((_drink) => _drink.id !== drink.id),
          {
            drinkKey: drink.drinkKey,
            quantity: drink.quantity,
            id: drink.id,
            isOwnDrink: drink.isOwnDrink,
            timestamp: makeSureTimestamp(addDrinkModalTimestamp),
          },
        ].filter((d) => d.quantity > 0)
      );
      const drinkFromCatalog = [...(ownDrinksCatalog || []), ...drinksCatalog].find(
        (_drink) => _drink.drinkKey === drink.drinkKey
      );
      logEvent({
        category: 'CONSO',
        action: 'CONSO_ADD',
        name: drink.drinkKey,
        value: Number(drink.quantity),
        dimension6: makeSureTimestamp(addDrinkModalTimestamp),
      });
      const matomoId = storage.getString('@UserIdv2');
      const doses = drinkFromCatalog.doses;
      const kcal = drinkFromCatalog.kcal;
      const price = drinkFromCatalog.price;
      const volume = drinkFromCatalog.volume;
      const response = await API.post({
        path: '/consommation',
        body: {
          matomoId: matomoId,
          id: drink.id,
          name: drink.displayDrinkModal,
          drinkKey: drink.drinkKey,
          quantity: Number(drink.quantity),
          date: makeSureTimestamp(addDrinkModalTimestamp),
          doses: doses,
          kcal: kcal,
          price: price,
          volume: volume,
        },
      });
      if (response.showNewBadge || response.showInAppModal) showToast = false;
    }
    // setLocalDrinksState([]);
    if (showToast) {
      setTimeout(() => {
        toast.show(drinkNumber > 1 ? 'Consommations ajoutées' : 'Consommation ajoutée');
      }, 250);
    }
  };

  const onClose = useCallback(() => {
    if (route?.params?.parent === 'Defi1_Day1') {
      navigation.navigate('DEFI1', { screen: 'DEFI1_MENU' });
    } else {
      navigation.goBack();
    }
  }, [navigation, route?.params?.parent]);

  const onCancelConsos = useCallback(() => {
    navigation.goBack();
    setLocalDrinksState([]);
    logEvent({
      category: 'CONSO',
      action: 'CONSO_CLOSE_CONSO_ADDSCREEN',
    });
    return true;
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      setLocalDrinksState(drinksPerCurrentaTimestamp);
      BackHandler.addEventListener('hardwareBackPress', onCancelConsos);
    }
    return () => BackHandler.removeEventListener('hardwareBackPress', onCancelConsos);
  }, [isFocused, onCancelConsos, drinksPerCurrentaTimestamp]);

  return (
    <>
      <Container>
        <ModalContent ref={scrollRef} disableHorizontal>
          <Title>Sélectionnez vos consommations</Title>
          <DateAndTimePickers
            addDrinkModalTimestamp={addDrinkModalTimestamp}
            setDrinkModalTimestamp={setDrinkModalTimestamp}
          />
          <ButtonPrimary
            className="mt-5 mb-7 self-center"
            small
            onPress={() => {
              onClose();
              const noConso = {
                drinkKey: NO_CONSO,
                quantity: 1,
                timestamp: makeSureTimestamp(addDrinkModalTimestamp),
                id: uuidv4(),
              };
              logEvent({
                category: 'CONSO',
                action: 'NO_CONSO',
                dimension6: noConso.timestamp,
              });
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
            content={
              dayjs(addDrinkModalTimestamp).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
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
                  }}>
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
              <TouchableOpacity onPress={() => setOwnDrinksModalVisible(true)}>
                <Text className="text-[#4030A5] text-center underline text-base">Créer ma propre boisson</Text>
              </TouchableOpacity>
            </View>
          )}
          {drinksCatalog
            .map(({ categoryKey }) => categoryKey)
            .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index)
            .map((category, index) => (
              <DrinksCategory
                key={index}
                drinksCatalog={drinksCatalog}
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
        hide={() => setOwnDrinksModalVisible(false)}
        updateDrinkKey={updateOwnDrinkKey}
        key={updateOwnDrinkKey}
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
  font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};
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
  justify-content: ${(props) => (props.flexStart ? 'flex-start' : 'space-around')};
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
