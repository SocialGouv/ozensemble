import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import TextStyled from '../../components/TextStyled';
import { defaultPaddingFontScale } from '../../styles/theme';
import WrapperContainer from '../../components/WrapperContainer';
import H1 from '../../components/H1';
import { storage } from '../../services/storage';
import { fakeOnboardingQuizz } from './fakeOnboardingQuizz';
import { fakeDefi1, fakeDefi3, fakeDefi2, fakeDefi4, fakeDefi5 } from './defis.js';
import { fakeGain } from './gains';
import { drinksState } from '../../recoil/consos';
import { fakeConsoData } from './fakeConsoData';

const replaceStorageValues = (values) => {
  for (const key of Object.keys(values)) {
    storage.set(key, values[key]);
  }
};

const deleteStorageValues = (values) => {
  for (const key of Object.keys(values)) {
    storage.delete(key);
  }
};

const FakeData = () => {
  const setGlobalDrinksState = useSetRecoilState(drinksState);

  return (
    <WrapperContainer title="Charger des fausses données">
      <Container>
        <MenuItem
          caption="Tous les défis, tout l'objectif, 14 jours de conso complets"
          onPress={() => {
            replaceStorageValues(fakeDefi1);
            replaceStorageValues(fakeDefi2);
            replaceStorageValues(fakeDefi3);
            replaceStorageValues(fakeDefi4);
            replaceStorageValues(fakeDefi5);
            replaceStorageValues(fakeOnboardingQuizz.risk);
            replaceStorageValues(fakeGain);
            setGlobalDrinksState(fakeConsoData.full.drinks);
          }}
        />
        <H1Wrapper>Ma consommation d'alcool</H1Wrapper>
        <MenuItem caption="Sans risque" onPress={() => replaceStorageValues(fakeOnboardingQuizz.good)} />
        <MenuItem caption="Risquée" onPress={() => replaceStorageValues(fakeOnboardingQuizz.risk)} />
        <MenuItem caption="Addict" onPress={() => replaceStorageValues(fakeOnboardingQuizz.addicted)} />
        <H1Wrapper>Objectif</H1Wrapper>
        <MenuItem caption="Tout l'objectif" onPress={() => replaceStorageValues(fakeGain)} />
        <H1Wrapper>Défis</H1Wrapper>
        <MenuItem
          caption="Tous les défis"
          onPress={() => {
            replaceStorageValues(fakeDefi1);
            replaceStorageValues(fakeDefi2);
            replaceStorageValues(fakeDefi3);
            replaceStorageValues(fakeDefi4);
            replaceStorageValues(fakeDefi5);
          }}
        />
        <MenuItem caption="Tout le défi 1" onPress={() => replaceStorageValues(fakeDefi1)} />
        <MenuItem caption="Tout le défi 2" onPress={() => replaceStorageValues(fakeDefi2)} />
        <MenuItem caption="Tout le défi 3" onPress={() => replaceStorageValues(fakeDefi3)} />
        <MenuItem caption="Tout le défi 4" onPress={() => replaceStorageValues(fakeDefi4)} />
        <MenuItem caption="Tout le défi 5" onPress={() => replaceStorageValues(fakeDefi5)} />
        <H1Wrapper>Consommations</H1Wrapper>
        <MenuItem
          caption="14 jours de conso complets"
          onPress={() => {
            setGlobalDrinksState(fakeConsoData.full.drinks);
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem
          caption="14 jours de conso partiels"
          onPress={() => {
            setGlobalDrinksState(fakeConsoData.partial.drinks);
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem
          caption="10 jours de conso pas trop chargés"
          onPress={() => {
            setGlobalDrinksState(fakeConsoData.onlyBelow.drinks);
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <H1Wrapper delete>Effacer des données</H1Wrapper>
        <MenuItem caption="Mon NPS" onPress={() => storage.delete('@NPSDone')} />
        <MenuItem caption="Ma consommation d'alcool" onPress={() => deleteStorageValues(fakeOnboardingQuizz.good)} />
        <MenuItem
          caption="Tous les défis"
          onPress={() => {
            deleteStorageValues(fakeDefi1);
            deleteStorageValues(fakeDefi2);
            deleteStorageValues(fakeDefi3);
            deleteStorageValues(fakeDefi4);
            deleteStorageValues(fakeDefi5);
          }}
        />
        <MenuItem caption="Tout le défi 1" onPress={() => deleteStorageValues(fakeDefi1)} />
        <MenuItem caption="Tout le défi 2" onPress={() => deleteStorageValues(fakeDefi2)} />
        <MenuItem caption="Tout le défi 3" onPress={() => deleteStorageValues(fakeDefi3)} />
        <MenuItem caption="Tout le défi 4" onPress={() => deleteStorageValues(fakeDefi4)} />
        <MenuItem caption="Tout le défi 5" onPress={() => deleteStorageValues(fakeDefi5)} />
        <MenuItem
          caption="Toutes mes consos"
          onPress={() => {
            setGlobalDrinksState(fakeConsoData.empty.drinks);
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem caption="Tout" onPress={() => storage.clearAll()} />
      </Container>
    </WrapperContainer>
  );
};

export default FakeData;

const MenuItem = ({ caption = '', onPress }) => {
  const onPressRequest = () => {
    onPress();
    Alert.alert(
      `Vous avez remplacé les données pour ${caption.toLowerCase()}`,
      "Veuillez quitter l'app et la redémarrer pour voir les changements"
    );
  };
  return (
    <TouchableOpacity onPress={onPressRequest}>
      <MenuItemStyled>
        <MenuTextStyled>{caption}</MenuTextStyled>
        <Arrow>{'>'}</Arrow>
      </MenuItemStyled>
    </TouchableOpacity>
  );
};

const Container = styled.View`
  margin-horizontal: -${defaultPaddingFontScale}px;
`;

const H1Wrapper = styled(H1)`
  margin: ${defaultPaddingFontScale}px;
  ${(props) => props.delete && 'color: #de285e;'}
`;

const MenuItemStyled = styled.View`
  height: 70px;
  border-bottom-width: 1px;
  border-bottom-color: #4030a522;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const MenuTextStyled = styled.Text`
  margin-right: 10px;
`;

const Arrow = styled(TextStyled)`
  color: #4030a5;
  font-weight: bold;
`;

const initStorageKeys = [
  '@NewFeaturesPopupIdsShown',
  '@OnboardingDoneWithCGU',
  '@UserIdv2',
  'hasMigratedGenderAndAge',
  'hasMigratedFromReduxToRecoil',
  'hasMigratedRemindersToPushToken',
  'hasMigratedFromAsyncStorage',
  '@NewFeaturesLastShownId',
  '@NumberOfVisits',
  'hasMigratedReminders',
  'hasMigratedDefi1',
];

const onboardingQuizzKeys = ['@Quizz_result', '@Quizz_answers', '@Gender', '@Quizz_surprised'];

const defi1Keys = [
  '@QuizzMotivations_result',
  '@QuizzLifeQuality_answers',
  '@QuizzEvaluateConso_answers',
  '@QuizzLifeQuality_result',
  '@Defi1_LastUpdate',
  '@Defi1_ValidatedDays',
  '@DefisReminder-setup',
  '@DefisReminder',
  '@QuizzMotivations_answers',
  '@Age',
  '@Defi1_StartedAt',
  '@QuizzEvaluateConso_result',
];
const defi2Keys = [
  '@Defi2_EmotionState',
  '@Defi2_ValidatedDays',
  '@Defi2_OnBoardingDoneState',
  '@Defi2_LastUpdate',
  '@QuizzRiskSituations_answers',
  '@QuizzRiskSituations_result',
];

const defi3Keys = [
  '@QuizzDefi3Day5_answers',
  '@Defi3_Day3_answers_Help',
  '@Defi3_Day3_result',
  '@Defi3_Day3_answers_Difficulties',
  '@Defi3_LastUpdate',
  '@QuizzDefi3Day1_answers',
  '@Defi3_ValidatedDays',
  '@Defi3_OnBoardingDoneState',
];

const defi4Keys = [
  '@Defi4_Day5_Result',
  '@Defi4_Day5_Answers',
  '@GainsReminder-setup',
  '@GainsReminder',
  '@StoredDetailedDrinksByDrinkingDay',
  '@Defi4_ValidatedDays',
  '@Defi4_LastUpdate',
  '@DaysWithGoalNoDrink',
  '@Defi4_OnBoardingDoneState',
  '@GainPreviousDrinksPerWeek',
];

const gainKeys = [
  '@GainsReminder-setup',
  '@GainsReminder',
  '@StoredDetailedDrinksByDrinkingDay',
  '@DaysWithGoalNoDrink',
  '@GainPreviousDrinksPerWeek',
];

const defi5Keys = [
  '@Defi5_Day5_Result',
  '@Defi5_Day5_Answers',
  '@Defi5_Day2_Answers',
  '@Defi5_ValidatedDays',
  '@Defi5_LastUpdate',
  '@QuizzDefi5Day3partie1_answers',
  '@QuizzReevaluateConso_answers',
  '@Defi5_Day4_Result',
  '@Defi5_Day2_Result',
  '@QuizzReevaluateConso_result',
  '@Defi5_Day4_Answers',
  '@QuizzDefi5Day3partie2_answers',
  '@QuizzDefi5Day3partie2_result',
];

const allKeys = [
  ...initStorageKeys,
  ...onboardingQuizzKeys,
  ...defi1Keys,
  ...defi2Keys,
  ...defi3Keys,
  ...defi4Keys,
  ...defi5Keys,
  ...gainKeys,
];
