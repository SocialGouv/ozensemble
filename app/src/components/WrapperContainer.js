import React from 'react';
import styled from 'styled-components';
import { defaultPaddingFontScale } from '../styles/theme';
import BackButton from './BackButton';
import H1 from './H1';

const WrapperContainer = ({
  backButton,
  onPressBackButton,
  title,
  marginTop,
  noPaddingTop,
  backgroundColor,
  noMarginBottom,
  children,
}) => {
  return (
    <ScreenBgStyled noPaddingTop={noPaddingTop} backgroundColor={backgroundColor}>
      <SafeBottom marginTop={marginTop} noMarginBottom={noMarginBottom}>
        {backButton && (
          <BackButtonContainer>
            <BackButton onPress={onPressBackButton} />
          </BackButtonContainer>
        )}
        {title && <Title>{title}</Title>}
        {children}
      </SafeBottom>
    </ScreenBgStyled>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#f9f9f9')};
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  padding-horizontal: ${defaultPaddingFontScale()}px;
  ${({ noPaddingTop }) => !noPaddingTop && 'padding-top: 30px'}
  ${({ noMinHeight }) => !noMinHeight && 'min-height: 100%'}
  ${({ debug }) => debug && 'border: 2px solid #000;'}
`;

const SafeBottom = styled.View`
  ${({ noMarginBottom }) => !noMarginBottom && ' margin-bottom: 150px'}
  ${({ marginTop }) => marginTop && 'margin-top: 10px'}
`;

const BackButtonContainer = styled.View`
  margin-bottom: 10px;
`;

const Title = styled(H1)`
  flex-shrink: 0;
`;

export const NoPaddingHorizontal = styled.View`
  margin-horizontal: -${defaultPaddingFontScale()}px;
`;

export default WrapperContainer;
