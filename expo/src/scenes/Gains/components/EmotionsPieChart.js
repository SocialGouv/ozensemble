import React from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import { emotionIcon } from "../../AddEmotion/contextsCatalog";

const EmotionPieChart = ({ emotionsData }) => {
  const emotionColors = {
    depressed: "#FC8383", // Red
    sad: "#FEAA5B", // Orange
    neutral: "#8E9A95", // Gray
    fine: "#39CEC1", // Teal
    ecstatic: "#34D39A", // Green
  };
  const series = Object.entries(emotionsData).map(([emotion, count]) => ({
    value: count,
    color: emotionColors[emotion],
  }));

  const totalEmotions = Object.values(emotionsData).reduce((acc, curr) => acc + curr, 0);

  if (totalEmotions === 0) {
    return <></>;
  }
  return (
    <View className="flex-1 justify-start items-start gap-4">
      <Text className="font-bold text-[#4030A5] text-lg">Humeur</Text>
      <View className="flex-1 justify-center items-center">
        <PieChart widthAndHeight={250} series={series} doughnut={true} coverRadius={0.6} coverFill={"#FFF"} />
        <View className="mt-5 flex-wrap flex-row">
          {Object.keys(emotionsData).map((emotion, index) => {
            const EmotionIcon = emotionIcon[emotion];
            return (
              <View key={index} className="flex-row items-center mb-2">
                <View
                  className="w-5 h-5 mr-2 rounded-full"
                  style={{
                    backgroundColor: emotionColors[emotion],
                  }}
                />
                {EmotionIcon && <EmotionIcon width={20} height={20} />}
                <Text className="text-base ml-2">
                  {emotionsData[emotion]} jours ({((emotionsData[emotion] / totalEmotions) * 100).toFixed(1)}%)
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default EmotionPieChart;
