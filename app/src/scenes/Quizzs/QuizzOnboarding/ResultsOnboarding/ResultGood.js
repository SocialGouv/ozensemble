import React from 'react';
import styled, { css } from 'styled-components';
import H3 from '../../../../components/H3';
import H2 from '../../../../components/H2';
import H1 from '../../../../components/H1';
import UnderlinedButton from '../../../../components/UnderlinedButton';
import { screenWidth } from '../../../../styles/theme';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import Sources from '../../Sources';

const ResultGood = ({ navigation, isInOnboarding, route }) => (
  <FullScreenBackground>
    <TopContainer>
      <ResultTitle>Résultat</ResultTitle>
      <TopTitle>
        <TextStyled color="#4030a5">Vous ne présentez pas de risque particulier actuellement, bravo !</TextStyled>
      </TopTitle>
      <TopSubTitle>
        <TextStyled color="#191919">Vous pouvez toutefois obtenir une évaluation plus fine en utilisant</TextStyled>
        <TextStyled color="#4030a5"> gratuitement </TextStyled>
        <TextStyled color="#191919">notre outil de agenda de consommation.</TextStyled>
      </TopSubTitle>
      <TopButtonContainer>
        <ButtonPrimary
          content="Suivre ma consommation"
          onPress={() => navigation.navigate('TABS', { screen: 'CONSO_FOLLOW_UP' })}
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

const UnderlinedButtonStyled = styled(UnderlinedButton)`
  align-items: flex-start;
`;

export default ResultGood;
