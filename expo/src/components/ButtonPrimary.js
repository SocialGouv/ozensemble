import React from 'react';
import styled, { css } from 'styled-components';
import { mediaHeight } from '../styles/mediaQueries';
import TextStyled from './TextStyled';

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

const ButtonPrimaryStyled = styled.TouchableOpacity`
  ${({ disabled }) => disabled && 'opacity: 0.5;'} /* SHADOW NOT WORKING IN ANDROID */
  ${({ widthSmall }) => widthSmall && 'align-items: center'}
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
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  padding-vertical: 10px;
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

const ContentStyled = styled(TextStyled)`
  color: #f9f9f9;
  font-weight: bold;
  text-align: center;
  ${bigContent}
  ${mediaHeight.medium`${mediumContent}`}
  ${mediaHeight.small`${smallContent}`}
`;

export default ButtonPrimary;
