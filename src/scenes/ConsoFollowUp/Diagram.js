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
  Legend,
  doseTextHeight,
  Help,
  HelpText,
  CloseHelpContainer,
} from './styles';
import { fakeConsoData } from '../../reference/mocks/fakeConsoData';
import UnderlinedButton from '../../components/UnderlinedButton';
import { screenHeight } from '../../styles/theme';
import CONSTANTS from '../../reference/constants';

const getAcceptableDosePerDay = (gender) => {
  if (!gender) return 3;
  if (gender === CONSTANTS.MAN) return 3;
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
}) => {
  const [highestAcceptableDosesPerDay, setHighestAcceptableDosesPerDay] = useState(3);

  useEffect(() => {
    (async () => {
      try {
        const storedValue = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_QUIZZ_ONBOARDING_ANSWERS);
        if (!storedValue) return;
        const quizzAnswers = JSON.parse(storedValue);
        if (!quizzAnswers) return;
        setHighestAcceptableDosesPerDay(getAcceptableDosePerDay(quizzAnswers[CONSTANTS.GENDER]));
      } catch (e) {}
    })();
  }, []);

  const { barMaxHeight, barMaxAcceptableDoseHeight } = computeBarsHeight(
    highestDailyDose,
    highestAcceptableDosesPerDay
  );

  const doseHeight = barMaxHeight / Math.max(highestAcceptableDosesPerDay, highestDailyDose);

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
      {thereIsDrinks && <Legend>en unités d'alcool</Legend>}
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
