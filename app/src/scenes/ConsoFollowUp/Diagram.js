import React, { useMemo, useState } from 'react';
import { selectorFamily, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { screenHeight } from '../../styles/theme';
import { dailyDosesSelector } from '../../recoil/consos';
import { maxDrinksPerWeekSelector, totalDrinksByDrinkingDaySelector } from '../../recoil/gains';
import TextStyled from '../../components/TextStyled';
import { isToday } from '../../services/dates';
import ButtonPrimary from '../../components/ButtonPrimary';
import { logEvent } from '../../services/logEventsWithMatomo';
import Equality from '../../components/illustrations/Equality';
import H3 from '../../components/H3';
import PeriodSelector from '../../components/PeriodSelector';
import PeriodSwitchToggle from '../../components/PeriodSwitchToggle';
import DiagramHelpModal from './DiagramHelpModal';

const maxDosesOnScreen = 999;

const computeBarsHeight = (highestDosesInPeriod, highestAcceptableDosesPerDay) => {
  const barHighestHeightPossible = screenHeight * 0.2;

  return {
    barMaxHeight: barHighestHeightPossible,
    barMaxAcceptableDoseHeight:
      (highestAcceptableDosesPerDay / (highestDosesInPeriod < 2 ? 2 : highestDosesInPeriod)) * barHighestHeightPossible,
  };
};

const highestDosesInPeriodSelector = selectorFamily({
  key: 'highestDosesInPeriodSelector',
  get:
    ({ period } = {}) =>
    ({ get }) => {
      const now = Date.now();
      const dailyDoses = get(dailyDosesSelector);
      console.log('highestDosesInPeriodSelector 1', Date.now() - now);
      let bars_doses = {};
      if (period === 'day') {
        const highestDose = Math.min(maxDosesOnScreen, Math.max(...Object.values(dailyDoses)));
        console.log('highestDosesInPeriodSelector 2', Date.now() - now);
        return highestDose;
      } else if (period === 'week') {
        console.log('highestDosesInPeriodSelector 3', Date.now() - now);
        let week_number = 0;
        let end_of_this_week = dayjs().endOf('week');
        for (const [date, doses] of Object.entries(dailyDoses)) {
          // console.log('highestDosesInPeriodSelector 4', Date.now() - now);
          week_number = Math.abs(Math.trunc(end_of_this_week.diff(dayjs(date), 'days') / 7));
          // console.log('highestDosesInPeriodSelector 5', Date.now() - now);
          if (bars_doses[week_number]) {
            bars_doses[week_number] += doses;
          } else {
            bars_doses[week_number] = doses;
          }
          // console.log('highestDosesInPeriodSelector 6', Date.now() - now);
        }
      } else {
        console.log('highestDosesInPeriodSelector 7', Date.now() - now);
        let month_year;
        for (const [date, doses] of Object.entries(dailyDoses)) {
          // console.log('highestDosesInPeriodSelector 8', Date.now() - now);
          month_year = date.slice(0, 'YYYY-MM'.length);
          // console.log('highestDosesInPeriodSelector 9', Date.now() - now);
          if (bars_doses[month_year]) {
            bars_doses[month_year] = bars_doses[month_year] + doses;
          } else {
            bars_doses[month_year] = doses;
          }
          // console.log('highestDosesInPeriodSelector 10', Date.now() - now);
        }
      }
      console.log('highestDosesInPeriodSelector 11', Date.now() - now);
      const highestDose = Math.min(maxDosesOnScreen, Math.max(...Object.values(bars_doses)));
      console.log('highestDosesInPeriodSelector 12', Date.now() - now);
      return highestDose;
    },
});

const diffWithPreviousWeekSelector = selectorFamily({
  key: 'diffWithPreviousWeekSelector',
  get:
    ({ firstDay }) =>
    ({ get }) => {
      const dailyDoses = get(dailyDosesSelector);
      const firstDayLastWeek = dayjs(dayjs(firstDay).startOf('week')).add(-1, 'week');
      const daysOfLastWeek = [];
      for (let i = 0; i <= 6; i++) {
        const nextDay = dayjs(firstDayLastWeek).add(i, 'day').format('YYYY-MM-DD');
        daysOfLastWeek.push(nextDay);
      }
      if (daysOfLastWeek.filter((day) => isNaN(dailyDoses[day])).length > 0) return { fillConsoFirst: true };
      const firstDayThisWeek = dayjs(dayjs(firstDay).startOf('week'));
      const daysOfThisWeek = [];
      for (let i = 0; i <= 6; i++) {
        const nextDay = dayjs(firstDayThisWeek).add(i, 'day').format('YYYY-MM-DD');
        daysOfThisWeek.push(nextDay);
      }
      const lastWeekNumberOfDrinks = daysOfLastWeek
        .map((day) => dailyDoses[day])
        .reduce((sum, dailyDose) => sum + (dailyDose ? dailyDose : 0), 0);
      const thisWeekNumberOfDrinks = daysOfThisWeek
        .map((day) => dailyDoses[day])
        .reduce((sum, dailyDose) => sum + (dailyDose ? dailyDose : 0), 0);

      const diff = Math.round(lastWeekNumberOfDrinks - thisWeekNumberOfDrinks);
      const decrease = diff > 0;
      const pourcentageOfDecrease = Math.round((diff / (lastWeekNumberOfDrinks || 1)) * 100);
      return { diff, decrease, pourcentageOfDecrease, thisWeekNumberOfDrinks };
    },
});
const minBarHeight = 1;
const Diagram = ({ inModalHelp = false }) => {
  const [period, setPeriod] = useState('day');
  const [firstDay, setFirstDay] = useState(dayjs().startOf('week'));
  const lastDay = useMemo(
    () =>
      dayjs(firstDay)
        .add(6, period)
        .subtract(period === 'day' ? 0 : 1, 'day'),
    [firstDay, period]
  );

  const maxDrinksPerWeekGoal = useRecoilValue(maxDrinksPerWeekSelector);

  const barsInPeriod = useMemo(() => {
    const dates = [];
    for (let i = 0; i <= (period === 'day' ? 6 : 5); i++) {
      const nextDate = dayjs(firstDay).add(i, period).format('YYYY-MM-DD');
      dates.push(nextDate);
    }
    return dates;
  }, [firstDay, period]);

  const generateBarsValues = (day) => {
    if (dayjs(day).isAfter(dayjs())) {
      return null;
    }

    if (dailyDoses[day] < 0) {
      return -1;
    }

    let total = 0;
    let howManyKnownValues = 0;
    switch (period) {
      case 'month':
        for (let i = 0; dayjs(day).add(i, 'day') < dayjs(day).add(1, 'month'); i++) {
          const dayValue = dailyDoses[dayjs(day).add(i, 'day').format('YYYY-MM-DD')];
          if (dayValue >= 0) {
            howManyKnownValues++;
            total += dayValue;
          }
        }
        return Math.min(maxDosesOnScreen, howManyKnownValues > 0 ? total : undefined);

      case 'week':
        for (let i = 0; i <= 6; i++) {
          const dayValue = dailyDoses[dayjs(day).add(i, 'day').format('YYYY-MM-DD')];
          if (dayValue >= 0) {
            howManyKnownValues++;
            total += dayValue;
          }
        }
        return Math.min(maxDosesOnScreen, howManyKnownValues > 0 ? total : undefined);

      default:
        return Math.min(maxDosesOnScreen, dailyDoses[day]);
    }
  };

  const navigation = useNavigation();
  const dailyDoses = useRecoilValue(dailyDosesSelector);

  const highestDosesInPeriod = useRecoilValue(highestDosesInPeriodSelector({ period }));
  const highestAcceptableDosesPerDayByOMS = 2;
  const totalDrinksByDrinkingDay = useRecoilValue(totalDrinksByDrinkingDaySelector);
  const highestAcceptableDosesInPeriod = useMemo(() => {
    switch (period) {
      case 'month':
        return maxDrinksPerWeekGoal * 4.33 || highestAcceptableDosesPerDayByOMS * 30;

      case 'week':
        return maxDrinksPerWeekGoal || highestAcceptableDosesPerDayByOMS * 7;

      default:
        return totalDrinksByDrinkingDay || highestAcceptableDosesPerDayByOMS;
    }
  }, [period, maxDrinksPerWeekGoal, totalDrinksByDrinkingDay, highestAcceptableDosesPerDayByOMS]);

  const { barMaxHeight, barMaxAcceptableDoseHeight } = computeBarsHeight(
    highestDosesInPeriod,
    highestAcceptableDosesInPeriod
  );

  const doseHeight = barMaxHeight / Math.max(highestAcceptableDosesInPeriod, highestDosesInPeriod);
  const { diff, decrease, fillConsoFirst, thisWeekNumberOfDrinks } = useRecoilValue(
    diffWithPreviousWeekSelector({ firstDay })
  );
  const showFillConsosFirst = useMemo(() => fillConsoFirst, [fillConsoFirst]);
  const showDecrease = useMemo(
    () => !showFillConsosFirst && diff !== 0 && decrease,
    [diff, decrease, showFillConsosFirst]
  );
  const showIncrease = useMemo(
    () => !showFillConsosFirst && diff !== 0 && !decrease,
    [diff, decrease, showFillConsosFirst]
  );
  const showStable = useMemo(() => !showFillConsosFirst && diff === 0, [diff, showFillConsosFirst]);
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
      <PeriodSwitchToggle
        period={period}
        setPeriod={(newPeriod) => {
          setPeriod(newPeriod);
          setFirstDay(newPeriod === 'day' ? dayjs().startOf('week') : dayjs().startOf(newPeriod).add(-5, newPeriod));
        }}
      />
      <PeriodSelector
        firstDay={firstDay}
        setFirstDay={setFirstDay}
        lastDay={lastDay}
        period={period}
        logEventCategory={'ANALYSIS'}
        logEventAction={'ANALYSIS_DATE'}
      />

      <BarsContainer height={barMaxHeight + doseTextHeight}>
        {barsInPeriod
          .map((bar) => generateBarsValues(bar))
          .map((dailyDose, index) => {
            if (dailyDose === null || dailyDose === undefined) {
              return <Bar key={index} height={doseHeight * highestAcceptableDosesInPeriod} empty />;
            }
            const dailyDoseHeight = Math.round(dailyDose > 0 && dailyDose) || 0;
            const underLineValue = Math.min(dailyDoseHeight, highestAcceptableDosesInPeriod);
            const overLineValue =
              dailyDoseHeight > highestAcceptableDosesInPeriod && dailyDoseHeight - highestAcceptableDosesInPeriod;

            return (
              <Bar
                key={index}
                height={(doseHeight * dailyDoseHeight || minBarHeight) + doseTextHeight}
                heightFactor={dailyDoseHeight || 0}>
                {dailyDose >= 0 ? (
                  <Dose adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="clip" overLine={Boolean(overLineValue)}>
                    {Math.round(dailyDose)}
                  </Dose>
                ) : (
                  <Dose adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="clip" overLine={Boolean(overLineValue)}>
                    ?
                  </Dose>
                )}
                {Boolean(overLineValue) && (
                  <UpperBar bottom={doseHeight * highestAcceptableDosesInPeriod} height={doseHeight * overLineValue} />
                )}
                <LowerBar withTopRadius={!overLineValue} height={doseHeight * underLineValue || minBarHeight} />
              </Bar>
            );
          })}
        {period === 'day' && highestDosesInPeriod >= highestAcceptableDosesInPeriod - 1 && (
          <Line bottom={barMaxAcceptableDoseHeight} />
        )}
        {period === 'week' && highestDosesInPeriod >= highestAcceptableDosesInPeriod - 2 && (
          <Line bottom={barMaxAcceptableDoseHeight} />
        )}
        {period === 'month' && highestDosesInPeriod >= highestAcceptableDosesInPeriod - 11 && (
          <Line bottom={barMaxAcceptableDoseHeight} />
        )}
      </BarsContainer>
      <LegendsContainer>
        {barsInPeriod.map((day, index) => {
          switch (period) {
            case 'month':
              return (
                <LegendContainer backgound={'transparent'} key={index}>
                  <Legend color={'#4030A5'}>{dayjs(day).format('MMM').capitalize().slice(0, 3)}</Legend>
                </LegendContainer>
              );
            case 'week':
              return (
                <LegendContainer backgound={'transparent'} key={index}>
                  <Legend color={'#4030A5'}>
                    {dayjs(day).format('D') + ' ' + dayjs(day).format('MMM').slice(0, 3)}
                  </Legend>
                </LegendContainer>
              );
            default:
              const formatday = dayjs(day).format('ddd').capitalize().slice(0, 3);
              const backgound = isToday(day) ? '#4030A5' : 'transparent';
              const color = isToday(day) ? '#ffffff' : '#4030A5';
              return (
                <LegendContainer backgound={backgound} key={index}>
                  <Legend color={color}>{formatday}</Legend>
                </LegendContainer>
              );
          }
        })}
      </LegendsContainer>
      {!inModalHelp && (
        <TouchableOpacity className="mb-6">
          <Text className="text-[#4030A5] text-center underline" onPress={() => setShowHelpModal(true)}>
            Comprendre le graphique et les unités d'alcool
          </Text>
        </TouchableOpacity>
      )}

      <DiagramHelpModal visible={showHelpModal} onCloseHelp={() => setShowHelpModal(false)} />
      {!!showIncrease && !inModalHelp && period === 'day' && (
        <EvolutionMessage
          background="#f9f2e8"
          border="#f4cda9"
          button
          navigation={navigation}
          message={
            <>
              <TextStyled>
                Votre consommation est en hausse de {-diff} verre{-diff > 1 ? 's' : ''} par rapport à la semaine
                dernière.
              </TextStyled>
              <TextStyled />
              <TextStyled>
                Rien de grave, vous êtes déjà dans une démarche d'amélioration et c'est très bien{'\u00A0'}!{' '}
                <TextStyled bold>Découvrez nos articles santé</TextStyled> pour vous motiver à réduire votre
                consommation.
              </TextStyled>
            </>
          }
        />
      )}
      {!!showDecrease && !inModalHelp && period === 'day' && (
        <EvolutionMessage
          background="#dff6e4"
          border="#a0e1ac"
          message={
            <>
              <TextStyled>
                Bravo, vous avez consommé {diff} verre{diff > 1 ? 's' : ''} de moins que la semaine dernière,{' '}
                <TextStyled bold>continuez comme cela{'\u00A0'}!</TextStyled>
              </TextStyled>
            </>
          }
        />
      )}
      {!!showStable && !inModalHelp && period === 'day' && (
        <EvolutionMessage
          background="#F9F9F9"
          border="#C4C4C4"
          icon={<Equality size={25} />}
          button
          navigation={navigation}
          message={
            <>
              <TextStyled>
                Votre consommation est identique à la semaine précédente (soit {thisWeekNumberOfDrinks} verres).
              </TextStyled>
              <TextStyled />
              <TextStyled>
                Si besoin d'un coup de pouce, vous pouvez <TextStyled bold>découvrir nos articles santé</TextStyled>{' '}
                pour vous motiver à réduire votre consommation{'\u00A0'}!
              </TextStyled>
            </>
          }
        />
      )}
      {!!showFillConsosFirst && !inModalHelp && period === 'day' && (
        <EvolutionMessage
          background="#e8e8f3"
          border="#4030a5"
          message={
            <>
              <TextStyled>
                Ajoutez vos consommations <TextStyled bold>tous les jours</TextStyled> pour accéder à l'analyse de la
                semaine. Bon courage{'\u00A0'}!
              </TextStyled>
            </>
          }
        />
      )}
    </>
  );
};

const LegendsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const Legend = styled(TextStyled)`
  color: ${({ color }) => color};
  font-weight: 600;
  text-align: center;
`;
const LegendContainer = styled.View`
  background: ${({ backgound }) => backgound};
  border-radius: 20px;
  flex-grow: 0;
  flex-shrink: 1;
  min-width: 35px;
`;

const EvolutionMessage = ({ background, border, message, button, navigation }) => {
  return (
    <EvolutionContainer background={background} border={border}>
      <EvolutionContainerText>
        <MessageContainer>{message}</MessageContainer>
      </EvolutionContainerText>
      {!!button && (
        <ContactAddictologue>
          <ButtonPrimary
            content="Découvrir les articles santé"
            small
            onPress={() => {
              logEvent({
                category: 'ANALYSIS',
                action: 'ANALYSIS_HEALTH',
                name: 'HEALTH',
              });
              navigation.navigate('HEALTH');
            }}
          />
        </ContactAddictologue>
      )}
    </EvolutionContainer>
  );
};

const MessageContainer = styled.View`
  margin-left: 10px;
  flex-shrink: 1;
`;

const Icon = styled.View`
  margin-top: 5px;
`;

const EvolutionContainer = styled.View`
  background-color: ${({ background }) => background};
  border: ${({ border }) => border};
  align-item: center;
  padding: 10px 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  elevation: 5;
  shadow-offset: 0px 5px;
  shadow-color: ${({ background }) => background};
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
  justify-content: center;
`;

