/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import ArrowRight from '../../components/ArrowRight';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextStyled from '../../components/TextStyled';
import DayModule from './DayModule';
import Timeline from './Timeline';
import TopTimeline from './TopTimeline';
import OnBoardingModal from '../../components/OnBoardingModal';
import {
  defi2OnBoardingDoneState,
  defi3OnBoardingDoneState,
  defi4OnBoardingDoneState,
  defi5OnBoardingDoneState,
} from '../../recoil/defis';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import { defaultPaddingFontScale } from '../../styles/theme';

const Defi = ({
  navigation,
  data,
  title,
  validatedDays,
  activeDayIndex,
  hackAndUnlockDay,
  defiStorageKey,
  defiNumber,
}) => {
  const [onBoardingDefi2Done, setOnBoardingDefi2Done] = useRecoilState(defi2OnBoardingDoneState);
  const [onBoardingDefi3Done, setOnBoardingDefi3Done] = useRecoilState(defi3OnBoardingDoneState);
  const [onBoardingDefi4Done, setOnBoardingDefi4Done] = useRecoilState(defi4OnBoardingDoneState);
  const [onBoardingDefi5Done, setOnBoardingDefi5Done] = useRecoilState(defi5OnBoardingDoneState);
  const nbdays = data.length;
  const activeDay = Math.min(data.length - 1, activeDayIndex);
  const activeDayIsDone = activeDay <= validatedDays - 1;
  const [showNotAvailableModal, setShowNotAvailableModal] = useState(false);
  return (
    <WrapperContainer title={title} onPressBackButton={navigation.goBack} noPaddingHorizontal noMarginBottom>
      <TopTimeline
        nbdays={nbdays}
        validatedDays={validatedDays}
        activeDay={activeDay}
        hackAndUnlockDay={hackAndUnlockDay}
        defiStorageKey={defiStorageKey}
      />
      <FeedCTAContainer zIndex={10}>
        {!activeDayIsDone && !!data[activeDay]?.screenCTA ? (
          <FeedCTAButton
            content={data[activeDay]?.textCTA}
            color="#4030a5"
            onPress={() => {
              navigation.push(data[activeDay]?.screenCTA);
            }}
          />
        ) : !!activeDayIsDone && activeDay >= 6 ? (
          <FeedCTAButton
            content={`Donner mon avis sur l'activité ${defiNumber}`}
            color="#4030a5"
            onPress={() => navigation.navigate('NPS_SCREEN', { forDefi: defiNumber, triggeredFrom: 'Top CTA défi' })}
          />
        ) : (
          <FeedCTAButton
            content="Ajouter une consommation"
            onPress={() => {
              navigation.push('ADD_DRINK', { timestamp: Date.now() });
              logEvent({
                category: 'CONSO',
                action: 'CONSO_OPEN_CONSO_ADDSCREEN',
                name: `FROM_DEFI_${defiNumber}`,
              });
            }}
          />
        )}
      </FeedCTAContainer>
      <FeedContainer>
        <DayModule dayData={data[activeDay]} activeDayIsDone={activeDayIsDone} />
        <Separator />
        {data.map((dayData, dayIndex) => {
          return (
            <DefiDay key={dayIndex}>
              <Timeline
                first={dayIndex === 0}
                last={dayIndex === data.length - 1}
                done={validatedDays > dayIndex}
                locked={activeDay < dayIndex}
                active={activeDay === dayIndex}
              />
              {activeDay < dayIndex ? (
                <FeedDayContent
                  activeOpacity={0.47}
                  last={dayIndex === data.length - 1}
                  onPress={() => {
                    setShowNotAvailableModal(true);
                  }}>
                  <View style={{ flex: 1 }}>
                    <TitleDay color={'#c4c4c4'}>
                      {dayData?.title} : {dayData?.tagLine}
                    </TitleDay>
                  </View>
                  <ArrowRight size={10} color="#c4c4c4" />
                </FeedDayContent>
              ) : (
                <FeedDayContent
                  activeOpacity={0.47}
                  last={dayIndex === data.length - 1}
                  onPress={() => {
                    navigation.push(dayData?.screenCTA);
                  }}>
                  <View style={{ flex: 1 }}>
                    <TitleDay color={'#4030a5'}>
                      {dayData?.title} : {dayData?.tagLine}
                    </TitleDay>
                  </View>
                  {activeDay === dayIndex ? (
                    <ArrowRight size={10} color={'#de285e'} />
                  ) : (
                    <ArrowRight size={10} color="#c4c4c4" />
                  )}
                </FeedDayContent>
              )}
            </DefiDay>
          );
        })}
        <ButtonContainer>
          <ButtonPrimary
            small
            content="Contribuer à Oz Ensemble"
            shadowColor="#201569"
            color="#4030A5"
            onPress={() =>
              navigation.navigate('NPS_SCREEN', { forDefi: defiNumber, triggeredFrom: 'Bottom button défi' })
            }
          />
        </ButtonContainer>
      </FeedContainer>
      <OnBoardingModal
        title="Jour disponible demain "
        description="L’activité dure 7 jours, revenez demain pour pouvoir faire le jour suivant :)"
        visible={showNotAvailableModal}
        hide={() => {
          setShowNotAvailableModal(false);
        }}
      />
      <OnBoardingModal
        title="Poursuivez votre parcours"
        description={
          <TextStyled>
            Cette semaine, nous vous proposons de <TextStyled bold>pousser plus loin la réflexion</TextStyled> sur les
            <TextStyled bold> situations qui vous portent à boire</TextStyled>.{'\n'}À la fin, vous aurez l'occasion de
            faire quelques exercices.
          </TextStyled>
        }
        boutonTitle="Je commence"
        onPress={() => {
          setOnBoardingDefi2Done(true);
        }}
        visible={!onBoardingDefi2Done && defiStorageKey === '@Defi2'}
        hide={() => {
          setOnBoardingDefi2Done(true);
        }}
      />
      <OnBoardingModal
        title="Au menu cette semaine : la place de l’alcool dans la société & ma vie "
        description="Tout d’abord, félicitez-vous car vous avez déjà réussi 2 activités. Aujourd’hui, nous allons nous questionner sur le rôle de l’alcool dans la société et dans votre vie."
        boutonTitle="Je commence"
        onPress={() => {
          setOnBoardingDefi3Done(true);
        }}
        visible={!onBoardingDefi3Done && defiStorageKey === '@Defi3'}
        hide={() => {
          setOnBoardingDefi3Done(true);
        }}
      />
      <OnBoardingModal
        title="Au menu cette semaine : je me fixe un objectif de consommation"
        description="Cette semaine, nous vous invitons à vous tourner vers l’avenir et imaginer l'objectif de consommation que vous désirez atteindre sur les semaines à venir."
        boutonTitle="Je commence"
        onPress={() => {
          setOnBoardingDefi4Done(true);
        }}
        visible={!onBoardingDefi4Done && defiStorageKey === '@Defi4'}
        hide={() => {
          setOnBoardingDefi4Done(true);
        }}
      />
      <OnBoardingModal
        title="Au menu cette semaine : où en suis-je après 4 semaines ?"
        description="Cette semaine, nous vous proposons de faire un bilan général. Vous aurez l’occasion de faire le point sur l’évolution de votre consommation, de votre vie quotidienne et de votre qualité de vie."
        boutonTitle="Je commence"
        onPress={() => {
          setOnBoardingDefi5Done(true);
        }}
        visible={!onBoardingDefi5Done && defiStorageKey === '@Defi5'}
        hide={() => {
          setOnBoardingDefi5Done(true);
        }}
      />
    </WrapperContainer>
  );
};

const TitleDay = styled(TextStyled)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ color }) => color || '#c4c4c4'};
`;

const Separator = styled.View`
  background-color: #c4c4c4;
  height: 1px;
  margin: 15px;
  align-self: center;
  width: 30%;
`;

const FeedContainer = styled.View`
  background-color: #efefef;
  padding-top: 30px;
  padding-horizontal: ${defaultPaddingFontScale()}px;
  padding-bottom: 150px;
`;

/*
  Top part
*/

const DefiDay = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 1;
  flex-grow: 0;
`;

const FeedDayContent = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  padding-vertical: 10px;
  margin-left: ${defaultPaddingFontScale()}px;
  ${(props) => props.last && 'margin-top: -10px;'}
`;

const FeedCTAContainer = styled.View`
  margin-top: -45px;
  margin-bottom: -20px;
  align-items: center;
`;

const FeedCTAButton = styled(ButtonPrimary)`
  flex-grow: 0;
`;

const ButtonContainer = styled.View`
  margin-top: 28px;
  align-items: center;
  justify-content: center;
`;

export default Defi;
