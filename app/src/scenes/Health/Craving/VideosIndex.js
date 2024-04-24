import { View, TouchableOpacity, Text } from 'react-native';
import WrapperContainer from '../../../components/WrapperContainer';
import ExercicesVideos from '../../../components/illustrations/ExercicesVideos';
import EntertainmentVideos from '../../../components/illustrations/EntertainmentVideos';
import ThinkVideos from '../../../components/illustrations/ThinkVideos';
import AdviceVideos from '../../../components/illustrations/AdviceVideos';

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
            <ThinkVideos size={100} className="" />
            <Text className="text-center text-2xl font-bold text-white">Pensées</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2  rounded-md shadow-md bg-[#3E5DE6]">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('ADVISE_VIDEOS');
            }}>
            <AdviceVideos size={100} className="" />
            <View className="items-center">
              <Text className="text-center text-2xl font-bold text-white ">Conseils</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <View className="w-1/2  rounded-md shadow-md bg-[#C79CFF]">
          <TouchableOpacity
            className="flex items-center gap-2 p-8"
            onPress={() => {
              navigation.navigate('ENTERTAINMENT_VIDEOS_INDEX');
            }}>
            <EntertainmentVideos size={100} className="" />
            <Text className="text-center text-2xl font-bold text-white">Divertissement</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2  rounded-md shadow-md bg-[#ED9A4B]">
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('EXERCISES_VIDEOS_INDEX');
            }}>
            <ExercicesVideos size={100} className="" />
            <Text className="text-center text-2xl font-bold text-white">Exercices</Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default VideosIndex;
