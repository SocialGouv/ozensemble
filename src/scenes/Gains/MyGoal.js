import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import H1 from '../../components/H1';
import H2 from '../../components/H2';
import TextStyled from '../../components/TextStyled';
import Done from '../../components/Illustrations/Done';
import Economy from '../../components/Illustrations/Economy';
import CocktailGlass from '../../components/Illustrations/CocktailGlassTriangle';
import useStateWithAsyncStorage from '../../hooks/useStateWithAsyncStorage';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';

const MyGoal = ({ drinkByWeek, dayNoDrink }) => {

    const navigation = useNavigation();

    const ToGoal = () => {
        navigation.navigate("GOAL");
    };

    const ToEstimation = () => {
        navigation.navigate("ESTIMATION");
    }

    const [estimationDrinksPerWeek] = useStateWithAsyncStorage("@GainEstimationDrinksPerWeek", []);

    const price = useMemo(() => {
        return estimationDrinksPerWeek.reduce((sum, drink) =>
            sum + drink.quantity * drinksCatalog.find(drinkCatalog => drinkCatalog.drinkKey === drink.drinkKey).price
            , 0)
    }, [estimationDrinksPerWeek])

    const numberOfDrink = useMemo(() => {
        return estimationDrinksPerWeek.reduce((sum, drink) =>
            sum + drink.quantity
            , 0)
    }, [estimationDrinksPerWeek])

    return (
        <MyGoalContainer>
            <Title>
                <H1 color="#4030a5">Mon objectif</H1>
            </Title>
            <MyGoalSubContainer>
                <MyGoalSubContainerInside>
                    <PartMyGoalSubContainer icon={<Done size={20} />} value={`  ${dayNoDrink} ${dayNoDrink > 1 ? "jours" : "jour"} où je ne bois pas`} />
                    <PartMyGoalSubContainer icon={<Done size={20} />} value={`  ${drinkByWeek} ${drinkByWeek > 1 ? "verres" : "verre"} max par semaine`} />
                </MyGoalSubContainerInside>
            </MyGoalSubContainer>
            <ModifyContainer>
                <ButtonTouchable onPress={ToGoal}>
                    <TextModify>
                        <TextStyled>Modifier l'objectif</TextStyled>
                    </TextModify>
                </ButtonTouchable>
            </ModifyContainer>
            <Title>
                <H2 color="#4030a5">Estimation de ma consommation avant objectif</H2>
                <H2 >Par semaine</H2>
            </Title>
            <MyGoalSubContainer>
                <MyGoalSubContainerInside>
                    <PartMyGoalSubContainer icon={<Economy size={20} />} value={`  ${price} €`} />
                    <PartMyGoalSubContainer icon={<CocktailGlass size={20} />} value={`  ${numberOfDrink} ${numberOfDrink > 1 ? "verres" : "verre"} `} />
                </MyGoalSubContainerInside>
            </MyGoalSubContainer>
            <ModifyContainer>
                <ButtonTouchable onPress={ToEstimation}>
                    <TextModify>
                        <TextStyled>Modifier l'estimation</TextStyled>
                    </TextModify>
                </ButtonTouchable>
            </ModifyContainer>
        </MyGoalContainer>
    )
}

const PartMyGoalSubContainer = ({ icon, value }) => (
    <PartContainer>
        {icon}
        <TextStyled>{value}</TextStyled>
    </PartContainer>
);

const Title = styled.View`
  flex-shrink: 0;
  margin-top: 10px;
`;

const MyGoalContainer = styled.View` 
  padding: 20px 30px 0px;
`;

const MyGoalSubContainer = styled.View` 
  border: 1px solid #ddd;
  margin: 10px 5px 10px;
`;

const PartContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px ;
`;

const MyGoalSubContainerInside = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ModifyContainer = styled.View`
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TextModify = styled.Text`
  text-decoration: underline;
`;

const ButtonTouchable = styled.TouchableOpacity`
`;

export default MyGoal
