import { ImageBackground, View, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import AdvicesIcon from '../../components/illustrations/AdvicesICon';
import BreathingIcon from '../../components/illustrations/BreathingIcon';
import VideosIcon from '../../components/illustrations/VideosIcon';
import ModalCraving from '../../components/ModalCraving';
import { storage } from '../../services/storage';

const CravingIndex = ({ navigation }) => {
  const [firstTimeOnCraving, setfirstTimeOnCraving] = useState(storage.getBoolean('firstTimeOnCraving'));

  return (
    <WrapperContainer title="Craving">
      <View className="h-52 w-full flex flex-row space-x-4 justify-between mb-2 pt-2 ">
        <TouchableOpacity
          className="flex-1  rounded-md overflow-hidden"
          onPress={() => {
            navigation.navigate('HYDRATION_ADVICE');
            logEvent({
              category: 'CRAVING_ADVICE',
              action: 'HYDRATION_ADVICE',
            });
          }}>
          <ImageBackground className="w-full h-full" source={require('../../assets/images/BackGroundAdvices.png')}>
            <View className="flex items-center h-full justify-between py-6 ">
              <AdvicesIcon size={100} className="" />
              <Text className=" text-xl  font-bold text-white">Conseils</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 rounded-md overflow-hidden"
          onPress={() => {
            navigation.navigate('CRAVING_BREATH');
          }}>
          <ImageBackground className="w-full h-full" source={require('../../assets/images/BackGroundBreathing.png')}>
            <View className="flex items-center h-full justify-between py-6 ">
              <BreathingIcon size={100} className="" />
              <Text className="text-center text-xl  font-bold text-white">Respiration</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View className="h-52 w-1/2 flex flex-row justify-between mb-4 pt-2 pr-2">
        <TouchableOpacity
          className="w-full rounded-md overflow-hidden"
          onPress={() => {
            navigation.navigate('CRAVING_VIDEOS');
          }}>
          <ImageBackground className="w-full h-full" source={require('../../assets/images/BackGroundVideos.png')}>
            <View className="flex items-center h-full justify-between py-6 ">
              <VideosIcon size={100} className="" />
              <Text className="text-center text-xl  font-bold text-white">Videos</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <ModalCraving
        firstTimeOnCraving={firstTimeOnCraving}
        onClose={() => {
          storage.set('firstTimeOnCraving', false);
          setfirstTimeOnCraving(false);
        }}
      />
    </WrapperContainer>
  );
};

export default CravingIndex;
