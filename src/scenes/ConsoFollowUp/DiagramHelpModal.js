import React from 'react';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';
import { Modal, ScrollView } from 'react-native';
import TextStyled from '../../components/TextStyled';
import { SubTitle, TopContainer } from './styles';
import Diagram from './Diagram';
import CocktailGlass from '../../components/Illustrations/CocktailGlass';
import HalfBeer from '../../components/Illustrations/HalfBeer';
import WineGlass from '../../components/Illustrations/WineGlass';
import Dose from '../../components/Illustrations/Dose';

const doses = [
  { Icon: HalfBeer, name: 'bière', volume: 25, degrees: 5 },
  // { Icon: Pint, volume: 50 },
  { Icon: WineGlass, name: 'vin', volume: 10, degrees: 12 },
  // { Icon: WineBottle, volume: 75 },
  { Icon: CocktailGlass, name: 'spiritueux', volume: 3, degrees: 40 },
  // { Icon: CocktailBottle, volume: 75 },
];

const DiagramHelpModal = ({ visible, onCloseHelp }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCloseHelp}>
      <SafeAreaViewStyled>
        <ScrollView>
          <TopContainer>
            <Diagram asPreview showCloseHelp onCloseHelp={onCloseHelp} />
            <SubTitle>
              <TextStyled color="#191919">
                Le graphique représente les unités d’alcool consommées sur une journée.{'\n\n'}
              </TextStyled>
              <TextStyled color="#191919">
                La ligne verte représente le seuil de l’OMS. Elle est à 2 verres par jour pour une femme et 3 verres par
                jour pour un homme.{'\n\n'}
              </TextStyled>
            </SubTitle>
            <SubTitle>
              <TextStyled color="#191919">
                Une unité d’alcool correspond à environ 10 grammes d’alcool pur, soit environ un verre de vin de 13cl à
                12°c ou un demi de bière à 4°c par exemple.{'\n\n'}
              </TextStyled>
            </SubTitle>
            <IconsContainer>
              {doses.map(({ Icon, volume, name, degrees }, i) => (
                <React.Fragment key={i}>
                  <IconWrapper>
                    <Icon size={50} style={{ borderWidth: 0 }} />
                    <Volume color="#4030a5">{name}</Volume>
                    <Volume color="#4030a5">{volume}cl</Volume>
                    <Volume color="#4030a5">{degrees}%</Volume>
                  </IconWrapper>
                  {i < doses.length - 1 && (
                    <EqualWrapper>
                      <TextStyled color="#191919">=</TextStyled>
                    </EqualWrapper>
                  )}
                </React.Fragment>
              ))}
              <EqualWrapper>
                <TextStyled color="#191919">≈</TextStyled>
              </EqualWrapper>
              <IconWrapper>
                <Dose size={25} style={{ borderWidth: 0 }} />
                <Volume color="#4030a5">1 dose</Volume>
                <Volume color="#4030a5">10g d'alcool</Volume>
                <Volume color="#4030a5"> </Volume>
              </IconWrapper>
            </IconsContainer>
            {/* <DoseContainer>
              <DoseEqualWrapper>
                <TextStyled color="#191919">=</TextStyled>
              </DoseEqualWrapper>
              <IconWrapper>
                <Dose size={60} style={{ borderWidth: 0 }} />
                <Volume color="#4030a5">1 dose</Volume>
              </IconWrapper>
            </DoseContainer> */}
            <SubTitle>
              <TextStyled color="#191919">
                Lorsque vous saisisez une consommation, l’application convertit automatiquement en unité d’alcool.
                {'\n\n'}
              </TextStyled>
            </SubTitle>
            <SubTitle>
              <TextStyled color="#191919">
                Compter ses consommations est un pas essentiel pour prendre conscience de ce que l’on consomme.{'\n\n'}
              </TextStyled>
            </SubTitle>
          </TopContainer>
        </ScrollView>
      </SafeAreaViewStyled>
    </Modal>
  );
};

const SafeAreaViewStyled = styled(SafeAreaView)`
  background-color: #f9f9f9;
  flex: 1;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 50px;
`;

const EqualWrapper = styled.View`
  padding: 10px;
  padding-bottom: 50px;
`;

const Volume = styled(TextStyled)`
  margin-top: 5px;
`;

const IconWrapper = styled.View`
  align-items: center;
`;

export default DiagramHelpModal;
