import React from 'react';
import styled, { css } from 'styled-components';
import TextStyled from './TextStyled';

const QButton = ({ small, content, onPress, disabled }) => (
    <QButtonStyled onPress={onPress} disabled={disabled}>
        <QButtonContentContainer small={small} disabled={disabled}>
            <QButtonContent color="#4030a5">{content}</QButtonContent>
        </QButtonContentContainer>
    </QButtonStyled>
);

export default QButton

const qButtonSize = 40;
const QButtonStyled = styled.TouchableOpacity``;
const QButtonContentContainer = styled.View`
  height: ${qButtonSize}px;
  width: ${qButtonSize}px;
  border-radius: ${qButtonSize}px;
  border: 1px solid #dbdbe9;
  background: #eaeaed;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const QButtonContent = styled(TextStyled)`
  font-size: 23px;
  line-height: 25px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;