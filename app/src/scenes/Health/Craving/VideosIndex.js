import { View, TouchableOpacity, Text } from 'react-native';
import WrapperContainer from '../../../components/WrapperContainer';
import AdvicesIcon from '../../../components/illustrations/AdvicesICon';
import BreathingIcon from '../../../components/illustrations/BreathingIcon';
import VideosIcon from '../../../components/illustrations/VideosIcon';

const VideosIndex = ({ navigation }) => {
  return (
    <WrapperContainer
      title="Videos"
      onPressBackButton={() => {
        navigation.goBack();
      }}>
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <View className="w-1/2  rounded-md shadow-md bg-[#5150A2]">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('POSITIVE_VIDEOS');
            }}>
            <AdvicesIcon size={80} className="" />
            <Text className="text-center text-2xl font-bold text-white">Pensées</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2  rounded-md shadow-md bg-[#3E5DE6]">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('ADVISE_VIDEOS');
            }}>
            <BreathingIcon size={80} className="" />
            <View className="items-center">
              <Text className="text-center text-2xl font-bold text-white ">Conseils</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <View className="w-1/2  rounded-md shadow-md bg-[#C79CFF]">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('ENTERTAINMENT_VIDEOS_INDEX');
            }}>
            <VideosIcon size={80} className="" />
            <Text className="text-center text-2xl font-bold text-white">Se divertir</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2  rounded-md shadow-md bg-[#ED9A4B]">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('EXERCISES_VIDEOS_INDEX');
            }}>
            <VideosIcon size={80} className="" />
            <Text className="text-center text-2xl font-bold text-white">Exercices</Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default VideosIndex;
