import React, { useState } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import H1 from '../../components/H1';
import styled from 'styled-components';
import InfosIcon from '../../components/Illustrations/InfoObjectif';
import Balance from '../../components/Illustrations/Balance';
import Economy from '../../components/Illustrations/Economy';
import NoDrink from '../../components/Illustrations/NoDrink';
import CategorieGain from './CategorieGain';
import OnBoardingGain from './OnBoardingGain';

const MesGains = () => {

  const navigation = useNavigation();

  const ToGoal = () => {
    navigation.navigate("GOAL");
  };

  const [init] = useState(true);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Mes gains</H1>
        </TopTitle>
        <Description>
          <InfosIcon size={24} />
          <TextDescritpion>
            <Text> Pour calculer vos gains, {"\n"} fixez-vous un <Text style={{ fontWeight: "bold" }}>objectif</Text></Text>
          </TextDescritpion>
          <ButtonTouchable onPress={ToGoal} >
            <Arrow>{'>'}</Arrow>
          </ButtonTouchable>
        </Description>
      </TopContainer>
      <Categories>
        <CategorieGain icon={<Economy size={24} />} value={"?"} unit={"€"} description1={"Mes"} description2={"économies"} />
        <CategorieGain icon={<Balance size={26} />} value={"?"} unit={"kcal"} description1={"Mes calories"} description2={"économisées"} />
        <CategorieGain icon={null} value={"?"} unit={""} description1={"Verres"} description2={"restants"} />
        <CategorieGain icon={<NoDrink size={24} />} value={"?"} unit={""} description1={"Jours où je"} description2={"n'ai pas bu"} />
        {init &&
          <OnBoardingGain onPress={ToGoal} />
        }
      </Categories>

    </ScreenBgStyled>
  )
}

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const TopContainer = styled.View`
  padding: 20px 30px 0px;
`;

const TopTitle = styled.View`
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Description = styled.View`
  background-color: #C5F3BA29 ;
  border-style: solid;
  border-width: 1px;
  border-color: #81DB9557 ;
  padding: 13px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const ButtonTouchable = styled.TouchableOpacity`
`;

const Arrow = styled.Text`
  color: #4030a5;
  font-weight: bold;
`;

const TextDescritpion = styled.Text`
  padding: 10px;
  font-size: 16px;
  line-height: 20px;
`;

const Categories = styled.View`
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: 12px;
  margin-left: 12px;
`;

export default MesGains