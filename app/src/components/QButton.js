import React from 'react';
import styled from 'styled-components';
import TextStyled from './TextStyled';

const QButton = ({
  small,
  content,
  onPress,
  disabled,
  colorText = '#4030a5',
  colorBorder = '#dbdbe9',
  colorBackground = ' #eaeaed',
}) => (
  <QButtonStyled onPress={onPress} disabled={disabled}>
    <QButtonContentContainer small={small} colorBorder={colorBorder} colorBackground={colorBackground}>
      <QButtonContent color={colorText}>{content}</QButtonContent>
    </QButtonContentContainer>
  </QButtonStyled>
);

export default QButton;

const qButtonSize = 40;
const QButtonStyled = styled.TouchableOpacity``;
const QButtonContentContainer = styled.View`
  height: ${qButtonSize}px;
  width: ${qButtonSize}px;
  border-radius: ${qButtonSize}px;
  border: 1px solid ${({ colorBorder }) => colorBorder};
  background: ${({ colorBackground }) => colorBackground};
  justify-content: center;
  align-items: center;
`;

const QButtonContent = styled(TextStyled)`
  font-size: 23px;
  line-height: 25px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;
