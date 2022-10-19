import React from 'react';
import styled, { css } from 'styled-components';
import H2 from '../../components/H2';
import TextStyled from '../../components/TextStyled';

const Mark = ({ onPress, selected, bad, good }) => (
  <>
    <MarkContainer>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mark, i, arr) => (
        <MarkButton onPress={() => onPress(mark)} key={mark}>
          <MarkStyled withMargin={i !== arr.length - 1} selected={mark === selected}>
            <MarkText selected={mark === selected}>{mark}</MarkText>
          </MarkStyled>
        </MarkButton>
      ))}
    </MarkContainer>
    <MarkHint>
      <MarkHintText>{bad}</MarkHintText>
      <MarkHintText>{good}</MarkHintText>
    </MarkHint>
  </>
);

const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

const MarkContainer = styled.View`
  ${commonCss}
  margin-top: 15px;
  flex-direction: row;
  width: 100%;
`;

const MarkStyled = styled.View`
  height: 40px;
  ${(props) => props.withMargin && 'margin-right: 3px;'}
  border: 1px solid #b8b8b8;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  ${(props) => props.selected && 'background-color: #4030a5;'}
`;

const MarkText = styled(H2)`
  font-weight: bold;
  color: ${({ selected }) => (selected ? '#f9f9f9' : '#191919')};
`;

const MarkButton = styled.TouchableOpacity`
  flex-basis: 20px;
  flex-grow: 1;
`;

const MarkHint = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
`;

const MarkHintText = styled(TextStyled)`
  color: #999999;
`;

export default Mark;
