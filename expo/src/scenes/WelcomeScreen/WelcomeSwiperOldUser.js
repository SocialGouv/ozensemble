import React, { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { storage } from "../../services/storage";
import { ScreenAdvice, StepOne, StepTwo, Validation } from "./ScreensOldUser";
import Dot from "../../components/SwiperDot";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeSwiperOldUser = ({ navigation }) => {
  const [agreed, setAgreed] = useState(false);
  const [, setCurrentIndex] = useState(0);
  // const [pagination, setPagination] = useState(true);
  const swiperRef = useRef();

  const indexChanged = (index) => {
    setCurrentIndex(index);
  };

  const onStartPress = async () => {
    storage.set("@OnboardingDoneWithCGU", true);
    navigation.navigate("SIGNUP_SCREEN");
  };

  const onPressNext = () => swiperRef?.current?.scrollBy(1);

  return (
    <SafeAreaView className="bg-[#3E309F] flex-1" edges={["right", "top", "left"]}>
      <View className="flex-1">
        <Swiper
          className=""
          onIndexChanged={indexChanged}
          ref={swiperRef}
          loop={false}
          showsButtons={false}
          showsPagination={true}
          dot={<Dot />}
          activeDot={<Dot active />}
          paginationStyle={{
            justifyContent: "center",
            bottom: 108,
          }}
        >
          <StepOne onPressNext={onPressNext} />
          <StepTwo onPressNext={onPressNext} />
          <Validation onPressNext={onPressNext} />
          <ScreenAdvice onStartPress={onStartPress} agreed={agreed} setAgreed={setAgreed} />
        </Swiper>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeSwiperOldUser;
