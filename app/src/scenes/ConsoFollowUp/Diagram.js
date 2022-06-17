import React, { useMemo, useState } from 'react';
import { selectorFamily, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import UnderlinedButton from '../../components/UnderlinedButton';
import { screenHeight } from '../../styles/theme';
import { dailyDosesSelector, drinksState } from '../../recoil/consos';
import { totalDrinksByDrinkingDaySelector } from '../../recoil/gains';
import TextStyled from '../../components/TextStyled';
import { isToday } from '../../services/dates';
import Celebration from '../../components/illustrations/Celebration';
import Increase from '../../components/illustrations/Increase';
import ButtonPrimary from '../../components/ButtonPrimary';
import matomo from '../../services/matomo';
import PlusIcon from '../../components/illustrations/PlusIcon';
import Equality from '../../components/illustrations/Equality';
import H3 from '../../components/H3';
import { P } from '../../components/Articles';

const maxDosesOnScreen = 50;

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

  const navigation = useNavigation();
  const dailyDoses = useRecoilValue(dailyDosesSelector({ asPreview }));
  const highestDailyDose = useRecoilValue(highestDailyDoseSelector({ asPreview }));

  const highestAcceptableDosesPerDayByOMS = 2;

  const drinks = useRecoilValue(drinksState);
  const thereIsDrinks = useMemo(() => asPreview || drinks.length, [asPreview, drinks.length]);

  const totalDrinksByDrinkingDay = useRecoilValue(totalDrinksByDrinkingDaySelector);
  const highestAcceptableDosesPerDay = useMemo(
    () => totalDrinksByDrinkingDay || highestAcceptableDosesPerDayByOMS,
    [totalDrinksByDrinkingDay, highestAcceptableDosesPerDayByOMS]
  );
  const { barMaxHeight, barMaxAcceptableDoseHeight } = computeBarsHeight(
    highestDailyDose,
    highestAcceptableDosesPerDay
  );
  const doseHeight = barMaxHeight / Math.max(highestAcceptableDosesPerDay, highestDailyDose);

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
      {showCloseHelp && (
        <CloseHelpContainer>
          <UnderlinedButton content="Fermer" bold onPress={onCloseHelp} />
        </CloseHelpContainer>
      )}
      {!asPreview && (
        <ChangeDateContainer>
          <ChangeDateButton
            onPress={() => {
              matomo.logAnalysisDate(dayjs(firstDay).add(-1, 'week'));
              setFirstDay(dayjs(firstDay).add(-1, 'week'));
            }}
            hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
            <TextStyled>{'<'}</TextStyled>
          </ChangeDateButton>
          {firstDay.get('month') === lastDay.get('month') ? (
            <P color="#7e7e7e" noMarginBottom>
              Semaine du {dayjs(firstDay).format('D')} au {dayjs(lastDay).format('D')} {dayjs(lastDay).format('MMMM')}
            </P>
          ) : (
            <P color="#7e7e7e" noMarginBottom>
              Semaine du {dayjs(firstDay).format('D')} {dayjs(firstDay).format('MMM')} au {dayjs(lastDay).format('D')}{' '}
              {dayjs(lastDay).format('MMM')}
            </P>
          )}
          <ChangeDateButton
            onPress={() => {
              matomo.logAnalysisDate();
              setFirstDay(dayjs(firstDay).add(1, 'week'));
            }}
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
              matomo.logContactTakeRDV();
              matomo.logContactOpen('SUIVI');
              matomo.logAnalysisContact();
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

const Bar = styled(TouchableOpacity)`
  border-color: #4030a5;
  border-style: ${({ empty }) => (empty ? 'dashed' : 'solid')};
  border-width: ${({ empty }) => (empty ? 1 : 0)}px;
  border-radius: ${screenHeight * 0.005}px;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 20px;
  max-width: 20px;
  margin-horizontal: 8px;
  overflow: hidden;
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

const CloseHelpContainer = styled.View`
  margin-left: auto;
`;

export default Diagram;
