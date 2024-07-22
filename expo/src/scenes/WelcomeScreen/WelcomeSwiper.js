import React, { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { storage } from "../../services/storage";
import { ScreenCalendar, ScreenStats, ScreenDefi, ScreenAdvice } from "./Screens";
import Dot from "../../components/SwiperDot";
import { View } from "react-native";

const WelcomeSwiper = ({ navigation }) => {
  const [agreed, setAgreed] = useState(false);
  const [, setCurrentIndex] = useState(0);
  // const [pagination, setPagination] = useState(true);
  const swiperRef = useRef();

  const indexChanged = (index) => {
    setCurrentIndex(index);
  };

  const onStartPress = async () => {
    storage.set("@OnboardingDoneWithCGU", true);
    navigation.navigate("USER_SURVEY_START", { from: "NEW_USER" });
  };

  const onPressNext = () => swiperRef?.current?.scrollBy(1);

  return (
    <View className="bg-[#3E309F] w-full">
      <View className="h-[10%]" />
      <View className="h-[90%]">
        <Swiper
          className="h-full"
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
          }}>
          <ScreenCalendar onPressNext={onPressNext} />
          <ScreenStats onPressNext={onPressNext} />
          <ScreenDefi onPressNext={onPressNext} />
          <ScreenAdvice onStartPress={onStartPress} agreed={agreed} setAgreed={setAgreed} />
        </Swiper>
      </View>
    </View>
  );
};

export default WelcomeSwiper;
