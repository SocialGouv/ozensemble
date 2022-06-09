import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import { drinksState, feedDaysSelector, modalTimestampState } from '../../recoil/consos';
import CONSTANTS from '../../reference/constants';
import { isOnSameDay, isToday } from '../../services/dates';
import matomo from '../../services/matomo';
import NPS from '../NPS/NPS';
import ConsoFeedDisplay from './ConsoFeedDisplay';
import DateDisplay from './DateDisplay';
import { NO_CONSO } from './drinksCatalog';
import NoConsoConfirmedFeedDisplay from './NoConsoConfirmedFeedDisplay';
import NoConsoYetFeedDisplay from './NoConsoYetFeedDisplay';
import ResultsFeedDisplay from './ResultsFeedDisplay';
import ThoughtOfTheDay from './ThoughtOfTheDay';
import Timeline from './Timeline';
import Pint from '../../components/Illustrations/Pint';
import TextStyled from '../../components/TextStyled';
import UnderlinedButton from '../../components/UnderlinedButton';

const computePosition = (drinksOfTheDay, drink) => {
  const sameTimeStamp = drinksOfTheDay.filter((d) => d.timestamp === drink.timestamp);
  if (sameTimeStamp.length === 1) return 'alone';
  const position = sameTimeStamp.findIndex((d) => d.id === drink.id);
  if (position === 0) return 'first';
  if (position === sameTimeStamp.length - 1) return 'last';
  return 'middle';
};

const computeShowButtons = (selected, position) => {
  if (!selected) return false;
  if (position === 'alone' || position === 'last') return true;
  return false;
};

