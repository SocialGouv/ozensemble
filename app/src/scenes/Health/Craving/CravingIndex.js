import { ImageBackground, View, TouchableOpacity, Text } from 'react-native';
import WrapperContainer from '../../../components/WrapperContainer';
import AdvicesIcon from '../../../components/illustrations/AdvicesICon';
import BreathingIcon from '../../../components/illustrations/BreathingIcon';
import VideosIcon from '../../../components/illustrations/VideosIcon';

const CravingIndex = ({ navigation }) => {
  return (
    <WrapperContainer
      title="Craving"
      onPressBackButton={() => {
        navigation.goBack();
      }}>
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <View className="w-1/2 overflow-hidden rounded-md shadow-md">
          <ImageBackground source={require('../../../assets/images/BackGroundAdvices.png')}>
            <TouchableOpacity
              className="flex items-center gap-6 p-8"
              onPress={() => {
                navigation.navigate('HYDRATATION_ADVICE');
              }}>
              <AdvicesIcon size={80} className="" />
              <Text className="text-center text-2xl font-bold text-white">Conseils</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View className="w-1/2 overflow-hidden rounded-md shadow-md">
          <ImageBackground source={require('../../../assets/images/BackGroundBreathing.png')}>
            <TouchableOpacity
              className="flex items-center gap-6 p-8"
              onPress={() => {
                navigation.navigate('CRAVING_BREATH');
              }}>
              <BreathingIcon size={80} className="" />
              <View className="items-center">
                <Text className="text-center text-2xl font-bold text-white ">Respirer</Text>
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
      <View className="w-1/2 overflow-hidden rounded-md shadow-md">
        <ImageBackground source={require('../../../assets/images/BackGroundVideos.png')}>
          <TouchableOpacity
            className="flex items-center gap-6 p-8"
            onPress={() => {
              navigation.navigate('CRAVING_VIDEOS');
            }}>
            <VideosIcon size={80} className="" />
            <Text className="text-center text-2xl font-bold text-white">Videos</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </WrapperContainer>
  );
};

export default CravingIndex;
