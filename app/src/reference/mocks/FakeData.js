import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import * as Sentry from '@sentry/react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
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
import NotificationService from '../../services/notifications';
import API from '../../services/api';
import { badgesCatalogState } from '../../recoil/badges';
import { daysWithGoalNoDrinkState, drinksByWeekState, goalsState } from '../../recoil/gains';
import { capture } from '../../services/sentry';
import { sortConsosByTimestamp } from '../../helpers/consosHelpers.js';

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
  const badgesCatalog = useRecoilValue(badgesCatalogState);
  const setDaysWithGoalNoDrink = useSetRecoilState(daysWithGoalNoDrinkState);
  const setDrinksByWeek = useSetRecoilState(drinksByWeekState);
  const setGoals = useSetRecoilState(goalsState);

  const navigation = useNavigation();
  return (
    <WrapperContainer title="Charger des fausses données">
      <Container>
        <MenuItem
          caption="Apparition du bouton pour prendre RDV"
          noAlert
          onPress={() => {
            API.get({
              path: '/user/location',
              query: {
                matomoId: storage.getString('@UserIdv2'),
              },
            }).then((response) => {
              if (response.ok) Alert.alert('Suis-je bien localisé ?', response.isWellLocated ? 'Oui' : 'Non');
            });
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
          caption="Toutes les popups de nouvelles fonctionnalités"
          onPress={() => {
            deleteStorageValues(['@NewFeaturesPopupIdsShown', 'NewFeaturesLastShownId']);
          }}
        />
        <MenuItem
          caption="Toutes mes consos"
          onPress={() => {
            setGlobalDrinksState(sortConsosByTimestamp(fakeConsoData.empty.drinks));
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem
          caption="Ma localisation"
          onPress={() => {
            storage.delete('isWellLocated');
          }}
        />
        <MenuItem caption="Tout" onPress={() => storage.clearAll()} />
        <MenuItem
          caption="Reset consos et défi 1"
          onPress={() => {
            setGlobalDrinksState(sortConsosByTimestamp(fakeConsoData.empty.drinks));
            storage.delete('nps-asked-after-more-than-3-consos');
            deleteStorageValues(fakeDefi1);
          }}
        />
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
            setGlobalDrinksState(sortConsosByTimestamp(fakeConsoData.full.drinks));
          }}
        />
        <H1Wrapper>Simuler un badge</H1Wrapper>
        {badgesCatalog
          .reduce((allBadges, category) => [...allBadges, ...category.badges], [])
          .map(({ title, category, stars }) => {
            return (
              <React.Fragment key={title + category}>
                {category === 'goals' && stars === 1 && (
                  <MenuItem
                    noAlert
                    caption="Objectif manqué"
                    onPress={() => API.get({ path: '/badge/test', query: { category: 'missed-goal' } })}
                  />
                )}
                <MenuItem
                  key={title + category}
                  noAlert
                  caption={category.includes('locked') ? `LOCKED ${title}` : title}
                  onPress={() => API.get({ path: '/badge/test', query: { category, stars } })}
                />
              </React.Fragment>
            );
          })}
        <H1Wrapper>Notifications</H1Wrapper>
        <MenuItem
          caption="Envoyer une notification NPS dans 10 secondes"
          onPress={() => {
            storage.delete('@NPSDone');
            const NPSNotificationDate = new Date(Date.now() + 10000);
            NotificationService.scheduleLocalAlarm({
              date: NPSNotificationDate,
              title: 'Vos retours sont importants pour nous',
              message: 'Avez-vous quelques secondes pour donner votre avis ?',
            });
            storage.set('@NPSNotificationDate', Math.round(NPSNotificationDate.getTime() / 1000) * 1000);
          }}
        />
        <MenuItem
          caption="Envoyer une notification not filled week dans une minute et 10 secondes"
          //async function creating a notification
          onPress={async () => {
            API.post({
              path: '/test/test-notif',
              body: {
                matomoId: storage.getString('@UserIdv2'),
                type: 'NOT_FILLED_WEEK',
                date: new Date(Date.now() + 70000),
              },
            });
          }}
        />
        <MenuItem
          caption="Envoyer une notification 10 days inactivity dans une minute et 10 secondes"
          //async function creating a notification
          onPress={async () => {
            API.post({
              path: '/test/test-notif',
              body: {
                matomoId: storage.getString('@UserIdv2'),
                type: 'INACTIVITY_10_DAYS',
                date: new Date(Date.now() + 70000),
              },
            });
          }}
        />
        <MenuItem
          noAlert
          caption="Visualiser l'écran 10 jours d'inactivité"
          onPress={() => {
            navigation.navigate('INACTIVITY_NPS_SCREEN');
          }}
        />
        <MenuItem
          noAlert
          caption="Lancer le notification plan"
          onPress={() => {
            API.post({
              path: '/test/launch-notification-plan',
              body: {
                matomoId: storage.getString('@UserIdv2'),
              },
            });
          }}
        />
        <H1Wrapper>Modale Super User</H1Wrapper>
        <MenuItem
          noAlert
          caption="Montrer la modale super User 30"
          onPress={() => {
            API.get({
              path: '/test/super-user-in-app-modal',
              query: {
                modale: 'super30',
              },
            });
          }}
        />
        <MenuItem
          noAlert
          caption="Montrer la modale super User 90"
          onPress={() => {
            API.get({
              path: '/test/super-user-in-app-modal',
              query: {
                modale: 'super90',
              },
            });
          }}
        />
        <H1Wrapper>Afficher les modales Craving</H1Wrapper>
        <MenuItem
          caption="Montrer la modale Craving in app Modale"
          noAlert
          onPress={() => {
            API.get({
              path: '/test/in-app-modal',
              query: {
                modale: 'craving',
              },
            });
          }}
        />
        <MenuItem
          caption="Réinitialiser pour la modale Craving"
          onPress={() => {
            storage.set('firstTimeOnCraving', true);
          }}
        />

        <H1Wrapper>Ma consommation d'alcool</H1Wrapper>
        <MenuItem caption="Sans risque" onPress={() => replaceStorageValues(fakeOnboardingQuizz.good)} />
        <MenuItem caption="Risquée" onPress={() => replaceStorageValues(fakeOnboardingQuizz.risk)} />
        <MenuItem caption="Addict" onPress={() => replaceStorageValues(fakeOnboardingQuizz.addicted)} />
        <H1Wrapper>Objectif</H1Wrapper>
        <MenuItem caption="Tout l'objectif" onPress={() => replaceStorageValues(fakeGain)} />
        <MenuItem
          caption="Objectif semaine dernière"
          onPress={() => {
            setDaysWithGoalNoDrink(['wednesday', 'thursday']);
            setDrinksByWeek([{ drinkKey: 'beer-half', quantity: 7, id: uuid() }]);
            const matomoId = storage.getString('@UserIdv2');
            API.post({
              path: '/goal',
              body: {
                matomoId: matomoId,
                daysWithGoalNoDrink: ['wednesday', 'thursday'],
                dosesByDrinkingDay: 7,
                dosesPerWeek: 35,
                forceDate: dayjs().startOf('week').subtract(7, 'day').format('YYYY-MM-DD'),
              },
            }).then((res) => {
              if (res.ok) {
                setGoals(res.data);
              }
            });
          }}
        />

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
          caption="2 mois avec une boisson par jour"
          onPress={() => {
            setGlobalDrinksState(sortConsosByTimestamp(fakeConsoData.long(700).drinks));
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem
          caption="14 jours de conso complets"
          onPress={() => {
            setGlobalDrinksState(sortConsosByTimestamp(fakeConsoData.full.drinks));
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem
          caption="14 jours de conso partiels"
          onPress={() => {
            setGlobalDrinksState(sortConsosByTimestamp(fakeConsoData.partial.drinks));
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem
          caption="10 jours de conso pas trop chargés"
          onPress={() => {
            setGlobalDrinksState(sortConsosByTimestamp(fakeConsoData.onlyBelow.drinks));
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem
          caption="+/-5 verres de vin par jour pendant 2 ans"
          onPress={() => {
            const startDate = dayjs().subtract(2, 'year').startOf('day');
            const drinks = [];
            for (let i = 0; i < 730; i++) {
              drinks.push({
                timestamp: startDate.add(i, 'day').valueOf(),
                drinkKey: 'wine-glass',
                quantity: Math.floor(Math.random() * 10),
                id: uuid(),
              });
            }
            setGlobalDrinksState(sortConsosByTimestamp(drinks));
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <H1Wrapper delete>Test Sentry</H1Wrapper>
        <MenuItem
          caption="Test App Sentry"
          noAlert
          onPress={() => {
            Sentry.captureMessage('test sentry directly from lib', {
              extra: {
                test: 'test',
              },
            });
            capture('test sentry from capture', {
              extra: {
                test: 'test',
              },
            });
            Alert.alert('Error sent to Sentry');
          }}
        />
        <MenuItem
          caption="Test Api Sentry"
          noAlert
          onPress={() => {
            API.post({
              path: '/sentry-check',
              body: {
                matomoId: storage.getString('@UserIdv2'),
              },
            });
            Alert.alert('Error sent to Sentry');
          }}
        />
        <MenuItem
          caption="Test Crash"
          noAlert
          onPress={() => {
            lol;
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
          caption="Toutes les popups de nouvelles fonctionnalités"
          onPress={() => {
            deleteStorageValues(['@NewFeaturesPopupIdsShown', 'NewFeaturesLastShownId']);
          }}
        />
        <MenuItem
          caption="Toutes mes consos"
          onPress={() => {
            setGlobalDrinksState(sortConsosByTimestamp(fakeConsoData.empty.drinks));
            storage.delete('nps-asked-after-more-than-3-consos');
          }}
        />
        <MenuItem
          caption="Ma localisation"
          onPress={() => {
            storage.delete('isWellLocated');
          }}
        />
        <MenuItem caption="Tout" onPress={() => storage.clearAll()} />
      </Container>
    </WrapperContainer>
  );
};

export default FakeData;

const MenuItem = ({ caption = '', onPress, noAlert = false }) => {
  const onPressRequest = () => {
    onPress();
    if (noAlert) return;
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
