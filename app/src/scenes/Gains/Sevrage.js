import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import ButtonPrimary from '../../components/ButtonPrimary';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import TextStyled from '../../components/TextStyled';
import {
  daysWithGoalNoDrinkState,
  drinksByDrinkingDayState,
  maxDrinksPerWeekSelector,
  totalDrinksByDrinkingDaySelector,
} from '../../recoil/gains';
import { storage } from '../../services/storage';
import API from '../../services/api';

const Sevrage = ({ navigation, route }) => {
  const daysWithGoalNoDrink = useRecoilValue(daysWithGoalNoDrinkState);
  const drinksByDrinkingDay = useRecoilValue(drinksByDrinkingDayState);
  const dosesByDrinkingDay = useRecoilValue(totalDrinksByDrinkingDaySelector);
  const dosesPerWeek = useRecoilValue(maxDrinksPerWeekSelector);

  return (
    <WrapperContainer title={'Les signes de sevrages'} onPressBackButton={navigation.goBack}>
      <DescriptionSymptome>
        Le sevrage à l'alcool peut entraîner des complications graves et possiblement mortelles.
      </DescriptionSymptome>
      <DescriptionPink>
        Si vous présentez l'un ou plusieurs des symptômes suivants, consultez sans délai un professionnel de santé.
      </DescriptionPink>
      <Symptome>Tremblements</Symptome>
      <DescriptionSymptome>
        Il s'agit de tremblements involontaires et incontrôlables en particulier des mains, mais aussi parfois de la
        tête et de la langue. Il peut aller de légers tremblements à une trémulation forte.
      </DescriptionSymptome>
      <Symptome>Sueurs</Symptome>
      <DescriptionSymptome>
        Elles apparaissent généralement sous 24h à 48h et se manifestent quelques heures après les dernières
        consommations.
      </DescriptionSymptome>
      <Symptome>Pouls accéléré</Symptome>
      <DescriptionSymptome>
        Normalement la fréquence cardiaque de l'adulte se situe en dessous de 80 battements/minutes au repos.
      </DescriptionSymptome>
      <Symptome>Hyperventillation</Symptome>
      <DescriptionSymptome>
        Votre respiration s'accèlere nettement, même au repos, au delà de 17 cycles/minutes.
      </DescriptionSymptome>
      <Symptome>Forte agitation</Symptome>
      <DescriptionSymptome>
        L'agitation est la manifestation physique et motrice, d'un état d'excitation interne. C'est donc bien une
        tension interne qui se manifeste par le corps.
      </DescriptionSymptome>
      <CTAButtonContainer>
        <ButtonPrimary
          content="J'ai compris et je commence "
          onPress={() => {
            const matomoId = storage.getString('@UserIdv2');
            console.log('MIAM');
            API.post({
              path: '/goal',
              body: {
                matomoId: matomoId,
                daysWithGoalNoDrink,
                drinksByDrinkingDay,
                dosesByDrinkingDay,
                dosesPerWeek,
              },
            });
            logEvent({
              category: 'GAINS',
              action: 'GOAL_FINISH',
            });
            navigation.navigate(route?.params?.rootRoute);
          }}
        />
      </CTAButtonContainer>
    </WrapperContainer>
  );
};

const CTAButtonContainer = styled.View`
  align-items: center;
  background-color: #f9f9f9;
  margin-top: 30px;
  flex-shrink: 1;
`;

const Symptome = styled(TextStyled)`
  font-size: 16px;
  font-weight: 700;
  color: #4030a5;
  margin-top: 30px;
`;

const DescriptionSymptome = styled(TextStyled)`
  font-size: 16px;
  color: #191919;
  margin-top: 10px;
`;

const DescriptionPink = styled(TextStyled)`
  font-size: 16px;
  color: #de285e;
  margin-top: 10px;
`;

export default Sevrage;
