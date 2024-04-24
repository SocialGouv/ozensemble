import AppointmentHeart from '../../components/illustrations/AppointmentHeart';
import ChatBubbles from '../../components/illustrations/Chatbubbles';
import CravingIcon from '../../components/illustrations/CravingIcon';
import NewsPaper from '../../components/illustrations/NewsPaper';
import { View, TouchableOpacity, Text } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';

const HealthIndex = ({ navigation }) => {
  return (
    <WrapperContainer title="Santé">
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <View className="border border-[#FF0000] bg-white  w-1/2 rounded-md shadow-md">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('CRAVING_INDEX');
            }}>
            <CravingIcon size={80} className="" />
            <Text className="text-center">M'aider avec mon craving</Text>
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
            <Text className="text-center">Prendre un RDV avec Doctolib</Text>
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
