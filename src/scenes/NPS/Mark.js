import React from 'react';
import { MarkButton, MarkContainer, MarkHint, MarkHintText, MarkStyled, MarkText } from './styles';

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

export default Mark;
