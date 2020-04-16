import React from 'react';
import styled from 'styled-components';
import SafeAreaView from 'react-native-safe-area-view';

const Background = ({ neverBottom, children, color, withSwiperContainer }) => {
  const Container = withSwiperContainer ? SwiperContainer : React.Fragment;
  const safeAreaProps = neverBottom ? { forceInset: { bottom: 'never' } } : {};
  return (
    <Screen color={color}>
      <SafeAreaView {...safeAreaProps}>
        <Container>{children}</Container>
      </SafeAreaView>
    </Screen>
  );
};

const Screen = styled.View`
  width: 100%;
  height: 100%;
  background: ${({ theme, color }) => theme.colors[color]};
`;

const SwiperContainer = styled.View`
  height: 100%;
  flex-grow: 1;
  flex-shrink: 0;
`;

export default Background;
