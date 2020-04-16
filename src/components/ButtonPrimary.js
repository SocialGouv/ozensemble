import React from 'react';
import styled, { css } from 'styled-components';
import { mediaHeight } from '../styles/mediaQueries';

const ButtonPrimary = ({ content, onPress, small, color, shadowColor, ...props }) => (
  <ButtonPrimaryStyled
    adjustsFontSizeToFit
    numberOfLines={1}
    withShadow
    onPress={onPress}
    small={small}
    shadowColor={shadowColor}
    {...props}>
    <ButtonContainer small={small} color={color}>
      <ContentStyled small={small}>{content}</ContentStyled>
    </ButtonContainer>
  </ButtonPrimaryStyled>
);

const shadowHeight = 4;
const computeButtonHeight = (small, theme) =>
  small ? theme.dimensions.buttonSmallHeight : theme.dimensions.buttonHeight;

const ButtonPrimaryStyled = styled.TouchableOpacity`
  background-color: ${({ theme, shadowColor }) => shadowColor || theme.colors.buttonPrimaryShadow};
  height: ${({ small, theme }) => computeButtonHeight(small, theme) + shadowHeight}px;
  border-radius: ${({ small, theme }) => computeButtonHeight(small, theme)}px;
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
  /* SHADOW NOT WORKING IN ANDROID */
  /*
  elevation: 1;
  border-width: 0;
  shadow-offset: 0px ${shadowHeight}px;
  shadow-color: ${({ theme }) => theme.colors.buttonPrimaryShadow};
  shadow-opacity: 1;
  shadow-radius: 0;
  */
`;

const bigPadding = css`
  padding-horizontal: ${({ small }) => (small ? 15 : 30)}px;
`;

const mediumPadding = css`
  padding-horizontal: ${({ small }) => (small ? 15 : 30)}px;
`;

const smallPadding = css`
  padding-horizontal: ${({ small }) => (small ? 10 : 15)}px;
`;

const ButtonContainer = styled.View`
  background-color: ${({ theme, color }) => color || theme.colors.buttonPrimary};
  height: ${({ small, theme }) => computeButtonHeight(small, theme)}px;
  border-radius: ${({ small, theme }) => computeButtonHeight(small, theme)}px;
  justify-content: center;
  align-items: center;
  ${bigPadding}
  ${mediaHeight.medium`${mediumPadding}`}
  ${mediaHeight.small`${smallPadding}`}
`;

const bigContent = css`
  font-size: ${({ small }) => (small ? 15 : 20)}px;
`;

const mediumContent = css`
  font-size: ${({ small }) => (small ? 13 : 18)}px;
`;

const smallContent = css`
  font-size: ${({ small }) => (small ? 13 : 15)}px;
`;

const ContentStyled = styled.Text`
  color: ${({ theme }) => theme.colors.whiteBg};
  font-weight: bold;
  margin-top: ${({ small }) => (small ? 3 : 0)}px;
  ${bigContent}
  ${mediaHeight.medium`${mediumContent}`}
  ${mediaHeight.small`${smallContent}`}
`;

export default ButtonPrimary;
