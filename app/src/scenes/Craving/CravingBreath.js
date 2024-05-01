import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { logEvent } from '../../services/logEventsWithMatomo';

const CravingBreath = () => {
  const navigation = useNavigation();
  const [breathTime, setBreathTime] = useState(4);
  const [pause, setPause] = useState(1);

  const dimensions = Dimensions.get('window');
  const cirleWidth = dimensions.width / 2;
  const move = useRef(new Animated.Value(0)).current;
  const inhaleOpacity = useRef(new Animated.Value(0)).current;
  const exhaleOpacity = useRef(new Animated.Value(0)).current;
  const holdOpacity = useRef(new Animated.Value(0)).current;
  const [timeOnComponent, setTimeOnComponent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnComponent((prevTime) => prevTime + 1);
      if (timeOnComponent >= 90) {
        navigation.goBack();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(exhaleOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(inhaleOpacity, {
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
          Animated.timing(move, {
            toValue: 1,
            duration: pause * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(holdOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(inhaleOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(holdOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(exhaleOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(move, {
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
            navigation.goBack();
          }}
          marginTop
          marginLeft
        />
        <View className="h-full w-screen justify-center items-center flex flex-col">
          <Animated.View className="justify-center items-center" style={{ opacity: inhaleOpacity }}>
            <Text className="text-[#4030A5] text-3xl font-bold absolute">Inspirez</Text>
          </Animated.View>
          <Animated.View className="justify-center items-center" style={{ opacity: exhaleOpacity }}>
            <Text className="text-[#4030A5] text-3xl font-bold text-center absolute">Expirez</Text>
          </Animated.View>
          <Animated.View className="justify-center items-center" style={{ opacity: holdOpacity }}>
            <Text className="text-[#4030A5] text-3xl font-bold text-center absolute">Maintenez</Text>
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
          <View className=" absolute bottom-16 flex-row justify-between w-full px-4">
            <View className="flex-row bg-purple-800 rounded-lg items-center ">
              <TouchableOpacity
                disabled={breathTime === 0}
                className=" p-2"
                onPress={() => {
                  setBreathTime(parseFloat((breathTime - 0.1).toFixed(1)));
                }}>
                <Text className="text-white font-semibold ">-</Text>
              </TouchableOpacity>
              <Text className="text-white font-semibold ">respiration: {breathTime}s</Text>
              <TouchableOpacity
                className="  p-2"
                onPress={() => {
                  setBreathTime(parseFloat((breathTime + 0.1).toFixed(1)));
                }}>
                <Text className="text-white font-semibold">+</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row  bg-purple-800 rounded-lg items-center">
              <TouchableOpacity
                disabled={pause === 0}
                className="  p-2"
                onPress={() => {
                  setPause(parseFloat((pause - 0.1).toFixed(1)));
                }}>
                <Text className="text-white font-semibold">-</Text>
              </TouchableOpacity>
              <Text className="text-white font-semibold ">pause: {pause}s</Text>
              <TouchableOpacity
                className="  p-2"
                onPress={() => {
                  setPause(parseFloat((pause + 0.1).toFixed(1)));
                }}>
                <Text className="text-white  font-semibold">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default CravingBreath;
