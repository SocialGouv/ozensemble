import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import { derivedDataFromDrinksState, drinksState, feedDaysSelector } from '../../recoil/consos';
import { isToday } from '../../services/dates';
import { logEvent } from '../../services/logEventsWithMatomo';
import ConsoFeedDisplay from './ConsoFeedDisplay';
import DateDisplay from './DateDisplay';
import { NO_CONSO } from './drinksCatalog';
import NoConsoConfirmedFeedDisplay from './NoConsoConfirmedFeedDisplay';
import NoConsoYetFeedDisplay from './NoConsoYetFeedDisplay';
import ResultsFeedDisplay from './ResultsFeedDisplay';
import ThoughtOfTheDay from './ThoughtOfTheDay';
import Timeline from './Timeline';
import Pint from '../../components/illustrations/drinksAndFood/Pint';
import TextStyled from '../../components/TextStyled';
import UnderlinedButton from '../../components/UnderlinedButton';
import { storage } from '../../services/storage';
import API from '../../services/api';
import { FlashList } from '@shopify/flash-list';
import Calendar from '../../components/Calendar';
import { defaultPaddingFontScale } from '../../styles/theme';

const computePosition = (drinksOfTheDay, drink) => {
  let date = Date.now();
  const sameTimeStamp = drinksOfTheDay
    .filter((d) => d.timestamp === drink.timestamp)
    .filter((d) => d.drinkKey !== NO_CONSO);
  if (sameTimeStamp.length === 1) return 'alone';
  const position = sameTimeStamp.findIndex((d) => d.id === drink.id);
  if (position === 0) return 'first';
  if (position === sameTimeStamp.length - 1) return 'last';
  console.log('FeedComputePosition', Date.now() - date);
  return 'middle';
};

const computeShowButtons = (selected, position) => {
  if (!selected) return false;
  if (position === 'alone' || position === 'last') return true;
  return false;
};

const Header = ({ onScrollToDate }) => {
  const navigation = useNavigation();

  const [drinks, setDrinks] = useRecoilState(drinksState);

  const dateLastEntered = useMemo(() => {
    return drinks[0]?.timestamp || null;
  }, [drinks]);

  const showNoConsoSinceLongTime = useMemo(
    // the last day entered is before today
    () => {
      const date = dayjs(dateLastEntered).format('YYYY-MM-DD') < dayjs().add(-1, 'day').format('YYYY-MM-DD');
      return date;
    },
    [dateLastEntered]
  );

  const setNoConsos = useCallback(async () => {
    let date = Date.now();
    const differenceDay = dayjs().diff(dayjs(dateLastEntered), 'd');
    console.log('setNoConsos 1', Date.now() - date);
    date = Date.now();
    const newNoDrink = [];
    const matomoId = storage.getString('@UserIdv2');
    for (let i = 1; i <= differenceDay; i++) {
      const currentDate = dayjs(dateLastEntered).add(i, 'd');
      const noConso = {
        drinkKey: NO_CONSO,
        quantity: 1,
        timestamp: makeSureTimestamp(currentDate),
        id: uuidv4(),
      };
      logEvent({
        category: 'CONSO',
        action: 'NO_CONSO',
        dimension6: noConso.timestamp,
      });
      newNoDrink.push(noConso);
      await API.post({
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
      console.log('setNoConsos 2', Date.now() - date);
    }
    setDrinks((state) => [...state, ...newNoDrink].sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)));
  }, [dateLastEntered, setDrinks]);

  return (
    <>
      <Calendar onScrollToDate={onScrollToDate} />
      {!!showNoConsoSinceLongTime && (
        <LastDrink>
          <LastDrinkText>
            <Pint size={30} color="#4030A5" />
            <MessageContainer>
              <TextStyled>
                Vous n'avez pas saisi de consommations depuis le{' '}
                <TextStyled bold>{dayjs(dateLastEntered).format('dddd D MMMM')}</TextStyled>
              </TextStyled>
            </MessageContainer>
          </LastDrinkText>
          <LastDrinkButtons>
            <ButtonPrimary
              content={"Je n'ai rien bu !"}
              small
              onPress={() => {
                setNoConsos();
              }}
            />
            <AddDrinkButton
              onPress={() => {
                navigation.push('ADD_DRINK', { timestamp: Date.now() });
                logEvent({
                  category: 'CONSO',
                  action: 'CONSO_OPEN_CONSO_ADDSCREEN',
                });
              }}>
              <AddDrinkText>
                <TextStyled color="#4030A5">Ajoutez une conso</TextStyled>
              </AddDrinkText>
            </AddDrinkButton>
          </LastDrinkButtons>
        </LastDrink>
      )}
    </>
  );
};

