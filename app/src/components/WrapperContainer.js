import React, { forwardRef } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { defaultPaddingFontScale } from '../styles/theme';
import BackButton from './BackButton';
import H1 from './H1';

const WrapperContainer = forwardRef(
  (
    {
      onPressBackButton,
      title,
      noPaddingTop,
      noPaddingHorizontal,
      backgroundColor,
      noMarginBottom,
      children,
      Icon,
      debug = false,
      ...props
    },
    ref
  ) => {
    console.log(Icon);
    return (
      <ScreenBgStyled ref={ref} debug={debug} noPaddingTop={noPaddingTop} backgroundColor={backgroundColor} {...props}>
        {!!onPressBackButton && (
          <BackButtonContainer debug={debug}>
            <BackButton onPress={onPressBackButton} />
          </BackButtonContainer>
        )}
        <View
          className="flex flex-row items-center space-x-2 mb-4"
          style={{ paddingHorizontal: defaultPaddingFontScale() }}>
          {!!Icon && <Icon size={25} />}
          {!!title && <H1>{title}</H1>}
        </View>
        <Content debug={debug} noPaddingHorizontal={noPaddingHorizontal}>
          {children}
        </Content>
        {!noMarginBottom && <SafeBottom debug={debug} />}
      </ScreenBgStyled>
    );
  }
);

const ScreenBgStyled = styled.ScrollView`
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#f9f9f9')};
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  ${({ noPaddingTop }) => !noPaddingTop && 'padding-top: 20px;'}
  ${({ noMinHeight }) => !noMinHeight && 'min-height: 100%'}
  ${({ debug }) => debug && 'border: 2px solid #000;'}
`;

const Content = styled.View`
  ${({ noPaddingHorizontal }) => !noPaddingHorizontal && `padding-horizontal: ${defaultPaddingFontScale()}px;`}
  ${({ debug }) => debug && 'border: 2px solid #F00;'}
`;

const SafeBottom = styled.View`
  ${({ noMarginBottom }) => !noMarginBottom && 'height: 150px;'}
  ${({ debug }) => debug && 'background-color: purple;'}
  flex-shrink: 0;
`;

const BackButtonContainer = styled.View`
  margin-bottom: 10px;
  padding-horizontal: ${defaultPaddingFontScale()}px;
  ${({ debug }) => debug && 'border: 2px solid #0F0;'}
`;

export const Title = styled(H1)`
  flex-shrink: 0;
  margin-bottom: 20px;
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

export default WrapperContainer;
