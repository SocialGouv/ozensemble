import { View, Text, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowAdvice from '../../../components/illustrations/ArrowAdvice';

const MusicAdvice = ({ navigation }) => {
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
            <Image source={require('../../../assets/images/MusicAdvice.png')} />
            <Text className="text-[#4030A5] text-3xl font-extrabold mt-3">Ecoutez de la musique</Text>
            <Text className="text-black text-center font-semibold text-lg">
              Lancez vos musiques les plus entrainantes ou apaisantes. Profitez-en pour écouter le dernier album de
              votre artiste préféré !
            </Text>
            <TouchableOpacity
              className="flex flex-row gap-2"
              onPress={() => {
                navigation.navigate('READING_ADVICE');
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

export default MusicAdvice;
