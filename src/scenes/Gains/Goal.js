import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import H1 from '../../components/H1';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import Calendar from '../../components/Illustrations/Calendar';
import CocktailGlassTriangle from '../../components/Illustrations/CocktailGlassTriangle';
import InfoObjectif from '../../components/Illustrations/InfoObjectif';
import QButton from '../../components/QButton';
import ButtonPrimary from '../../components/ButtonPrimary';
import { screenHeight } from '../../styles/theme';

const Goal = () => {

  const [quantity, setQuantity] = useState(1)

  const [Lundi, setLundi] = useState(false)
  const [Mardi, setMardi] = useState(false)
  const [Mercredi, setMercredi] = useState(false)
  const [Jeudi, setJeudi] = useState(false)
  const [Vendredi, setVendredi] = useState(false)
  const [Samedi, setSamedi] = useState(false)
  const [Dimanche, setDimanche] = useState(false)

  const Week = [Lundi, Mardi, Mercredi, Jeudi, Vendredi, Samedi, Dimanche]
  const dayNoDrink = Week.filter((e) => e === true).length
  const DrinkByWeek = quantity * (7 - dayNoDrink)

  const navigation = useNavigation();

  const Return = () => {
    navigation.navigate("GAINS");
  };

  const onHowCount = () => {
    navigation.navigate("HOWCOUNT");
  }

  return (
    <ScreenBgStyled>
      <GoBack onPress={Return}>
        <TextStyled bold>
          {"<"} Retour </TextStyled>
      </GoBack>
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Se fixer un objectif</H1>
        </TopTitle>
      </TopContainer>
      <Container>
        <ContainerTime>
          <TextStyled>La durée de votre objectif est d'<TextStyled bold>un mois</TextStyled></TextStyled>
        </ContainerTime>
        <Row>
          <Calendar size={24} />
          <TextStyled>Jours où je m'engage à ne pas boire d'alcool</TextStyled>
        </Row>
        <DayContainer>
          <DayButton content="L" active={Lundi} onPress={() => setLundi(!Lundi)} />
          <DayButton content="M" active={Mardi} onPress={() => setMardi(!Mardi)} />
          <DayButton content="M" active={Mercredi} onPress={() => setMercredi(!Mercredi)} />
          <DayButton content="J" active={Jeudi} onPress={() => setJeudi(!Jeudi)} />
          <DayButton content="V" active={Vendredi} onPress={() => setVendredi(!Vendredi)} />
          <DayButton content="S" active={Samedi} onPress={() => setSamedi(!Samedi)} />
          <DayButton content="D" active={Dimanche} onPress={() => setDimanche(!Dimanche)} />
        </DayContainer>
        <Row>
          <CocktailGlassTriangle size={30} />
          <TextStyled>Nombre de verres par jours que je m'autorise quand je bois de l'alcool</TextStyled>
        </Row>
        <Row>
          <TextStyled>Comment compter un verre sans me tromper </TextStyled>
          <HowCount onPress={onHowCount}>
            <InfoObjectif size={20} color={"#000000"} />
          </HowCount>
        </Row>
        <QuantityContainer>
          <QButton content="-" disabled={!quantity} onPress={() => setQuantity(quantity - 1)} />
          <TextStyled bold color="#4030a5">{quantity}</TextStyled>
          <QButton content="+" disabled={false} onPress={() => setQuantity(quantity + 1)} />
        </QuantityContainer>
        <DrinkByWeekContainer>
          <TextStyled> soit {DrinkByWeek} verres par semaine</TextStyled>
        </DrinkByWeekContainer>
        <CTAButtonContainer>
          <ButtonPrimary content="Continuer" onPress={() => console.log("continuer")} disabled={dayNoDrink === 0 || quantity === 0} />
        </CTAButtonContainer>
      </Container>
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
  padding: 0px 30px 0px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const GoBack = styled.TouchableOpacity`
  padding: 20px 30px 0px;
`;

const Container = styled.View`
  padding: 0px 30px 0px;
`;

const ContainerTime = styled.View`
  margin-bottom: ${screenHeight * 0.03}px;
`;

const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${screenHeight * 0.02}px;
`;

const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

`
const CTAButtonContainer = styled.View`
  height: ${screenHeight * 0.22}px;
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
  margin-top: ${screenHeight * 0}px;
`;

const DayContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${screenHeight * 0.08}px;
`;

const DayButton = ({ small, content, onPress, active }) => (
  <QButtonStyled onPress={onPress}>
    <QButtonContentContainer small={small} backgroundColor={active ? "#4030A5" : "#eeeeee"} >
      <QButtonContent color={active ? "#eeeeee" : "#000000"}>{content}</QButtonContent>
    </QButtonContentContainer>
  </QButtonStyled >
);

const qButtonSize = 35;
const QButtonStyled = styled.TouchableOpacity`
  padding: 1px;
`;

const QButtonContentContainer = styled.View`
  height: ${qButtonSize}px;
  width: ${qButtonSize}px;
  border-radius: ${qButtonSize}px;
  border: 1px solid #4030A5;
  justify-content: center;
  align-items: center;

`;

const QButtonContent = styled(TextStyled)`
  font-size: 16px;
  font-weight: bold;
  line-height: 25px;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;

const DrinkByWeekContainer = styled.View`
  align-items: center;
  margin-top: ${screenHeight * 0.01}px;
  margin-bottom: ${screenHeight * 0.1}px;
`;

const HowCount = styled.TouchableOpacity`
`;

export default Goal