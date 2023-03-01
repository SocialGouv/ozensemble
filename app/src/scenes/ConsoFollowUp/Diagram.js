import React, { useEffect, useMemo, useState } from 'react';
import { selectorFamily, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { screenHeight } from '../../styles/theme';
import { dailyDosesSelector, drinksState } from '../../recoil/consos';
import { maxDrinksPerWeekSelector, totalDrinksByDrinkingDaySelector } from '../../recoil/gains';
import TextStyled from '../../components/TextStyled';
import { isToday } from '../../services/dates';
import Celebration from '../../components/illustrations/Celebration';
import Increase from '../../components/illustrations/Increase';
import ButtonPrimary from '../../components/ButtonPrimary';
import { logEvent } from '../../services/logEventsWithMatomo';
import PlusIcon from '../../components/illustrations/PlusIcon';
import Equality from '../../components/illustrations/Equality';
import H3 from '../../components/H3';
import PeriodSelector from '../../components/PeriodSelector';
import PeriodSwitchToggle from '../../components/PeriodSwitchToggle';

const maxDosesOnScreen = 999;

const computeBarsHeight = (highestDosesInPeriod, highestAcceptableDosesPerDay) => {
  const barNormalHeightForMaxAcceptableDose = screenHeight * 0.1;
  const barHighestHeightPossible = screenHeight * 0.2;

  if (highestDosesInPeriod <= highestAcceptableDosesPerDay) {
    return {
      barMaxHeight: barNormalHeightForMaxAcceptableDose,
      barMaxAcceptableDoseHeight: barNormalHeightForMaxAcceptableDose,
    };
  }
  if (highestDosesInPeriod >= 2 * highestAcceptableDosesPerDay) {
    return {
      barMaxHeight: barHighestHeightPossible,
      barMaxAcceptableDoseHeight: (highestAcceptableDosesPerDay / highestDosesInPeriod) * barHighestHeightPossible,
    };
  }
  return {
    barMaxHeight: (highestDosesInPeriod / highestAcceptableDosesPerDay) * barNormalHeightForMaxAcceptableDose,
    barMaxAcceptableDoseHeight: barNormalHeightForMaxAcceptableDose,
  };
};

const highestDosesInPeriodSelector = selectorFamily({
  key: 'highestDosesInPeriodSelector',
  get:
    ({ asPreview = false, period } = {}) =>
    ({ get }) => {
      const dailyDoses = get(dailyDosesSelector({ asPreview }));
      let bars_doses = {};
      if (period === 'day') {
        return Math.min(maxDosesOnScreen, Math.max(...Object.values(dailyDoses)));
      } else if (period === 'week') {
        let week_number = 0;
        let end_of_this_week = dayjs().endOf('week');
        Object.keys(dailyDoses).map((date) => {
          week_number = Math.abs(Math.trunc(end_of_this_week.diff(dayjs(date), 'days') / 7));
          if (bars_doses[week_number]) {
            bars_doses[week_number] += dailyDoses[date];
          } else {
            bars_doses[week_number] = dailyDoses[date];
          }
        });
      } else {
        let month_year;
        Object.keys(dailyDoses).map((date) => {
          month_year = dayjs(date).format('YYYY-MM');
          if (bars_doses[month_year]) {
            bars_doses[month_year] = bars_doses[month_year] + dailyDoses[date];
          } else {
            bars_doses[month_year] = dailyDoses[date];
          }
        });
      }
      return Math.min(maxDosesOnScreen, Math.max(...Object.values(bars_doses)));
    },
});

const diffWithPreviousWeekSelector = selectorFamily({
  key: 'diffWithPreviousWeekSelector',
  get:
    ({ firstDay }) =>
    ({ get }) => {
      const dailyDoses = get(dailyDosesSelector());
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

      const diff = lastWeekNumberOfDrinks - thisWeekNumberOfDrinks;
      const decrease = diff > 0;
      const pourcentageOfDecrease = Math.round((diff / (lastWeekNumberOfDrinks || 1)) * 100);
      return { diff, decrease, pourcentageOfDecrease, thisWeekNumberOfDrinks };
    },
});

const minBarHeight = 1;
const Diagram = ({ asPreview }) => {
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
  const dailyDoses = useRecoilValue(dailyDosesSelector({ asPreview }));

  const highestDosesInPeriod = useRecoilValue(highestDosesInPeriodSelector({ asPreview, period }));

  const highestAcceptableDosesPerDayByOMS = 2;

  const drinks = useRecoilValue(drinksState);
  const thereIsDrinks = useMemo(() => asPreview || drinks.length, [asPreview, drinks.length]);

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
  const { diff, decrease, pourcentageOfDecrease, fillConsoFirst, thisWeekNumberOfDrinks } = useRecoilValue(
    diffWithPreviousWeekSelector({ firstDay })
  );
  const showFillConsosFirst = useMemo(() => !asPreview && fillConsoFirst, [asPreview, fillConsoFirst]);
  const showDecrease = useMemo(
    () => !showFillConsosFirst && !asPreview && diff !== 0 && decrease,
    [asPreview, diff, decrease, showFillConsosFirst]
  );
  const showIncrease = useMemo(
    () => !showFillConsosFirst && !asPreview && diff !== 0 && !decrease,
    [asPreview, diff, decrease, showFillConsosFirst]
  );
  const showStable = useMemo(
    () => !showFillConsosFirst && !asPreview && diff === 0,
    [asPreview, diff, showFillConsosFirst]
  );

  return (
    <>
      {!asPreview && (
        <>
          <PeriodSwitchToggle
            period={period}
            setPeriod={(newPeriod) => {
              setPeriod(newPeriod);
              setFirstDay(
                newPeriod === 'day' ? dayjs().startOf('week') : dayjs().startOf(newPeriod).add(-5, newPeriod)
              );
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
        </>
      )}

      <BarsContainer height={barMaxHeight + doseTextHeight}>
        {barsInPeriod
          .map((bar) => generateBarsValues(bar))
          .map((dailyDose, index) => {
            if (dailyDose === null || dailyDose === undefined) {
              return <Bar key={index} height={doseHeight * highestAcceptableDosesInPeriod} empty />;
            }
            const dailyDoseHeight = (dailyDose > 0 && dailyDose) || 0;
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
                    {dailyDose}
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
        {thereIsDrinks && period !== 'month' && <Line bottom={barMaxAcceptableDoseHeight} />}
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
      {!!showIncrease && (
        <EvolutionMessage
          background="#f9f2e8"
          border="#f4cda9"
          icon={<Increase size={35} />}
          button
          navigation={navigation}
          message={
            <>
              <TextStyled>
                Votre consommation a{' '}
                <TextStyled bold>
                  augmenté de {-pourcentageOfDecrease}% ({-diff}
                  {'\u00A0'}verre{-diff > 1 ? 's' : ''} de plus)
                </TextStyled>{' '}
                par rapport à la semaine dernière.
              </TextStyled>
              <TextStyled />
              <TextStyled>
                Si besoin, vous pouvez parler <TextStyled bold>gratuitement</TextStyled> avec l'un de nos addictologue.
              </TextStyled>
              <TextStyled />
            </>
          }
        />
      )}
      {!!showDecrease && (
        <EvolutionMessage
          background="#dff6e4"
          border="#a0e1ac"
          icon={<Celebration size={35} />}
          message={
            <>
              <TextStyled>
                Bravo, vous avez consommé {pourcentageOfDecrease}% de moins (soit{`\u00A0${diff}\u00A0`}
                verre{diff > 1 ? 's' : ''}) que la semaine dernière.
              </TextStyled>
              <TextStyled />
              <TextStyled>Continuez comme cela !</TextStyled>
            </>
          }
        />
      )}
      {!!showStable && (
        <EvolutionMessage
          background="#F9F9F9"
          border="#C4C4C4"
          icon={<Equality size={25} />}
          button
          navigation={navigation}
          message={
            <>
              <TextStyled>
                Votre consommation est <TextStyled bold>identique </TextStyled>à la semaine précédente (soit{' '}
                {thisWeekNumberOfDrinks} verres).
              </TextStyled>
              <TextStyled />
              <TextStyled>
                Si besoin d'un coup de pouce, vous pouvez parler <TextStyled bold>gratuitement</TextStyled> avec l'un de
                nos addictologues.{' '}
              </TextStyled>
            </>
          }
        />
      )}
      {!!showFillConsosFirst && (
        <EvolutionMessage
          background="#e8e8f3"
          border="#4030a5"
          icon={<PlusIcon size={25} />}
          message={
            <>
              <TextStyled>
                Pour avoir accès à l'analyse des variations de la quantité d'alcool consommée cette semaine,{' '}
                <TextStyled bold>pensez à remplir toutes vos consommations de la semaine précédente.</TextStyled>
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
  margin-bottom: 35px;
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

const EvolutionMessage = ({ background, border, icon, message, button, navigation }) => {
  return (
    <EvolutionContainer background={background} border={border}>
      <EvolutionContainerText>
        <Icon>{icon}</Icon>
        <MessageContainer>{message}</MessageContainer>
      </EvolutionContainerText>
      {!!button && (
        <ContactAddictologue>
          <ButtonPrimary
            content="Contacter un addictologue"
            small
            onPress={() => {
              logEvent({
                category: 'CONTACT',
                action: 'CONTACT_RDV',
              });
              logEvent({
                category: 'CONTACT',
                action: 'CONTACT_OPEN',
                name: 'SUIVI',
              });
              logEvent({
                category: 'ANALYSIS',
                action: 'ANALYSIS_CONTACT',
              });
              navigation.navigate('CONTACT');
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
