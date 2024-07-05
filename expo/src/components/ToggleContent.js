import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import GoBackButton from './GoBackButton';
import { P } from './Articles';
import { defaultPaddingFontScale } from '../styles/theme';

const ToggleContent = ({ children, title, paddingHorizontal }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      {paddingHorizontal ? (
        <PaddingContainer>
          <TouchableOpacityContent visible={visible} title={title} setVisible={setVisible} />
        </PaddingContainer>
      ) : (
        <TouchableOpacityContent visible={visible} title={title} setVisible={setVisible} />
      )}
      {visible ? <View>{children}</View> : null}
    </View>
  );
};

const TouchableOpacityContent = ({ visible, title, setVisible }) => (
  <TouchableOpacity onPress={() => setVisible(!visible)}>
    <TitleStyled>
      <P noMarginBottom color="#4030a5" bold>
        {title}
      </P>
      <GoBackButton onPress={() => setVisible(!visible)} rotate={visible ? '90' : '-90'} />
    </TitleStyled>
  </TouchableOpacity>
);

const PaddingContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const TitleStyled = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 15px;
`;

export default ToggleContent;
