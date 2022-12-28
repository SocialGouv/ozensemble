import React from 'react';
import styled from 'styled-components';
import TextStyled from './TextStyled';
import dayjs from 'dayjs';
import { P } from './Articles';
import { logEvent } from '../services/logEventsWithMatomo';

const PeriodSelector = ({ firstDay, setFirstDay, lastDay, period = 'day', logEventCategory, logEventAction }) => {
  const renderPeriodText = (period) => {
    switch (period) {
      case 'day':
        return 'Semaine';
      case 'week':
        return '6 semaines';
      case 'month':
        return '6 mois';
      default:
        return '';
    }
  };

  return (
    <>
      <ChangeDateContainer>
        <ChangeDateButton
          onPress={() => {
            const newFirstDay = dayjs(firstDay).add(-1, 'week');
            setFirstDay(newFirstDay);
            logEventCategory &&
              logEvent({
                category: logEventCategory,
                action: logEventAction,
                value: newFirstDay,
              });
          }}
          hitSlop={{ top: 10, bottom: 40, left: 40, right: 40 }}>
          <TextStyled>{'<'}</TextStyled>
        </ChangeDateButton>
        {firstDay.get('month') === lastDay.get('month') ? (
          <P color="#7e7e7e" noMarginBottom>
            {renderPeriodText(period)} du {dayjs(firstDay).format('D')} au {dayjs(lastDay).format('D')}{' '}
            {dayjs(lastDay).format('MMMM')}
          </P>
        ) : (
          <P color="#7e7e7e" noMarginBottom>
            {renderPeriodText(period)} du {dayjs(firstDay).format('D')} {dayjs(firstDay).format('MMM')} au{' '}
            {dayjs(lastDay).format('D')} {dayjs(lastDay).format('MMM')}
          </P>
        )}
        <ChangeDateButton
          onPress={() => {
            const newFirstDay = dayjs(firstDay).add(1, 'week');
            setFirstDay(newFirstDay);
            logEventCategory &&
              logEvent({
                category: logEventCategory,
                action: logEventAction,
                value: newFirstDay,
              });
          }}
          disabled={dayjs(lastDay).add(0, 'days').isAfter(dayjs())}
          hitSlop={{ top: 10, bottom: 40, left: 40, right: 40 }}>
          <TextStyled>{'>'}</TextStyled>
        </ChangeDateButton>
      </ChangeDateContainer>
    </>
  );
};

export default PeriodSelector;

const ChangeDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-vertical: 20px;
`;

const ChangeDateButton = styled.TouchableOpacity`
  ${(props) => props.disabled && 'opacity: 0;'}/* border: 1px solid black; */
`;
