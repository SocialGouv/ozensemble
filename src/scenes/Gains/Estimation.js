import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { previousDrinksPerWeekState } from '../../recoil/gains';
import DrinksCategory from '../../components/DrinksCategory';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import { ModalContent } from '../AddDrink/styles';
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
          <H1 color="#4030a5">Ma consommation avant OzEnsemble</H1>
        </TopTitle>
        <DescriptionText>
          <TextStyled>Sur une semaine type, combien de verres consommez-vous ?</TextStyled>
        </DescriptionText>
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
        </ModalContent>
      </Container>
      <CTAButtonContainer>
        <ButtonPrimary
          disabled={!previousDrinksPerWeek.find((drink) => drink.quantity !== 0)}
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
  padding-horizontal: 20px;
  margin-top: 20px;
`;

const TopTitle = styled.View`
  flex-direction: row;
  flex-shrink: 0;
  margin-bottom: 10px;
`;

const DescriptionText = styled.Text`
  margin-bottom: 14px;
`;

const BackButton = styled(UnderlinedButton)`
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

export default Estimation;
