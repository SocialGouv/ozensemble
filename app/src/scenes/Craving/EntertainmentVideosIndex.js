import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../components/Background';
import WrapperContainer from '../../components/WrapperContainer';
import ChillIcon from '../../components/illustrations/ChillIcon';
import FunIcon from '../../components/illustrations/FunIcon';
import SensationIcon from '../../components/illustrations/SensationIcon';
import { logEvent } from '../../services/logEventsWithMatomo';

const EntertainmentVideosIndex = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <WrapperContainer title="Divertissement" onPressBackButton={navigation.goBack}>
          <View className="h-full w-full flex flex-col gap-8 ">
            <TouchableOpacity
              className="w-full flex flex-row justify-between bg-[#C79CFF] rounded-md px-3 pt-4 pb-3"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
                  category: 'FUNNY',
                  title: 'Vidéos drôles',
                });
                logEvent({
                  category: 'NAVIGATION',
                  action: 'FUNNY_VIDEOS',
                  name: 'ENTERTAINMENT_VIDEOS_INDEX',
                });
              }}>
              <View className="w-full h-full flex-row flex justify-between ">
                <View className="flex flex-row items-end ">
                  <Text className="text-lg font-semibold text-black ">Drôle</Text>
                </View>
                <FunIcon size={60} className="" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#C79CFF] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('VIDEO_PLAYER', {
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
        </WrapperContainer>
      </Background>
    </SafeAreaProvider>
  );
};

export default EntertainmentVideosIndex;
