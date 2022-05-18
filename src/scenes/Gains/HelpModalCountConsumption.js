import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import H1 from '../../components/H1';
import OneDoseAlcoolExplanation from '../../components/OneDoseAlcoolExplanation';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';
import UnderlinedButton from '../../components/UnderlinedButton';

const HelpModalCountConsumption = () => {
  const navigation = useNavigation();

  return (
    <ScreenBgStyled>
      <TextBackground>
        <BackButton content="< Retour" onPress={navigation.goBack} bold />
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

const BackButton = styled(UnderlinedButton)`
  margin-right: auto;
  margin-bottom: 30px;
`;

const HowCountContainer = styled.View`
  margin-top: ${screenHeight * 0.05}px;
  margin-bottom: ${screenHeight * 0.05}px;
  width: 95%;
  justify-content: center;
  padding-horizontal: 30px;
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
  padding-horizontal: 30px;
`;

export default HelpModalCountConsumption;
