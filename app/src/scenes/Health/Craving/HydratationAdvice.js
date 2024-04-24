import { View, Text, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowAdvice from '../../../components/illustrations/ArrowAdvice';

const HydratationAdvice = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen p-4">
          <View className="h-full w-full flex flex-col gap-10 mb-4 pt-2 p-4 justify-center items-center">
            <BackButton
              content="< Retour"
              bold
              onPress={() => {
                navigation.navigate('CRAVING_INDEX');
              }}
              marginTop
              marginLeft
            />

            <Image source={require('../../../assets/images/HydratationAdvice.png')} />
            <Text className="text-[#4030A5] text-3xl font-extrabold mt-3">Hydratez-vous</Text>
            <Text className="text-black text-center font-semibold text-lg">
              Optez pour des boissons non alcoolisées et savoureuses (eau pétillante, jus de fruits, tisane). Ajoutez-y
              une rondelle de citron ou de concombre.
            </Text>
            <TouchableOpacity
              className="flex flex-row gap-2"
              onPress={() => {
                navigation.navigate('WALK_ADVICE');
              }}>
              <Text className="text-[#4030A5] underline font-semibold">Avoir un autre conseil</Text>
              <ArrowAdvice size={20} className="" />
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default HydratationAdvice;
