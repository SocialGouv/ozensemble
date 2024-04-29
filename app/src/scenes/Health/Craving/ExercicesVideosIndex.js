import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import MeditationIcon from '../../../components/illustrations/MeditationIcon';
import TTCIcon from '../../../components/illustrations/TTCIcon';
import SophrologyIcon from '../../../components/illustrations/SophrologyIcon';
import { logEvent } from '../../../services/logEventsWithMatomo';

const ExercicesVideosIndex = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen p-6">
          <BackButton content="< Retour" bold onPress={navigation.goBack} />

          <Text className="text-[#4030A5] text-2xl font-extrabold my-2">Exercices</Text>
          <View className="h-full w-full flex flex-col gap-10 mb-4 p-4">
            <TouchableOpacity
              className="w-full h-28 flex flex-row justify-between bg-[#3E5DE6] rounded-md px-3 pt-4 pb-3"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  videoIds: ['aFEkeYEb4SY', 'bmgbJ0WIV2k', 'XNbim0qOtMw', 'yUzzYkFT33k', 'y92jlo50EBw', 'ZMDIJC3ZMm8'],
                  category: 'TCC',
                  title: 'Vidéos de TCC',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'TCC_VIDEOS',
                  name: 'EXERCIICES_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full h-full flex-row flex justify-between ">
                <View className="flex flex-row items-end ">
                  <Text className="text-lg font-semibold text-white w-3/4">Thérapie Comportementale et Cognitive</Text>
                </View>
                <TTCIcon size={70} className=" mt-2 " />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#3E5DE6] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  videoIds: [
                    '3-x_zwtQrr4',
                    '3nyQpBu2BSc',
                    'nmCnKWMedAM',
                    'l4fQ0GA1oOI',
                    'p06FEzE9LOg',
                    'PTsk8VHCZjM',
                    'Rhse5arV-FQ',
                  ],
                  category: 'MEDITATION',
                  title: 'Vidéos de méditation',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'MEDITATION_VIDEOS',
                  name: 'EXERCIICES_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full flex-row flex justify-between">
                <View className="flex flex-row items-end">
                  <Text className="text-lg font-semibold text-white w-3/4">Méditation</Text>
                </View>
                <MeditationIcon size={70} className="mx-2" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#3E5DE6] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  videoIds: ['l68RrTZQdlk', 'EBPv7L2a5Y4', 'EkrK9LcrT6o', 'DfJtdQ4FCaw', 'lmy-hpAVrAQ'],
                  category: 'SOPHROLOGY',
                  title: 'Vidéos de sophrology',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'SOPHROLOGY_VIDEOS',
                  name: 'EXERCIICES_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full flex-row flex justify-between">
                <View className="flex flex-row items-end">
                  <Text className="text-lg font-semibold text-white w-3/4">Sophrologie</Text>
                </View>
                <SophrologyIcon size={70} className="mx-2 mb-1" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default ExercicesVideosIndex;
