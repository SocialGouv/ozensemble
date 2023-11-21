import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

const Background = ({ neverBottom, children, color, withSwiperContainer, debug }) => {
  const Container = withSwiperContainer ? SwiperContainer : React.Fragment;
  const safeAreaProps = neverBottom ? { forceInset: { bottom: 'never' } } : {};
  return (
    <View className={['w-full h-full border-4'].join(' ')} style={{ background: color, borderWidth: debug ? 3 : 0 }}>
      <SafeAreaView {...safeAreaProps}>
        <Container>{children}</Container>
      </SafeAreaView>
    </View>
  );
};

const SwiperContainer = ({ children, debug }) => {
  return (
    <View
      className={['h-full flex-grow flex-shrink-0 border-4 border-red-500'].join(' ')}
      style={{ borderColor: 'red', borderWidth: debug ? 3 : 0 }}>
      {children}
    </View>
  );
};

export default Background;
