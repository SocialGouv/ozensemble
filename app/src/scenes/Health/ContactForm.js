import React from 'react';
import { Linking } from 'react-native';
import styled, { css } from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextStyled from '../../components/TextStyled';
import { logEvent } from '../../services/logEventsWithMatomo';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import H2 from '../../components/H2';
import H1 from '../../components/H1';
import WrapperContainer from '../../components/WrapperContainer';

const ContactForm = ({ navigation }) => {
  return (
    <WrapperContainer
      onPressBackButton={navigation.goBack}
      title={
        <>
          <TextStyled color="#4030a5">Échangez</TextStyled>
          <TextStyled color="#de285e"> gratuitement </TextStyled>
          <TextStyled color="#4030a5">par téléphone avec un professionnel de l'addiction</TextStyled>
        </>
      }>
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
            logEvent({
              category: 'CONTACT',
              action: 'CONTACT_RDV',
            });
            navigation.navigate('DOCTOLIB');
          }}
        />
      </TopButtonContainer>
      <Extra>
        <TextStyled color="#191919">
          Nos équipes sont des professionnels spécialisés en addictions et vous aideront à faire le point ou répondront
          à vos questions. Nos locaux sont situés à Montreuil -{' '}
        </TextStyled>
        <TextStyled
          color="#4030a5"
          onPress={() => {
            logEvent({
              category: 'CONTACT',
              action: 'CONTACT_WEBSITE_OPEN',
            });
            Linking.openURL('https://www.capasscite.fr/');
          }}>
          Qui sommes nous ?
        </TextStyled>
      </Extra>
    </WrapperContainer>
  );
};

const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

const TopTitle = styled(H1)`
  ${commonCss}
  margin-bottom: 10px;
`;

const TopSubTitle = styled(H2)`
  ${commonCss};
  margin-bottom: 10px;
`;

const Extra = styled(H2)`
  ${commonCss}
  font-style: italic;
  font-weight: normal;
  margin-bottom: 10px;
  color: #191919;
`;

const TopButtonContainer = styled.View`
  margin-vertical: 20px;
  align-items: flex-start;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-around;
  margin-left: ${-defaultPaddingFontScale()}px;
  width: ${screenWidth}px;
`;

export default ContactForm;
