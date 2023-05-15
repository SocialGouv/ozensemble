import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import { View, Text } from 'react-native';

const AlcoolWithdrawalTreatment = () => {
  const title = 'Traitement médicamenteux du sevrage';
  const navigation = useNavigation();
  return (
    <NavigationWrapper title={title} timeReading={2}>
      <TopContainer>
        <P>
          Dans cet article nous vous proposons une vulgarisation des concepts de symptômes de sevrage et un lexique des
          principaux traitements utilisés dans le sevrage de la consommation d'alcool.
        </P>
        <P>
          Il peut exister plusieurs <Bold>types de symptômes</Bold> lors de la réduction, ou de l'arrêt de la
          consommation d'alcool :
        </P>

        <View className="flex flex-row">
          <View className=" ">
            <P noMarginBottom>
              <Bold>{'   •  '}</Bold>
            </P>
          </View>
          <View className="flex flex-row basis-11/12">
            <P noMarginBottom>
              <Bold>les symptômes de sevrage mineur</Bold> tel que agitation, nervosité ou des troubles du sommeil
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
              <Bold>les symptômes de sevrage sévère</Bold> tel que les crises convulsives de sevrage (qui s'apparente à
              une crise convulsive de l'épilepsie) ou d'autres manifestations décrites dans l'article dédié (
              <Text className="underline" onPress={() => navigation.navigate('ALCOHOL_AND_DEPENDENCY')}>
                article dépendance physique à l'alcool
              </Text>
              )
            </P>
          </View>
        </View>
        <View className="flex flex-row">
          <View>
            <P noMainBottom>
              <Bold>{'   • '}</Bold> le <Bold>craving</Bold>
            </P>
          </View>
        </View>
        <Spacer size={20} />
        <P className="flex flex-row basis-11/12">
          Il existe des <Bold>traitements médicamenteux qui peuvent vous être proposés par un médecin</Bold> pour ces
          trois grandes catégories de symptômes.
        </P>
        <P>
          Ces symptômes apparaissent généralement entre <Bold>6 heures et 3 jours</Bold> et s'améliorent de manière
          rapide sur <Bold>3 à 5 jours.</Bold>
        </P>
        <Spacer size={20} />
        <P>
          Il faut savoir que nous ne sommes pas tous égaux face à leur apparition et leur sévérité sans que ce ne soit
          forcément lié à la quantité d'alcool que vous consommiez.
        </P>
        <P>
          <Bold>
            Aussi, si vous présentez des symptômes importants, que vous vous en inquiétez ou que vous avez une autre
            pathologie chronique, n'hésitez pas à en parler à un professionnel de santé.
          </Bold>{' '}
          Les traitements ont vocation à soulager ces symptômes pour vous permettre de vous passer de l'alcool dans de
          bonnes conditions.
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Les symptômes de sevrage mineur</H2>
        <Spacer size={20} />
        <P>
          Le traitement de ces symptômes n'est pas toujours nécessaire et comprend généralement des médicaments ciblant
          un symptôme : à visée sédative ou anxiolytique par exemple.
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Les symptômes de sevrage sévère</H2>
        <Spacer size={20} />
        <P>
          Le traitement des symptômes de sevrage sévère est nécessaire afin de diminuer le risque de complications de
          sevrage. Il existe un vrai risque pour la santé à ne pas prendre en compte ces “signaux d'alerte” du corps.
        </P>
        <P bold>
          Les médicaments qui sont alors prescrit appartiennent le plus souvent à  la classe des benzodiazépine, tel que
          le DIAZEPAM, OXAZEPAM.
        </P>
      </TopContainer>
    </NavigationWrapper>
  );
};

export default AlcoolWithdrawalTreatment;
