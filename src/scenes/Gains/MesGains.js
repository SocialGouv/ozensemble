import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { screenHeight, screenWidth } from '../../styles/theme';
import styled from 'styled-components';
import Speedometer from 'react-native-speedometer-chart';

import H1 from '../../components/H1';
import H2 from '../../components/H2';
import InfosIcon from '../../components/Illustrations/InfoObjectif';
import Balance from '../../components/Illustrations/Balance';
import Economy from '../../components/Illustrations/Economy';
import NoDrink from '../../components/Illustrations/NoDrink';
import CategorieGain from './CategorieGain';
import OnBoardingGain from './OnBoardingGain';
import Rocket from '../../components/Illustrations/Rocket';
import TextStyled from '../../components/TextStyled';
import GainsCalendar from './GainsCalendar';
import MyGoal from './MyGoal';
import useStateWithAsyncStorage from '../../hooks/useStateWithAsyncStorage';

const MesGains = () => {
  const navigation = useNavigation();

  const toGoal = () => {
    navigation.navigate('GOAL');
    setNextStep(!nextStep);
  };

  const beginDate = '3 avril';
  const beginDay = 'mercredi';

  const [drinkByWeek] = useStateWithAsyncStorage('@GainQuantityDrinkByWeek', 0);
  const [dayNoDrink] = useStateWithAsyncStorage('@GainDayNoDrink', 0);

  const [init] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [showGoalfix, setShowGoalfix] = useState(true);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Mes gains</H1>
        </TopTitle>
        {init ? (
          <FixGoalInit nextStep={nextStep} setNextStep={setNextStep} />
        ) : (
          <>
            {showGoalfix && (
              <Description>
                <Rocket size={24} />
                <TextDescritpion>
                  <Text>
                    Bravo votre objectif est fixé, remplissez vos consommation et mesurez votre gain au fil du temps
                  </Text>
                </TextDescritpion>
                <TouchableOpacity onPress={() => setShowGoalfix(false)}>
                  <Arrow>{'x'}</Arrow>
                </TouchableOpacity>
              </Description>
            )}
          </>
        )}
      </TopContainer>
      <TextContainer>
        <TextForm>
          {!init && (
            <TextStyled>
              {' '}
              Depuis le<TextStyled color="#DE285E"> {beginDate}</TextStyled>
            </TextStyled>
          )}
        </TextForm>
      </TextContainer>
      <Categories>
        <CategorieGain icon={<Economy size={24} />} unit={'€'} description1={'Mes économies'} />
        <CategorieGain icon={<Balance size={26} />} value={null} unit="kcal" description1="'Mes calories économisées" />
      </Categories>
      <TextContainer>
        <TextForm>
          {!init && (
            <TextStyled>
              Sur la semaine en cours depuis<TextStyled color="#DE285E"> {beginDay}</TextStyled>
            </TextStyled>
          )}
        </TextForm>
      </TextContainer>
      <Categories>
        <CategorieGain description="Verres restants">
          <Speedometer
            value={50}
            totalValue={100}
            size={screenWidth / 4}
            outerColor="#d3d3d3"
            internalColor={`rgba(64, 48, 165, ${50 / 100})`}
          />
        </CategorieGain>
        <CategorieGain icon={<NoDrink size={24} />} description1="Jours où je n'ai pas bu" />
      </Categories>
      {nextStep && <OnBoardingGain onPress={toGoal} />}
      <GainsCalendar init={init} />
      {init ? (
        <TopContainer>
          <TopTitle>
            <H1 color="#4030a5">Mon objectif</H1>
          </TopTitle>
          <FixGoalInit nextStep={nextStep} setNextStep={setNextStep} />
        </TopContainer>
      ) : (
        <MyGoal drinkByWeek={drinkByWeek} dayNoDrink={dayNoDrink} />
      )}
    </ScreenBgStyled>
  );
};

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
  flex-shrink: 0;
  margin-top: 10px;
`;

const Description = styled.View`
  background-color: #c5f3ba29;
  border-style: solid;
  border-width: 1px;
  border-color: #81db9557;
  padding: 13px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: ${screenHeight * 0.02}px;
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
`;

const TextContainer = styled.View`
  align-items: center;
  margin-bottom: ${screenHeight * 0.01}px;
  margin-top: ${screenHeight * 0.01}px;
`;

const TextForm = styled(H2)``;

const FixGoalInit = ({ nextStep, setNextStep }) => (
  <TouchableOpacity onPress={() => setNextStep(!nextStep)}>
    <Description>
      <InfosIcon size={24} />
      <TextDescritpion>
        <Text>
          Pour calculer vos gains, {'\n'}fixez-vous un <Text style={{ fontWeight: 'bold' }}>objectif</Text>
        </Text>
      </TextDescritpion>
      <Arrow>{'>'}</Arrow>
    </Description>
  </TouchableOpacity>
);

export default MesGains;
