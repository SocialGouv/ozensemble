import React from 'react';
import styled from 'styled-components';
import TextStyled from './TextStyled';
import dayjs from 'dayjs';
import { P } from './Articles';
import { logEvent } from '../services/logEventsWithMatomo';

const renderPeriodText = (period, firstDay, lastDay) => {
  switch (period) {
    case 'daily':
      return firstDay.get('month') === lastDay.get('month')
        ? `Semaine du ${dayjs(firstDay).format('D')} au ${dayjs(lastDay).format('D')} ${dayjs(lastDay).format('MMMM')}`
        : `Semaine du ${dayjs(firstDay).format('D')} ${dayjs(firstDay).format('MMM')} au ${dayjs(lastDay).format(
            'D'
          )} ${dayjs(lastDay).format('MMM')}`;
    case 'weekly':
      return firstDay.get('month') === lastDay.get('month')
        ? `6 semaines du ${dayjs(firstDay).format('D')} au ${dayjs(lastDay).format('D')} ${dayjs(lastDay).format(
            'MMMM'
          )}`
        : `6 semaines du ${dayjs(firstDay).format('D')} ${dayjs(firstDay).format('MMM')} au ${dayjs(lastDay).format(
            'D'
          )} ${dayjs(lastDay).format('MMM')}`;
    case 'monthly':
      return firstDay.get('year') === lastDay.get('year')
        ? `6 mois de ${dayjs(firstDay).format('MMMM')} à ${dayjs(lastDay).format('MMMM')} ${dayjs(lastDay).format(
            'YYYY'
          )}`
        : `6 mois de ${dayjs(firstDay).format('MMM')} ${dayjs(firstDay).format('YYYY')} à ${dayjs(lastDay).format(
            'MMM'
          )} ${dayjs(lastDay).format('YYYY')}`;
    default:
      return '';
  }
};

const PeriodSelector = ({ firstDay, setFirstDay, lastDay, period = 'daily', logEventCategory, logEventAction }) => {
  return (
    <>
      <ChangeDateContainer>
        <ChangeDateButton
          onPress={() => {
            const newFirstDay = dayjs(firstDay).add(-1, period === 'monthly' ? 'month' : 'week');
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
        <P color="#7e7e7e" noMarginBottom>
          {renderPeriodText(period, firstDay, lastDay)}
        </P>

        <ChangeDateButton
          onPress={() => {
            const newFirstDay = dayjs(firstDay).add(1, period === 'monthly' ? 'month' : 'week');
            setFirstDay(newFirstDay);
            logEventCategory &&
              logEvent({
                category: logEventCategory,
                action: logEventAction,
                value: newFirstDay,
              });
          }}
          disabled={dayjs(lastDay).add(0, 'day').isAfter(dayjs())}
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
