import React from 'react';
import { Linking, Platform, KeyboardAvoidingView } from 'react-native';
import TextStyled from '../components/TextStyled';
import {
  ScreenBgStyled,
  TopContainer,
  TopTitle,
  TopSubTitle,
  TopButtonContainer,
  Extra,
} from './styles';
import matomo from '../matomo';
import ButtonPrimary from '../components/ButtonPrimary';

const ContactForm = ({ onRdvRequest }) => {
  return (
    <KeyboardAvoidingView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: null })}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 250 })}>
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <TextStyled type="title">Échangez</TextStyled>
            <TextStyled type="buttonPrimary"> gratuitement </TextStyled>
            <TextStyled type="title">par téléphone avec un professionnel de l'addiction</TextStyled>
          </TopTitle>
          <TopSubTitle>
            <TextStyled type="basicText">Prenez un rendez-vous </TextStyled>
            <TextStyled type="title">téléphonique </TextStyled>
            <TextStyled type="basicText">pour un échange </TextStyled>
            <TextStyled type="title">gratuit </TextStyled>
            <TextStyled type="basicText">de </TextStyled>
            <TextStyled type="title">15 minutes </TextStyled>
            <TextStyled type="basicText">avec un professionnel de l'addiction.</TextStyled>
          </TopSubTitle>
          <TopButtonContainer>
            <ButtonPrimary
              content="Prendre RDV téléphonique"
              onPress={() => {
                matomo.logContactTakeRDV();
                onRdvRequest();
              }}
            />
          </TopButtonContainer>
          <Extra>
            <TextStyled type="extra">
              Nos équipes sont des professionnels spécialisés en addictions et vous aideront à faire
              le point ou répondront à vos questions. Nos locaux sont situés à Montreuil -{' '}
            </TextStyled>
            <TextStyled
              onPress={() => {
                matomo.logContactWebsiteOpened();
                Linking.openURL('https://www.capasscite.fr/');
              }}
              type="link">
              Qui sommes nous ?
            </TextStyled>
          </Extra>
        </TopContainer>
      </ScreenBgStyled>
    </KeyboardAvoidingView>
  );
};

export default ContactForm;
