import { View, Text, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowAdvice from '../../../components/illustrations/ArrowAdvice';

const MusicAdvice = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <View className="h-full w-full">
        <View className="w-full h-20">
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
        </View>
        <View className="  flex flex-col gap-6 items-center">
          <View className="align-center items-center w-full">
            <Image source={require('../../../assets/images/MusicAdvice.png')} />
          </View>
          <Text className="text-[#4030A5] text-3xl font-extrabold">Ecoutez de la musique</Text>
          <Text className="text-black text-center font-semibold text-lg">
            Lancez vos musiques les plus entrainantes ou apaisantes. Profitez-en pour écouter le dernier album de votre
            artiste préféré !
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
    </SafeAreaProvider>
  );
};

export default MusicAdvice;
