import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import H1 from '../../components/H1';
import OneDoseAlcoolExplanation from '../../components/OneDoseAlcoolExplanation';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';
import UnderlinedButton from '../../components/UnderlinedButton';

const CountConsumptiom = () => {
  const navigation = useNavigation();

  return (
    <ScreenBgStyled>
      <TextBackground>
        <BackButton content="< Retour" onPress={navigation.goBack} bold />
        <TopContainer>
          <TopTitle>
            <H1 color="#4030a5">Se fixer un objectif</H1>
          </TopTitle>
          <TopDescription>
            <TextStyled>Durant la prochaine période, quel sera votre objectif ?</TextStyled>
          </TopDescription>
        </TopContainer>
        <HowCountContainer>
          <Title>
            <H1>Comment compter sa consommation d'alcool ?</H1>
          </Title>
          <Description>
            <TextStyled>Quand vous saisissez une consommation d'alcool, celle-ci est automatiquement</TextStyled>
            <TextStyled bold>comptabilisée en unité d'alcool.{'\n'}</TextStyled>
            <TextStyled>A titre indicatif chaque consommation ci-dessous compte pour une unité d'alcool.</TextStyled>
          </Description>
        </HowCountContainer>
      </TextBackground>
      <DoseContainer>
        <OneDoseAlcoolExplanation backgroundColor={'#ECECEC'} />
      </DoseContainer>
    </ScreenBgStyled>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: #ececec;
`;

const TopContainer = styled.View`
  padding: 0px 30px 0px;
`;

const TopTitle = styled.View`
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const BackButton = styled(UnderlinedButton)`
  margin-right: auto;
  margin-bottom: 30px;
`;

const TopDescription = styled.View``;

const HowCountContainer = styled.View`
  margin-top: ${screenHeight * 0.05}px;
  margin-bottom: ${screenHeight * 0.05}px;
  width: 95%;
  justify-content: center;
  padding: 0px 30px 0px;
`;

const TextBackground = styled.View`
  background-color: #f9f9f9;
`;

const Title = styled.View`
  align-items: center;
`;

const Description = styled.View`
  margin-top: ${screenHeight * 0.04}px;
`;

const DoseContainer = styled.View`
  padding-top: ${screenHeight * 0.05}px;
  background-color: #ececec;
`;

export default CountConsumptiom;
