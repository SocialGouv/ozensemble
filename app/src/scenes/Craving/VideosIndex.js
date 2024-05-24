import { View, TouchableOpacity, Text } from 'react-native';
import WrapperContainer from '../../components/WrapperContainer';
import ExercicesVideos from '../../components/illustrations/ExercicesVideos';
import EntertainmentVideos from '../../components/illustrations/EntertainmentVideos';
import ThinkVideos from '../../components/illustrations/ThinkVideos';
import AdviceVideos from '../../components/illustrations/AdviceVideos';
import { logEvent } from '../../services/logEventsWithMatomo';

const VideosIndex = ({ navigation }) => {
  return (
    <WrapperContainer
      title="Videos"
      onPressBackButton={() => {
        navigation.goBack();
      }}>
      <View className="h-64 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#5150A2]"
          onPress={() => {
            navigation.navigate('VIDEO_PLAYER', {
              category: 'POSITIVITY',
              title: 'Vidéos de pensées positives',
            });
            logEvent({
              category: 'NAVIGATION',
              action: 'POSITIVE_VIDEOS',
              name: 'VIDEOS_INDEX',
            });
          }}>
          <View className="flex items-center h-full justify-between pt-6 px-5 pb-5">
            <ThinkVideos size={130} className="" />
            <Text className="text-center text-lg   font-bold text-white">Pensées</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#3E5DE6]"
          onPress={() => {
            navigation.navigate('VIDEO_PLAYER', {
              category: 'ADVICE',
              title: 'Vidéos de conseils',
            });
            logEvent({
              category: 'NAVIGATION',
              action: 'ADVISE_VIDEOS',
              name: 'VIDEOS_INDEX',
            });
          }}>
          <View className="flex items-center h-full justify-between  pt-6 px-5 pb-5">
            <AdviceVideos size={130} className="" />
            <View className="items-center">
              <Text className="text-center text-lg   font-bold text-white">Conseils</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View className="h-64 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#C79CFF]"
          onPress={() => {
            navigation.navigate('ENTERTAINMENT_VIDEOS_INDEX');
          }}>
          <View className="flex items-center h-full justify-between  pt-6 px-2 pb-5">
            <EntertainmentVideos size={130} className="" />
            <Text className="text-center text-lg   font-bold text-white">Divertissement</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#ED9A4B]"
          onPress={() => {
            navigation.navigate('EXERCISES_VIDEOS_INDEX');
          }}>
          <View className="flex items-center h-full justify-between  pt-6 px-5 pb-5">
            <ExercicesVideos size={130} className="" />
            <Text className="text-center text-lg   font-bold text-white">Exercices</Text>
          </View>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default VideosIndex;
