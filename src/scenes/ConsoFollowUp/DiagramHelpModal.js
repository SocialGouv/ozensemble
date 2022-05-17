/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Modal, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import styled from 'styled-components';
import Stars from '../../components/Illustrations/Stars';
import OneDoseAlcoolExplanation from '../../components/OneDoseAlcoolExplanation';
import TextStyled from '../../components/TextStyled';
import Diagram from './Diagram';
import { TopContainer } from './styles';

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
                      le seuil de votre objectif
                    </TextStyled>
                    (maximum de verres par jour autorisé).
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
            <OneDoseAlcoolExplanation />
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

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

export default DiagramHelpModal;
