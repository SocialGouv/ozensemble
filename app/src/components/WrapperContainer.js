import React from 'react';
import styled from 'styled-components';
import { defaultPaddingFontScale } from '../styles/theme';
import BackButton from './BackButton';
import H1 from './H1';

const WrapperContainer = ({ backButton, onPressBackButton, title, marginTop, children }) => {
  return (
    <ScreenBgStyled>
      <SafeBottom marginTop={marginTop}>
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
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  padding: 30px ${defaultPaddingFontScale()}px 0px;
  ${({ noMinHeight }) => !noMinHeight && 'min-height: 100%'}
  ${({ debug }) => debug && 'border: 2px solid #000;'}
`;

const SafeBottom = styled.View`
  margin-bottom: 150px;
  ${({ marginTop }) => marginTop && 'margin-top: 10px'}
`;

const BackButtonContainer = styled.View`
  margin-bottom: 10px;
`;

const Title = styled(H1)`
  flex-shrink: 0;
`;

export default WrapperContainer;
