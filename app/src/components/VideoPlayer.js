import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { logEvent } from '../services/logEventsWithMatomo';
import WrapperContainer from '../components/WrapperContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from './Background';

const VideoPlayer = ({ route, navigation }) => {
  const { videoIds, category, title } = route.params;
  const onStateChange = (state, videoId) => {
    if (state === 'ended') {
      logEvent({
        category: 'VIDEOS',
        action: 'VIDEO_ENDED',
        name: category + ' ' + videoId,
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
        <WrapperContainer title={title} onPressBackButton={navigation.goBack}>
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
        </WrapperContainer>
      </Background>
    </SafeAreaProvider>
  );
};

export default VideoPlayer;
