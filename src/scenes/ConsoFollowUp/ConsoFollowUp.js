import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import Background from '../../components/Background';
import DrinksCategory from '../../components/DrinksCategory';
import HeaderBackground from '../../components/HeaderBackground';
import TextStyled from '../../components/TextStyled';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import matomo from '../../services/matomo';
import { checkIfThereIsDrinks, setModalTimestamp } from './consoDuck';
import Diagram from './Diagram';
import DiagramHelpModal from './DiagramHelpModal';
import { BEER, BEER_HALF, drinksCatalog } from './drinksCatalog';
import Feed from './Feed';
import { NoDrinkTodayButton } from './NoConsoYetFeedDisplay';
import {
  FeedAddConsoTodayButton,
  FeedAddConsoTodayContainer,
  ScreenBgStyled,
  SubTitle,
  Title,
  TopContainer,
} from './styles';

const fakeDrinks = [{ drinkKey: BEER_HALF, quantity: 1 }];

const ConsoFollowUp = ({ showWelcomeMessage, setModalTimestamp }) => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedBar, setSelectedBar] = useState({});
  const navigation = useNavigation();

  const addDrinksRequest = (timestamp) => {
    setModalTimestamp(timestamp);
    navigation.push('ADD_DRINK');
  };

  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ScreenBgStyled>
        <TopContainer>
          <Title>
            <TextStyled color="#4030a5">Suivez votre consommation en unités d'alcool</TextStyled>
          </Title>
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
                <TextStyled color="#191919">
                  Un graphique récapitule vos consommations en unité d’alcool{'\n'}
                </TextStyled>
              </SubTitle>
              <Diagram asPreview />
              <SubTitle last>
                <TextStyled color="#191919">Le rouge représente ce qui est supérieur au seuil de l’OMS</TextStyled>
              </SubTitle>
            </>
          ) : null}
          {!showWelcomeMessage && (
            <Diagram
              onShowHelp={() => {
                matomo.logConsoDiagramHelp();
                setShowHelpModal(true);
              }}
              selectedBar={selectedBar}
              setSelectedBar={setSelectedBar}
            />
          )}
        </TopContainer>
        <FeedAddConsoTodayContainer zIndex={10}>
          <FeedAddConsoTodayButton
            content="Ajoutez une consommation"
            onPress={async () => {
              let selectedTimestamp = null;
              if (selectedBar?.timestamp) {
                // if a bar is selected, we use it, and we set the hours and minutes to present
                const now = new Date();
                const h = now.getHours();
                const m = now.getMinutes();
                const timestamp = makeSureTimestamp(selectedBar?.timestamp);
                const tempDate = new Date(timestamp);
                tempDate.setHours(h);
                tempDate.setMinutes(m);
                selectedTimestamp = makeSureTimestamp(tempDate);
              }
              addDrinksRequest(selectedTimestamp || Date.now());
              await matomo.logConsoOpenAddScreen();
            }}
          />
          {!!showWelcomeMessage && (
            <NoDrinkTodayButton timestamp={Date.now()} content="Je n'ai rien bu aujourd'hui !" />
          )}
        </FeedAddConsoTodayContainer>
        <Feed hideFeed={showWelcomeMessage} />
      </ScreenBgStyled>
      <DiagramHelpModal visible={showHelpModal} onCloseHelp={() => setShowHelpModal(false)} />
    </Background>
  );
};

const makeStateToProps = () => (state) => ({
  showWelcomeMessage: !checkIfThereIsDrinks(state),
});

const dispatchToProps = {
  setModalTimestamp,
};

export default connect(makeStateToProps, dispatchToProps)(ConsoFollowUp);
