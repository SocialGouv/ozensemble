import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';
import { estimationDrinksPerWeekState, maxDrinksPerWeekSelector } from './recoil';
import DrinksCategory from '../../components/DrinksCategory';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import { Container, MarginBottom, ModalContent } from '../AddDrink/styles';

const Estimation = () => {
  const navigation = useNavigation();

  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);

  const complete = () => {
    navigation.navigate('GAINS');
  };
  const [estimationDrinksPerWeek, setEstimationDrinksPerWeek] = useRecoilState(estimationDrinksPerWeekState);

  const scrollRef = useRef(null);

  const setDrinkQuantityRequest = (drinkKey, quantity) => {
    const oldDrink = estimationDrinksPerWeek.find((drink) => drink.drinkKey === drinkKey);

    if (oldDrink) {
      setEstimationDrinksPerWeek([
        ...estimationDrinksPerWeek.filter((drink) => drink.drinkKey !== drinkKey),
        {
          ...estimationDrinksPerWeek.find((drink) => drink.drinkKey === drinkKey),
          quantity,
        },
      ]);
    } else {
      setEstimationDrinksPerWeek([
        ...estimationDrinksPerWeek,
        {
          drinkKey,
          quantity,
          id: uuidv4(),
        },
      ]);
    }
  };

  console.log({ estimationDrinksPerWeek });

  return (
    <ScreenBgStyled>
      <GoBack onPress={navigation.goBack}>
        <TextStyled bold>{'<'} Retour </TextStyled>
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
            <TextStyled>
              <TextStyled bold>Vos réponses sont anonymes, </TextStyled>répondez avec le plus de transparence possible.
            </TextStyled>
          </DescriptionText>
          <DescriptionText>
            <TextStyled>
              Pour rappel votre objectif est de
              <Bold>
                {' '}
                ne pas dépasser
                <TextStyled color={'#4030a5'}> {maxDrinksPerWeekGoal}&nbsp;verres par semaine.</TextStyled>
              </Bold>
            </TextStyled>
          </DescriptionText>
        </TopDescription>
      </TopContainer>
      <Container>
        <ModalContent ref={scrollRef} disableHorizontal>
          {drinksCatalog
            .map(({ categoryKey }) => categoryKey)
            .filter((categoryKey, index, categories) => categories.indexOf(categoryKey) === index)
            .map((category, index) => (
              <DrinksCategory
                key={category}
                drinksCatalog={drinksCatalog}
                category={category}
                index={index}
                drinks={estimationDrinksPerWeek}
                setDrinkQuantity={setDrinkQuantityRequest}
              />
            ))}
          <MarginBottom />
        </ModalContent>
      </Container>
      <CTAButtonContainer>
        <ButtonPrimary disabled={estimationDrinksPerWeek.length <= 0} content="Je finalise" onPress={complete} />
      </CTAButtonContainer>
    </ScreenBgStyled>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
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

const TopDescription = styled.View``;

const DescriptionText = styled.Text`
  margin-bottom: 14px;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const CTAButtonContainer = styled.View`
  height: ${screenHeight * 0.22}px;
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
`;

export default Estimation;
