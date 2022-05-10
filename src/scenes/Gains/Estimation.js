import React from 'react';
import { useNavigation } from '@react-navigation/native';

import H1 from '../../components/H1';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';

const Estimation = () => {

  const navigation = useNavigation();


  const drinkgoal = 16;

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
          <TextStyled>Sur une semaine type, combien de verres consommez-vous ?</TextStyled>
          <TextStyled><TextStyled bold>Vos réponses sont anonymes,</TextStyled>répondez avec le plus de transparence possible.</TextStyled>
          <TextStyled>Pour rappel votre objectif est de ne pas dépasser <TextStyled color={"#4030a5"}>{drinkgoal} verres par semaine.</TextStyled></TextStyled>
        </TopDescription>
      </TopContainer>
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


export default Estimation