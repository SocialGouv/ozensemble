import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';
import H1 from '../../components/H1';
import { screenHeight } from '../../styles/theme';
import GoBackButtonText from '../../components/GoBackButtonText';
import { Bold, P } from '../../components/Articles';

const HowMakeSelfEvaluation = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="formSheet" onRequestClose={onClose}>
      <SafeAreaViewStyled>
        <BackButton content="< Retour" onPress={onClose} bold />
        <HowCountContainer>
          <H1>Pourquoi faire cette auto-évaluation ?</H1>
          <Description>
            <P>
              En faisant cette évaluation en 4 questions, nous pourrons <Bold>améliorer votre expérience</Bold> au sein
              de l'application en vous donnant des <Bold>conseils adaptés</Bold>.
            </P>
            <P>
              De vous même, vous prendez <Bold>consicence du résultat</Bold> et vous pourrez alors y remédier en
              apprenant à réduire votre consommation d'alcool.
            </P>
          </Description>
        </HowCountContainer>
      </SafeAreaViewStyled>
    </Modal>
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

const Description = styled.View`
  margin-top: ${screenHeight * 0.04}px;
`;

export default HowMakeSelfEvaluation;