const Feed = ({ hideFeed, scrollToInput }) => {
  // state for NPS
  const days = useRecoilValue(feedDaysSelector);
  const [drinks, setDrinks] = useRecoilState(drinksState);

  const setModalTimestamp = useSetRecoilState(modalTimestampState);
  const [NPSvisible, setNPSvisible] = useState(false);
  const onPressContribute = () => setNPSvisible(true);
  const closeNPS = () => setNPSvisible(false);

  const [timestampSelected, setTimestampSelected] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  const setConsoSelectedRequest = (timestamp) => {
    if (timestampSelected === timestamp) {
      setTimestampSelected(null);
    } else {
      setTimestampSelected(timestamp);
    }
  };

  const addDrinksRequest = (timestamp) => {
    setModalTimestamp(timestamp);
    navigation.push('ADD_DRINK');
  };

  const deleteDrinkRequest = (timestamp) => {
    setTimestampSelected(null);
    setDrinks((state) => state.filter((drink) => drink.timestamp !== timestamp));
  };

  const dateLastEntered = useMemo(() => {
    const drinksTimestamp = drinks.map((drink) => drink.timestamp);
    return Math.max(...drinksTimestamp);
  }, [drinks]);

  const showNoConsoSinceLongTime = useMemo(
    // the last day entered is before today
    () => dayjs(dateLastEntered).format('YYYY-MM-DD') < dayjs().add(-1, 'day').format('YYYY-MM-DD'),
    [dateLastEntered]
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setTimestampSelected(null);
  }, [isFocused]);

  const refs = useRef({});

  useEffect(() => {
    if (route?.params?.scrollToDay) {
      setTimeout(() => {
        scrollToInput(refs?.current?.[route?.params?.scrollToDay]);
      });
    }
  }, [route?.params?.scrollToDay, scrollToInput]);

  if (hideFeed) {
    return (
      <>
        <NPS forceView={NPSvisible} close={closeNPS} />
        <TouchableWithoutFeedback onPress={() => setTimestampSelected(null)}>
          <ButtonContainer>
            <ButtonPrimary
              small
              content="Contribuer à Oz Ensemble"
              shadowColor="#201569"
              color="#4030A5"
              onPress={onPressContribute}
            />
          </ButtonContainer>
        </TouchableWithoutFeedback>
      </>
    );
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setTimestampSelected(null)}>
        <FeedContainer>
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
                    matomo.logNoConso();
                    const differenceDay = dayjs().diff(dayjs(dateLastEntered), 'd');
                    const newNoDrink = [];
                    for (let i = 1; i <= differenceDay; i++) {
                      const currentDate = dayjs(dateLastEntered).add(i, 'd');
                      newNoDrink.push({
                        drinkKey: NO_CONSO,
                        quantity: 1,
                        timestamp: makeSureTimestamp(currentDate),
                        id: uuidv4(),
                      });
                    }
                    setDrinks((state) => [...state, ...newNoDrink]);
                  }}
                />
                <AddDrinkButton
                  onPress={() => {
                    setModalTimestamp(Date.now());
                    navigation.push('ADD_DRINK', { timestamp: Date.now() });
                  }}>
                  <AddDrinkText>
                    <TextStyled color="#4030A5">Ajoutez une conso</TextStyled>
                  </AddDrinkText>
                </AddDrinkButton>
              </LastDrinkButtons>
            </LastDrink>
          )}
          <NPS forceView={NPSvisible} close={closeNPS} />
          {days.map((day, index) => {
            const isFirst = index === 0;
            const isLast = index === days.length - 1;
            const drinksOfTheDay = drinks
              .filter(({ timestamp }) => isOnSameDay(timestamp, day))
              .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
            const noDrinksYet = !drinksOfTheDay.length;
            const noDrinksConfirmed = drinksOfTheDay.length === 1 && drinksOfTheDay[0].drinkKey === NO_CONSO;
            return (
              <FeedDay key={index} ref={(r) => (refs.current[day] = r)}>
                <Timeline first={isFirst} last={isLast} />
                <FeedDayContent>
                  <DateDisplay day={day} />
                  {!!isFirst && <ThoughtOfTheDay day={day} selected={timestampSelected === null} />}
                  {!!noDrinksYet && <NoConsoYetFeedDisplay selected={timestampSelected === null} timestamp={day} />}
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
                          {...drink}
                          selected={selected}
                          showButtons={showButtons}
                          nothingSelected={timestampSelected === null}
                          onPress={setConsoSelectedRequest}
                          position={position}
                          updateDrinkRequest={async () => {
                            await matomo.logConsoUpdate();
                            addDrinksRequest(drink.timestamp);
                          }}
                          deleteDrinkRequest={async () => {
                            await matomo.logConsoDelete();
                            deleteDrinkRequest(drink.timestamp);
                          }}
                        />
                      );
                    })
                  )}
                  {!isToday(day) && (
                    <FeedBottomButton
                      color="#4030a5"
                      content="Ajouter une consommation"
                      withoutPadding
                      onPress={async () => {
                        let selectedTimestamp = Date.parse(day);
                        if (Date.parse(day)) {
                          // if a bar is selected, we use it, and we set the hours and minutes to present
                          const now = new Date();
                          const h = now.getHours();
                          const m = now.getMinutes();
                          const timestamp = makeSureTimestamp(Date.parse(day));
                          const tempDate = new Date(timestamp);
                          tempDate.setHours(h);
                          tempDate.setMinutes(m);
                          selectedTimestamp = makeSureTimestamp(tempDate);
                        }
                        addDrinksRequest(selectedTimestamp);
                      }}
                    />
                  )}
                  {isLast && (
                    <ResultsFeedDisplay
                      onPress={async () => {
                        navigation.navigate('TESTS');
                        matomo.logQuizzOpen('FROM_CONSO');
                      }}
                      selected={timestampSelected === null}
                    />
                  )}
                </FeedDayContent>
              </FeedDay>
            );
          })}
          <ButtonContainer>
            <ButtonPrimary
              small
              content="Contribuer à Oz Ensemble"
              shadowColor="#201569"
              color="#4030A5"
              onPress={onPressContribute}
            />
          </ButtonContainer>
        </FeedContainer>
      </TouchableWithoutFeedback>
    </>
  );
};

const ButtonContainer = styled.View`
  margin-top: 28px;
  align-items: center;
  justify-content: center;
`;

const LastDrink = styled.View`
  background-color: #efefef;
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

const AddDrinkText = styled.Text`
  text-decoration-line: underline;
`;

const MessageContainer = styled.View`
  width: 88%;
`;
const FeedContainer = styled.View`
  background-color: #f9f9f9;
  padding: 20px;
  padding-right: 0px;
  padding-bottom: 100px;
`;

const FeedDay = styled.View`
  flex-direction: row;
  flex-shrink: 1;
  flex-grow: 0;
`;

const FeedDayContent = styled.View`
  flex-grow: 1;
  padding-horizontal: 15px;
  padding-vertical: 10px;
`;

const FeedBottomButton = styled(UnderlinedButton)`
  align-items: center;
  margin-bottom: 15px;
`;

export default Feed;
