import React from 'react';
import TextStyled from '../../components/TextStyled';
import { ScreenBgStyled, TopContainer, TopTitle, TopSubTitle, BackButton } from './styles';
import Bottom from '../Quizz/Results/Bottom';

const ContactConfirm = ({ onBackPress }) => (
  <ScreenBgStyled>
    <TopContainer shortPaddingBottom>
      <BackButton withoutPadding content="< Retour" onPress={onBackPress} bold />
      <TopTitle>
        <TextStyled color="#4030a5">Nous avons bien noté votre demande !</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Vous serez rappelé très prochainement.</TextStyled>
      </TopSubTitle>
    </TopContainer>
    <Bottom onActionButtonPress={() => null} />
  </ScreenBgStyled>
);

export default ContactConfirm;
