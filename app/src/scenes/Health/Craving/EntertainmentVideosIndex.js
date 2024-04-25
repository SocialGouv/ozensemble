import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import ChillIcon from '../../../components/illustrations/ChillIcon';
import FunIcon from '../../../components/illustrations/FunIcon';
import SensationIcon from '../../../components/illustrations/SensationIcon';

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
              className="w-full flex flex-row justify-between items-end bg-[#C79CFF] rounded-md  pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('FUNNY_VIDEOS');
              }}>
              <View className="w-full flex-row flex justify-between ">
                <View className="w-2/3 flex flex-row items-end">
                  <Text className="text-lg font-semibold text-black ">Drôle</Text>
                </View>
                <FunIcon size={60} className="" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#C79CFF] rounded-md  pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('CHILL_VIDEOS');
              }}>
              <View className="w-full flex-row flex justify-between ">
                <View className="w-2/3 flex flex-row items-end">
                  <Text className="text-lg font-semibold text-black ">Détente</Text>
                </View>
                <ChillIcon size={60} className="" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#C79CFF] rounded-md  pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('SENSATION_VIDEOS');
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
