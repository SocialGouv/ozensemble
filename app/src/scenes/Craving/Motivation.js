import { View, Text, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import BackGroundTopMotivation from '../../components/BackGroundTopMotivation';
import BackGroundBotMotivation from '../../components/BackGroundBopMotivation';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  customText: {
    fontFamily: 'Sedan-Regular', // Use the actual font family name
    fontSize: 22, // Adjust the font size as needed
  },
});

const motivations = [
  'Votre détermination vous amènera vers votre objectif final. \n\n N’oubliez pas que la persévérance est la clé du succès.',
  'Rappelez-vous que votre effort est difficile, mais pas impossible ! \nChaque fois sans craquer est une très grande victoire. \n\n Vous pouvez le faire !',
  'N’oubliez pas que ce moment est temporaire, n’oubliez pas vos objectifs. \n\nTenez le coup, vous pouvez gérer !',
  'La patience, la persévérance et la constance sont 3 éléments clé de votre réussite. Ne les perdez jamais de vue, car ils vous aideront à chaque moment difficile. \n\n Il n’y a aucune raison pour laquelle vous n’y arriverez pas !',
  'Ce n’est pas parce que c’est dur que c’est impossible.\n C’est en faisant des efforts jour après jour qu’on atteint son objectif à terme. \n\nN’oubliez pas... Vous pouvez y arriver !',
  'Vous n’avez pas les moyens de changer ce que vous avez vécu. Mais vous avez le pouvoir de décider qu’à partir de maintenant la suite va changer et que vous allez vivre votre meilleure vie.\n\n Et ça commence maintenant !',
  'Il n’y a pas de succès sans effort et il n’y a pas de réussite sans persévérance.\n\n Continuez sur votre lancée, vous pouvez le faire !',
  'Si vous êtes ici, c’est que vous voulez vous en sortir, et que vous voulez vous en donner les moyens. \n\nFélicitations, vous êtes sur la bonne voie et vous pouvez le faire !',
  'C’est en croyant en vous que vous parviendrez à atteindre votre objectif. \n\nAlors n’oubliez pas de croire en vos capacités et de vous féliciter quand vous franchissez une nouvelle étape !',
  'Soyez persévérant, car cela vous permettra de réussir face aux  obstacles auxquels vous ferez face.\n\n Soyez fort et convaincu que vous allez y arriver !',
  'Soyez satisfait et fier de chacune de vos victoires, même si elles sont petites. Chaque réussite vous aide à atteindre un peu plus votre objectif. \n\nVous pouvez être reconnaissant envers vous, continuez comme cela !',
];

const Motivation = ({ navigation }) => {
  const motivationIndex = Math.floor(Math.random() * motivations.length);
  const currentMotivation = motivations[motivationIndex];
  return (
    <SafeAreaProvider>
      <Background color="#f9f9f9">
        <View className="h-full w-full" contentContainerStyle={{ height: '100%' }}>
          <BackButton
            content="< Retour"
            bold
            onPress={() => {
              navigation.goBack();
            }}
            marginBottom
            marginLeft
            marginTop
          />
          <View className="items-center h-full justify-center -mt-8">
            <BackGroundTopMotivation size={Dimensions.get('window').height / 4} className="absolute top-0 " />
            <Text style={styles.customText} className=" text-black text-center font-semibold text-2xl px-8">
              {currentMotivation}
            </Text>
            <BackGroundBotMotivation size={Dimensions.get('window').height / 4} className="absolute bottom-4 " />
          </View>
        </View>
      </Background>
    </SafeAreaProvider>
  );
};

export default Motivation;
