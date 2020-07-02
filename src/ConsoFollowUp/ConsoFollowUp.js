import React from 'react';
import TextStyled from '../components/TextStyled';
import { ScreenBgStyled, TopContainer, Title, SubTitle } from './styles';
import Diagram from './Diagram';
import Feed from './Feed';
import DrinksModal from './DrinksModal/DrinksModal';
import { connect } from 'react-redux';
import { checkIfThereIsDrinks } from './consoDuck';
import { drinksCatalog, BEER, BEER_HALF } from './drinksCatalog';
import DrinksCategory from './DrinksModal/DrinksCategory';
import DiagramHelpModal from './DiagramHelpModal';
import matomo from '../matomo/index';

const showPreviewForDebug = false;
const fakeDrinks = [{ drinkKey: BEER_HALF, quantity: 1 }];

const ConsoFollowUp = ({ showWelcomeMessage, setView, forceOpenDrinksModal }) => {
  const [showSetDrinksModal, setShowSetDrinksModal] = React.useState(false);
  const [showHelpModal, setShowHelpModal] = React.useState(false);

  React.useEffect(() => {
    if (forceOpenDrinksModal) {
      setShowSetDrinksModal(true);
    }
  }, [forceOpenDrinksModal]);

  return (
    <React.Fragment>
      <ScreenBgStyled>
        <TopContainer>
          <Title>
            <TextStyled type="title">Suivez votre consommation d'alcool</TextStyled>
          </Title>
          {showWelcomeMessage ? (
            <>
              <SubTitle>
                <TextStyled type="basicText">
                  Voici un outil simple pour se rendre compte de sa consommation.{'\n\n'}
                </TextStyled>
                <TextStyled type="basicText">
                  Tous les jours vous renseignez votre consommation.{'\n'}
                </TextStyled>
              </SubTitle>
              {drinksCatalog
                .filter(({ categoryKey }) => categoryKey === BEER)
                .map(({ categoryKey }) => categoryKey)
                .filter(
                  (categoryKey, index, categories) => categories.indexOf(categoryKey) === index
                )
                .map((category, index) => (
                  <DrinksCategory
                    asPreview
                    key={index}
                    category={category}
                    index={index}
                    drinks={fakeDrinks}
                  />
                ))}
              <SubTitle>
                <TextStyled type="basicText">
                  Un graphique récapitule vos consommations en unité d’alcool{'\n'}
                </TextStyled>
              </SubTitle>
              <Diagram asPreview />
              <SubTitle last>
                <TextStyled type="basicText">
                  Le rouge représente ce qui est supérieur au seuil de l’OMS
                </TextStyled>
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
        <Feed
          showSetDrinksModal={showSetDrinksModal}
          setShowSetDrinksModal={setShowSetDrinksModal}
          setView={setView}
          hideFeed={showWelcomeMessage}
        />
      </ScreenBgStyled>
      <DrinksModal visible={showSetDrinksModal} setShowSetDrinksModal={setShowSetDrinksModal} />
      <DiagramHelpModal visible={showHelpModal} onCloseHelp={() => setShowHelpModal(false)} />
    </React.Fragment>
  );
};

const makeStateToProps = () => state => ({
  showWelcomeMessage: !checkIfThereIsDrinks(state) || showPreviewForDebug,
});

export default connect(makeStateToProps)(ConsoFollowUp);
