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
        navigation.goBack();
      }}>
      <View className="mt-8 pr-10 flex justify-start">
        <View className="flex flex-row gap-4 mb-8">
          <ProfilIcon size={40} />
          <View>
            <Text>
              “L'alcool a fait irruption dans ma vie comme un ami, un refuge face aux épreuves. Un verre après l'autre,
              il est devenu un confident, puis un maître. Sa douce ivresse masquait mes blessures, mais elle creusait un
              gouffre béant sous mes pieds. Ma vie s'est transformée en un tourbillon de bouteilles vides, de nuits
              blanches et de regrets amers. Un jour, le regard désabusé de mon fils m'a frappée en plein cœur. J'ai
              compris que je n'étais plus que l'ombre de moi-même, une épave humaine incapable d'assumer ses
              responsabilités. C'est à ce moment précis que j'ai décidé de me battre. Le combat a été long et difficile.
              J'ai subi des rechutes, des moments de découragement où l'envie de replonger me tenaillait. Mais j'ai
              puisé ma force dans l'amour de mes proches, dans leur soutien indéfectible. J'ai fréquenté des groupes de
              soutien, appris à gérer mes émotions autrement que par l'alcool. J'ai découvert la joie simple de vivre
              sans dépendance, le plaisir des choses vraies et authentiques. Aujourd'hui, je suis fière de pouvoir dire
              que je suis sobre depuis plusieurs années. L'alcool n'a plus aucune emprise sur ma vie. J'ai retrouvé ma
              dignité, ma confiance en moi et le bonheur d'être entourée de ceux que j'aime. N'oubliez jamais que vous
              avez le pouvoir de changer votre destin. Chacun de nous possède en soi la force de vaincre ses démons.
              Croyez en vous, et vous y arriverez.”
            </Text>
            <Text className="text-[#4030A5] font-semibold mt-4">Utilisateur Anonyme</Text>
          </View>
        </View>

        <View className="items-center border-[#DBDBE8] bg-[#EFEFEF] rounded-md border-1 mb-8 -mr-8 p-4">
          <Text className="font-bold mb-6">
            Vous aussi partagez votre témoignage anonymement, et donnez du courage à ceux qui en ont besoin.{' '}
          </Text>
          <ButtonPrimary
            color="#4030A5"
            content="Partager mon témoignage"
            onPress={() => {
              navigation.navigate('TESTIMONIES');
            }}
          />
        </View>
        <View className="flex flex-row gap-2 mb-8">
          <ProfilIcon size={40} />
          <Text>
            “Le chemin vers la maitrise de sa consommation n'est pas facile. Il est parsemé de défis et d'obstacles,
            mais chaque étape que vous franchissez renforce votre détermination et votre volonté. Chaque jour que vous
            passez sans boire est une preuve de votre force et de votre courage. N'oubliez pas qu'il y a des ressources
            disponibles pour vous aider. Les groupes de soutien comme les professionnels de santé peuvent vous aider à
            comprendre et à gérer votre dépendance. Il n'y a pas de honte à demander de l'aide. En fait, c'est un signe
            de force et de détermination. Souvenez-vous que chaque jour est une nouvelle opportunité pour progresser sur
            le chemin de la sobriété. Vous avez déjà fait le plus dur en reconnaissant votre problème. Maintenant,
            chaque petit pas que vous faites est une victoire. Soyez fier de vous.”
          </Text>
        </View>
        <View className="left-1/4 w-1/2 h-O border rounded-xl  border-[#4030A5]"></View>
        <View className="items-center bg-[#DBDBE8] rounded-md border-1 m-4 p-4">
          <Text className="font-bold mb-6">
            Vous aussi partagez votre témoignage anonymement, et donnez du courage à ceux qui en ont besoin.{' '}
          </Text>
          <ButtonPrimary
            color="#4030A5"
            content="Partager mon témoignage"
            onPress={() => {
              navigation.navigate('TESTIMONIES');
            }}
          />
        </View>

        <BackButton
          content="< Retour"
          bold
          onPress={() => {
            navigation.goBack();
          }}
          bottom
        />
      </View>
    </WrapperContainer>
  );
};
export default Testimonies;
