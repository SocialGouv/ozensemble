import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import H2 from "../../components/H2";
import StatsIcon from "../../components/illustrations/icons/StatsIcon";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import API from "../../services/api";
import { storage } from "../../services/storage";
import EmotionPieChart from "./components/EmotionsPieChart";
import ConsoPieChart from "./components/ConsoPieChart";
import GoalPieChart from "./components/GoalPieChart";

const StatistiquesGraph = ({ navigate }) => {
  const matomoId = storage.getString("@UserIdv2");
  const [emotionsData, setEmotionsData] = useState({});
  const [consos, setConsos] = useState([]);
  const [goal, setGoal] = useState({});
  const [dates, setDates] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
  });
  const [showPicker, setShowPicker] = useState({ start: false, end: false });

  const handleStartDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDates((prev) => ({
        ...prev,
        startDate: selectedDate,
      }));
      setShowPicker({ start: false, end: true });
    } else {
      setShowPicker({ start: false });
    }
  };

  const fetchStats = async () => {
    const response = await API.get({
      path: "/user/statistiques",
      query: {
        matomoId,
        startDate: dates.startDate.toISOString(),
        endDate: dates.endDate.toISOString(),
      },
    });

    if (response?.ok) {
      setEmotionsData(response.data.emotions || {});
      setConsos(response.data.consommations || []);
      setGoal(response.data.goal || {});
      console.log(response.data.goal);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [dates]);

  const handleEndDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDates((prev) => ({
        ...prev,
        endDate: selectedDate,
      }));
    }
    setShowPicker({ end: false });
  };

  return (
    <View className="flex-1 p-5 flex-col">
      <View className="flex-row items-center space-x-2 mb-5">
        <StatsIcon size={25} />
        <H2 color="#4030a5">Mes Statistiques</H2>
      </View>

      <View className="flex-row items-center space-x-4 mb-5">
        {!showPicker.start && !showPicker.end && (
          <TouchableOpacity
            className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2"
            onPress={() => setShowPicker({ start: true, end: false })}
          >
            <Ionicons name="calendar-outline" size={20} color="black" />
            <Text className="ml-2 text-black">
              {dates.startDate.toLocaleDateString()} - {dates.endDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        {showPicker.start && (
          <DateTimePicker
            value={dates.startDate}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
            maximumDate={new Date()}
          />
        )}
        {showPicker.end && (
          <DateTimePicker
            value={dates.endDate}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
            minimumDate={dates.startDate}
            maximumDate={new Date()}
          />
        )}
      </View>

      <View className="flex-col items-center space-x-4 mt-5">
        <ConsoPieChart consos={consos} />

        <EmotionPieChart emotionsData={emotionsData} />
        <GoalPieChart goal={goal} />
      </View>
    </View>
  );
};

export default StatistiquesGraph;
