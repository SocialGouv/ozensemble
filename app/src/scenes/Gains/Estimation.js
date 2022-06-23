import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { previousDrinksPerWeekState } from '../../recoil/gains';
import DrinksCategory from '../../components/DrinksCategory';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import BackButton from '../../components/BackButton';
import { logEvent } from '../../services/logEventsWithMatomo';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import { P } from '../../components/Articles';
import { defaultPaddingFontScale } from '../../styles/theme';
import HelpModalCountConsumption from './HelpModalCountConsumption';

const Estimation = () => {
  const navigation = useNavigation();
  const isOnboarded = useRecoilValue(previousDrinksPerWeekState);

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
      <BackButton onPress={() => navigation.goBack()} marginLeft />
      <TextContainer>
        <TopTitle>
          <H1 color="#4030a5">Ma conso actuelle avant objectif</H1>
        </TopTitle>
        <DescriptionText>
          <P bold>Sur une semaine type, combien d'unités d'alcool consommez-vous ?</P>
        </DescriptionText>
      </TextContainer>
      <Row>
        <HelpModalCountConsumption event="PREVIOUS_CONSUMPTION" />
      </Row>
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
        <P>
          <TextStyled>
            <TextStyled bold>Vos réponses sont anonymes, </TextStyled>répondez avec le plus de transparence possible.
          </TextStyled>
        </P>
        <DescriptionText>
          <P>
            <TextStyled bold>Cette estimation sera comparée à ce que vous consommerez par la suite</TextStyled>, pour
            calculer vos gains en&nbsp;€ et kCal.
          </P>
        </DescriptionText>
      </TextContainer>
      <CTAButtonContainer>
        <ButtonPrimary
          disabled={!previousDrinksPerWeek.find((drink) => drink.quantity !== 0)}
          content="Je continue"
          onPress={() => {
            const numberDrinkEstimation = previousDrinksPerWeek.reduce(
              (sum, drink) =>
                sum +
                drink.quantity * drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey).doses, //sum + drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey).doses,
              0
            );
            logEvent({
              category: 'GAINS',
              action: 'GOAL_ESTIMATION_DRINK',
              value: numberDrinkEstimation,
            });
            isOnboarded ? navigation.navigate('GAINS_MAIN_VIEW') : navigation.navigate('GAINS_MY_OBJECTIVE');
          }}
        />
      </CTAButtonContainer>
    </ScreenBgStyled>
  );
};

const TextContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()};
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

const Row = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  width: 100%;
  padding-horizontal: ${defaultPaddingFontScale()};
`;

export default Estimation;
