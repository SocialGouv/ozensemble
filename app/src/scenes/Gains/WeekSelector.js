import React from 'react';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';

const WeekSelector = ({ currentWeekStart, setCurrentWeekStart }) => (
  <>
    <WeekSelectorContainer>
      <TouchableOpacity
        onPress={() => {
          setCurrentWeekStart(currentWeekStart.subtract(1, 'week'));
        }}>
        <ButtonLeft>
          <TextStyled semibold color="#767676" size={18}>
            {'<'}
          </TextStyled>
        </ButtonLeft>
      </TouchableOpacity>
      <TextStyled semibold color="#767676">
        Semaine du {currentWeekStart.format('D')} au{' '}
        {currentWeekStart.add(6, 'day').format('D') + ' ' + currentWeekStart.format('MMMM')}
        {currentWeekStart.isBefore(dayjs(), 'year') && ' ' + currentWeekStart.format('YYYY')}
      </TextStyled>
      {currentWeekStart.add(1, 'week') < dayjs() ? (
        <TouchableOpacity
          onPress={() => {
            setCurrentWeekStart(currentWeekStart.add(1, 'week'));
          }}>
          <ButtonRight>
            <TextStyled semibold color="#767676" size={18}>
              {'>'}
            </TextStyled>
          </ButtonRight>
        </TouchableOpacity>
      ) : (
        <ButtonRight>
          <TextStyled semibold color="#00000000" size={18}>
            {'>'}
          </TextStyled>
        </ButtonRight>
      )}
    </WeekSelectorContainer>
  </>
);

export default WeekSelector;

const WeekSelectorContainer = styled.View`
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const ButtonLeft = styled.View`
  padding-left: 20px;
`;
const ButtonRight = styled.View`
  padding-right: 20px;
`;
