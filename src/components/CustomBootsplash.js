import React from 'react';
import { Dimensions, Modal } from 'react-native';
import { atom, useRecoilValue } from 'recoil';
import styled from 'styled-components';

// waiting for RNBootSplah.show to come back
export const showBootSplashState = atom({
  key: 'showBootSplashState',
  default: false,
});

const CustomBootsplash = () => {
  const showBootSplash = useRecoilValue(showBootSplashState);

  return (
    <Modal visible={showBootSplash} animationType="fade">
      <FullScreen>
        <StyledImage source={require('../assets/images/Icon.png')} />
      </FullScreen>
    </Modal>
  );
};

const FullScreen = styled.View`
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: #4030a5;
`;

const StyledImage = styled.Image`
  width: ${Dimensions.get('window').width / 2}px;
  height: ${Dimensions.get('window').width / 2}px;
`;

export default CustomBootsplash;
