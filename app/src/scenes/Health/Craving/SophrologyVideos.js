import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../../components/Background';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';

const SophrologyVideos = () => {
  const navigation = useNavigation();

  const onGoBackRequested = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen">
          <ScrollView showsVerticalScrollIndicator={false} className="mx-4 mt-3 flex ">
            <BackButton content="< Retour" bold onPress={onGoBackRequested} marginTop marginBottom />

            <Text className="text-[#4030A5] text-3xl font-bold mt-3">Vidéos de sophrologie</Text>
            <View className=" justify-between gap-2 items-center mt-8">
              <YoutubePlayer height={200} width={300} videoId="AsJMwhKnL74" />
              <YoutubePlayer height={200} width={300} videoId="iyH2hydCqNE" />
              <YoutubePlayer height={200} width={300} videoId="pKu6S9uOgnU" />
              <YoutubePlayer height={200} width={300} videoId="Ukupnbt3RJs" />
              <YoutubePlayer height={200} width={300} videoId="E8mX3Sb019Q" />
              <YoutubePlayer height={200} width={300} videoId="HJqrj2t5TVU" />
            </View>
          </ScrollView>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default SophrologyVideos;
