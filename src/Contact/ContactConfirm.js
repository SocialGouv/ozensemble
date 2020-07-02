import React from 'react';
import TextStyled from '../components/TextStyled';
import { ScreenBgStyled, TopContainer, TopTitle, TopSubTitle, BackButton } from './styles';
import Bottom from '../Quizz/Results/Bottom';

const ContactConfirm = ({ setView, onBackPress }) => (
  <ScreenBgStyled>
    <TopContainer shortPaddingBottom>
      <BackButton withoutPadding content="< Retour" onPress={onBackPress} bold />
      <TopTitle>
        <TextStyled type="title">Nous avons bien noté votre demande !</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled type="basicText">Vous serez rappelé très prochainement.</TextStyled>
      </TopSubTitle>
    </TopContainer>
    <Bottom setView={setView} />
  </ScreenBgStyled>
);

export default ContactConfirm;
