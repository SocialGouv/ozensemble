import React from 'react';
import { useNavigation } from '@react-navigation/native';

import H1 from '../../components/H1';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import useStateWithAsyncStorage from '../../hooks/useStateWithAsyncStorage';
import ButtonPrimary from '../../components/ButtonPrimary';
import { screenHeight } from '../../styles/theme';

const Estimation = () => {

  const navigation = useNavigation();

  const [drinkgoal] = useStateWithAsyncStorage("@GainQuantityDrinkByWeek", 0);
  const [init, setInit] = useStateWithAsyncStorage("@GainInitGoal", false);

  const Complete = () => {
    setInit(false);
    navigation.navigate("GAINS");
  }

  return (
    <ScreenBgStyled>
      <GoBack onPress={navigation.goBack}>
        <TextStyled bold>
          {"<"} Retour </TextStyled>
      </GoBack>
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Pour calculer vos gains</H1>
        </TopTitle>
        <TopDescription>
          <DescriptionText>
            <TextStyled>Sur une semaine type, combien de verres consommez-vous ?</TextStyled>
          </DescriptionText>
          <DescriptionText>
            <TextStyled><TextStyled bold>Vos réponses sont anonymes,</TextStyled>répondez avec le plus de transparence possible.</TextStyled>
          </DescriptionText>
          <DescriptionText>
            <TextStyled>Pour rappel votre objectif est de ne pas dépasser <TextStyled color={"#4030a5"}>{drinkgoal} verres par semaine.</TextStyled></TextStyled>
          </DescriptionText>
        </TopDescription>
      </TopContainer>
      <CTAButtonContainer>
        <ButtonPrimary content="Continuer" onPress={Complete} />
      </CTAButtonContainer>
    </ScreenBgStyled>
  )
}

const ScreenBgStyled = styled.ScrollView`
  background-color:#f9f9f9;
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

const GoBack = styled.TouchableOpacity`
  padding: 20px 30px 0px;
`;

const TopDescription = styled.View`
`;

const DescriptionText = styled.Text`
  margin-bottom: 14px;
`;

const CTAButtonContainer = styled.View`
  height: ${screenHeight * 0.22}px;
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
`;

export default Estimation