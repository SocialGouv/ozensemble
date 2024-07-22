import { View, Text, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import H1 from "../../components/H1";
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";
import ArrowAdvice from "../../components/illustrations/ArrowAdvice";
import MusicIcon from "../../components/illustrations/MusicIcon";
import HydrationIcon from "../../components/illustrations/HydrationIcon";
import ReadingIcon from "../../components/illustrations/ReadingIcon";
import WalkIcon from "../../components/illustrations/WalkIcon";
import ShowerIcon from "../../components/illustrations/ShowerIcon";
import CallIcon from "../../components/illustrations/CallIcon";
import GameIcon from "../../components/illustrations/GameIcon";
import TriIcon from "../../components/illustrations/TriIcon";
import ReorderIcon from "../../components/illustrations/ReorderIcon";
import CreativityIcon from "../../components/illustrations/CreativityIcon";
import SportIcon from "../../components/illustrations/SportIcon";
import { logEvent } from "../../services/logEventsWithMatomo";
import { useRef, useState } from "react";

const advices = [
  {
    title: "Lisez une revue",
    description:
      "Profitez de ce moment pour démarrer un livre que vous souhaitiez lire, ou pour lire une revue ou un article.\n",
    currentAdvice: "READING_ADVICE",
    icon: ReadingIcon,
  },
  {
    title: "Ecoutez de la musique",
    description:
      "Lancez vos musiques les plus entrainantes ou apaisantes. Profitez-en pour écouter le dernier album de votre artiste préféré !\n",
    currentAdvice: "MUSIC_ADVICE",
    icon: MusicIcon,
  },
  {
    title: "Hydratez-vous",
    description:
      "Optez pour des boissons non alcoolisées et savoureuses (eau pétillante, jus de fruits, tisane). Ajoutez-y une rondelle de citron ou de concombre.",
    currentAdvice: "HYDRATION_ADVICE",
    icon: HydrationIcon,
  },
  {
    title: "Faites une balade",
    description:
      "Profitez-en pour aller prendre l’air. Faites une marche de 15 minutes, allez découvrir un endroit que vous ne connaissez pas.\n",
    currentAdvice: "WALK_ADVICE",
    icon: WalkIcon,
  },
  {
    title: "Prenez une douche",
    description:
      "Détentez-vous en prenant une douche chaude ou froide. Cela vous permettra de vous décontracter et de vous distraire.\n",
    currentAdvice: "SHOWER_ADVICE",
    icon: ShowerIcon,
  },
  {
    title: "Appelez un proche",
    description:
      "Contactez une personne de confiance. Que ce soit un ami ou quelqu’un de votre famille, ce sentir soutenu est important.",
    currentAdvice: "CALL_ADVICE",
    icon: CallIcon,
  },
  {
    title: "Jouez à un jeu",
    description:
      "Lancez votre jeu préféré sur votre smartphone ou votre console, et libérez-vous l’esprit en tentant de battre votre meilleur score ! ",
    currentAdvice: "GAME_ADVICE",
    icon: GameIcon,
  },
  {
    title: "Faites du tri",
    description:
      "Profitez de ce moment pour ranger votre penderie ou votre logement. Ne gardez que les pièces que vous aimez et revendez ou donnez le reste.",
    currentAdvice: "TRI_ADVICE",
    icon: TriIcon,
  },
  {
    title: "Aménagez autrement",
    description:
      "Modifiez l’aménagement de votre lieu de vie, en déplaçant quelques meubles. Cela permettra de casser l’espace dans lequel vous avez l’habitude de consommer.",
    currentAdvice: "REORDER_ADVICE",
    icon: ReorderIcon,
  },
  {
    title: "Libérez votre créativité",
    description:
      "En dessinant, peignant, ou en ecrivant un poème ou une histoire. Cet instant vous permettra de faire de nouvelles choses et de sortir de vos vieilles habitudes.",
    currentAdvice: "CREATIVITY_ADVICE",
    icon: CreativityIcon,
  },
  {
    title: "Faites du sport",
    description:
      "Mettez vos chaussures de sport et allez sur le terrain de jeux à côté de chez vous, ou dans votre jardin. Le sport réduira votre stress et agira comme un antidépresseur.",
    currentAdvice: "SPORT_ADVICE",
    icon: SportIcon,
  },
];

function shuffle(source) {
  let array = [...source];
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  // eslint-disable-next-line eqeqeq
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const Advice = ({ navigation }) => {
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);
  const shuffledAdvices = useRef(shuffle(advices));
  const currentAdvice = shuffledAdvices.current[currentAdviceIndex];
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <ScrollView className="h-full w-full" contentContainerStyle={{ height: "100%" }}>
          <View className="items-center justify-evenly h-full p-4 space-y-4">
            <BackButton
              content="< Retour"
              bold
              onPress={() => {
                navigation.goBack();
              }}
              marginTop
              marginBottom
              marginLeft
            />
            <View className="flex-1 w-full justify-center items-center h-full">
              <currentAdvice.icon
                className="h-full w-full"
                // size={300}
                size={Dimensions.get("screen").height * 0.25}
              />
            </View>
            <H1>{currentAdvice.title}</H1>
            <Text className=" text-black text-center font-semibold text-lg">
              {currentAdvice.description}
            </Text>
            <TouchableOpacity
              className="flex flex-row gap-2"
              onPress={() => {
                setCurrentAdviceIndex((currentAdviceIndex + 1) % shuffledAdvices.current.length);
                logEvent({
                  category: "CRAVING_ADVICE",
                  action: "PRESS_NEW_ADVICE",
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
