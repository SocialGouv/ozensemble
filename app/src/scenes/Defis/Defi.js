/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ArrowRight from '../../components/ArrowRight';
import ButtonPrimary from '../../components/ButtonPrimary';
import TextStyled from '../../components/TextStyled';
import NPS from '../NPS/NPS';
import DayModule from './DayModule';
import Timeline from './Timeline';
import TopTimeline from './TopTimeline';
import OnBoardingModal from '../../components/OnBoardingModal';
import { defi2OnBoardingDoneState } from '../../recoil/defis';
import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';
import { defaultPaddingFontScale } from '../../styles/theme';
import { modalTimestampState } from '../../recoil/consos';

const Defi = ({
  navigation,
  data,
  title,
  validatedDays,
  updateValidatedDays,
  ActiveDayIndex,
  hackAndUnlockDay,
  defiStorageKey,
  defiNumber,
}) => {
  const [NPSvisible, setNPSvisible] = useState(false);
  const onPressContribute = () => setNPSvisible(true);
  const closeNPS = () => setNPSvisible(false);
  const setModalTimestamp = useSetRecoilState(modalTimestampState);
  const [onBoardingDefi2Done, setOnBoardingDefi2Done] = useRecoilState(defi2OnBoardingDoneState);
  const nbdays = data.length;
  const activeDay = Math.min(data.length - 1, ActiveDayIndex);
  const activeDayIsDone = activeDay <= validatedDays - 1;

  const getTitleColor = (dayIndex) => {
    if (activeDay < dayIndex) return '#c4c4c4';
    if (validatedDays > dayIndex) return '#4030a5';
    if (activeDay === dayIndex) return '#de285e';
  };

  return (
    <WrapperContainer title={title} onPressBackButton={navigation.goBack} noPaddingHorizontal noMarginBottom>
      <NPS forceView={NPSvisible} close={closeNPS} />
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
        ) : (
          <FeedCTAButton
            content="Ajouter une consommation"
            onPress={() => {
              if (!activeDayIsDone) updateValidatedDays(activeDay + 1);
              setModalTimestamp(Date.now());
              navigation.push('ADD_DRINK');
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
              <FeedDayContent
                activeOpacity={0.47}
                last={dayIndex === data.length - 1}
                disabled={activeDay < dayIndex || !dayData?.screenCTA}
                onPress={() => {
                  navigation.push(dayData?.screenCTA, { inDefi1: validatedDays <= dayIndex });
                }}>
                <View style={{ flex: 1 }}>
                  <TitleDay color={getTitleColor(dayIndex)}>
                    {dayData?.title} : {dayData?.tagLine}
                  </TitleDay>
                </View>
                {activeDay === dayIndex ? (
                  <ArrowRight size={10} color="#de285e" />
                ) : (
                  <ArrowRight size={10} color="#c4c4c4" />
                )}
              </FeedDayContent>
            </DefiDay>
          );
        })}
        <ButtonContainer>
          <ButtonPrimary
            small
            content="Contribuer à Oz Ensemble"
            shadowColor="#201569"
            color="#4030A5"
            onPress={onPressContribute}
          />
        </ButtonContainer>
      </FeedContainer>
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
        visible={!onBoardingDefi2Done && defiStorageKey !== '@Defi1'}
        hide={() => {
          setOnBoardingDefi2Done(true);
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
