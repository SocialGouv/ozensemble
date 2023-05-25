import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextStyled from '../../components/TextStyled';
import { isOnboardedSelector, previousDrinksPerWeekState } from '../../recoil/gains';
import DrinksCategory from '../../components/DrinksCategory';
import { drinksCatalog } from '../ConsoFollowUp/drinksCatalog';
import { logEvent } from '../../services/logEventsWithMatomo';
import { Spacer } from '../../components/Articles';
import { defaultPaddingFontScale } from '../../styles/theme';
import HelpModalCountConsumption from './HelpModalCountConsumption';
import WrapperContainer from '../../components/WrapperContainer';
import { Text, View } from 'react-native';
import PreviousConsumption from '../../components/illustrations/icons/PreviousConsumption';
import ModalPreviousDrinksValidation from '../../components/ModalPreviousDrinksValidation';
import { SafeAreaView } from 'react-native-safe-area-context';

const GainsPreviousConsumption = () => {
  const navigation = useNavigation();
  const isOnboarded = useRecoilValue(isOnboardedSelector);

  const [previousDrinksPerWeek, setEstimationDrinksPerWeek] = useRecoilState(previousDrinksPerWeekState);
  const [modalValidationVisible, setModalValidationVisible] = useState(false);
  const numberDrinkEstimation = useMemo(() => {
    return previousDrinksPerWeek.reduce(
      (sum, drink) =>
        sum + drink.quantity * drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey).doses, //sum + drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey).doses,
      0
    );
  }, [previousDrinksPerWeek]);
  const myWeeklyKcalBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) =>
          sum +
          drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.kcal || 0),
        0
      ),
    [previousDrinksPerWeek]
  );
  const myWeeklyExpensesBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) =>
          sum +
          drink.quantity * (drinksCatalog.find((drinkCatalog) => drinkCatalog.drinkKey === drink.drinkKey)?.price || 0),
        0
      ),
    [previousDrinksPerWeek]
  );
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
    <>
      <SafeAreaView edges={['top']} className="bg-[#39CEC0]"></SafeAreaView>
      <ModalPreviousDrinksValidation
        content={{
          numberDrinkEstimation: numberDrinkEstimation,
          weeklyExpenses: myWeeklyExpensesBeforeObjective,
          kcals: myWeeklyKcalBeforeObjective,
        }}
        onUpdate={() => {
          setModalValidationVisible(false);
        }}
        onValidate={() => {
          setModalValidationVisible(false);
          logEvent({
            category: 'GAINS',
            action: 'GOAL_ESTIMATION_DRINK',
            value: numberDrinkEstimation,
          });
          isOnboarded
            ? navigation.navigate('GAINS_MAIN_VIEW')
            : navigation.navigate('GAINS_MY_OBJECTIVE', { forOnboarding: true });
        }}
        visible={modalValidationVisible}
      />
      <WrapperContainer
        onPressBackButton={navigation.goBack}
        title="Mon estimation initiale"
        noPaddingHorizontal
        Icon={PreviousConsumption}>
        <Container>
          <View className="p-5 border rounded-md border-[#4030A5] bg-[#E8E8F3] mb-8">
            <Text className="mb-4">
              Estimez votre <Text className="font-bold">consommation actuelle</Text>, elle sera ensuite comparée à ce
              que vous consommerez pour calculer vos gains.{' '}
              <Text className="font-bold">Vos réponses sont anonymes</Text>, répondez avec le plus de transparence
              possible.
            </Text>
            <HelpModalCountConsumption event="PREVIOUS_CONSUMPTION" />
          </View>
          <Text className="font-bold text-center">
            Sur une <TextStyled underline>semaine type</TextStyled>, combien d'unités d'alcool consommez-vous ?
          </Text>
        </Container>
        <Spacer size={20} />
        <View className="border-2 border-[#EFEFEF]">
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
        </View>
        <Spacer size={40} />
        <CTAButtonContainer>
          <ButtonPrimary
            disabled={!previousDrinksPerWeek.find((drink) => drink.quantity !== 0)}
            content="Continuer"
            onPress={() => {
              setModalValidationVisible(true);
            }}
          />
        </CTAButtonContainer>
      </WrapperContainer>
    </>
  );
};

export const Container = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
  flex: 1;
`;

const CTAButtonContainer = styled.View`
  align-items: center;
  flex-shrink: 1;
`;

export default GainsPreviousConsumption;
