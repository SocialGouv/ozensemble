import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { logEvent } from '../services/logEventsWithMatomo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from './Background';
import BackButton from './BackButton';

const VideoPlayer = ({ route, navigation }) => {
  const { videoIds, category, title } = route.params;
  const onStateChange = (state, videoId) => {
    if (state === 'ended') {
      logEvent({
        category: 'VIDEOS',
        action: 'VIDEO_ENDED',
        name: category + videoId,
      });
    } else if (state === 'unstarted') {
      logEvent({
        category: 'VIDEOS',
        action: 'VIDEO_STARTED',
        name: category + ' ' + videoId,
      });
    }
  };

  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-screen">
          <ScrollView showsVerticalScrollIndicator={false} className="mx-4 mt-3 flex ">
            <BackButton content="< Retour" bold onPress={navigation.goBack} marginTop marginBottom />
            <Text className="text-[#4030A5] text-3xl font-bold mt-3">{title}</Text>
            <View className=" justify-between gap-2 items-center mt-8">
              {videoIds.map((videoId, index) => (
                <YoutubePlayer
                  key={index}
                  onChangeState={(event) => onStateChange(event, index)}
                  height={200}
                  width={300}
                  videoId={videoId}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default VideoPlayer;
