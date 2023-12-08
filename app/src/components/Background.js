import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { SafeAreaView as Safe2 } from 'react-native-safe-area-context';

const Background = ({ neverBottom, children, color, withSwiperContainer, debug }) => {
  const Container = withSwiperContainer ? SwiperContainer : React.Fragment;
  const safeAreaProps = neverBottom ? { forceInset: { bottom: 'never' } } : {};
  return (
    <>
      <Safe2 edges={['bottom']} className="bg-white h-full">
        <View className={['w-full h-full'].join(' ')} style={{ background: color, borderWidth: debug ? 3 : 0 }}>
          <SafeAreaView {...safeAreaProps} style={{ backgroundColor: color }}>
            <Container>{children}</Container>
          </SafeAreaView>
        </View>
      </Safe2>
    </>
  );
};

const SwiperContainer = ({ children, debug }) => {
  return (
    <View
      className={['h-full flex-grow flex-shrink-0'].join(' ')}
      style={{ borderColor: 'red', borderWidth: debug ? 3 : 0 }}>
      {children}
    </View>
  );
};

export default Background;
