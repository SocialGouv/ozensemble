import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { logEvent } from '../../../services/logEventsWithMatomo';

const CravingBreath = () => {
  const navigation = useNavigation();
  const [breathTime, setBreathTime] = useState(4);
  const [pause, setPause] = useState(1);

  const dimensions = Dimensions.get('window');
  const cirleWidth = dimensions.width / 2;
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const [timeOnComponent, setTimeOnComponent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnComponent((prevTime) => prevTime + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
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
            duration: breathTime * 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(textOpacity, {
            delay: pause * 1000,
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
            delay: pause * 1000,
            toValue: 0,
            duration: breathTime * 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [breathTime, pause]);
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
      <View className="h-full w-full bg-[#fff] ">
        <BackButton
          content="< Retour"
          bold
          onPress={() => {
            logEvent({
              category: 'CRAVING',
              action: 'BREATH_LEAVE',
              value: timeOnComponent,
              name: 'CRAVING_BREATH',
            });
            console.log('timeOnComponent', timeOnComponent);
            navigation.goBack();
          }}
          marginTop
          marginLeft
        />
        <View className="h-full w-screen justify-center items-center flex flex-col">
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
                  className={`bg-purple-800 rounded-full absolute`}
                  style={{
                    opacity: 0.1,
                    transform: [{ rotateZ: rotation }, { translateX: translate }, { translateY: translate }],
                    width: cirleWidth,
                    height: cirleWidth,
                  }}
                />
              );
            }
          })}
          <View className=" absolute bottom-14 flex-row justify-between w-full px-2">
            <View className="flex-row bg-purple-800 rounded-lg items-center ">
              <TouchableOpacity
                className="  p-2"
                onPress={() => {
                  setBreathTime(parseFloat((breathTime + 0.1).toFixed(1)));
                }}>
                <Text className="text-white font-semibold">+</Text>
              </TouchableOpacity>
              <Text className="text-white font-semibold ">respiration: {breathTime}s</Text>
              <TouchableOpacity
                disabled={breathTime === 0}
                className=" p-2"
                onPress={() => {
                  setBreathTime(parseFloat((breathTime - 0.1).toFixed(1)));
                }}>
                <Text className="text-white font-semibold ">-</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row  bg-purple-800 rounded-lg items-center">
              <TouchableOpacity
                className="  p-2"
                onPress={() => {
                  setPause(parseFloat((pause + 0.1).toFixed(1)));
                }}>
                <Text className="text-white  font-semibold">+</Text>
              </TouchableOpacity>

              <Text className="text-white font-semibold ">pause: {pause}s</Text>
              <TouchableOpacity
                disabled={pause === 0}
                className="  p-2"
                onPress={() => {
                  setPause(parseFloat((pause - 0.1).toFixed(1)));
                }}>
                <Text className="text-white font-semibold">-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default CravingBreath;
