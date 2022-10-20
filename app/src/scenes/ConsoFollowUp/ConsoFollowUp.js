import React, { useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { findNodeHandle } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import DrinksCategory from '../../components/DrinksCategory';
import TextStyled from '../../components/TextStyled';
import { logEvent } from '../../services/logEventsWithMatomo';
import Diagram from './Diagram';
import DiagramHelpModal from './DiagramHelpModal';
import { BEER, BEER_HALF, drinksCatalog } from './drinksCatalog';
import Feed from './Feed';
import { NoDrinkTodayButton } from './NoConsoYetFeedDisplay';
import { drinksState } from '../../recoil/consos';
import H2 from '../../components/H2';
import QuizzOnboarding from '../Quizzs/QuizzOnboarding';
import WrapperContainer from '../../components/WrapperContainer';
import HeaderBackground from '../../components/HeaderBackground';
import Background from '../../components/Background';
import { useToggleCTA } from '../AddDrink/AddDrinkCTAButton';

const fakeDrinks = [{ drinkKey: BEER_HALF, quantity: 1 }];

const ConsoFollowUpStack = createStackNavigator();
const ConsoFollowUpNavigator = () => {
  useToggleCTA({ navigator: 'Consos' });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ConsoFollowUpStack.Navigator headerMode="none" initialRouteName="CONSO_FOLLOW_UP">
        <ConsoFollowUpStack.Screen name="CONSO_FOLLOW_UP" component={ConsoFollowUp} />
        <ConsoFollowUpStack.Screen
          name="ONBOARDING_QUIZZ"
          component={QuizzOnboarding}
          initialParams={{ root: 'CONSO_FOLLOW_UP' }}
        />
      </ConsoFollowUpStack.Navigator>
    </Background>
  );
};

export default ConsoFollowUpNavigator;

const ConsoFollowUp = () => {
  const showWelcomeMessage = !useRecoilValue(drinksState)?.length;
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedBar, setSelectedBar] = useState({});
  const scrollViewRef = useRef(null);

  const scrollToInput = (ref) => {
    if (!ref) return;
    if (!scrollViewRef.current) return;
    setTimeout(() => {
      ref.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y) => {
          scrollViewRef.current.scrollTo({ y: y - 100, animated: true });
        },
        (error) => console.log('error scrolling', error)
      );
    }, 250);
  };

  return (
    <WrapperContainer title={'Mon suivi de consommation'}>
      <SubtitleContainer>
        <Help
          onPress={() => {
            logEvent({
              category: 'CONSO',
              action: 'CONSO_OPEN_HELP',
            });
            setShowHelpModal(true);
          }}
          hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
          <HelpText>?</HelpText>
        </Help>
        <DiagramTitle color="#191919">Nombre d'unités d'alcool consommées</DiagramTitle>
      </SubtitleContainer>
      {showWelcomeMessage ? (
        <>
          <SubTitle>
            <TextStyled color="#191919">
              Voici un outil simple pour se rendre compte de sa consommation.{'\n\n'}
            </TextStyled>
            <TextStyled color="#191919">Tous les jours vous renseignez votre consommation.{'\n'}</TextStyled>
          </SubTitle>
          {drinksCatalog
            .filter(({ categoryKey }) => categoryKey === BEER)
            .map(({ categoryKey }) => categoryKey)
            .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index)
            .map((category, index) => (
              <DrinksCategory
                drinksCatalog={drinksCatalog}
                asPreview
                key={category}
                category={category}
                index={index}
                drinks={fakeDrinks}
              />
            ))}
          <SubTitle>
            <TextStyled color="#191919">Un graphique récapitule vos consommations en unité d'alcool{'\n'}</TextStyled>
          </SubTitle>
          <Diagram asPreview />
          <SubTitle last>
            <TextStyled color="#191919">Le rouge représente ce qui est supérieur au seuil de l'OMS</TextStyled>
          </SubTitle>
        </>
      ) : null}
      {!showWelcomeMessage && (
        <Diagram
          onShowHelp={() => {
            logEvent({
              category: 'CONSO',
              action: 'CONSO_OPEN_HELP',
            });
            setShowHelpModal(true);
          }}
          selectedBar={selectedBar}
          setSelectedBar={setSelectedBar}
        />
      )}
      <FeedAddConsoTodayContainer zIndex={10}>
        {!!showWelcomeMessage && <NoDrinkTodayButton timestamp={Date.now()} content="Je n'ai rien bu aujourd'hui !" />}
      </FeedAddConsoTodayContainer>
      <Feed hideFeed={showWelcomeMessage} scrollToInput={scrollToInput} />

      <DiagramHelpModal visible={showHelpModal} onCloseHelp={() => setShowHelpModal(false)} />
    </WrapperContainer>
  );
};

const SubTitle = styled(H2)`
  flex-shrink: 0;
  font-weight: 500;
  ${(props) => props.last && 'margin-bottom: 40px;'}
`;

const SubtitleContainer = styled.View`
  flex-direction: row-reverse;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
`;

const DiagramTitle = styled(H2)`
  font-weight: 500;
  flex-shrink: 1;
`;

const FeedAddConsoTodayContainer = styled.View`
  align-items: center;
`;

const helpsize = 25;
const Help = styled.TouchableOpacity`
  width: ${helpsize}px;
  height: ${helpsize}px;
  border-radius: ${helpsize}px;
  border: 1px solid #de285e;
  background-color: white;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 5px;
`;
const HelpText = styled(TextStyled)`
  color: #de285e;
  font-weight: bold;
  font-size: ${helpsize * 0.5}px;
`;
