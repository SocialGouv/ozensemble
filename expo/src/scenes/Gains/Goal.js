import React, { useRef, useMemo, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Text, View, TouchableOpacity, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonPrimary from "../../components/ButtonPrimary";
import CalendarIllus from "../../components/illustrations/CalendarIllus";
import CocktailGlassTriangle from "../../components/illustrations/drinksAndFood/CocktailGlassTriangle";
import TextStyled from "../../components/TextStyled";
import { defaultPaddingFontScale, hitSlop, screenHeight } from "../../styles/theme";
import {
  daysWithGoalNoDrinkState,
  drinksByWeekState,
  maxDrinksPerWeekSelector,
  previousDrinksPerWeekState,
  isOnboardedSelector,
  totalDrinksByDrinkingDaySelector,
  goalsState,
} from "../../recoil/gains";
import HelpModalCountConsumption from "./HelpModalCountConsumption";
import {
  drinksCatalogObject,
  drinksCategories,
  mapDrinkToDose,
} from "../ConsoFollowUp/drinksCatalog";
import DrinksCategory from "../../components/DrinksCategory";
import { logEvent } from "../../services/logEventsWithMatomo";
import WrapperContainer from "../../components/WrapperContainer";
import GoalSetup from "../../components/illustrations/icons/GoalSetup";
import ModalGoalValidation from "../../components/ModalGoalValidation";
import ModalWrongValue from "../../components/ModalWrongValue";
import API from "../../services/api";
import { storage } from "../../services/storage";

const Goal = ({ navigation }) => {
  const [daysWithGoalNoDrink, setDaysWithGoalNoDrink] = useRecoilState(daysWithGoalNoDrinkState);
  const previousDaysWithGoalNoDrink = useRef(daysWithGoalNoDrink);
  const dosesByDrinkingDay = useRecoilValue(totalDrinksByDrinkingDaySelector);
  const setGoals = useSetRecoilState(goalsState);

  const toggleDayWithGoalNoDrink = (day) => {
    const newState = daysWithGoalNoDrink.includes(day)
      ? daysWithGoalNoDrink.filter((d) => d !== day)
      : [...daysWithGoalNoDrink, day];

    setDaysWithGoalNoDrink(newState);
  };
  const previousDrinksPerWeek = useRecoilValue(previousDrinksPerWeekState);

  const numberDrinkEstimation = useMemo(() => {
    return previousDrinksPerWeek.reduce((sum, drink) => {
      return Math.round(sum + mapDrinkToDose(drink, drinksCatalogObject));
    }, 0);
  }, [previousDrinksPerWeek]);

  const [drinksByWeek, setDrinksByWeek] = useRecoilState(drinksByWeekState);
  const previousDrinksByWeek = useRef(drinksByWeek);

  const dosesPerWeek = useRecoilValue(maxDrinksPerWeekSelector);

  const [modalValidationVisible, setModalValidationVisible] = useState(false);
  const [modalWrongValueVisible, setModalWrongValueVisible] = useState(false);

  const isOnboarded = useRecoilValue(isOnboardedSelector);
  const setDrinkQuantityRequest = (drinkKey, quantity) => {
    const oldDrink = drinksByWeek.find((drink) => drink.drinkKey === drinkKey);
    if (oldDrink) {
      setDrinksByWeek([
        ...drinksByWeek.filter((drink) => drink.drinkKey !== drinkKey),
        {
          ...drinksByWeek.find((drink) => drink.drinkKey === drinkKey),
          quantity,
        },
      ]);
    } else {
      setDrinksByWeek([
        ...drinksByWeek,
        {
          drinkKey,
          quantity,
          id: uuidv4(),
        },
      ]);
    }
  };

  const hasUnsavedChanges =
    JSON.stringify(previousDaysWithGoalNoDrink.current) !== JSON.stringify(daysWithGoalNoDrink) ||
    JSON.stringify(previousDrinksByWeek.current) !== JSON.stringify(drinksByWeek);
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        setModalValidationVisible(true);
      }),
    [navigation, hasUnsavedChanges]
  );

  return (
    <>
      <SafeAreaView edges={["top"]} className="bg-[#39CEC0]" />
      <ModalGoalValidation
        content={{
          drinksGoal: dosesPerWeek,
          daysGoal: 7 - daysWithGoalNoDrink.length,
        }}
        onUpdate={() => {
          setModalValidationVisible(false);
        }}
        onValidate={() => {
          setModalValidationVisible(false);
          logEvent({
            category: "GAINS",
            action: "GOAL_DRINKLESS",
            name: daysWithGoalNoDrink,
            value: daysWithGoalNoDrink.length,
          });
          logEvent({
            category: "GAINS",
            action: "GOAL_DRINKWEEK",
            value: dosesPerWeek,
          });
          const matomoId = storage.getString("@UserIdv2");
          API.post({
            path: "/goal",
            body: {
              matomoId: matomoId,
              daysWithGoalNoDrink,
              dosesByDrinkingDay,
              dosesPerWeek,
            },
          }).then((res) => {
            if (res.ok) {
              setGoals(res.data);
            }
          });
          if (isOnboarded) {
            navigation.navigate("GAINS_SEVRAGE");
            return;
          }
          logEvent({
            category: "REMINDER",
            action: "REMINDER_OPEN",
            name: "GOAL",
          });
          navigation.navigate("GAINS_REMINDER", {
            enableContinueButton: true,
            onPressContinueNavigation: ["GAINS_SEVRAGE"],
          });
        }}
        visible={modalValidationVisible}
      />
      <ModalWrongValue
        visible={modalWrongValueVisible}
        onUpdateGoal={() => {
          setModalWrongValueVisible(false);
        }}
        onUpdatePreviousConso={() => {
          setModalWrongValueVisible(false);
          navigation.navigate("GAINS_ESTIMATE_PREVIOUS_CONSUMPTION");
        }}
      />
      <WrapperContainer
        noPaddingHorizontal
        onPressBackButton={navigation.goBack}
        title="Mon objectif semaine"
        Icon={GoalSetup}>
        <Container>
          <View className="p-5 border rounded-md border-[#4030A5] bg-[#E8E8F3] mb-8">
            <Text className="mb-4">
              Maintenant fixez-vous un <Text className="font-bold">objectif réaliste</Text> en{" "}
              <Text className="font-bold">nombre de jours sans boire</Text> et en{" "}
              <Text className="font-bold">unités autorisées par semaine</Text> afin de réduire votre
              consommation et de diminuer les risques associés à l'usage répété de l'alcool.
            </Text>
            <HelpModalCountConsumption event="PREVIOUS_CONSUMPTION" />
          </View>
          <View className="items-center">
            <TouchableOpacity
              className="justify-center  items-center rounded-3xl bg-[#4030A5] mb-8"
              onPress={() => {
                setDrinksByWeek([]);
                setDaysWithGoalNoDrink([
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                  "sunday",
                ]);
                logEvent({
                  category: "GAINS",
                  action: "GOAL_DRINKWEEK_ABSTINENCE",
                });
                setModalValidationVisible(true);
              }}>
              <Text className="color-white text-center font-extrabold mx-4 my-3">
                Je vise l'abstinence soit 0 consommation
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row w-full mb-8">
            <View className="bg-black h-0.5 flex-1 rounded-full mt-2 mr-4" />
            <Text className="font-extrabold text-center mr-4">OU</Text>
            <View className="bg-black h-0.5 flex-1 rounded-full mt-2 mr-2" />
          </View>
          <Row>
            <CalendarIllus size={24} />
            <Text className={"font-bold ml-3"}>
              Jours où je m'engage à ne <Text className="underline">pas</Text> boire d'alcool
            </Text>
          </Row>
          <DayContainer>
            <DayButton
              content="L"
              active={daysWithGoalNoDrink.includes("monday")}
              onPress={() => {
                toggleDayWithGoalNoDrink("monday");
              }}
            />
            <DayButton
              content="M"
              active={daysWithGoalNoDrink.includes("tuesday")}
              onPress={() => toggleDayWithGoalNoDrink("tuesday")}
            />
            <DayButton
              content="M"
              active={daysWithGoalNoDrink.includes("wednesday")}
              onPress={() => toggleDayWithGoalNoDrink("wednesday")}
            />
            <DayButton
              content="J"
              active={daysWithGoalNoDrink.includes("thursday")}
              onPress={() => toggleDayWithGoalNoDrink("thursday")}
            />
            <DayButton
              content="V"
              active={daysWithGoalNoDrink.includes("friday")}
              onPress={() => toggleDayWithGoalNoDrink("friday")}
            />
            <DayButton
              content="S"
              active={daysWithGoalNoDrink.includes("saturday")}
              onPress={() => toggleDayWithGoalNoDrink("saturday")}
            />
            <DayButton
              content="D"
              active={daysWithGoalNoDrink.includes("sunday")}
              onPress={() => toggleDayWithGoalNoDrink("sunday")}
            />
          </DayContainer>
          <Row>
            <CocktailGlassTriangle size={24} />
            <Text className="font-bold ml-3">
              Unités <Text className="underline">par semaine</Text> que je m'autorise à boire{" "}
            </Text>
          </Row>
          <View className="bg-[#F5F6FA] p-2 mb-2">
            <Text className="text-center text-[#939EA6] text-xs">
              Rappel de ma consommation initiale par semaine
            </Text>
            <View className="flex flex-row justify-center items-center mt-2">
              <Text className="text-center font-bold text-xl">{numberDrinkEstimation}</Text>
              <Text className="text-lg font-bold">
                {" "}
                {Number(numberDrinkEstimation) > 1 ? "unités" : "unité"}
              </Text>
            </View>
          </View>
        </Container>
        {drinksCategories.map((category, index) => (
          <DrinksCategory
            key={index}
            category={category}
            index={index}
            drinks={drinksByWeek}
            setDrinkQuantity={setDrinkQuantityRequest}
          />
        ))}
        <Container>
          <View className=" p-2 mt-4">
            <Text>
              Pensez bien à ajouter vos consommations{" "}
              <Text className="font-bold">tous les jours</Text> même quand vous n'avez pas bu, pour
              que l'application puisse vous informer si vous avez réussi ou non votre objectif de la
              semaine !{" "}
            </Text>
          </View>
          <CTAButtonContainer>
            <ButtonPrimary
              content="Valider mon objectif"
              onPress={() => {
                if (dosesPerWeek >= numberDrinkEstimation) {
                  setModalWrongValueVisible(true);
                } else {
                  if (dosesPerWeek === 0) {
                    setDaysWithGoalNoDrink([
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                      "sunday",
                    ]);
                  }
                  setModalValidationVisible(true);
                }
              }}
              disabled={dosesPerWeek >= 1 && daysWithGoalNoDrink.length === 7}
            />
          </CTAButtonContainer>
        </Container>
      </WrapperContainer>
    </>
  );
};

