import React from 'react';
import styled, { css } from 'styled-components';
import { mediaHeight } from '../styles/mediaQueries';
import { buttonHeight, buttonSmallHeight } from '../styles/theme';

const ButtonPrimary = ({ content, onPress, small, color, shadowColor, ...props }) => (
  <ButtonPrimaryStyled
    adjustsFontSizeToFit
    numberOfLines={1}
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
const computeButtonHeight = (small) => (small ? buttonSmallHeight : buttonHeight);

const ButtonPrimaryStyled = styled.TouchableOpacity`
  /* background-color: ${({ shadowColor }) => shadowColor || '#c0184a'}; */
  height: ${({ small }) => computeButtonHeight(small) + shadowHeight}px;
  border-radius: ${({ small }) => computeButtonHeight(small)}px;
  ${({ disabled }) => disabled && 'opacity: 0.5;'} /* SHADOW NOT WORKING IN ANDROID */
  /*
  elevation: 1;
  border-width: 0;
  shadow-offset: 0px ${shadowHeight}px;
  shadow-color: #c0184a;
  shadow-opacity: 1;
  shadow-radius: 0;
  */
  ${({ widthSmall }) => widthSmall && ` align-items: center`}
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
  background-color: ${({ color }) => color || '#de285e'};
  height: ${({ small }) => computeButtonHeight(small)}px;
  border-radius: ${({ small }) => computeButtonHeight(small)}px;
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
  color: #f9f9f9;
  font-weight: bold;
  /* margin-top: ${({ small }) => (small ? 3 : 0)}px; */
  ${bigContent}
  ${mediaHeight.medium`${mediumContent}`}
  ${mediaHeight.small`${smallContent}`}
`;

export default ButtonPrimary;
