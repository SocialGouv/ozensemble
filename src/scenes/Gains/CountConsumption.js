import React from 'react';
import { useNavigation } from '@react-navigation/native';

import H1 from '../../components/H1';
import H3 from '../../components/H3';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import OneDoses from '../../components/OneDoses';
import { screenHeight } from '../../styles/theme';

const CountConsumptiom = () => {

    const navigation = useNavigation();

    const Return = () => {
        navigation.navigate("GOAL");
    };

    return (
        <ScreenBgStyled>
            <TextBackground>
                <GoBack onPress={Return}>
                    <TextStyled bold>
                        {"<"} Retour </TextStyled>
                </GoBack>
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
                        <TextStyled bold>comptabilisée en unité d'alcool.{"\n"}</TextStyled>
                        <TextStyled>A titre indicatif chaque consommation ci-dessous compte pour une unité d'alcool.</TextStyled>
                    </Description>
                </HowCountContainer>
            </TextBackground>
            <DoseContainer>
                <OneDoses backgroundColor={"#ECECEC"} />
            </DoseContainer>
        </ScreenBgStyled>
    )
}

const ScreenBgStyled = styled.ScrollView`
  background-color:#ECECEC;
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

const HowCountContainer = styled.View`
  margin-top: ${screenHeight * 0.05};
  margin-bottom: ${screenHeight * 0.05};
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
  margin-top: ${screenHeight * 0.04};
`;


const DoseContainer = styled.View`
  padding-top: ${screenHeight * 0.05};;
  background-color:#ECECEC;
`;

export default CountConsumptiom