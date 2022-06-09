import React from 'react';
import styled, { css } from 'styled-components';
import H3 from '../../../../components/H3';
import H2 from '../../../../components/H2';
import H1 from '../../../../components/H1';
import UnderlinedButton from '../../../../components/UnderlinedButton';
import ResultsIllustration from '../../../../components/illustrations/ResultsIllustration';
import { screenWidth } from '../../../../styles/theme';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import Sources from '../../Sources';

const ResultRisk = ({ navigation, isInOnboarding, route }) => (
  <FullScreenBackground>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled color="#4030a5">Votre consommation d'alcool actuelle pourrait être à risque.</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Nous avons besoin d'en savoir plus pour affiner ce résultat.</TextStyled>
      </TopSubTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Nous vous conseillons de vous informer, d'échanger</TextStyled>
        <TextStyled color="#4030a5"> gratuitement </TextStyled>
        <TextStyled color="#191919">avec l'un de nos professionnels ou de faire le défi 7 jours</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary
          content="Faire le défi 7 jours"
          onPress={() => navigation.navigate('TABS', { screen: 'DEFI' })}
        />
      </TopButtonContainer>
      {!isInOnboarding ? (
        <>
          <UnderlinedButtonStyled
            withoutPadding
            content="Retour au questionnaire"
            onPress={() => navigation.navigate('QUIZZ_QUESTIONS', { screen: 'QUIZZ_QUESTION_1' })}
            bold
          />
          <UnderlinedButtonStyled
            withoutPadding
            content={route?.params?.backToRoot || 'Retour aux tests'}
            onPress={() => navigation.navigate(route?.params?.root || 'QUIZZ_MENU')}
            bold
          />
        </>
      ) : null}
    </TopContainer>
    <BottomContainer longPaddingBottom>
      <BottomSubContainer>
        <Resultsillustrationstyled />
      </BottomSubContainer>
      <BottomSubContainer shrink>
        <BottomTitle>
          <TextStyled color="#4030a5">Échangez avec un professionnel</TextStyled>
        </BottomTitle>
        <BottomSubTitle>
          <TextStyled color="#191919">Si vous le souhaitez vous avez la possibilité de discuter</TextStyled>
          <TextStyled color="#4030a5"> gratuitement </TextStyled>
          <TextStyled color="#191919">avec l'un de nos psychologues</TextStyled>
        </BottomSubTitle>
        <UnderlinedButtonStyled
          withoutPadding
          color="#de285e"
          bold
          content="Échanger avec un conseiller"
          onPress={() => navigation.navigate('CONTACT')}
        />
      </BottomSubContainer>
    </BottomContainer>
    <TopContainer>
      <Sources
        content="Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
        Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
        Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
      />
    </TopContainer>
  </FullScreenBackground>
);

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

const TopContainer = styled.View`
  padding: 20px 25px 40px;
`;

const ResultTitle = styled(H2)`
  ${commonCss}
`;

const TopTitle = styled(H1)`
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
`;

const TopSubTitle = styled(H3)`
  ${commonCss}
`;

const TopButtonContainer = styled.View`
  margin: 20px 0 30px 0;
  align-items: flex-start;
  flex-grow: 0;
  width: auto;
`;

const BottomContainer = styled.View`
  padding: 20px;
  ${(props) => props.longPaddingBottom && 'padding-bottom: 100px;'}
  background-color: #efefef;
  flex-direction: row;
  margin-top: auto;
`;

const BottomSubContainer = styled.View`
  padding: ${({ shrink }) => (shrink ? 15 : 0)}px;
  flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
  align-items: flex-start;
`;

const BottomTitle = styled(H2)`
  ${commonCss}
  margin-bottom: 20px;
`;

const BottomSubTitle = styled(H2)`
  ${commonCss}
  font-weight: 500;
  margin-bottom: 20px;
`;

const Resultsillustrationstyled = styled(ResultsIllustration)`
  height: 40px;
  margin-top: 8px;
`;

const UnderlinedButtonStyled = styled(UnderlinedButton)`
  align-items: flex-start;
`;

export default ResultRisk;
