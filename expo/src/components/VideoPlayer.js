import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { logEvent } from '../services/logEventsWithMatomo';
import WrapperContainer from '../components/WrapperContainer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from './Background';

const VideoPlayer = ({ route, navigation }) => {
  const { category, title } = route.params;
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
            {videoIds[category].map((videoId, index) => (
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

const videoIds = {
  FUNNY: ['mgfGrak7-Xs', 'gRvEAeHmkXI', 'Tcl77wCujQ4', 'JxS5E-kZc2s', 'ynBinxdfra0', 'H7zm-8X8n-c'],
  CHILL: [
    'z5fu7ibDrOo',
    'FCPdIvXo2rU',
    'tVyX2RueYAc',
    'izA3I5hT_T4',
    'CHSnz0bCaUk',
    'i810CxN5Q6Q',
    'LWfgLE8ZPtg',
    'hVvEISFw9w0',
  ],
  SENSATION: ['EzGPmg4fFL8', 'eUpwDAnkgSM', 'NtZVFUvn3_U', 'ctEksNz7tqg', 'ma67yOdMQfs', 'EZVy-Wrncyg', 'QGVIWsw-TYQ'],
  RESSENTI: ['aFEkeYEb4SY', 'bmgbJ0WIV2k', 'yUzzYkFT33k', 'y92jlo50EBw'],
  MEDITATION: [
    '3-x_zwtQrr4',
    '3nyQpBu2BSc',
    'nmCnKWMedAM',
    'l4fQ0GA1oOI',
    'p06FEzE9LOg',
    'PTsk8VHCZjM',
    'Rhse5arV-FQ',
    'PIQQugUFFeQ',
    'ZnAAJ0W3JwA',
  ],
  SOPHROLOGY: [
    'l68RrTZQdlk',
    'EBPv7L2a5Y4',
    'EkrK9LcrT6o',
    'DfJtdQ4FCaw',
    'lmy-hpAVrAQ',
    '6WvmN8xFvjI',
    'UoeOFc_jVi4',
    'pg7wdc2cHn4',
    'fcsJAIURwrg',
    'g-T87W3dqj4',
  ],
  POSITIVITY: ['AsJMwhKnL74', 'iyH2hydCqNE', 'pKu6S9uOgnU', 'Ukupnbt3RJs', 'E8mX3Sb019Q'],
  ADVICE: ['CSjV8znEdTw', 'uXFdywSflfA', 'kQJ1b9gpDdE', 'VXUriULDUoU', 'TpgB42QZxwk'],
};

export default VideoPlayer;
