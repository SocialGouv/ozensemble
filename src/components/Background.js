import React from 'react';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';

const Background = ({ neverBottom, children, color, withSwiperContainer, debug }) => {
  const Container = withSwiperContainer ? SwiperContainer : React.Fragment;
  const safeAreaProps = neverBottom ? { forceInset: { bottom: 'never' } } : {};
  return (
    <Screen color={color} debug={debug}>
      <SafeAreaView {...safeAreaProps}>
        <Container>{children}</Container>
      </SafeAreaView>
    </Screen>
  );
};

const Screen = styled.View`
  width: 100%;
  height: 100%;
  background: ${({ color }) => color};
  ${({ debug }) => debug && 'border: 3px solid #000;'}
`;

const SwiperContainer = styled.View`
  height: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  ${({ debug }) => debug && 'border: 3px solid #0EE;'}
`;

export default Background;
