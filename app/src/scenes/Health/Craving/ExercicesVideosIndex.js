import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import MeditationIcon from '../../../components/illustrations/MeditationIcon';

const ExercicesVideosIndex = () => {
  const navigation = useNavigation();

  const onGoBackRequested = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen p-4">
          <BackButton content="< Retour" bold onPress={onGoBackRequested} />

          <Text className="text-[#4030A5] text-3xl font-bold mt-3">Exercices</Text>
          <View className="">
            <TouchableOpacity
              className=""
              onPress={() => {
                navigation.navigate('CRAVING_ADVICES');
              }}>
              <MeditationIcon size={80} className="" />
              <Text className="text-center text-2xl font-bold text-white">Conseils</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center gap-6 p-8"
              onPress={() => {
                navigation.navigate('CRAVING_ADVICES');
              }}>
              <MeditationIcon size={80} className="" />
              <Text className="text-center text-2xl font-bold text-white">Conseils</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex items-center gap-6 p-8"
              onPress={() => {
                navigation.navigate('CRAVING_ADVICES');
              }}>
              <MeditationIcon size={80} className="" />
              <Text className="text-center text-2xl font-bold text-white">Conseils</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default ExercicesVideosIndex;
