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
import matomo from '../services/matomo';
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
            <TextStyled color="#4030a5">Échangez</TextStyled>
            <TextStyled color="#de285e"> gratuitement </TextStyled>
            <TextStyled color="#4030a5">
              par téléphone avec un professionnel de l'addiction
            </TextStyled>
          </TopTitle>
          <TopSubTitle>
            <TextStyled color="#191919">Prenez un rendez-vous </TextStyled>
            <TextStyled color="#4030a5">téléphonique </TextStyled>
            <TextStyled color="#191919">pour un échange </TextStyled>
            <TextStyled color="#4030a5">gratuit </TextStyled>
            <TextStyled color="#191919">de </TextStyled>
            <TextStyled color="#4030a5">15 minutes </TextStyled>
            <TextStyled color="#191919">avec un professionnel de l'addiction.</TextStyled>
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
            <TextStyled color="#191919">
              Nos équipes sont des professionnels spécialisés en addictions et vous aideront à faire
              le point ou répondront à vos questions. Nos locaux sont situés à Montreuil -{' '}
            </TextStyled>
            <TextStyled
              color="#4030a5"
              onPress={() => {
                matomo.logContactWebsiteOpened();
                Linking.openURL('https://www.capasscite.fr/');
              }}>
              Qui sommes nous ?
            </TextStyled>
          </Extra>
        </TopContainer>
      </ScreenBgStyled>
    </KeyboardAvoidingView>
  );
};

export default ContactForm;
