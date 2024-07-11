import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../components/Background';
import WrapperContainer from '../../components/WrapperContainer';
import MeditationIcon from '../../components/illustrations/MeditationIcon';
import TTCIcon from '../../components/illustrations/TTCIcon';
import SophrologyIcon from '../../components/illustrations/SophrologyIcon';
import { logEvent } from '../../services/logEventsWithMatomo';

const ExercicesVideosIndex = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <WrapperContainer title="Exercices" onPressBackButton={navigation.goBack}>
          <View className="h-full w-full flex flex-col gap-8 ">
            <TouchableOpacity
              className="w-full flex flex-row justify-between bg-[#3E5DE6] rounded-md px-3 pt-4 pb-3"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  category: 'RESSENTI',
                  title: 'Vidéos de ressenti',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'RESSENTI_VIDEOS',
                  name: 'EXERCICES_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full h-full flex-row flex justify-between ">
                <View className="flex flex-row items-end ">
                  <Text className="text-lg font-semibold text-white w-3/4">Ressenti</Text>
                </View>
                <TTCIcon size={60} className=" mt-2 mr-2 " />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between bg-[#3E5DE6] rounded-md px-3 pt-4 pb-3"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  category: 'MEDITATION',
                  title: 'Vidéos de méditation',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'MEDITATION_VIDEOS',
                  name: 'EXERCICES_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full h-full flex-row flex justify-between ">
                <View className="flex flex-row items-end">
                  <Text className="text-lg font-semibold text-white w-3/4">Méditation</Text>
                </View>
                <MeditationIcon size={60} className="mx-2 " />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#3E5DE6] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  category: 'SOPHROLOGY',
                  title: 'Vidéos de sophrologie',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'SOPHROLOGY_VIDEOS',
                  name: 'EXERCICES_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full flex-row flex justify-between">
                <View className="flex flex-row items-end">
                  <Text className="text-lg font-semibold text-white w-3/4">Sophrologie</Text>
                </View>
                <SophrologyIcon size={60} className="mx-2 mb-1 " />
              </View>
            </TouchableOpacity>
          </View>
        </WrapperContainer>
      </Background>
    </SafeAreaProvider>
  );
};

export default ExercicesVideosIndex;
