import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import MeditationIcon from '../../../components/illustrations/MeditationIcon';
import TTCIcon from '../../../components/illustrations/TTCIcon';
import SophrologyIcon from '../../../components/illustrations/SophrologyIcon';

const ExercicesVideosIndex = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen p-4">
          <BackButton content="< Retour" bold onPress={navigation.goBack} />

          <Text className="text-[#4030A5] text-3xl font-bold my-4">Exercices</Text>
          <View className="h-full w-full flex flex-col gap-10 mb-4 p-4">
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#3E5DE6] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('THERAPY_VIDEOS');
              }}>
              <View className="w-full flex-row flex justify-between">
                <View className="w-2/3 flex flex-row items-end">
                  <Text className="text-lg font-semibold text-white ">Thérapie Comportementale et Cognitive</Text>
                </View>
                <TTCIcon size={70} className="" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#3E5DE6] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('MEDITATION_VIDEOS');
              }}>
              <View className="w-full flex-row flex justify-between">
                <View className="w-2/3 flex flex-row items-end">
                  <Text className="text-lg font-semibold text-white ">Méditation</Text>
                </View>
                <MeditationIcon size={70} className="" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-full flex flex-row justify-between items-end bg-[#3E5DE6] rounded-md pt-5 px-3 pb-3 shadow-md"
              onPress={() => {
                navigation.navigate('SOPHROLOGY_VIDEOS');
              }}>
              <View className="w-full flex-row flex justify-between">
                <View className="w-2/3 flex flex-row items-end">
                  <Text className="text-lg font-semibold text-white ">Sophrologie</Text>
                </View>
                <SophrologyIcon size={70} className="" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default ExercicesVideosIndex;