const EvolutionContainerText = styled.View`
  flex-direction: row;
`;

const ContactAddictologue = styled.View`
  margin-top: 10px;
  align-items: center;
`;

const BarsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  height: ${({ height }) => height}px;
  align-items: flex-end;
  justify-content: space-between;
`;

const barWidth = 20;
const Bar = styled(TouchableOpacity)`
  border-color: #4030a5;
  border-style: ${({ empty }) => (empty ? 'dashed' : 'solid')};
  border-width: ${({ empty }) => (empty ? 1 : 0)}px;
  border-radius: ${screenHeight * 0.005}px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 20px;
  max-width: ${barWidth}px;
  margin-horizontal: 8px;
  height: ${({ height }) => height}px;
`;

const topRadius = css`
  border-top-left-radius: ${screenHeight * 0.005}px;
  border-top-right-radius: ${screenHeight * 0.005}px;
`;

const UpperBar = styled.View`
  position: absolute;
  bottom: ${({ bottom }) => bottom}px;
  height: ${({ height }) => height}px;
  width: 100%;
  ${topRadius}
  background: #de285e;
`;

const borderBottomRed = css`
  border-bottom-width: 4px;
  border-bottom-color: #de285e;
`;
const LowerBar = styled.View`
  position: absolute;
  bottom: 0px;
  height: ${({ height }) => height}px;
  width: 100%;
  background: #4030a5;
  ${({ borderBottom }) => borderBottom && borderBottomRed}
  ${({ withTopRadius }) => withTopRadius && topRadius}
`;

const doseTextHeight = 25;
const Dose = styled(H3)`
  height: ${doseTextHeight}px;
  font-weight: bold;
  width: ${barWidth * 2}px;
  transform: translateX(-${barWidth / 2}px);
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ overLine }) => (overLine ? '#de285e' : '#4030a5')};
`;

const Line = styled.View`
  position: absolute;
  bottom: ${({ bottom }) => bottom - 1}px;
  width: 100%;
  height: 0px;
  border-style: dashed;
  border-width: 1px;
  border-radius: 1px;
  border-color: #39cec0;
`;

export default Diagram;
