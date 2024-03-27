import React from 'react';
import { View, Text } from 'react-native';
import ButtonPrimary from '../../components/ButtonPrimary';
import WrapperContainer from '../../components/WrapperContainer';
import BackButton from '../../components/BackButton';
import ProfilIcon from '../../components/illustrations/ProfilIcon';

const Testimonies = ({ navigation }) => {
  return (
    <WrapperContainer
      title={'Témoignages'}
      onPressBackButton={() => {
        navigation.navigate('HEALTH_ARTICLE');
      }}>
      <View className="mt-8 flex justify-start">
        <View className="flex flex-row gap-4 mb-10">
          <ProfilIcon size={40} />
          <View>
            <Text className="mr-14">
              “L'alcool est d’abord entré dans ma vie comme un “ami”, un refuge face aux épreuves. Un verre après
              l'autre, il est devenu un confident, puis un maître. L’ivresse masquait mes blessures, mais elle creusait
              un gouffre béant sous mes pieds. Ma vie s'est transformée en une succession de bouteilles vides, de nuits
              blanches et de regrets le lendemain. Un jour, le regard désabusé de mon fils m'a frappée en plein cœur.
              J'ai compris que je n'étais plus que l'ombre de moi-même, une épave humaine incapable d'assumer ses
              responsabilités. C'est à ce moment précis que j'ai décidé de me battre. Le combat a été long et difficile.
              J'ai subi des rechutes, des moments de découragement où l'envie de replonger me tenaillait. Mais j'ai
              puisé ma force dans l'amour de mes proches, dans leur soutien indéfectible. J'ai fréquenté des groupes de
              soutien, appris à gérer mes émotions autrement que par l'alcool. J'ai découvert peu à peu comment
              retrouver du plaisir dans des activités quotidiennes, le plaisir des choses simples. Aujourd'hui, je suis
              fière de pouvoir dire que je suis sobre depuis plusieurs années. L'alcool n'a plus aucune emprise sur ma
              vie. J'ai retrouvé ma confiance en moi et le bonheur d'être entourée de ceux que j'aime. N'oubliez jamais
              que vous avez le pouvoir de changer votre destin. Chacun de nous possède en soi la force de vaincre ses
              faiblesses. Croyez en vous, et vous y arriverez.”
            </Text>
            <Text className="text-[#4030A5] font-bold mt-5">Utilisateur Anonyme</Text>
          </View>
        </View>

        <View className="items-center border-[#DBDBE8] bg-[#EFEFEF] rounded-lg border mb-10 p-4">
          <Text className="font-bold mb-6">
            Vous aussi partagez votre témoignage anonymement, et donnez du courage à ceux qui en ont besoin.{' '}
          </Text>
          <ButtonPrimary
            color="#4030A5"
            content="Partager mon témoignage"
            onPress={() => {
              navigation.navigate('OWN_TESTIMONY');
            }}
          />
        </View>
        <View className="flex flex-row gap-4 mb-10">
          <ProfilIcon size={40} />
          <View>
            <Text className="mr-14">
              “Le chemin vers la maitrise de sa consommation n'est pas facile. Il est parsemé de défis et d'obstacles,
              mais chaque étape que vous franchissez renforce votre détermination et votre volonté. Chaque jour que vous
              passez sans boire est une preuve de votre force et de votre courage. N'oubliez pas qu'il y a des
              ressources disponibles pour vous aider. Les groupes de soutien comme les professionnels de santé peuvent
              vous aider à comprendre et à gérer votre dépendance. Il n'y a pas de honte à demander de l'aide. En fait,
              c'est un signe de force et de détermination. Souvenez-vous que chaque jour est une nouvelle opportunité
              pour progresser sur le chemin de la sobriété. Vous avez déjà fait le plus dur en reconnaissant votre
              problème. Maintenant, chaque petit pas que vous faites est une victoire. Soyez fier de vous.”
            </Text>
            <Text className="text-[#4030A5] font-bold mt-5">Silv</Text>
          </View>
        </View>
        <View className="left-1/4 w-1/2 h-O border rounded-xl mb-10 -ml-4 border-[#4030A5]"></View>
        <View className="flex flex-row gap-4 mb-10">
          <ProfilIcon size={40} />
          <View>
            <Text className="mr-14">
              “J’ai commencé à boire lors de soirées entre amis. Au début, c'était juste pour m'amuser, pour me
              détendre. Mais petit à petit, la consommation est devenue plus fréquente, plus importante. J'ai commencé à
              boire seul, chez moi, pour noyer mes problèmes, mes frustrations. L'alcool me donnait l'illusion de tout
              oublier, de me sentir bien dans ma peau. Mais c'était une illusion trompeuse. Plus je buvais, plus je
              sombrais dans un cercle vicieux. Mon addiction a commencé à avoir des conséquences néfastes sur ma vie
              professionnelle, sur mes relations avec mes proches. Je perdais le contrôle, je devenais violent,
              irascible. Un jour, j'ai touché le fond. Ma femme m'a quitté, et je me suis retrouvé seul, au fond du
              trou. C'est à ce moment-là que j'ai réalisé que je devais me battre, que je devais vaincre mon addiction
              pour sauver ma vie. J'ai décidé de me faire aider. J'ai intégré un programme de réadaptation, et j'ai
              commencé à fréquenter des groupes de soutien.Il y a eu des moments de découragement, mais je n'ai jamais
              baissé les bras. Aujourd'hui, je suis fier de dire que je ne suis plus dépendant à l’alcool depuis plus de
              cinq mois. J'ai retrouvé ma famille, et je suis enfin heureux et serein. Si vous souffrez d'alcoolisme,
              sachez que vous n'êtes pas seul. N'ayez pas honte de demander de l'aide, c'est la première étape vers la
              guérison. L'alcoolisme n'est pas une fatalité. On peut s'en sortir. Il suffit de le vouloir, et de se
              battre pour retrouver sa vie.”
            </Text>
            <Text className="text-[#4030A5] font-bold mt-5">Utilisateur anonyme</Text>
          </View>
        </View>

        <View className="items-center border-[#DBDBE8] bg-[#EFEFEF] rounded-lg border mb-10 p-4">
          <Text className="font-bold mb-6">
            Vous aussi partagez votre témoignage anonymement, et donnez du courage à ceux qui en ont besoin.{' '}
          </Text>
          <ButtonPrimary
            color="#4030A5"
            content="Partager mon témoignage"
            onPress={() => {
              navigation.navigate('OWN_TESTIMONY');
            }}
          />
        </View>
        <View className="flex flex-row gap-4 mb-10">
          <ProfilIcon size={40} />
          <View>
            <Text className="mr-14">
              “L'alcool a empoisonné une grande partie de ma vie. J'ai commencé à boire jeune, cherchant à échapper à
              une réalité qui me pesait. Au fil du temps, l'alcool est devenu un refuge, puis une prison. Je buvais pour
              oublier mes problèmes, pour me sentir courageux, pour noyer mes angoisses. Mais l'alcool ne résolvait
              rien, il ne faisait qu'aggraver les choses. Ma vie est devenue un chaos. J'ai perdu mon travail, mes amis,
              mon couple. J'étais seul, isolé, enfermé dans ma dépendance. Le regard des autres me pesait, rempli de
              jugement et de pitié. J'avais honte de moi, de ce que j'étais devenu. Un jour, j'ai touché le fond. J'ai
              fini à l'hôpital, après une énième soirée arrosée. C'est là que j'ai réalisé que je ne pouvais plus
              continuer ainsi. Il fallait que je change, que je me batte pour ma vie. J'ai décidé de me faire soigner.
              J'ai appris à gérer mes émotions sans l'alcool, à identifier les causes de ma dépendance. Ce n'était pas
              facile, il y a eu des rechutes, des moments de découragement. Mais je n'ai jamais baissé les bras.
              Aujourd'hui, j'ai repris ma vie en main. Je suis heureux, serein, et je savoure chaque jour qui passe.
              Vaincre la dépendance n'est pas facile, mais c'est possible. Il faut de la volonté, du courage, et
              beaucoup de soutien. Si vous souffrez, n'ayez pas honte de demander de l'aide. N'oubliez jamais que vous
              n'êtes pas seul, et que vous pouvez vaincre cette maladie. Mon message à ceux qui se reconnaissent dans
              mon parcours : N'abandonnez jamais. Vous avez la force de vaincre cette dépendance. Le chemin est long et
              difficile, mais la récompense est immense : une vie libre et heureuse. N'hésitez pas à demander de l'aide,
              il y a des gens qui vous soutiendront dans votre combat. Vous n'êtes pas seul.”
            </Text>
            <Text className="text-[#4030A5] font-bold mt-5">Marie C.</Text>
          </View>
        </View>

        <BackButton
          content="< Retour"
          bold
          onPress={() => {
            navigation.navigate('HEALTH_ARTICLE');
          }}
          bottom
        />
      </View>
    </WrapperContainer>
  );
};
export default Testimonies;
