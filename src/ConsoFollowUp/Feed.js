import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Timeline from './Timeline';
import DateDisplay from './DateDisplay';
import ConsoFeedDisplay from './ConsoFeedDisplay';
import ResultsFeedDisplay from './ResultsFeedDisplay';
import {
  FeedContainer,
  FeedDay,
  FeedDayContent,
  FeedBottomButton,
  FeedAddConsoTodayContainer,
  FeedAddConsoTodayButton,
} from './styles';
import NoConsoConfirmedFeedDisplay from './NoConsoConfirmedFeedDisplay';
import { isToday, datesAreEqual } from '../helpers/dateHelpers';
import { getDrinksState, getDaysForFeed, removeDrink, setModalTimestamp } from './consoDuck';
import { useBackHandler } from '../helpers/customHooks';
import CONSTANTS from '../reference/constants';
import matomo from '../services/matomo';
import { NO_CONSO } from './drinksCatalog';
import NoConsoYetFeedDisplay, { NoDrinkTodayButton } from './NoConsoYetFeedDisplay';
import ThoughtOfTheDay from './ThoughtOfTheDay';

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

const Feed = ({ days, drinks, setModalTimestamp, removeDrink, showSetDrinksModal, hideFeed }) => {
  const [timestampSelected, setTimestampSelected] = React.useState(null);

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
    navigation.push('DRINKS_MODAL');
  };

  const deleteDrinkRequest = (timestamp) => {
    setTimestampSelected(null);
    removeDrink(timestamp);
  };

  const onBackHandlerPressed = () => {
    if (timestampSelected !== null) {
      setTimestampSelected(null);
      return true;
    }
  };

  React.useEffect(() => {
    setTimestampSelected(null);
  }, [showSetDrinksModal]);

  useBackHandler(onBackHandlerPressed, !showSetDrinksModal);

  return (
    <React.Fragment>
      <FeedAddConsoTodayContainer zIndex={10}>
        <FeedAddConsoTodayButton
          content="Ajoutez une consommation"
          onPress={async () => {
            addDrinksRequest(Date.now());
            await matomo.logConsoOpenAddScreen();
          }}
        />
        {!!hideFeed && <NoDrinkTodayButton timestamp={Date.now()} content="Je n'ai rien bu aujourd'hui !" />}
      </FeedAddConsoTodayContainer>
      <TouchableWithoutFeedback onPress={() => setTimestampSelected(null)}>
        <FeedContainer hideFeed={hideFeed}>
          {!hideFeed &&
            days.map((day, index) => {
              const isFirst = index === 0;
              const isLast = index === days.length - 1;
              const drinksOfTheDay = drinks
                .filter(({ timestamp }) => datesAreEqual(timestamp, day))
                .sort((a, b) => (a > b ? -1 : 1));
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
                          addDrinksRequest(Date.parse(day));
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
        </FeedContainer>
      </TouchableWithoutFeedback>
    </React.Fragment>
  );
};

const makeStateToProps = () => (state) => ({
  drinks: getDrinksState(state),
  days: getDaysForFeed(state),
});

const dispatchToProps = {
  removeDrink,
  setModalTimestamp,
};

export default connect(makeStateToProps, dispatchToProps)(Feed);
