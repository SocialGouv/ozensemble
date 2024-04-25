import { View, Text, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowAdvice from '../../../components/illustrations/ArrowAdvice';

const WalkAdvice = ({ navigation }) => {
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
          <View className="align-center items-center">
            <Image source={require('../../../assets/images/WalkAdvice.png')} className="" />
          </View>
          <Text className="text-[#4030A5] text-3xl font-extrabold">Allez vous balader</Text>
          <Text className="text-black text-center font-semibold text-lg">
            Profitez-en pour aller prendre l’air. Faites une marche de 15 minutes, allez découvrir un endroit que vous
            ne connaissez pas.{' '}
          </Text>
          <TouchableOpacity
            className="flex flex-row gap-2"
            onPress={() => {
              navigation.navigate('SHOWER_ADVICE');
            }}>
            <Text className="text-[#4030A5] underline font-semibold">Avoir un autre conseil</Text>
            <ArrowAdvice size={20} className="" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default WalkAdvice;
