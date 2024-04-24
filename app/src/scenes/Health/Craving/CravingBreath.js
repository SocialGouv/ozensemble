import { View, Text, Dimensions, Animated } from 'react-native';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

const CravingBreath = () => {
  const navigation = useNavigation();

  const dimensions = Dimensions.get('window');
  const cirleWidth = dimensions.width;
  const cirleHeight = dimensions.height;
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          delay: 1000,
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          delay: 1000,
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    ])
  ).start();
  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, cirleWidth / 6],
  });
  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <View className="h-full w-screen bg-[#fff]">
        <BackButton content="< Retour" bold onPress={navigation.goBack} marginTop marginLeft />
        <View className="h-full w-screen justify-center items-center">
          <Animated.View className="justify-center items-center" style={{ opacity: textOpacity }}>
            <Text className="text-[#4030A5] text-3xl font-bold absolute">Inspirez</Text>
          </Animated.View>
          <Animated.View className="justify-center items-center" style={{ opacity: exhale }}>
            <Text className="text-[#4030A5] text-3xl font-bold text-center absolute">Expirez</Text>
          </Animated.View>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
            {
              const rotation = move.interpolate({
                inputRange: [0, 1],
                outputRange: [`${index * 45}deg`, `${index * 45 + 180}deg`],
              });
              return (
                <Animated.View
                  key={index}
                  className={`bg-purple-800  w-1/2 rounded-full h-1/4 absolute`}
                  style={{
                    opacity: 0.1,
                    transform: [{ rotateZ: rotation }, { translateX: translate }, { translateY: translate }],
                  }}
                />
              );
            }
          })}
        </View>
      </View>
    </Background>
  );
};

export default CravingBreath;
