import React from "react";
import { Path, Svg } from "react-native-svg";
import { View, Text, TouchableOpacity } from "react-native";
import { hitSlop } from "../../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { storage } from "../../services/storage";

const ExportedDataDone = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <SafeAreaView className="flex flex-grow justify-center items-center">
      <View className="bg-white rounded-xl max-w-[90%]">
        <View className="flex flex-row justify-center mt-4 mb-2 mx-4">
          <View className="h-5 flex flex-row  justify-end">
            <TouchableOpacity
              hitSlop={hitSlop(15)}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Svg fill="none" viewBox="0 0 24 24" className="h-5 w-5">
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  stroke="black"
                  d="M6 18L18 6M6 6l12 12"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <View className="flex w-full px-2 my-8">
            <Text className="text-[#4030A5] font-bold text-2xl">Données exportées</Text>
            <Text className="text-black font-semibold mt-4">
              Vos données ont été exportées avec succès. Veuillez utiliser le téléphone dans lequel vous les avez
              importées.
            </Text>
            <View className="flex flex-row mt-6 space-x-2">
              <Checkbox value={checked} onValueChange={setChecked} />
              <Text className="text-[#4030A5] font-semibold">Ne pas me le rappeler</Text>
            </View>
            <View className="flex flex-row justify-center mt-6">
              <TouchableOpacity
                className="justify-center items-center rounded-3xl"
                onPress={() => {
                  navigation.goBack();
                  if (checked) {
                    storage.set("@ExportedData", false);
                  }
                }}
              >
                <Text className="text-[#4030A5] font-semibold underline">Continuer tout de même</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExportedDataDone;
