import React from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";

const ConsoPieChart = ({ consos }) => {
  const consoColors = {
    beer: "#FBD361",
    hard: "#C79CFF",
    wine: "#39CEC1",
    cider: "#FE9933",
    aperitive: "#DE285E",
    champagne: "#4030A5",
    personalised: "#CFD5F6",
  };

  const frenchTranslations = {
    beer: "Bière",
    hard: "Alcool fort",
    wine: "Vin",
    cider: "Cidre",
    aperitive: "Apéritif",
    champagne: "Champagne",
    personalised: "Personnalisé",
  };

  // Prepare series with values and colors
  const series = Object.entries(consos).map(([category, value]) => ({
    value,
    color: consoColors[category],
  }));

  const totalConsos = series.reduce((acc, curr) => acc + curr.value, 0);

  if (!totalConsos) {
    return (
      <View className="flex-1 justify-start items-start gap-4">
        <Text className="font-bold text-[#4030A5] text-lg">Répartition des consommations</Text>
        <Text className="text-base">Pas de consommation sur la période</Text>
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
                {item.value} doses ({((item.value / totalConsos) * 100).toFixed(1)}%)
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ConsoPieChart;
