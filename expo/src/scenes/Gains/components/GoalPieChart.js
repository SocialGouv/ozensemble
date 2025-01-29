import React from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";

const GoalPieChart = ({ goal }) => {
  const consoColors = {
    none: "#39CEC1",
    under: "#4030A5",
    above: "#E74C3C",
  };

  const frenchTranslations = {
    none: "Pas bu",
    under: "Dans l’objectif",
    above: "Au-dessus de l’objectif",
  };

  const series = Object.entries(goal).map(([status, value]) => ({
    value,
    color: consoColors[status],
  }));

  const totalDays = series.reduce((acc, curr) => acc + curr.value, 0);

  if (!totalDays) {
    return (
      <View className="flex-1 justify-start items-start gap-4">
        <Text className="font-bold text-[#4030A5] text-lg">Répartition des consommations</Text>
        <Text className="text-base">Pas de données disponibles</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-start items-start gap-4">
      <Text className="font-bold text-[#4030A5] text-lg">Répartition des consommations</Text>
      <View className="flex-1 justify-center items-center">
        <PieChart
          widthAndHeight={250}
          series={series.map((item) => ({
            value: item.value,
            color: item.color,
          }))}
          doughnut={true}
          coverRadius={0.6}
          coverFill={"#FFF"}
        />
        <View className="mt-5 flex-wrap flex-row">
          {series.map((item, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <View
                className="w-5 h-5 mr-2 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />
              <Text className="text-base ml-2">
                {frenchTranslations[Object.keys(consoColors).find((key) => consoColors[key] === item.color)]} :{" "}
                {item.value} jours ({((item.value / totalDays) * 100).toFixed(1)}%)
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default GoalPieChart;
