import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { maxDrinksPerWeekSelector, previousDrinksPerWeekState } from '../../recoil/gains';
import DrinksCategory from '../../components/DrinksCategory';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import GoBackButtonText from '../../components/GoBackButtonText';
import H2 from '../../components/H2';
import matomo from '../../services/matomo';
import { ScreenBgStyled } from '../../components/Styles/ScreenBgStyled';

const Estimation = () => {
  const navigation = useNavigation();

  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);
  const [previousDrinksPerWeek, setEstimationDrinksPerWeek] = useRecoilState(previousDrinksPerWeekState);

  const scrollRef = useRef(null);

  const setDrinkQuantityRequest = (drinkKey, quantity) => {
    const oldDrink = previousDrinksPerWeek.find((drink) => drink.drinkKey === drinkKey);

    if (oldDrink) {
      setEstimationDrinksPerWeek([
        ...previousDrinksPerWeek.filter((drink) => drink.drinkKey !== drinkKey),
        {
          ...previousDrinksPerWeek.find((drink) => drink.drinkKey === drinkKey),
          quantity,
        },
      ]);
    } else {
      setEstimationDrinksPerWeek([
        ...previousDrinksPerWeek,
        {
          drinkKey,
          quantity,
          id: uuidv4(),
        },
      ]);
    }
  };

  return (
    <ScreenBgStyled>
      <BackButton content="< Retour" onPress={navigation.goBack} bold />
      <TextContainer>
        <TopTitle>
          <H1 color="#4030a5">Ma consommation avant Oz Ensemble</H1>
          <H2>Estimation par semaine</H2>
        </TopTitle>
        <DescriptionText>
          <TextStyled>Sur une semaine type, combien de verres consommez-vous ?</TextStyled>
        </DescriptionText>
      </TextContainer>
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
                drinks={previousDrinksPerWeek}
                setDrinkQuantity={setDrinkQuantityRequest}
              />
            ))}
        </ModalContent>
      </Container>
      <TextContainer>
        <DescriptionText>
          <TextStyled>
            <TextStyled bold>Vos réponses sont anonymes, </TextStyled>répondez avec le plus de transparence possible.
          </TextStyled>
        </DescriptionText>
        <DescriptionText>
          <TextStyled>
            <TextStyled bold>Cette estimation sera comparée à ce que vous consommerez par la suite</TextStyled>, pour
            calculer vos gains en&nbsp;€ et kCal.
          </TextStyled>
        </DescriptionText>
        <DescriptionText big>
          <TextStyled>
            Pour rappel votre objectif est de ne pas dépasser
            <TextStyled color={'#4030a5'}> {maxDrinksPerWeekGoal}&nbsp;verres par semaine.</TextStyled>
          </TextStyled>
        </DescriptionText>
      </TextContainer>
      <CTAButtonContainer>
        <ButtonPrimary
          disabled={!previousDrinksPerWeek.find((drink) => drink.quantity !== 0)}
          content="Je finalise"
          onPress={() => {
            const numberDrinkEstimation = previousDrinksPerWeek.reduce(
              (sum, drink) =>
                sum +
                drink.quantity * drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey).doses, //sum + drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey).doses,
              0
            );
            matomo.logGoalEstimationDrink(numberDrinkEstimation);
            navigation.navigate('GAINS_SEVRAGE');
          }}
        />
      </CTAButtonContainer>
    </ScreenBgStyled>
  );
};

const TextContainer = styled.View`
  padding-horizontal: 20px;
  margin-top: 20px;
`;

const TopTitle = styled.View`
  flex-shrink: 0;
  margin-bottom: 10px;
`;

const DescriptionText = styled.Text`
  margin-bottom: 14px;
  ${(props) => props.big && 'font-size: 16px;'}
`;

const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
`;

export const Container = styled.View`
  background-color: #f9f9f9;
  flex: 1;
  margin-top: 20px;
`;

const CTAButtonContainer = styled.View`
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
  padding-top: 30px;
  padding-bottom: 100px;
`;

const ModalContent = styled.ScrollView`
  width: 100%;
  background-color: #f9f9f9;
`;

export default Estimation;
