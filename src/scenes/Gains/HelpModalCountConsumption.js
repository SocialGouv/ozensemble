import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';
import H1 from '../../components/H1';
import OneDoseAlcoolExplanation from '../../components/OneDoseAlcoolExplanation';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';
import GoBackButtonText from '../../components/GoBackButtonText';

const HelpModalCountConsumption = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <SafeAreaViewStyled>
        <ScreenBgStyled>
          <TextBackground>
            <BackButton content="< Retour" onPress={onClose} bold />
            <HowCountContainer>
              <Title>
                <H1>Comment compter sa consommation d'alcool ?</H1>
              </Title>
              <Description>
                <TextStyled>Quand vous saisissez une consommation d'alcool, celle-ci est automatiquement</TextStyled>
                <TextStyled bold>comptabilisée en unité d'alcool.{'\n'}</TextStyled>
                <TextStyled>
                  A titre indicatif chaque consommation ci-dessous compte pour une unité d'alcool.
                </TextStyled>
              </Description>
            </HowCountContainer>
          </TextBackground>
          <DoseContainer>
            <OneDoseAlcoolExplanation backgroundColor={'#ECECEC'} />
          </DoseContainer>
        </ScreenBgStyled>
      </SafeAreaViewStyled>
    </Modal>
  );
};

const SafeAreaViewStyled = styled(SafeAreaView)`
  background-color: #f9f9f9;
  flex: 1;
`;

const ScreenBgStyled = styled.ScrollView`
  background-color: #ececec;
`;

const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
`;

const HowCountContainer = styled.View`
  margin-bottom: ${screenHeight * 0.05}px;
  width: 95%;
  justify-content: center;
  padding-horizontal: 30px;
`;

const TextBackground = styled.View`
  background-color: #f9f9f9;
`;

const Title = styled.View`
  align-items: center;
`;

const Description = styled.View`
  margin-top: ${screenHeight * 0.04}px;
`;

const DoseContainer = styled.View`
  padding-top: ${screenHeight * 0.05}px;
  background-color: #ececec;
`;

export default HelpModalCountConsumption;
