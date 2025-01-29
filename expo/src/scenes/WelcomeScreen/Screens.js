import React from "react";
import TextStyled from "../../components/TextStyled";
import Agreement from "./Agreement";
import { Image, View, Text } from "react-native";
import { screenWidth } from "../../styles/theme";
import Wave from "../../components/illustrations/onboarding/Wave";
import ButtonPrimary from "../../components/ButtonPrimary";
import NotificationService from "../../services/notifications";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const ScreenFeedback = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3">
      <View className="px-5">
        <Text className="text-center text-white text-2xl font-bold ">Nos utilisateurs en parlent</Text>
      </View>
      <View className="flex items-center space-y-5 p-8">
        <View className="flex flex-col space-y-2 ">
          <View className="items-end flex transform scale-x-[-1]">
            <MaterialIcons name="chat" size={40} color="white" />
          </View>
          <Text className="text-white text-lg font-semibold text-center">
            “ Permet de faire le point et de se fixer des objectifs simplement et sans culpabilité. ”
          </Text>
        </View>
        <View className="flex flex-col space-y-2 ">
          <View className="items-end flex mr-4">
            <MaterialIcons name="chat" size={40} color="white" />
          </View>
          <Text className="text-white text-lg font-semibold text-center">
            “ Application très bien pensée et indispensable si vous voulez suivre votre consommation. ”
          </Text>
        </View>
        <View className="flex flex-col space-y-2 ">
          <View className="items-end flex  transform scale-x-[-1]">
            <MaterialIcons name="chat" size={40} color="white" />
          </View>
          <Text className="text-white text-lg font-semibold text-center">
            “L’app est fabuleuse en terme d’accompagnement, de recommandations et de suivi au quotidien”
          </Text>
        </View>
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={0} size={screenWidth} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const ScreenCalendar = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Fixez votre objectif et{"\n"}ajoutez vos consommations
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require("../../assets/illustrations/screen_calendar.png")}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={1} size={screenWidth + 4} />
      </View>
      <ButtonPrimary
        content="Suivant"
        AnimationEffect
        onPress={async () => {
          await NotificationService.checkAndAskForPermission();
          onPressNext();
        }}
      />
    </View>
  </View>
);

export const ScreenStats = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Suivez vos consommations{"\n"}dans le temps
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require("../../assets/illustrations/screen_stats.png")}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={2} size={screenWidth} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const ScreenDefi = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Explorez les activités et{"\n"}les articles santé
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require("../../assets/illustrations/screen_defi.png")}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={3} size={screenWidth} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const ScreenCraving = ({ onPressNext }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Surmontez une envie intense de consommer avec des activités et conseils
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require("../../assets/illustrations/screen_craving.png")}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={4} size={screenWidth} />
      </View>
      <ButtonPrimary content="Suivant" AnimationEffect onPress={onPressNext} />
    </View>
  </View>
);

export const ScreenAdvice = ({ onStartPress, agreed, setAgreed }) => (
  <View className="h-full">
    <View className="h-2/3 justify-center">
      <View className="px-5">
        <TextStyled className="text-center text-white text-2xl font-bold -bottom-4">
          Recevez des conseils personnalisés
        </TextStyled>
      </View>
      <View className="flex-1 items-center">
        <Image
          source={require("../../assets/illustrations/screen_advice.png")}
          resizeMode="contain"
          className={"h-full w-[80%]"}
        />
      </View>
    </View>
    <View className="h-1/3 pb-12 justify-end items-center">
      <View className="absolute -bottom-0">
        <Wave currentIndex={5} size={screenWidth} />
      </View>
      <Agreement onAgree={() => setAgreed(!agreed)} agreed={agreed} className="" />
      <ButtonPrimary content={"C'est parti"} AnimationEffect onPress={onStartPress} disabled={!agreed} />
    </View>
  </View>
);
