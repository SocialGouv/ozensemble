import { storage } from "../services/storage";
import { drinksState, ownDrinksCatalogState } from "./consos";
import {
  isOnboardedSelector,
  maxDrinksPerWeekSelector,
  totalDrinksByDrinkingDaySelector,
} from "./gains";
import { drinksContextsState } from "./contexts";
import { autoEvaluationQuizzResultState } from "./quizzs";
import {
  defineStrategyState,
  currentStrategyState,
  isInCravingKeyState,
} from "./craving";
import { badgesCatalogState, badgesState } from "./badges";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const recoilStateMapping = {
  drinksState,
  ownDrinksCatalogState,
  isOnboardedSelector,
  maxDrinksPerWeekSelector,
  totalDrinksByDrinkingDaySelector,
  drinksContextsState,
  autoEvaluationQuizzResultState,
  defineStrategyState,
  currentStrategyState,
  isInCravingKeyState,
  badgesCatalogState,
  badgesState,
};

export const useSetAllRecoilValues = () => {
  const setters = {};

  Object.keys(recoilStateMapping).forEach((key) => {
    const state = recoilStateMapping[key];
    setters[key] = useSetRecoilState(state);
  });

  return (jsonValues) => {
    Object.keys(jsonValues).forEach((key) => {
      if (setters[key]) {
        setters[key](jsonValues[key]);
      }
    });
  };
};

export const useGetAllRecoilValues = () => {
  const recoilValues = {};

  Object.keys(recoilStateMapping).forEach((key) => {
    const state = recoilStateMapping[key];
    recoilValues[key] = useRecoilValue(state);
  });
  return recoilValues;
};
