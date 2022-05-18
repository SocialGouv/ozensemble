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
import Celebration from '../../components/Illustrations/Celebration';
import Increase from '../../components/Illustrations/Increase'
import ButtonPrimary from '../../components/ButtonPrimary';


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

  const lastdays = useMemo(() => {
    const lastFirstDay = dayjs(firstDay).add(-1, 'week')
    const daysOfTheWeek = [];
    for (let i = 0; i <= 6; i++) {
      const nextDay = dayjs(lastFirstDay).add(i, 'day').format('YYYY-MM-DD');
      daysOfTheWeek.push(nextDay);
    }
    return daysOfTheWeek;
  }, [firstDay]);

  const dailyDoses = useRecoilValue(dailyDosesSelector({ asPreview }));
  const highestDailyDose = useRecoilValue(highestDailyDoseSelector({ asPreview }));
  const [highestAcceptableDosesPerDay, setHighestAcceptableDosesPerDay] = useState(2);
  const drinks = useRecoilValue(drinksState);
  const thereIsDrinks = useMemo(() => asPreview || drinks.length, [asPreview, drinks.length]);

  const lastNumberDrinkOfWeek = lastdays.map(day=>{return dailyDoses[day]}).reduce((sum, dailyDose)=>sum+dailyDose?sum+dailyDose:sum,0);
  const numberDrinkOfWeek = days.map(day=>{return dailyDoses[day]}).reduce((sum, dailyDose)=>sum+dailyDose?sum+dailyDose:sum,0);
  const diff = lastNumberDrinkOfWeek - numberDrinkOfWeek;
  const decrease = diff> 0 ? false : true;
  const pourcentageOfDecrease = Math.round(diff/(lastNumberDrinkOfWeek*100));

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
      {!asPreview && diff!=0&&
      <>
      {decrease ? (
      <EvolutionMessage
        background="#F8F0E5"
        border="#F3C89F"
        icon={<Increase size={35} />}
        message={
          <>
            <TextStyled>
              Votre consommation a <TextStyled bold>augmenté de {-pourcentageOfDecrease}% ({-diff} verres de plus)</TextStyled> par rapport à la
              semaine dernière.
            </TextStyled>
            <TextStyled> </TextStyled>
            <TextStyled>
              Si besoin, vous pouvez parler <TextStyled bold>gratuitement</TextStyled> avec l’un de nos addictologue.
            </TextStyled>
          </>
        }
        button={<ButtonPrimary content={"Contacter un addictologue"} onPress={()=>{
          matomo.logContactTakeRDV();
          navigation.navigate('DOCTOLIB');}}/>}
      />
      ):(
      <EvolutionMessage
        background="#AAE3B4"
        border="#81DB95"
        icon={<Celebration size={35} />}
        message={
          <>
            <TextStyled>Bravo, vous avez consommé {pourcentageOfDecrease}% de moins (soit {diff} verres). </TextStyled>
            <TextStyled>Continuez comme cela !</TextStyled>
          </>
        }
      />
      )}
      </>}
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

const EvolutionMessage = ({ background, border, icon, message, button }) => {
  return (
    <EvolutionContainer background={background} border={border}>
      <EvolutionContainerText>
      {icon}
      <MessageContainer>{message}</MessageContainer>
      </EvolutionContainerText>
      <ContactAddictologue>{button}</ContactAddictologue>
    </EvolutionContainer>
  )
};


const MessageContainer = styled.View`
  width: 88%;
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

const ContactAddictologue= styled.View`
  margin-horizontal: 15%;
  margin-top:10px;
`;



export default Diagram;
