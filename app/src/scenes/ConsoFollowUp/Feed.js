import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import { drinksState, feedDaysSelector } from '../../recoil/consos';
import { isOnSameDay, isToday } from '../../services/dates';
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
import { defaultPaddingFontScale } from '../../styles/theme';
import { storage } from '../../services/storage';
import OnBoardingModal from '../../components/OnBoardingModal';
import API from '../../services/api';

const computePosition = (drinksOfTheDay, drink) => {
  const sameTimeStamp = drinksOfTheDay
    .filter((d) => d.timestamp === drink.timestamp)
    .filter((d) => d.drinkKey !== NO_CONSO);
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
  const days = useRecoilValue(feedDaysSelector);
  const [drinks, setDrinks] = useRecoilState(drinksState);

  const [pleaseNPSModal, setPleaseNPSModal] = useState(false);

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

  const addDrinksRequest = (timestamp, fromButton) => {
    navigation.push('ADD_DRINK', { timestamp });
    logEvent({
      category: 'CONSO',
      action: 'CONSO_OPEN_CONSO_ADDSCREEN',
      name: fromButton,
    });
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

  const checkNPSAfter3Drinks = () => {
    const daysDrink = days.filter((day) => {
      const drinksOfTheDay = drinks
        .filter(({ timestamp }) => isOnSameDay(timestamp, day))
        .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
      if (!drinksOfTheDay.length) return false;
      return true;
    });
    if (daysDrink.length < 3) return;
    const npsAsked = storage.getString('@NPSDone');
    if (npsAsked) return;
    setPleaseNPSModal(true);
  };

  useEffect(() => {
    if (isFocused) {
      setTimestampSelected(null);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      checkNPSAfter3Drinks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, isFocused]);

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
      <TouchableWithoutFeedback onPress={() => setTimestampSelected(null)}>
        <ButtonContainer>
          <ButtonPrimary
            small
            content="Contribuer à Oz Ensemble"
            shadowColor="#201569"
            color="#4030A5"
            onPress={() => navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Feed bottom button empty feed' })}
          />
        </ButtonContainer>
      </TouchableWithoutFeedback>
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
                    const differenceDay = dayjs().diff(dayjs(dateLastEntered), 'd');
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
                    }
                    setDrinks((state) => [...state, ...newNoDrink]);
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
          <OnBoardingModal
            title="5 sec pour nous aider à améliorer l'application ?"
            description={
              <TextStyled>
                Nous construisons l'application ensemble et{' '}
                <TextStyled bold>votre avis sera pris en compte dans les prochaines mises à jour.</TextStyled> Merci
                d'avance{'\u00A0'}!
              </TextStyled>
            }
            boutonTitle="Je donne mon avis sur Oz"
            onPress={() => {
              setPleaseNPSModal(false);
              navigation.navigate('NPS_SCREEN', { triggeredFrom: 'After three drinks' });
            }}
            visible={!!pleaseNPSModal}
            hide={() => {
              setPleaseNPSModal(false);
            }}
          />
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
                            logEvent({
                              category: 'CONSO',
                              action: 'CONSO_UPDATE',
                            });
                            addDrinksRequest(drink.timestamp, 'FROM_CONSO_UPDATE');
                          }}
                          deleteDrinkRequest={async () => {
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
                        addDrinksRequest(selectedTimestamp, 'FROM_CONSO_FOLLOWUP');
                      }}
                    />
                  )}
                  {isLast && <ResultsFeedDisplay selected={timestampSelected === null} />}
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
              onPress={() => navigation.navigate('NPS_SCREEN', { triggeredFrom: 'Feed bottom button' })}
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

const AddDrinkText = styled(TextStyled)`
  text-decoration-line: underline;
`;

const MessageContainer = styled.View`
  width: 88%;
`;
const FeedContainer = styled.View`
  background-color: #f9f9f9;
  padding-horizontal: -${defaultPaddingFontScale()}px;
`;

const FeedDay = styled.View`
  flex-direction: row;
  flex-shrink: 1;
  flex-grow: 0;
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
