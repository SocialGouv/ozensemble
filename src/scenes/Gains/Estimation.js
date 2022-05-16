import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';
import { previousDrinksPerWeekState } from '../../recoil/gains';
import DrinksCategory from '../../components/DrinksCategory';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import { Container, MarginBottom, ModalContent } from '../AddDrink/styles';
import UnderlinedButton from '../../components/UnderlinedButton';

const Estimation = () => {
  const navigation = useNavigation();

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
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Pour calculer vos gains</H1>
        </TopTitle>
        <TopDescription>
          <DescriptionText>
            <TextStyled>Sur une semaine type, actuellement, combien de verres consommez-vous ?</TextStyled>
          </DescriptionText>
          <DescriptionText>
            <TextStyled>
              Cette estimation sera comparée à ce que vous consommerez par la suite, pour calculer vos gains en&nbsp;€
              et kCal.
            </TextStyled>
          </DescriptionText>
          <DescriptionText>
            <TextStyled>
              <TextStyled bold>Vos réponses sont anonymes, </TextStyled>répondez avec le plus de transparence possible.
            </TextStyled>
          </DescriptionText>
          {/* <DescriptionText>
            <TextStyled>
              Pour rappel votre objectif est de ne pas dépasser
              <TextStyled color={'#4030a5'}> {maxDrinksPerWeekGoal}&nbsp;verres par semaine.</TextStyled>
            </TextStyled>
          </DescriptionText> */}
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
                drinks={previousDrinksPerWeek}
                setDrinkQuantity={setDrinkQuantityRequest}
              />
            ))}
          <MarginBottom />
        </ModalContent>
      </Container>
      <CTAButtonContainer>
        <ButtonPrimary
          disabled={!previousDrinksPerWeek.find((drink) => drink.quantity != 0)}
          content="Je finalise"
          onPress={() => navigation.navigate('GAINS_SEVRAGE')}
        />
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

const TopDescription = styled.View``;

const DescriptionText = styled.Text`
  margin-bottom: 14px;
`;

const BackButton = styled(UnderlinedButton)`
  margin-right: auto;
  margin-bottom: 30px;
`;

const CTAButtonContainer = styled.View`
  height: ${screenHeight * 0.22}px;
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
`;

export default Estimation;
