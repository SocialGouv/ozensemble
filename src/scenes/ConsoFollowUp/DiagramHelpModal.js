import React from 'react';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';
import { Modal, ScrollView } from 'react-native';
import TextStyled from '../../components/TextStyled';
import { TopContainer } from './styles';
import Diagram from './Diagram';
import CocktailGlass from '../../components/Illustrations/CocktailGlass';
import HalfBeer from '../../components/Illustrations/HalfBeer';
import WineGlass from '../../components/Illustrations/WineGlass';
import Dose from '../../components/Illustrations/Dose';
import Stars from '../../components/Illustrations/Stars';
import OneDoses from '../../components/OneDoses';

const doses = [
  { Icon: HalfBeer, name: 'bière', volume: 25, degrees: 5 },
  // { Icon: Pint, volume: 50 },
  { Icon: WineGlass, name: 'vin', volume: 10, degrees: 12 },
  // { Icon: WineBottle, volume: 75 },
  { Icon: CocktailGlass, name: 'spiritueux', volume: 3, degrees: 40 },
  // { Icon: CocktailBottle, volume: 75 },
];

const Elem = ({ content, lineHeight = 20 }) => (
  <ElemContainer>
    <Stars color="#4030a5" style={{ marginRight: 10 }} size={20} />
    <TextStyled style={{ flex: 1, lineHeight, fontSize: 18 }}>{content}</TextStyled>
  </ElemContainer>
);

const DiagramHelpModal = ({ visible, onCloseHelp }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCloseHelp}>
      <SafeAreaViewStyled>
        <ScrollView>
          <TopContainer>
            <Diagram asPreview showCloseHelp onCloseHelp={onCloseHelp} />
            <Paragraph>
              <Elem
                content={
                  <TextStyled>
                    Le graphique représente{' '}
                    <TextStyled bold color="#4030a5">
                      les unités d’alcool
                    </TextStyled>{' '}
                    consommées sur une journée.
                  </TextStyled>
                }
              />
              <Elem
                content={
                  <TextStyled>
                    La ligne verte représente{' '}
                    <TextStyled bold color="#4030a5">
                      le seuil de l’OMS{' '}
                    </TextStyled>
                    (2 verres par jour).
                  </TextStyled>
                }
              />
            </Paragraph>
            <Paragraph>
              <Elem
                content={
                  <TextStyled>
                    Une unité d’alcool correspond à environ 10 grammes d’alcool pur, soit environ un verre de vin de
                    13cl à 12°c ou un demi de bière à 4°c par exemple.
                  </TextStyled>
                }
              />
            </Paragraph>
            <OneDoses />
            {/* <DoseContainer>
              <DoseEqualWrapper>
                <TextStyled color="#191919">=</TextStyled>
              </DoseEqualWrapper>
              <IconWrapper>
                <Dose size={60} style={{ borderWidth: 0 }} />
                <Volume color="#4030a5">1 dose</Volume>
              </IconWrapper>
            </DoseContainer> */}
            <Paragraph>
              <Elem
                content={
                  <TextStyled>
                    Lorsque vous saisisez une consommation, l’application{' '}
                    <TextStyled color="#4030a5">convertit automatiquement</TextStyled> en unité d’alcool.
                  </TextStyled>
                }
              />
            </Paragraph>
            <Paragraph>
              <Elem
                content={
                  <TextStyled>
                    <TextStyled color="#4030a5">Compter ses consommations</TextStyled> est un pas essentiel pour prendre
                    conscience de ce que l’on consomme.
                  </TextStyled>
                }
              />
            </Paragraph>
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

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

export default DiagramHelpModal;
