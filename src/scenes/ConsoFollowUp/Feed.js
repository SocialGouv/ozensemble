import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import { makeSureTimestamp, today } from '../../helpers/dateHelpers';
import { drinksState, feedDaysSelector, modalTimestampState, startDateState } from '../../recoil/consos';
import CONSTANTS from '../../reference/constants';
import { isOnSameDay, isToday } from '../../services/dates';
import matomo from '../../services/matomo';
import NPS from '../NPS/NPS';
import ConsoFeedDisplay from './ConsoFeedDisplay';
import DateDisplay from './DateDisplay';
import { NO_CONSO } from './drinksCatalog';
import NoConsoConfirmedFeedDisplay from './NoConsoConfirmedFeedDisplay';
import NoConsoYetFeedDisplay, { NoDrinkTodayButton } from './NoConsoYetFeedDisplay';
import ResultsFeedDisplay from './ResultsFeedDisplay';
import { EvolutionContainer, FeedAddConsoTodayButton, FeedAddConsoTodayContainer, FeedBottomButton, FeedContainer, FeedDay, FeedDayContent } from './styles';
import ThoughtOfTheDay from './ThoughtOfTheDay';
import Timeline from './Timeline';
import Pint from '../../components/Illustrations/Pint';
import TextStyled from '../../components/TextStyled';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

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
  const setStartDate = useSetRecoilState(startDateState);
  useEffect(() => {
    const firstDayOfDrinksTimestamp = Math.min(
      ...drinks.filter((d) => d.drinkKey !== NO_CONSO).map(({ timestamp }) => timestamp)
    );
    setStartDate(new Date(firstDayOfDrinksTimestamp));
  }, [drinks, setStartDate]);

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

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setTimestampSelected(null)}>
        <FeedContainer>
        {!hideFeed &&
          <LastDrink>
            <LastDrinkText>
              <Pint size={30} color="#4030A5" />
              <MessageContainer>
                <TextStyled>
                  Vous n’avez pas saisi de consommations depuis le <TextStyled bold>{dayjs((drinks[0]?.timestamp)).format("dddd D MMMM")}</TextStyled>
                </TextStyled>
              </MessageContainer>
            </LastDrinkText>
            <LastDrinkButton>
              <ButtonPrimary
                content={"Je n'ai rien bu !"}
                onPress={() => {
                  setDrinks(() => [{ drinkKey: NO_CONSO, quantity: 1, timestamp: today(), id: uuidv4() }]);
                }}/>
              <AddDrinkButton onPress={() => {
                setModalTimestamp(Date.now());
                navigation.push('ADD_DRINK', { timestamp: Date.now() })
                matomo.logConsoOpenAddScreen();
            }}><AddDrinkText><TextStyled color="#4030A5">Ajoutez une consommation</TextStyled></AddDrinkText></AddDrinkButton>
            </LastDrinkButton>
          </LastDrink>
}
          <NPS forceView={NPSvisible} close={closeNPS} />
          {!hideFeed &&
            days.map((day, index) => {
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
                    {!!noDrinksYet && !isToday(day) && (
                      <NoConsoYetFeedDisplay selected={timestampSelected === null} timestamp={day} />
                    )}
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
                          await matomo.logConsoOpenAddScreen();
                        }}
                      />
                    )}
                    {isLast && (
                      <ResultsFeedDisplay
                        onPress={async () => {
                          navigation.navigate('TESTS');
                          matomo.logQuizzOpen(CONSTANTS.FROM_CONSO);
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
  border: #5150A215;
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

const LastDrinkButton = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10px;
  margin-top: 10px;
`;

const AddDrinkButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

const AddDrinkText = styled.Text`
  text-decoration-line: underline;
  width: 90%;
`;

const MessageContainer = styled.View`
  width: 88%;
`;

export default Feed;