const Feed = () => {
  const days = useRecoilValue(feedDaysSelector);
  const setDrinks = useSetRecoilState(drinksState);

  const flashListRef = useRef(null);
  const handleScrollToDate = useCallback(
    (date) => {
      const index = days.findIndex((_date) => _date === date);
      setTimeout(() => {
        flashListRef.current.scrollToIndex({ index, animated: true });
      }, 250);
    },
    [days]
  );

  const navigation = useNavigation();

  const addDrinksRequest = useCallback(
    (timestamp, fromButton) => {
      navigation.push('ADD_DRINK', { timestamp });
      logEvent({
        category: 'CONSO',
        action: 'CONSO_OPEN_CONSO_ADDSCREEN',
        name: fromButton,
      });
    },
    [navigation]
  );

  const deleteDrinkRequest = useCallback(
    (timestamp) => {
      setDrinks((state) => state.filter((drink) => drink.timestamp !== timestamp));
    },
    [setDrinks]
  );

  const ListHeaderComponent = useMemo(() => <Header onScrollToDate={handleScrollToDate} />, [handleScrollToDate]);
  const ListFooterComponent = useMemo(
    () => (
      <ButtonContainer>
        <ButtonPrimary
          small
          content="Contribuer à Oz Ensemble"
          shadowColor="#201569"
          color="#4030A5"
          onPress={() => navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Feed bottom button' })}
        />
      </ButtonContainer>
    ),
    [navigation]
  );

  return (
    <>
      <FeedContainer>
        <FlashList
          ref={flashListRef}
          data={days}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={(item) => item}
          estimatedItemSize={190} // height of one item with one drink
          renderItem={({ item, index }) => {
            return (
              <FeedDayItem
                item={item}
                index={index}
                deleteDrinkRequest={deleteDrinkRequest}
                addDrinksRequest={addDrinksRequest}
              />
            );
          }}
          ListFooterComponent={ListFooterComponent}
        />
      </FeedContainer>
    </>
  );
};

const FeedDayItem = ({ item, index, addDrinksRequest, deleteDrinkRequest }) => {
  const days = useRecoilValue(feedDaysSelector);
  const { drinksByDay } = useRecoilValue(derivedDataFromDrinksState);

  const isFirst = index === 0;
  const isLast = index === days.length - 1;
  const drinksOfTheDay = drinksByDay[item] || [];
  const noDrinksYet = !drinksOfTheDay.length;
  const noDrinksConfirmed = drinksOfTheDay.length === 1 && drinksOfTheDay[0].drinkKey === NO_CONSO;

  const [timestampSelected, setTimestampSelected] = useState(null);
  const setConsoSelectedRequest = useCallback(
    (timestamp) => {
      if (timestampSelected === timestamp) {
        setTimestampSelected(null);
      } else {
        setTimestampSelected(timestamp);
      }
    },
    [timestampSelected, setTimestampSelected]
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !!timestampSelected) {
      setTimestampSelected(null);
    }
  }, [isFocused]);

  return (
    <FeedDay>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('ON PRESS');
          setTimestampSelected(null);
        }}>
        <>
          <Timeline first={isFirst} last={isLast} />
          <FeedDayContent>
            <DateDisplay day={item} />
            {!!isFirst && <ThoughtOfTheDay day={item} selected={timestampSelected === null} />}
            {!!noDrinksYet && <NoConsoYetFeedDisplay selected={timestampSelected === null} timestamp={item} />}
            {noDrinksConfirmed ? (
              <NoConsoConfirmedFeedDisplay selected={timestampSelected === null} />
            ) : (
              drinksOfTheDay.map((drink) => {
                if (drink.drinkKey === NO_CONSO) return null;
                if (!drink.quantity) return null;
                const position = computePosition(drinksOfTheDay, drink);
                const selected = timestampSelected === drink.timestamp;
                const showButtons = computeShowButtons(selected, position);
                return (
                  <ConsoFeedDisplay
                    key={drink.id}
                    drinkKey={drink.drinkKey}
                    timestamp={drink.timestamp}
                    quantity={drink.quantity}
                    selected={selected}
                    showButtons={showButtons}
                    nothingSelected={timestampSelected === null}
                    onPress={setConsoSelectedRequest}
                    category={drink.category}
                    position={position}
                    updateDrinkRequest={async () => {
                      logEvent({
                        category: 'CONSO',
                        action: 'CONSO_UPDATE',
                      });
                      addDrinksRequest(drink.timestamp, 'FROM_CONSO_UPDATE');
                    }}
                    deleteDrinkRequest={async () => {
                      setTimestampSelected(null);
                      logEvent({
                        category: 'CONSO',
                        action: 'CONSO_DELETE',
                      });
                      deleteDrinkRequest(drink.timestamp);
                      const matomoId = storage.getString('@UserIdv2');
                      API.delete({
                        path: '/consommation',
                        body: {
                          matomoId: matomoId,
                          id: drink.id,
                        },
                      });
                    }}
                  />
                );
              })
            )}
            {!isToday(item) && (
              <FeedBottomButton
                color="#4030a5"
                content="Ajouter une consommation"
                withoutPadding
                onPress={async () => {
                  let selectedTimestamp = Date.parse(item);
                  if (Date.parse(item)) {
                    // if a bar is selected, we use it, and we set the hours and minutes to present
                    const now = new Date();
                    const h = now.getHours();
                    const m = now.getMinutes();
                    const timestamp = makeSureTimestamp(Date.parse(item));
                    const tempDate = new Date(timestamp);
                    tempDate.setHours(h);
                    tempDate.setMinutes(m);
                    selectedTimestamp = makeSureTimestamp(tempDate);
                  }
                  addDrinksRequest(selectedTimestamp, 'FROM_CONSO_FOLLOWUP');
                }}
              />
            )}
            {isLast && <ResultsFeedDisplay selected={timestampSelected === null} />}
          </FeedDayContent>
        </>
      </TouchableWithoutFeedback>
    </FeedDay>
  );
};

const ButtonContainer = styled.View`
  margin-top: 28px;
  align-items: center;
  justify-content: center;
  padding-bottom: 150px;
`;

const LastDrink = styled.View`
  border: #5150a215;
  padding: 10px 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-right: 20px;
  elevation: 5;
  shadow-offset: 0px 5px;
  shadow-color: #efefef;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
`;

const LastDrinkText = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const LastDrinkButtons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;

const AddDrinkButton = styled.TouchableOpacity``;

const AddDrinkText = styled(TextStyled)`
  text-decoration-line: underline;
`;

const MessageContainer = styled.View`
  width: 88%;
`;
const FeedContainer = styled.View`
  height: ${Dimensions.get('window').height}px;
`;

const FeedDay = styled.View`
  flex-direction: row;
  flex-shrink: 1;
  flex-grow: 0;
  padding-horizontal: ${defaultPaddingFontScale()};
`;

const FeedDayContent = styled.View`
  flex-grow: 1;
  margin-left: 10px;
  margin-vertical: 10px;
`;

const FeedBottomButton = styled(UnderlinedButton)`
  align-items: center;
  margin-bottom: 15px;
`;

export default Feed;
