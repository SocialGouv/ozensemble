import React, { useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';
import H1 from '../../components/H1';
import OneDoseAlcoolExplanation from '../../components/OneDoseAlcoolExplanation';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';
import GoBackButtonText from '../../components/GoBackButtonText';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import InfoObjectif from '../../components/illustrations/InfoObjectif';
import { logEvent } from '../../services/logEventsWithMatomo';

const HelpModalCountConsumption = ({ event, children }) => {
  const [helpVisible, setHelpVisible] = useState(false);

  const onClose = () => setHelpVisible(false);

  return (
    <>
      <HelpCount
        onPress={() => {
          logEvent({
            category: 'GAINS',
            action: 'GOAL_DRINK_HELP',
            name: event,
          });
          setHelpVisible(true);
        }}
        hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
        {children ? (
          children
        ) : (
          <>
            <HelpCountCaption>Comment compter un verre sans me tromper</HelpCountCaption>
            <InfoObjectif size={15} color={'#000000'} />
          </>
        )}
      </HelpCount>
      <Modal visible={helpVisible} animationType="slide" presentationStyle="formSheet" onRequestClose={onClose}>
        <SafeAreaViewStyled>
          <ScreenBgStyled backgroundColor="#ececec">
            <TextBackground>
              <BackButton content="< Retour" onPress={onClose} bold />
              <HowCountContainer>
                <H1>Comment compter sa consommation d'alcool ?</H1>
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
    </>
  );
};

const SafeAreaViewStyled = styled(SafeAreaView)`
  background-color: #f9f9f9;
  flex: 1;
`;

const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
`;

const HowCountContainer = styled.View`
  margin-top: 20px;
  margin-bottom: ${screenHeight * 0.05}px;
  justify-content: center;
  padding-horizontal: 20px;
`;

const TextBackground = styled.View`
  background-color: #f9f9f9;
`;

const Description = styled.View`
  margin-top: ${screenHeight * 0.04}px;
`;

const DoseContainer = styled.View`
  padding-top: ${screenHeight * 0.05}px;
  background-color: #ececec;
`;

const HelpCount = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const HelpCountCaption = styled(TextStyled)`
  font-size: 11px;
  margin-right: 8px;
  flex-shrink: 1;
`;
export default HelpModalCountConsumption;
