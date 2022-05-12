import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { screenHeight, screenWidth } from '../../styles/theme';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import Balance from '../../components/Illustrations/Balance';
import Economy from '../../components/Illustrations/Economy';
import InfosIcon from '../../components/Illustrations/InfoObjectif';
import NoDrink from '../../components/Illustrations/NoDrink';
import Rocket from '../../components/Illustrations/Rocket';
import TextStyled from '../../components/TextStyled';
import CategorieGain from './CategorieGain';
import GainsCalendar from './GainsCalendar';
import MyGoal from './MyGoal';
import OnBoardingGain from './OnBoardingGain';
import { getDaysForFeed, getDailyDoses, getDrinksState } from '../ConsoFollowUp/consoDuck';
import { daysWithGoalNoDrinkState, maxDrinksPerWeekSelector } from './recoil';

const MyGains = ({ days, dailyDoses }) => {
  const navigation = useNavigation();

  const toGoal = () => {
    navigation.navigate('GOAL');
    setShowOnboardingGainModal((show) => !show);
  };

  const beginDate = '3 avril';
  const beginDay = 'lundi';

  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const dayNoDrink = useRecoilValue(daysWithGoalNoDrinkState)?.length;

  const isOnboarded = useMemo(() => !!maxDrinksPerWeekGoal, [maxDrinksPerWeekGoal]);
  const [showOnboardingGainModal, setShowOnboardingGainModal] = useState(false);
  const [showGoalfix, setShowGoalfix] = useState(true);

  const notDrinkDaythisWeek = days.slice(0, 7).filter((day) => dailyDoses[day] === 0).length;
  const numberDrinkThisWeek = days.slice(0, 7).reduce((sum, day) => sum + (dailyDoses[day] ? dailyDoses[day] : 0), 0);
  const remaindrink = maxDrinksPerWeekGoal - numberDrinkThisWeek > 0 ? maxDrinksPerWeekGoal - numberDrinkThisWeek : 0;

  return (
    <ScreenBgStyled>
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Mes gains</H1>
        </TopTitle>
        {!isOnboarded ? (
          <TouchableOpacity onPress={() => navigation.navigate('GOAL')}>
            <Description>
              <InfosIcon size={24} />
              <TextDescritpion>
                <Text>
                  Pour calculer vos gains, {'\n'}fixez-vous un <Bold>objectif</Bold>
                </Text>
              </TextDescritpion>
              <Arrow>{'>'}</Arrow>
            </Description>
          </TouchableOpacity>
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
          {isOnboarded && (
            <TextStyled>
              Depuis le<TextStyled color="#DE285E"> {beginDate}</TextStyled>
            </TextStyled>
          )}
        </TextForm>
      </TextContainer>
      <Categories>
        <CategorieGain icon={<Economy size={24} />} unit={'€'} description="Mes économies" />
        <CategorieGain icon={<Balance size={26} />} unit="kcal" description="Mes calories économisées" />
      </Categories>
      <TextContainer>
        <TextForm>
          {isOnboarded && (
            <TextStyled>
              Sur la semaine en cours depuis<TextStyled color="#DE285E"> {beginDay}</TextStyled>
            </TextStyled>
          )}
        </TextForm>
      </TextContainer>
      <Categories>
        <CategorieGain description="Verres restants" value={remaindrink}>
          <Speedometer
            value={remaindrink}
            totalValue={maxDrinksPerWeekGoal}
            size={screenWidth / 4}
            outerColor="#d3d3d3"
            internalColor={`rgba(64, 48, 165, ${remaindrink / maxDrinksPerWeekGoal})`}
          />
        </CategorieGain>
        <CategorieGain icon={<NoDrink size={24} />} description="Jours où je n'ai pas bu" value={notDrinkDaythisWeek} />
      </Categories>
      <OnBoardingGain
        onPress={toGoal}
        visible={showOnboardingGainModal}
        hide={() => setShowOnboardingGainModal(false)}
      />
      <GainsCalendar isOnboarded={isOnboarded} />
      {!isOnboarded ? (
        <TopContainer>
          <TopTitle>
            <H1 color="#4030a5">Mon objectif</H1>
          </TopTitle>
          <TouchableOpacity onPress={() => setShowOnboardingGainModal((show) => !show)}>
            <Description>
              <InfosIcon size={24} />
              <TextDescritpion>
                <Text>
                  Pour calculer vos gains, {'\n'}fixez-vous un <Bold>objectif</Bold>
                </Text>
              </TextDescritpion>
              <Arrow>{'>'}</Arrow>
            </Description>
          </TouchableOpacity>
        </TopContainer>
      ) : (
        <MyGoal />
      )}
    </ScreenBgStyled>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: white;
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

const Bold = styled.Text`
  font-weight: bold;
`;

const makeStateToProps = () => (state) => ({
  drinks: getDrinksState(state),
  days: getDaysForFeed(state),
  dailyDoses: getDailyDoses(state),
});

export default connect(makeStateToProps)(MyGains);
