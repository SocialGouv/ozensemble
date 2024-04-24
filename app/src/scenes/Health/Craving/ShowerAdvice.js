import { View, Text, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowAdvice from '../../../components/illustrations/ArrowAdvice';

const ShowerAdvice = ({ navigation }) => {
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
            <Image source={require('../../../assets/images/ShowerAdvice.png')} />
            <Text className="text-[#4030A5] text-3xl font-extrabold mt-3">Prenez une douche</Text>
            <Text className="text-black text-center font-semibold text-lg">
              Détentez-vous en prenant une douche chaude ou froide. Cela vous permettra de vous décontractez et de vous
              distraire.
            </Text>
            <TouchableOpacity
              className="flex flex-row gap-2"
              onPress={() => {
                navigation.navigate('MUSIC_ADVICE');
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

export default ShowerAdvice;
