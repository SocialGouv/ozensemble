import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import { datesAreEqual, isToday, makeSureTimestamp } from '../../helpers/dateHelpers';
import CONSTANTS from '../../reference/constants';
import matomo from '../../services/matomo';
import NPS from '../NPS/NPS';
import { getDaysForFeed, getDrinksState, removeDrink, setModalTimestamp } from './consoDuck';
import ConsoFeedDisplay from './ConsoFeedDisplay';
import DateDisplay from './DateDisplay';
import { NO_CONSO } from './drinksCatalog';
import NoConsoConfirmedFeedDisplay from './NoConsoConfirmedFeedDisplay';
import NoConsoYetFeedDisplay from './NoConsoYetFeedDisplay';
import ResultsFeedDisplay from './ResultsFeedDisplay';
import { FeedBottomButton, FeedContainer, FeedDay, FeedDayContent } from './styles';
import ThoughtOfTheDay from './ThoughtOfTheDay';
import Timeline from './Timeline';

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

const Feed = ({ days, drinks, setModalTimestamp, removeDrink, hideFeed }) => {
  // state for NPS
  const [NPSvisible, setNPSvisible] = useState(false);
  const onPressContribute = () => setNPSvisible(true);
  const closeNPS = () => setNPSvisible(false);

  const [timestampSelected, setTimestampSelected] = useState(null);

  const navigation = useNavigation();

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
    removeDrink(timestamp);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setTimestampSelected(null);
  }, [isFocused]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setTimestampSelected(null)}>
        <FeedContainer hideFeed={hideFeed}>
          <NPS forceView={NPSvisible} close={closeNPS} />
          {!hideFeed &&
            days.map((day, index) => {
              const isFirst = index === 0;
              const isLast = index === days.length - 1;
              const drinksOfTheDay = drinks
                .filter(({ timestamp }) => datesAreEqual(timestamp, day))
                .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
              const noDrinksYet = !drinksOfTheDay.length;
              const noDrinksConfirmed = drinksOfTheDay.length === 1 && drinksOfTheDay[0].drinkKey === NO_CONSO;
              return (
                <FeedDay key={index}>
                  <Timeline first={isFirst} last={isLast} />
                  <FeedDayContent>
                    <DateDisplay day={day} />
                    {!!isFirst && <ThoughtOfTheDay day={day} selected={timestampSelected === null} />}
                    {noDrinksYet && !isToday(day) && (
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
                        content="Ajoutez une consommation"
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

const makeStateToProps = () => (state) => ({
  drinks: getDrinksState(state),
  days: getDaysForFeed(state),
});

const dispatchToProps = {
  removeDrink,
  setModalTimestamp,
};

export default connect(makeStateToProps, dispatchToProps)(Feed);
