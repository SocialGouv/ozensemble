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
import BackButton from '../../components/BackButton';
import { logEvent } from '../../services/logEventsWithMatomo';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import { P, Spacer } from '../../components/Articles';
import { defaultPaddingFontScale } from '../../styles/theme';
import HelpModalCountConsumption from './HelpModalCountConsumption';
import WrapperContainer from '../../components/WrapperContainer';

const GainsPreviousConsumption = () => {
  const navigation = useNavigation();
  const isOnboarded = useRecoilValue(maxDrinksPerWeekSelector);

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
    <WrapperContainer
      onPressBackButton={navigation.goBack}
      title="Ma conso actuelle avant objectif"
      noPaddingHorizontal>
      <Container>
        <DescriptionText>
          <P bold>Sur une semaine type, combien d'unités d'alcool consommez-vous ?</P>
        </DescriptionText>
        <HelpModalCountConsumption event="PREVIOUS_CONSUMPTION" />
      </Container>
      <Spacer size={20} />
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
      <Spacer size={20} />
      <Container>
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
      </Container>
      <Spacer size={25} />
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
            isOnboarded
              ? navigation.navigate('GAINS_MAIN_VIEW')
              : navigation.navigate('GAINS_MY_OBJECTIVE', { forOnboarding: true });
          }}
        />
      </CTAButtonContainer>
    </WrapperContainer>
  );
};

const DescriptionText = styled.Text`
  margin-bottom: 14px;
  ${(props) => props.big && 'font-size: 16px;'}
`;

export const Container = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
  flex: 1;
`;

const CTAButtonContainer = styled.View`
  align-items: center;
  flex-shrink: 1;
`;

export default GainsPreviousConsumption;
