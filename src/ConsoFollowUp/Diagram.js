import React from 'react';
import { connect } from 'react-redux';
import {
  getDaysForDiagram,
  getDailyDoses,
  getHighestDailyDoses,
  checkIfThereIsDrinks,
  maxDosesOnScreen,
} from './consoDuck';
import { dateIsBeforeOrToday } from '../helpers/dateHelpers';
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
import { usefetchMaxAcceptableDosesPerDay } from '../helpers/customHooks';
import { fakeConsoData } from '../reference/mocks/fakeConsoData';
import UnderlinedButton from '../components/UnderlinedButton';
import { screenHeight } from '../styles/theme';

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
      barMaxAcceptableDoseHeight:
        (highestAcceptableDosesPerDay / highestDailyDose) * barHighestHeightPossible,
    };
  }
  return {
    barMaxHeight:
      (highestDailyDose / highestAcceptableDosesPerDay) * barNormalHeightForMaxAcceptableDose,
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
  const highestAcceptableDosesPerDay = usefetchMaxAcceptableDosesPerDay();
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
          .map(day => {
            if (!dateIsBeforeOrToday(day)) {
              return null;
            }
            if (!dailyDoses[day]) {
              return 0;
            }
            return Math.min(maxDosesOnScreen, dailyDoses[day]);
          })
          .map((dailyDose, index) => {
            if (dailyDose === null || dailyDose === undefined) {
              return <Bar key={index} height={doseHeight * highestAcceptableDosesPerDay} empty />;
            }
            const underLineValue = Math.min(dailyDose, highestAcceptableDosesPerDay);
            const overLineValue =
              dailyDose > highestAcceptableDosesPerDay && dailyDose - highestAcceptableDosesPerDay;
            return (
              <React.Fragment key={index}>
                <Bar
                  key={index}
                  height={(doseHeight * dailyDose || minBarHeight) + doseTextHeight}
                  heightFactor={dailyDose || 0}>
                  {Boolean(dailyDose) && (
                    <Dose
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      ellipsizeMode="clip"
                      overLine={Boolean(overLineValue)}>
                      {dailyDose}
                    </Dose>
                  )}
                  {Boolean(overLineValue) && (
                    <UpperBar
                      bottom={doseHeight * highestAcceptableDosesPerDay}
                      height={doseHeight * overLineValue}
                    />
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
      {thereIsDrinks && <Legend>en unités d'alcool</Legend>}
    </React.Fragment>
  );
};

Diagram.defaultProps = {
  onCloseHelp: null,
  showCloseHelp: null,
};

const makeStateToProps = () => (realState, { asPreview }) => {
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

export default connect(
  makeStateToProps,
  null,
  mergeProps
)(Diagram);
