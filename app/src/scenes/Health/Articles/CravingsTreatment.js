import React from 'react';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import { Text, View } from 'react-native';
import CravingSchema from '../../../components/illustrations/articles/CravingSchema';
import { useNavigation } from '@react-navigation/native';

const CravingsTreatment = () => {
  const title = "Traitement médicamenteux du craving (l'envie)";
  const navigation = useNavigation();
  return (
    <NavigationWrapper title={title} timeReading={4} sourcesDrTalbot={true}>
      <TopContainer>
        <P>
          Dans cet article nous vous proposons une vulgarisation des concepts de symptômes de sevrage, du « craving » et
          un lexique des principaux traitements utilisés dans le sevrage de la consommation d'alcool.
        </P>
        <Spacer size={20} />
        <P>
          Dans le domaine de l'addiction, le{' '}
          <Bold>
            craving désigne une envie irrépressible de consommer une substance ou d'exécuter un comportement gratifiant
            alors qu'on ne le veut pas à ce moment-là.
          </Bold>
        </P>
        <Spacer size={20} />
        <P>La notion de craving présente un intérêt principalement à deux points de vue{'\u00A0'}:</P>
        <View className="flex flex-row">
          <View className=" ">
            <P noMarginBottom>
              <Bold>{'   •  '}</Bold>
            </P>
          </View>
          <View className="flex flex-row basis-11/12">
            <P noMarginBottom>
              du point de vue de l<Bold>'évaluation de son risque alcool</Bold> puisque plus il est élevé, plus c'est le
              signe que la personne s'est habituée à l'alcool.
            </P>
          </View>
        </View>
        <View className="flex flex-row">
          <View>
            <P noMarginBottom>
              <Bold>{'   •  '}</Bold>
            </P>
          </View>
          <View className="flex flex-row basis-11/12">
            <P noMarginBottom>
              du point de vue de l<Bold>'évaluation de la difficulté à réduire ou du risque de “rechute”</Bold>, plus il
              est élevé, plus il est difficile de décrocher de ses habitudes sans une aide de professionnels.
            </P>
          </View>
        </View>
        <Spacer size={20} />
        <View className="flex flex-row justify-center">
          <CravingSchema />
        </View>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Comment évaluer "son" craving</H2>
        <Spacer size={20} />
        <P>
          Il s'agit d'une <Bold>échelle visuelle de craving</Bold>, sur le modèle des procédés utilisés dans la prise en
          charge de la douleur, l'autoévaluation par échelle visuelle analogique (EVA) consiste à se demander
          directement le niveau de son envie.{' '}
        </P>
        <P noMarginBottom>L'échelle va{'\u00A0'}:</P>
        <Spacer size={5} />
        <View className="flex flex-row">
          <View className=" ">
            <P noMarginBottom>
              <Bold>{'   •  '}</Bold>
            </P>
          </View>
          <View>
            <P noMarginBottom>de 0 : pas d'envie (« Pas du tout envie »)</P>
          </View>
        </View>
        <View className="flex flex-row">
          <View className=" ">
            <P noMarginBottom>
              <Bold>{'   •  '}</Bold>
            </P>
          </View>
          <View>
            <P>à la position de 10 : une envie maximale (« Très&nbsp;envie »).</P>
          </View>
        </View>
        <P>
          Il est utile de se poser la question vis à vis d'une situation “calme” (par exemple une journée tranquille de
          repos) et vis à vis d'une situation “à risque de consommer de l'alcool” (par exemple).
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Une aide médicamenteuse de diminution du craving</H2>
        <Spacer size={20} />
        <P bold>
          Des aides médicamenteuses peuvent vous être proposées par un médecin pour soutenir votre motivation dans
          l'arrêt des consommations.
        </P>
        <Spacer size={20} />
        <P bold color={'#DE285E'}>
          Attention
        </P>
        <View className="flex flex-row">
          <View className=" ">
            <P noMarginBottom>
              <Bold>{'   •  '}</Bold>
            </P>
          </View>
          <View className="flex flex-row basis-11/12">
            <P noMarginBottom>
              il ne s'agit pas des mêmes médicaments que ceux qui traitent le <Bold>syndrôme</Bold> de sevrage ! (
              <Text className="underline" onPress={() => navigation.navigate('ALCOOL_WITHDRAWAL_TREATMENT')}>
                article Traitement médicamenteux du sevrage
              </Text>
              )
            </P>
          </View>
        </View>
        <View className="flex flex-row">
          <View>
            <P noMarginBottom>
              <Bold>{'   •  '}</Bold>
            </P>
          </View>
          <View className="flex flex-row basis-11/12">
            <P>
              il ne s'agit pas d'une baguette magique mais bien d'un <Bold>soutien complémentaire</Bold> à votre
              motivation qui diminue le craving.
            </P>
          </View>
        </View>
        <Spacer size={40} />
        <H2 color={'#4030a5'}>Cinqs médicaments bénéficient actuellement d'une autorisation officielle :</H2>
        <Spacer size={40} />
        <H2>L'Acamprosate</H2>
        <P>
          Ils constituent des traitements de première intention, utilisables dès que possible après l'arrêt de la
          consommation d'alcool dans l'objectif de réduire l'appétence pour l'alcool et ainsi les risques de rechute.
          L'Acamprosate ne présente pas de contre-indication ou d'incompatibilité majeure, il peut être utilisé dès le
          début du sevrage chez tout patient alcoolo-dépendant.
        </P>
        <Spacer size={40} />
        <H2>La Naltrexone</H2>
        <P>
          C'est aussi un traitement de première intention mais{' '}
          <Bold>contre-indiqué chez les sujets dépendants aux opiacés</Bold>, bénéficiant d'un traitement de
          substitution ou relevant d'une antalgie majeure par opiacés. Elle cible la « récompense » associée à l'usage
          d'alcool et donc peut-être plus les sujets présentant une consommation impulsive.
        </P>
        <Spacer size={20} />
        <P>
          Les deux traitements peuvent être associés. Le maintien d'une consommation d'alcool lors de la prise de ces
          traitements n'impose pas l'arrêt du traitement mais lors d'un traitement par Naltrexone, les effets sédatifs
          peuvent être cumulés avec l'alcool, imposant une vigilance accrue.
        </P>
        <Spacer size={40} />
        <H2>Le Nalmefène</H2>
        <P>
          est aussi un traitement de première intention plus récent mais{' '}
          <Bold>contre-indiqué chez les sujets dépendants aux opiacés</Bold>, bénéficiant d'un traitement de
          substitution ou relevant d'une antalgie majeure par opiacés. Il cible la « récompense » associée à l'usage
          d'alcool et donc peut-être plus les sujets présentant une consommation impulsive. Ce traitement à une
          autorisation tant dans l'obtention et le maintien du sevrage, que dans l'accompagnement à la réduction de
          consommation (sans arrêt total nécessairement).
        </P>
        <Spacer size={40} />
        <H2>Le Baclofène</H2>
        <P>
          est un des traitements apparus plus récemment. Il est indiqué en seconde intention et le plus souvent proposé
          par un médecin addictologue. Ce traitement pourrait s'avérer particulièrement{' '}
          <Bold>utile dans les situations de consommation d'alcool en lien avec un trouble anxieux.</Bold>
        </P>
        <Spacer size={40} />
        <H2>Le Disulfirame</H2>
        <P>
          est par contre un traitement de <Bold>seconde intention</Bold> présentant de nombreuses contre-indications et
          un maniement délicat, réservé aux patients en échec avec les précédents traitements et bénéficiant d'un
          soutien de l'entourage. Il est de moins en moins prescrit et peut s'avérer{' '}
          <Bold>dangereux s' il est associé à une consommation d'alcool.</Bold>
        </P>
      </TopContainer>
    </NavigationWrapper>
  );
};

export default CravingsTreatment;
