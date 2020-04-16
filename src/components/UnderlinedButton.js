import React from 'react';
import styled from 'styled-components';

const UnderlinedButton = ({ content, onPress, color, withoutPadding, bold, ...props }) => (
  <UnderlinedButtonStyled withoutPadding={withoutPadding} onPress={onPress} {...props}>
    <TextStyled bold={bold} color={color}>
      {content}
    </TextStyled>
  </UnderlinedButtonStyled>
);

const UnderlinedButtonStyled = styled.TouchableOpacity`
  ${({ withoutPadding }) => !withoutPadding && 'padding: 20px;'}
  height: ${({ theme }) => theme.dimensions.buttonHeight}px;
  justify-content: center;
  align-items: center;
`;

const TextStyled = styled.Text`
  text-decoration-line: underline;
  color: ${({ theme, color }) => color || theme.colors.basicText};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  flex-shrink: 0;
  height: ${({ theme }) => theme.dimensions.buttonHeight}px;
  font-size: 16px;
  line-height: 40px;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;

export default UnderlinedButton;
