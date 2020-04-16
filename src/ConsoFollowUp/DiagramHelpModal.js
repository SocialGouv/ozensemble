import React from 'react';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';
import { ScrollView } from 'react-native';
import TextStyled from '../components/TextStyled';
import { SubTitle, TopContainer } from './styles';
import Diagram from './Diagram';

const DiagramHelpModal = ({ visible, onCloseHelp }) => {
  return (
    <ModalStyled visible={visible} transparent animationType="slide" onRequestClose={onCloseHelp}>
      <SafeAreaViewStyled>
        <ScrollView>
          <TopContainer>
            <Diagram showCloseHelp onCloseHelp={onCloseHelp} />
            <SubTitle>
              <TextStyled type="basicText">
                Le graphique représente les unités d’alcool consommées sur une journée.{'\n\n'}
              </TextStyled>
              <TextStyled type="basicText">
                La ligne verte représente le seuil de l’OMS. Elle est à 2 verres par jour pour une femme et 3 verres par
                jour pour un homme.{'\n\n'}
              </TextStyled>
            </SubTitle>
            <SubTitle>
              <TextStyled type="basicText">
                Une unité d’alcool correspond à environ 10 grammes d’alcool pur, soit environ un verre de vin de 13cl à
                12°c ou un demi de bière à 4°c par exemple.{'\n\n'}
              </TextStyled>
            </SubTitle>
            <SubTitle>
              <TextStyled type="basicText">
                Lorsque vous saisisez une consommation, l’application convertit automatiquement en unité d’alcool.
                {'\n\n'}
              </TextStyled>
            </SubTitle>
            <SubTitle>
              <TextStyled type="basicText">
                Compter ses consommations est un pas essentiel pour prendre conscience de ce que l’on consomme.{'\n\n'}
              </TextStyled>
            </SubTitle>
          </TopContainer>
        </ScrollView>
      </SafeAreaViewStyled>
    </ModalStyled>
  );
};

const ModalStyled = styled.Modal``;

const SafeAreaViewStyled = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors.whiteBg};
  flex: 1;
`;

export default DiagramHelpModal;
