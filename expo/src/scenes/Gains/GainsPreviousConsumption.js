import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonPrimary from "../../components/ButtonPrimary";
import TextStyled from "../../components/TextStyled";
import { isOnboardedSelector, previousDrinksPerWeekState } from "../../recoil/gains";
import DrinksCategory from "../../components/DrinksCategory";
import {
  drinksCatalogObject,
  drinksCategories,
  mapDrinkToDose,
} from "../ConsoFollowUp/drinksCatalog";
import { logEvent } from "../../services/logEventsWithMatomo";
import { Spacer } from "../../components/Articles";
import { defaultPaddingFontScale } from "../../styles/theme";
import HelpModalCountConsumption from "./HelpModalCountConsumption";
import WrapperContainer from "../../components/WrapperContainer";
import PreviousConsumption from "../../components/illustrations/icons/PreviousConsumption";
import ModalPreviousDrinksValidation from "../../components/ModalPreviousDrinksValidation";

const GainsPreviousConsumption = () => {
  const navigation = useNavigation();
  const isOnboarded = useRecoilValue(isOnboardedSelector);

  const [previousDrinksPerWeek, setEstimationDrinksPerWeek] = useRecoilState(
    previousDrinksPerWeekState
  );

  const [modalValidationVisible, setModalValidationVisible] = useState(false);

  const numberDrinkEstimation = useMemo(() => {
    return previousDrinksPerWeek.reduce((sum, drink) => {
      return Math.round(sum + mapDrinkToDose(drink, drinksCatalogObject));
    }, 0);
  }, [previousDrinksPerWeek]);

  const myWeeklyKcalBeforeObjective = useMemo(() => {
    return previousDrinksPerWeek.reduce(
      (sum, drink) => sum + drink.quantity * (drinksCatalogObject[drink.drinkKey]?.kcal || 0),
      0
    );
  }, [previousDrinksPerWeek]);

  const myWeeklyExpensesBeforeObjective = useMemo(
    () =>
      previousDrinksPerWeek.reduce(
        (sum, drink) => sum + drink.quantity * (drinksCatalogObject[drink.drinkKey]?.price || 0),
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
      <SafeAreaView edges={["top"]} className="bg-[#39CEC0]" />

      <WrapperContainer
        onPressBackButton={navigation.goBack}
        title="Mon estimation initiale"
        noPaddingHorizontal
        Icon={PreviousConsumption}>
        <Container>
          <View className="p-5 border rounded-md border-[#4030A5] bg-[#E8E8F3] mb-8">
            <Text className="mb-4">
              Estimez votre <Text className="font-bold">consommation actuelle</Text>, elle sera
              ensuite comparée à ce que vous consommerez pour calculer vos gains.{" "}
              <Text className="font-bold">Vos réponses sont anonymes</Text>, répondez avec le plus
              de transparence possible.
            </Text>
            <HelpModalCountConsumption event="PREVIOUS_CONSUMPTION" />
          </View>
          <View className="items-center">
            <TouchableOpacity
              className="justify-center  items-center rounded-3xl bg-[#4030A5] mb-8"
              onPress={() => {
                logEvent({
                  category: "GAINS",
                  action: "GOALS_ESTIMATION_ABSTINENCE",
                });
                setEstimationDrinksPerWeek([]);
                setModalValidationVisible(true);
              }}>
              <Text className="color-white font-extrabold mx-4 my-3">Je suis déjà abstinent</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row w-full mb-8">
            <View className="bg-black h-0.5 flex-1 rounded-full mt-2 mr-4" />
            <Text className="font-extrabold text-center mr-4">OU</Text>
            <View className="bg-black h-0.5 flex-1 rounded-full mt-2 mr-2" />
          </View>
          <Text className="font-extrabold text-center">
            Sur une <TextStyled underline>semaine type</TextStyled>, combien d'unités d'alcool
            consommez-vous ?
          </Text>
        </Container>
        <Spacer size={20} />
        <View className="border-2 border-[#EFEFEF]">
          {drinksCategories.map((category, index) => (
            <DrinksCategory
              key={category}
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
            category: "GAINS",
            action: "GOAL_ESTIMATION_DRINK",
            value: numberDrinkEstimation,
          });
          if (isOnboarded) {
            navigation.goBack();
          } else {
            navigation.navigate("GAINS_MY_OBJECTIVE", { forOnboarding: true });
          }
        }}
        visible={modalValidationVisible}
      />
    </>
  );
};

const Container = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
  flex: 1;
`;

const CTAButtonContainer = styled.View`
  align-items: center;
  flex-shrink: 1;
`;

export default GainsPreviousConsumption;
