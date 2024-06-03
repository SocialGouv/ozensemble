import { ImageBackground, View, TouchableOpacity, Text } from 'react-native';
import { useEffect } from 'react';
import WrapperContainer from '../../components/WrapperContainer';
import AdvicesIcon from '../../components/illustrations/AdvicesICon';
import BreathingIcon from '../../components/illustrations/BreathingIcon';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import VideosIcon from '../../components/illustrations/VideosIcon';
import { storage } from '../../services/storage';
import StrategyIcon from '../../components/illustrations/StrategyIcon';
import API from '../../services/api';
import { useRecoilState } from 'recoil';
import { defineStrategyState } from '../../recoil/craving';

const CravingIndex = ({ navigation }) => {
  const [strategies, setStrategies] = useRecoilState(defineStrategyState);
  useEffect(() => {
    const fetchStrategies = async () => {
      const res = await API.get({
        path: '/strategies/list',
        query: {
          matomoId: storage.getString('@UserIdv2'),
        },
      });
      if (res.ok) {
        setStrategies(res.strategies);
      }
    };

    fetchStrategies();
  }, []);

  return (
    <WrapperContainer title="Craving">
      <TouchableOpacity
        className="w-full  bg-[#4030A5] rounded-xl flex flex-row items-end justify-between px-4 py-2 mb-10"
        onPress={() => {
          if (strategies.length === 0) {
            navigation.navigate('NO_STRATEGY');
          } else {
            navigation.navigate('CRAVING_STRATEGIES');
          }
        }}>
        <H1 className="font-semibold" color="#fff">
          Ma stratégie
        </H1>
        <StrategyIcon size={90} />
      </TouchableOpacity>

      <Text className="text-xl font-bold mb-4">Mes activités</Text>
      <View className="h-52 w-full flex flex-row space-x-4 justify-between mb-2 pt-2 ">
        <TouchableOpacity
          className="flex-1  rounded-md overflow-hidden"
          onPress={() => {
            navigation.navigate('HYDRATION_ADVICE');
          }}>
          <ImageBackground className="w-full h-full" source={require('../../assets/images/BackGroundAdvices.png')}>
            <View className="flex items-center h-full justify-between py-6 ">
              <AdvicesIcon size={100} className="" />
              <H2 color="#fff">Conseils</H2>
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
              <H2 color="#fff">Respiration</H2>
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
              <H2 color="#fff">Videos</H2>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </WrapperContainer>
  );
};

export default CravingIndex;
