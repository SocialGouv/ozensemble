import React from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextStyled from '../../components/TextStyled';
import CONSTANTS from '../../reference/constants';
import {
  ScreenBgStyled,
  TopContainer,
  TopTitle,
  TopSubTitle,
  TopButtonContainer,
  UnderlinedButtonStyled,
} from './styles';
import Bottom from './Bottom';

const ResultEmpty = ({ setView, onActionButtonPress }) => (
  <ScreenBgStyled>
    <TopContainer>
      <TopTitle>
        <TextStyled type="title">Vous souhaitez échanger avec un professionnel ?</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled type="basicText">Vous pouvez discuter</TextStyled>
        <TextStyled type="title"> gratuitement </TextStyled>
        <TextStyled type="basicText">avec l'un de nos psychologues</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary
          content="Échanger avec un conseiller"
          onPress={() => onActionButtonPress(CONSTANTS.ACTION_CONSEILLER)}
        />
      </TopButtonContainer>
      <UnderlinedButtonStyled
        withoutPadding
        content="Retour au questionnaire"
        onPress={() => onActionButtonPress(CONSTANTS.ACTION_QUESTIONS)}
        bold
      />
    </TopContainer>
    <Bottom
      setView={setView}
      onActionButtonPress={onActionButtonPress}
      subTitle="Pour préparer au mieux votre échange, suivez votre consommation"
    />
  </ScreenBgStyled>
);

export default ResultEmpty;
