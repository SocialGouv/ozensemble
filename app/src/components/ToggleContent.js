import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import GoBackButton from './GoBackButton';
import { P } from './Articles';

const ToggleContent = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <TitleStyled>
          <P noMarginBottom color="#4030a5" bold>
            {title}
          </P>
          <GoBackButton onPress={() => setVisible(!visible)} rotate={visible ? '90' : '-90'} />
        </TitleStyled>
      </TouchableOpacity>
      {visible ? <View>{children}</View> : null}
    </View>
  );
};

const TitleStyled = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 15px;
`;

export default ToggleContent;
