import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowAdvice from '../../../components/illustrations/ArrowAdvice';
import ReadingIcon from '../../../components/illustrations/ReadingIcon';

const ReadingAdvice = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-full">
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
            <ReadingIcon className="" size={300} />
            <Text className="text-[#4030A5] text-3xl font-extrabold">Lisez une revue</Text>
            <Text className="text-black text-center font-semibold text-lg">
              Profitez de ce moment pour démarrer un livre que vous souhaitiez lire, ou pour lire une revue ou un
              article.
            </Text>
            <TouchableOpacity
              className="flex flex-row gap-2"
              onPress={() => {
                navigation.navigate('HYDRATATION_ADVICE');
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

export default ReadingAdvice;
