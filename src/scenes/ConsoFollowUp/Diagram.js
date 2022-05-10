import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getDaysForDiagram,
  getDailyDoses,
  getHighestDailyDoses,
  checkIfThereIsDrinks,
  maxDosesOnScreen,
} from './consoDuck';
import { dateIsBeforeOrToday } from '../../helpers/dateHelpers';
import {
  BarsContainer,
  Bar,
  UpperBar,
  LowerBar,
  Dose,
  Line,
  LegendContainer,
  Legend,
  doseTextHeight,
  Help,
  HelpText,
  CloseHelpContainer,
} from './styles';
import { fakeConsoData } from '../../reference/mocks/fakeConsoData';
import UnderlinedButton from '../../components/UnderlinedButton';
import { screenHeight } from '../../styles/theme';

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

const minBarHeight = 1;
const Diagram = ({
  days,
  dailyDoses,
  highestDailyDose,
  thereIsDrinks,
  asPreview,
  showCloseHelp,
  onCloseHelp,
  onShowHelp,
  selectedBar,
  setSelectedBar,
}) => {
  const [highestAcceptableDosesPerDay, setHighestAcceptableDosesPerDay] = useState(2);

  useEffect(() => {
    (async () => {
      try {
        const storedValue = await AsyncStorage.getItem('@Quizz_answers');
        if (!storedValue) return;
        const quizzAnswers = JSON.parse(storedValue);
        if (!quizzAnswers) return;
        setHighestAcceptableDosesPerDay(getAcceptableDosePerDay(quizzAnswers.gender));
      } catch (e) {}
    })();
  }, []);

  const { barMaxHeight, barMaxAcceptableDoseHeight } = computeBarsHeight(
    highestDailyDose,
    highestAcceptableDosesPerDay
  );

  const doseHeight = barMaxHeight / Math.max(highestAcceptableDosesPerDay, highestDailyDose);

  const onPressBar = (index) => {
    if (index === null || index === undefined || index === selectedBar?.index) return setSelectedBar({});
    const day = days[index];
    const label = `${day.getLocaleWeekDay('fr').capitalize()} ${day.getDate()} ${day.getLocaleMonth('fr')}`;
    setSelectedBar({ timestamp: day, index, label });
  };

  return (
    <React.Fragment>
      {!showCloseHelp && !asPreview && (
        <Help onPress={onShowHelp}>
          <HelpText>?</HelpText>
        </Help>
      )}
      {showCloseHelp && (
        <CloseHelpContainer>
          <UnderlinedButton content="Fermer" bold onPress={onCloseHelp} />
        </CloseHelpContainer>
      )}
      <BarsContainer height={barMaxHeight + doseTextHeight}>
        {days
          .map((day) => {
            if (!dateIsBeforeOrToday(day)) {
              return null;
            }
            if (!(dailyDoses[day] >= 0)) {
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
                  onPress={() => onPressBar(index)}
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
                    borderBottom={selectedBar?.index === index}
                    withTopRadius={!overLineValue}
                    height={doseHeight * underLineValue || minBarHeight}
                  />
                </Bar>
              </React.Fragment>
            );
          })}
        {thereIsDrinks && <Line bottom={barMaxAcceptableDoseHeight} />}
      </BarsContainer>
      <LegendContainer>
        {selectedBar?.index >= 0 && selectedBar?.label ? <Legend>{selectedBar?.label}</Legend> : null}
      </LegendContainer>
    </React.Fragment>
  );
};

Diagram.defaultProps = {
  onCloseHelp: null,
  showCloseHelp: null,
};

const makeStateToProps =
  () =>
  (realState, { asPreview }) => {
    const state = asPreview ? { conso: fakeConsoData.partial } : realState;

    return {
      days: getDaysForDiagram(state),
      thereIsDrinks: checkIfThereIsDrinks(state),
      dailyDoses: getDailyDoses(state),
      highestDailyDose: getHighestDailyDoses(state),
    };
  };

const mergeProps = (stateProps, dispatch, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatch,
});

export default connect(makeStateToProps, null, mergeProps)(Diagram);
