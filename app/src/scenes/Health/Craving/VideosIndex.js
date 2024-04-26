import { View, TouchableOpacity, Text } from 'react-native';
import WrapperContainer from '../../../components/WrapperContainer';
import ExercicesVideos from '../../../components/illustrations/ExercicesVideos';
import EntertainmentVideos from '../../../components/illustrations/EntertainmentVideos';
import ThinkVideos from '../../../components/illustrations/ThinkVideos';
import AdviceVideos from '../../../components/illustrations/AdviceVideos';
import { logEvent } from '../../../services/logEventsWithMatomo';

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
            navigation.navigate('VIDEO_PLAYER', {
              videoIds: ['AsJMwhKnL74', 'iyH2hy', 'pKu6S9uOgnU', 'Ukupnbt3RJs', 'E8mX3Sb019Q', 'HJqrj2t5TVU'],
              category: 'POSITIVITY',
              title: 'Vidéos de pensées positives',
            });
            logEvent({
              category: 'NAVIGATION',
              action: 'POSITIVE_VIDEOS',
              name: 'VIDEOS_INDEX',
            });
          }}>
          <View className="flex items-center gap-4 pt-8">
            <ThinkVideos size={100} className="" />
            <Text className="text-center text-xl   font-bold text-white">Pensées</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md bg-[#5150A2]"
          onPress={() => {
            navigation.navigate('VIDEO_PLAYER', {
              videoIds: [
                'CSjV8znEdTw',
                'uXFdywSflfA',
                'kKrLWfOHNo4',
                'HVUF8boilNo',
                'kQJ1b9gpDdE',
                'E935CvhxCH8',
                'VXUriULDUoU',
              ],
              category: 'ADVICE',
              title: 'Vidéos de conseils',
            });
            logEvent({
              category: 'NAVIGATION',
              action: 'ADVISE_VIDEOS',
              name: 'VIDEOS_INDEX',
            });
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
