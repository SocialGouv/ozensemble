import AppointmentHeart from '../../components/illustrations/AppointmentHeart';
import ChatBubbles from '../../components/illustrations/Chatbubbles';
import NewsPaper from '../../components/illustrations/NewsPaper';
import { View, TouchableOpacity, Text } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import HealthPlan from '../../components/illustrations/HealthPlan';
import React, { useEffect, useState } from 'react';
import { storage } from '../../services/storage';
import API from '../../services/api';
import NetInfo from '@react-native-community/netinfo';

const HealthIndex = ({ navigation }) => {
  const [isWellLocated, setIsWellLocated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let location = storage.getString('isWellLocated');
      const matomoId = storage.getString('@UserIdv2');
      const ip = await NetInfo.fetch().then((state) => state.details.ipAddress);
      console.log(ip);
      const response = await API.get({ path: '/user/location', query: { matomoId, ip } });
      if (response && response.isWellLocated) {
        location = true;
      } else {
        location = false;
      }

      storage.set('isWellLocated', location);
      setIsWellLocated(location);
    };

    fetchData();
  }, []);
  return (
    <WrapperContainer title="Santé">
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <View className="border border-[#4030A5] bg-white  w-1/2 rounded-md shadow-md">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('DEFI', { screen: 'DEFIS_MENU' });
            }}>
            <HealthPlan size={80} className="" />
            <Text className="text-center">Parcours de soins</Text>
          </TouchableOpacity>
        </View>
        <View className="border border-[#4030A5] bg-white  w-1/2 rounded-md shadow-md">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('TESTIMONIES');
            }}>
            <ChatBubbles size={80} className="" />
            <Text className="text-center">Lire des témoignages</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <View className="border border-[#4030A5] bg-white  w-1/2 rounded-md shadow-md">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('CONTACT');
            }}>
            <AppointmentHeart size={80} className="" />
            {isWellLocated && <Text className="text-center">Prendre un RDV avec Doctolib</Text>}
          </TouchableOpacity>
        </View>
        <View className="border border-[#4030A5] bg-white  w-1/2 rounded-md shadow-md">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('HEALTH_ARTICLE');
            }}>
            <NewsPaper size={80} className="" />
            <Text className="text-center">Consulter des articles</Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default HealthIndex;
