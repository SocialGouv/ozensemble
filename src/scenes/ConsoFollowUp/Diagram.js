import React, { useEffect, useMemo, useState } from 'react';
import { selectorFamily, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import dayjs from 'dayjs';
import UnderlinedButton from '../../components/UnderlinedButton';
import { storage } from '../../services/storage';
import { screenHeight } from '../../styles/theme';
import { Bar, BarsContainer, CloseHelpContainer, Dose, doseTextHeight, Line, LowerBar, UpperBar } from './styles';
import { dailyDosesSelector, drinksState } from '../../recoil/consos';
import { drinksByDrinkingDayState } from '../../recoil/gains';
import TextStyled from '../../components/TextStyled';
import { isToday } from '../../services/dates';

const maxDosesOnScreen = 50;

const getAcceptableDosePerDay = (gender) => {
  if (!gender) return 3;
  if (gender === 'man') return 3;
  return 2;
};

const computeBarsHeight = (highestDailyDose, highestAcceptableDosesPerDay) => {
  const barNormalHeightForMaxAcceptableDose = screenHeight * 0.1;
  const barHighestHeightPossible = screenHeight * 0.2;
  if (highestDailyDose <= highestAcceptableDosesPerDay) {
    return {
      barMaxHeight: barNormalHeightForMaxAcceptableDose,
      barMaxAcceptableDoseHeight: barNormalHeightForMaxAcceptableDose,
    };
  }
  if (highestDailyDose >= 2 * highestAcceptableDosesPerDay) {
    return {
      barMaxHeight: barHighestHeightPossible,
      barMaxAcceptableDoseHeight: (highestAcceptableDosesPerDay / highestDailyDose) * barHighestHeightPossible,
    };
  }
  return {
    barMaxHeight: (highestDailyDose / highestAcceptableDosesPerDay) * barNormalHeightForMaxAcceptableDose,
    barMaxAcceptableDoseHeight: barNormalHeightForMaxAcceptableDose,
  };
};

const highestDailyDoseSelector = selectorFamily({
  key: 'highestDailyDoseSelector',
  get:
    ({ asPreview = false } = {}) =>
    ({ get }) => {
      const dailyDoses = get(dailyDosesSelector({ asPreview }));
      return Math.min(maxDosesOnScreen, Math.max(...Object.values(dailyDoses)));
    },
});

const minBarHeight = 1;
const Diagram = ({ asPreview, showCloseHelp = null, onCloseHelp = null }) => {
  const [firstDay, setFirstDay] = useState(dayjs().startOf('week'));
  const lastDay = useMemo(() => dayjs(firstDay).endOf('week'), [firstDay]);
  const days = useMemo(() => {
    const daysOfTheWeek = [];
    for (let i = 0; i <= 6; i++) {
      const nextDay = dayjs(firstDay).add(i, 'day').format('YYYY-MM-DD');
      daysOfTheWeek.push(nextDay);
    }
    return daysOfTheWeek;
  }, [firstDay]);
  const dailyDoses = useRecoilValue(dailyDosesSelector({ asPreview }));
  const highestDailyDose = useRecoilValue(highestDailyDoseSelector({ asPreview }));
  const [highestAcceptableDosesPerDay, setHighestAcceptableDosesPerDay] = useState(2);
  const drinks = useRecoilValue(drinksState);
  const thereIsDrinks = useMemo(() => asPreview || drinks.length, [asPreview, drinks.length]);

  useEffect(() => {
    (async () => {
      try {
        const storedValue = storage.getString('@Quizz_answers');
        if (!storedValue) return;
        const quizzAnswers = JSON.parse(storedValue);
        if (!quizzAnswers) return;
        setHighestAcceptableDosesPerDay(getAcceptableDosePerDay(quizzAnswers.gender));
      } catch (e) {}
    })();
  }, []);

  const drinksByDrinkingDay = useRecoilValue(drinksByDrinkingDayState);
  const { barMaxHeight, barMaxAcceptableDoseHeight } = computeBarsHeight(highestDailyDose, drinksByDrinkingDay || 2);
  const doseHeight = barMaxHeight / Math.max(highestAcceptableDosesPerDay, highestDailyDose);

  return (
    <>
      {showCloseHelp && (
        <CloseHelpContainer>
          <UnderlinedButton content="Fermer" bold onPress={onCloseHelp} />
        </CloseHelpContainer>
      )}
      {!asPreview && (
        <ChangeDateContainer>
          <ChangeDateButton
            onPress={() => setFirstDay(dayjs(firstDay).add(-1, 'week'))}
            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
            <TextStyled>{'<'}</TextStyled>
          </ChangeDateButton>
          {firstDay.get('month') === lastDay.get('month') ? (
            <TextStyled color="#7e7e7e">
              Semaine du {dayjs(firstDay).format('D')} au {dayjs(lastDay).format('D')} {dayjs(lastDay).format('MMMM')}
            </TextStyled>
          ) : (
            <TextStyled color="#7e7e7e">
              Semaine du {dayjs(firstDay).format('D')} {dayjs(firstDay).format('MMM')} au {dayjs(lastDay).format('D')}{' '}
              {dayjs(lastDay).format('MMM')}
            </TextStyled>
          )}
          <ChangeDateButton
            onPress={() => setFirstDay(dayjs(firstDay).add(1, 'week'))}
            disabled={dayjs(lastDay).add(1, 'days').isAfter(dayjs())}
            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
            <TextStyled>{'>'}</TextStyled>
          </ChangeDateButton>
        </ChangeDateContainer>
      )}
      <BarsContainer height={barMaxHeight + doseTextHeight}>
        {days
          .map((day) => {
            if (dayjs(day).isAfter(dayjs())) {
              return null;
            }
            if (dailyDoses[day] < 0) {
              return -1;
            }
            return Math.min(maxDosesOnScreen, dailyDoses[day]);
          })
          .map((dailyDose, index) => {
            if (dailyDose === null || dailyDose === undefined) {
              return <Bar key={index} height={doseHeight * highestAcceptableDosesPerDay} empty />;
            }
            const dailyDoseHeight = (dailyDose > 0 && dailyDose) || 0;
            const underLineValue = Math.min(dailyDoseHeight, highestAcceptableDosesPerDay);
            const overLineValue =
              dailyDoseHeight > highestAcceptableDosesPerDay && dailyDoseHeight - highestAcceptableDosesPerDay;
            return (
              <React.Fragment key={index}>
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
                    <UpperBar bottom={doseHeight * highestAcceptableDosesPerDay} height={doseHeight * overLineValue} />
                  )}
                  <LowerBar withTopRadius={!overLineValue} height={doseHeight * underLineValue || minBarHeight} />
                </Bar>
              </React.Fragment>
            );
          })}
        {thereIsDrinks && <Line bottom={barMaxAcceptableDoseHeight} />}
      </BarsContainer>
      <LegendsContainer>
        {days.map((day, index) => {
          const formatday = dayjs(day).format('ddd').capitalize().slice(0, 3);
          const backgound = isToday(day) ? '#4030A5' : 'transparent';
          const color = isToday(day) ? '#ffffff' : '#4030A5';
          return (
            <LegendContainer backgound={backgound} key={index}>
              <Legend color={color}>{formatday}</Legend>
            </LegendContainer>
          );
        })}
      </LegendsContainer>
    </>
  );
};

const ChangeDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-vertical: 20px;
`;

const ChangeDateButton = styled.TouchableOpacity`
  ${(props) => props.disabled && 'opacity: 0;'}/* border: 1px solid black; */
`;

const LegendsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 35px;
`;

const Legend = styled.Text`
  color: ${({ color }) => color};
  font-weight: 600;
  text-align: center;
`;
const LegendContainer = styled.View`
  background: ${({ backgound }) => backgound};
  border-radius: 20px;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 35px;
`;

export default Diagram;
