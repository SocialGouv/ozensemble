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
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#5150A2]"
          onPress={() => {
            navigation.navigate('POSITIVE_VIDEOS');
          }}>
          <View className="flex items-center gap-4 pt-8">
            <ThinkVideos size={100} className="" />
            <Text className="text-center text-xl   font-bold text-white">Pensées</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#3E5DE6]"
          onPress={() => {
            navigation.navigate('ADVISE_VIDEOS');
          }}>
          <View className="flex items-center gap-4 pt-8">
            <AdviceVideos size={100} className="" />
            <View className="items-center">
              <Text className="text-center text-xl   font-bold text-white ">Conseils</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#C79CFF]"
          onPress={() => {
            navigation.navigate('ENTERTAINMENT_VIDEOS_INDEX');
          }}>
          <View className="flex items-center gap-4 pt-8">
            <EntertainmentVideos size={100} className="" />
            <Text className="text-center text-lg   font-bold text-white">Divertissement</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#ED9A4B]"
          onPress={() => {
            navigation.navigate('EXERCISES_VIDEOS_INDEX');
          }}>
          <View className="flex items-center gap-4 pt-8">
            <ExercicesVideos size={100} className="" />
            <Text className="text-center text-xl   font-bold text-white">Exercices</Text>
          </View>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default VideosIndex;
