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
      <View className="h-56 w-full flex flex-row gap-4 justify-between mb-4 pt-2 pr-4 ">
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md overflow-hidden"
          onPress={() => {
            navigation.navigate('HYDRATATION_ADVICE');
          }}>
          <ImageBackground className="w-full h-full" source={require('../../assets/images/BackGroundAdvices.png')}>
            <View className="flex items-center h-full justify-between p-6">
              <AdvicesIcon size={90} className="" />
              <Text className="text-center text-xl  font-bold text-white">Conseils</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md overflow-hidden"
          onPress={() => {
            navigation.navigate('CRAVING_BREATH');
          }}>
          <ImageBackground className="w-full h-full" source={require('../../assets/images/BackGroundBreathing.png')}>
            <View className="flex items-center h-full justify-between p-6">
              <BreathingIcon size={90} className="" />
              <Text className="text-center text-xl  font-bold text-white">Respiration</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View className="h-56 w-full flex flex-row gap-4 justify-between  pr-4 ">
        <TouchableOpacity
          className="w-1/2  rounded-md shadow-md overflow-hidden"
          onPress={() => {
            navigation.navigate('CRAVING_VIDEOS');
          }}>
          <ImageBackground className="w-full h-full" source={require('../../assets/images/BackGroundVideos.png')}>
            <View className="flex items-center h-full justify-between p-6">
              <VideosIcon size={90} className="" />
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