const Container = styled.View`
  overflow: hidden;
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;
const Row = styled.View`
  flex-direction: row;
  margin-bottom: ${screenHeight * 0.02}px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  ${(props) => props.margins && "margin-top: 10px;"}
  ${(props) => props.margins && "margin-bottom: 15px;"}
`;

const CTAButtonContainer = styled.View`
  margin-top: 30px;
  align-items: center;
  background-color: #f9f9f9;
  flex-shrink: 1;
`;

const DayContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${screenHeight * 0.06}px;
`;

const qButtonSize = 36;
const buttonHitSlop = hitSlop(qButtonSize);
const DayButton = ({ content, onPress, active }) => {
  return (
    <TouchableOpacity hitSlop={buttonHitSlop} className="p-px" onPress={onPress}>
      <View
        className={[
          "h-9 w-9 rounded-full border border-[#4030A5] justify-center items-center",
          active ? "bg-[#4030A5]" : "bg-[#eeeeee]",
        ].join(" ")}>
        <TextStyled
          className="text-base font-bold justify-center items-center"
          color={active ? "#eeeeee" : "#000000"}>
          {content}
        </TextStyled>
      </View>
    </TouchableOpacity>
  );
};

// const QButtonContent = styled(TextStyled)`
//   font-size: 16px;
//   font-weight: bold;
//   line-height: 25px;
//   justify-content: center;
//   align-items: center;
//   text-align-vertical: center;
// `;

export default Goal;
