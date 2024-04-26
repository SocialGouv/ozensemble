import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import ChillIcon from '../../../components/illustrations/ChillIcon';
import FunIcon from '../../../components/illustrations/FunIcon';
import SensationIcon from '../../../components/illustrations/SensationIcon';
import { logEvent } from '../../../services/logEventsWithMatomo';

const EntertainmentVideosIndex = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen p-4">
          <BackButton content="< Retour" bold onPress={navigation.goBack} />

          <Text className="text-[#4030A5] text-3xl font-bold my-4">Divertissement</Text>
          <View className="h-full w-full flex flex-col gap-10 mb-4 p-4">
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#C79CFF] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  videoIds: ['mgfGrak7-Xs', 'gRvEAeHmkXI', 'Tcl77wCujQ4', 'JxS5E-kZc2s', 'ynBinxdfra0', 'H7zm-8X8n-c'],
                  category: 'FUNNY',
                  title: 'Vidéos drôles',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'FUNNY_VIDEOS',
                  name: 'ENTERTAINMENT_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full flex-row flex justify-between ">
                <View className="w-2/3 flex flex-row items-end">
                  <Text className="text-lg font-semibold text-black ">Drôle</Text>
                </View>
                <FunIcon size={60} className="" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#C79CFF] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  videoIds: [
                    'z5fu7ibDrOo',
                    'FCPdIvXo2rU',
                    'tVyX2RueYAc',
                    'izA3I5hT_T4',
                    'CHSnz0bCaUk',
                    'i810CxN5Q6Q',
                    'LWfgLE8ZPtg',
                    'hVvEISFw9w0',
                  ],
                  category: 'CHILL',
                  title: 'Vidéos de détente',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'CHILL_VIDEOS',
                  name: 'ENTERTAINMENT_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full flex-row flex justify-between ">
                <View className="w-2/3 flex flex-row items-end">
                  <Text className="text-lg font-semibold text-black ">Détente</Text>
                </View>
                <ChillIcon size={60} className="" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#C79CFF] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  videoIds: ['EzGPmg4fFL8', 'eUpwDAnkgSM', 'NtZVFUvn3_U', 'ctEksNz7tqg', 'w9o0q4ZaSFw'],
                  category: 'SENSATION',
                  title: 'Vidéos de sensations',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'SENSATION_VIDEOS',
                  name: 'ENTERTAINMENT_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full flex-row flex justify-between ">
                <View className="w-2/3 flex flex-row items-end ">
                  <Text className="text-lg font-semibold text-black ">Sensation</Text>
                </View>
                <SensationIcon size={60} className="" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default EntertainmentVideosIndex;
