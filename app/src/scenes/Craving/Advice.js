import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ArrowAdvice from '../../components/illustrations/ArrowAdvice';
import MusicIcon from '../../components/illustrations/MusicIcon';
import HydrationIcon from '../../components/illustrations/HydrationIcon';
import ReadingIcon from '../../components/illustrations/ReadingIcon';
import WalkIcon from '../../components/illustrations/WalkIcon';
import ShowerIcon from '../../components/illustrations/ShowerIcon';
import { logEvent } from '../../services/logEventsWithMatomo';
import { useState } from 'react';

const Advice = ({ navigation }) => {
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);

  const advice = [
    {
      title: 'Hydratez-vous',
      description:
        'Optez pour des boissons non alcoolisées et savoureuses (eau pétillante, jus de fruits, tisane). Ajoutez-y une rondelle de citron ou de concombre.',
      currentAdvice: 'READING_ADVICE',
      icon: HydrationIcon,
    },
    {
      title: 'Lisez une revue',
      description:
        'Profitez de ce moment pour démarrer un livre que vous souhaitiez lire, ou pour lire une revue ou un article.\n',
      currentAdvice: 'MUSIC_ADVICE',
      icon: ReadingIcon,
    },
    {
      title: 'Ecoutez de la musique',
      description:
        'Lancez vos musiques les plus entrainantes ou apaisantes. Profitez-en pour écouter le dernier album de votre artiste préféré !\n',
      currentAdvice: 'WALK_ADVICE',
      icon: MusicIcon,
    },
    {
      title: 'Faites une balade',
      description:
        'Profitez-en pour aller prendre l’air. Faites une marche de 15 minutes, allez découvrir un endroit que vous ne connaissez pas.\n',
      currentAdvice: 'SHOWER_ADVICE',
      icon: WalkIcon,
    },
    {
      title: 'Prenez une douche',
      description:
        'Détentez-vous en prenant une douche chaude ou froide. Cela vous permettra de vous décontracter et de vous distraire.\n',
      currentAdvice: 'HYDRATATION_ADVICE',
      icon: ShowerIcon,
    },
  ];
  const currentAdvice = advice[currentAdviceIndex];
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <ScrollView className="h-full w-full ">
          <View className="flex flex-col items-center space-y-10 p-4">
            <BackButton
              content="< Retour"
              bold
              onPress={() => {
                navigation.navigate('CRAVING_INDEX');
              }}
              marginTop
              marginBottom
              marginLeft
            />
            <currentAdvice.icon className="" size={300} />
            <Text className="text-[#4030A5] text-3xl font-extrabold">{currentAdvice.title}</Text>
            <Text className=" text-black text-center font-semibold text-lg">{currentAdvice.description}</Text>
            <TouchableOpacity
              className="flex flex-row gap-2"
              onPress={() => {
                setCurrentAdviceIndex((currentAdviceIndex + 1) % advice.length);
                logEvent({
                  category: 'CRAVING_ADVICE',
                  action: currentAdvice.currentAdvice,
                });
              }}>
              <Text className="text-[#4030A5] underline font-semibold">Avoir un autre conseil</Text>
              <ArrowAdvice size={20} className="" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaProvider>
  );
};

export default Advice;
