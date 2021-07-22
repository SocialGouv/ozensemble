import React from 'react';
import { connect } from 'react-redux';
import TextStyled from '../components/TextStyled';
import { ScreenBgStyled, TopContainer, Title, SubTitle } from './styles';
import Diagram from './Diagram';
import Feed from './Feed';
import { checkIfThereIsDrinks } from './consoDuck';
import { drinksCatalog, BEER, BEER_HALF } from './drinksCatalog';
import DrinksCategory from '../DrinksModal/DrinksCategory';
import DiagramHelpModal from './DiagramHelpModal';
import matomo from '../services/matomo';
import Background from '../components/Background';
import HeaderBackground from '../components/HeaderBackground';

const fakeDrinks = [{ drinkKey: BEER_HALF, quantity: 1 }];

const ConsoFollowUp = ({ showWelcomeMessage }) => {
  const [showHelpModal, setShowHelpModal] = React.useState(false);

  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ScreenBgStyled>
        <TopContainer>
          <Title>
            <TextStyled color="#4030a5">Suivez votre consommation d'alcool</TextStyled>
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
                  <DrinksCategory asPreview key={index} category={category} index={index} drinks={fakeDrinks} />
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
            />
          )}
        </TopContainer>
        <Feed hideFeed={showWelcomeMessage} />
      </ScreenBgStyled>
      <DiagramHelpModal visible={showHelpModal} onCloseHelp={() => setShowHelpModal(false)} />
    </Background>
  );
};

const makeStateToProps = () => (state) => ({
  showWelcomeMessage: !checkIfThereIsDrinks(state),
});

export default connect(makeStateToProps)(ConsoFollowUp);
