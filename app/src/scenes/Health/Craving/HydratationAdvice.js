import { View, Text, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowAdvice from '../../../components/illustrations/ArrowAdvice';
import HydrationIcon from '../../../components/illustrations/HydrationIcon';

const HydratationAdvice = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="w-full h-full">
          <BackButton
            content="< Retour"
            bold
            onPress={() => {
              navigation.navigate('CRAVING_INDEX');
            }}
            marginTop
            marginLeft
            marginBottom
          />
          <View className="flex  flex-col items-center h-5/6 justify-between p-8">
            <HydrationIcon className="" size={300} />
            <Text className="text-[#4030A5] text-3xl font-extrabold">Hydratez-vous</Text>
            <Text className="text-black text-center font-semibold text-lg">
              Optez pour des boissons non alcoolisées et savoureuses (eau pétillante, jus de fruits, tisane). Ajoutez-y
              une rondelle de citron ou de concombre.{' '}
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
