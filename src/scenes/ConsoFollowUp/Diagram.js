import React, { useEffect, useMemo, useState } from 'react';
import { selectorFamily, useRecoilValue } from 'recoil';
import UnderlinedButton from '../../components/UnderlinedButton';
import { dateIsBeforeOrToday, isToday, today } from '../../helpers/dateHelpers';
import styled from 'styled-components';
import { storage } from '../../services/storage';
import { screenHeight } from '../../styles/theme';
import {
  Bar,
  BarsContainer,
  CloseHelpContainer,
  Dose,
  doseTextHeight,
  Help,
  HelpText,
  Line,
  LowerBar,
  UpperBar,
} from './styles';
import { dailyDosesSelector, diagramDaysSelector, drinksState,getTodaySWeek,startDateDiagramState,beforeToday, consolidatedCatalogSelector} from '../../recoil/consos';
import { drinksByDrinkingDayState } from '../../recoil/gains';
import TextStyled from '../../components/TextStyled';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';

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
const Diagram = ({ asPreview, showCloseHelp = null, onCloseHelp = null, onShowHelp, selectedBar, setSelectedBar }) => {
  const days = useRecoilValue(diagramDaysSelector({ asPreview }));
  const [startDate, setStartDate] = useRecoilState(startDateDiagramState);
  const { firstDay, lastDay } = getTodaySWeek(new Date(startDate));
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
  const { barMaxHeight, barMaxAcceptableDoseHeight } = computeBarsHeight(highestDailyDose, drinksByDrinkingDay||2);
  const doseHeight = barMaxHeight / Math.max(highestAcceptableDosesPerDay, highestDailyDose);

  const onPressBar = (index) => {
    if (index === null || index === undefined || index === selectedBar?.index) return setSelectedBar({});
    const day = days[index];
    const label = `${day.getLocaleWeekDay('fr').capitalize()} ${day.getDate()} ${day.getLocaleMonth('fr')}`;
    setSelectedBar({ timestamp: day, index, label });
  };

  return (
    <>
      {/* {!showCloseHelp && !asPreview && (
        <Help onPress={onShowHelp}>
          <HelpText>?</HelpText>
        </Help>
      )} */}
      {showCloseHelp && (
        <CloseHelpContainer>
          <UnderlinedButton content="Fermer" bold onPress={onCloseHelp} />
        </CloseHelpContainer>
      )}
      {!asPreview && (
      <ChangeDateContainer>
        <ChangeDate onPress={() => setStartDate(beforeToday(7, firstDay))}>
          <TextStyled> {'<'}</TextStyled>
        </ChangeDate>
        {
        ( firstDay.getMonth()===lastDay.getMonth()) ? (
          <TextStyled color="#C4C4C4">
            Semaine du {dayjs(firstDay).format('D')} au {dayjs(lastDay).format('D')} {dayjs(lastDay).format('MMMM')}
            </TextStyled>
            ):(
              <TextStyled color="#C4C4C4">
              Semaine du {dayjs(firstDay).format("D")} {dayjs(firstDay).format("MMM")} au {dayjs(lastDay).format("D")} {dayjs(lastDay).format("MMM")}
            </TextStyled>
            )
          }
        <ChangeDate onPress={() => setStartDate(beforeToday(-7, firstDay))}>
          {today() > lastDay && <TextStyled> {'>'}</TextStyled>}
        </ChangeDate>
      </ChangeDateContainer>
      )}
      <BarsContainer height={barMaxHeight + doseTextHeight}>
        {days
          .map((day) => {
            if (!dateIsBeforeOrToday(day)) {
              return null;
            }
            if (dailyDoses[day] < 0) {
              return -1;
            }
            return Math.min(maxDosesOnScreen, dailyDoses[day]);
          })
          .map((dailyDose, index) => {
            if (dailyDose === null || dailyDose === undefined) {
              return (
                <Bar
                  onPress={() => onPressBar(null)}
                  key={index}
                  height={doseHeight * highestAcceptableDosesPerDay}
                  empty
                />
              );
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
                  <LowerBar
                    withTopRadius={!overLineValue}
                    height={doseHeight * underLineValue || minBarHeight}
                  />
                </Bar>
              </React.Fragment>
            );
          })}
        {thereIsDrinks && <Line bottom={barMaxAcceptableDoseHeight} />}
      </BarsContainer>
      <LegendsContainer>
        {days.map((day,index)=>{
          const formatday = dayjs(day).format("ddd").charAt(0).toUpperCase()+dayjs(day).format("ddd").slice(1,3)
          const backgound= (isToday(day)) ?  "#4030A5" : "transparent" ;
          const color = isToday(day) ? '#ffffff' : '#4030A5';
          return(
            <LegendContainer backgound={backgound} key={index}>
              <Legend color={color} >{formatday}</Legend>
            </LegendContainer>
          )
        })}
      </LegendsContainer>
    </>
  );
};

const ChangeDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 10px;
`;

const ChangeDate = styled.TouchableOpacity``;

const LegendsContainer = styled.View`
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 1;
  margin-horizontal: 1px;
`;

const Legend = styled.Text`
  color: ${({ color }) => color};
  font-weight: 600;
`;
const LegendContainer = styled.View`
  background: ${({ backgound }) => backgound};
  margin-top: 5px;
  margin-bottom: 35px;
  border-radius: 20px;
  padding-horizontal: 5px;
`;

export default Diagram;
