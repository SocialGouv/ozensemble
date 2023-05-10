import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import ButtonPrimary from '../../../components/ButtonPrimary';

const AlcoolWithdrawalTreatment = () => {
  const title = 'Traitement médicamenteux du sevrage';
  const navigation = useNavigation();
  return (
    <NavigationWrapper title={title} timeReading={2} link={'https://www.inserm.fr/dossier/alcool-sante/'}>
      <TopContainer>
        <Spacer size={20} />
        <P>
          Dans cet article nous vous proposons une vulgarisation des concepts de symptômes de sevrage et un lexique des
          principaux traitements utilisés dans le sevrage de la consommation d'alcool.
        </P>
        <P>
          Il peut exister plusieurs <Bold>types de symptômes</Bold> lors de la réduction, ou de l'arrêt de la
          consommation d'alcool :
        </P>
        <P>L'addiction à l'alcool s'accompagne parfois d'addiction au tabac ou à la drogue.</P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Quelle quantité d'alcool pour être dépendant ?</H2>
        <Spacer size={20} />
        <P>
          <Bold>L'addiction à l'alcool n'est pas une affaire de quantité</Bold>. Les personnes qui présentent des
          critères de dépendance boivent de plus en plus, pour continuer à éprouver les effets de l'alcool qu'ils
          recherchent (diminuer son anxiété, euphorie, désinhibition) alors que leur corps s'y habitue. C'est le
          <Bold> phénomène de tolérance</Bold> : il faut augmenter la dose pour continuer d'éprouver l'effet recherché.
          C'est une spirale qui peut conduire à majorer ses consommations rapidement sans en avoir pleinement la
          maîtrise.
        </P>
        <P>
          <Bold>
            De nos jours on ne parle plus «&nbsp;d'alcoolisme&nbsp;» qui renvoyait à l'idée fausse que seules les
            personnes présentant des signes d'ivresse étaient dépendantes à l'alcool. C'est bien la perte du contrôle de
            la consommation qui signe la dépendance et pas votre capacité à «&nbsp;tenir l'alcool&nbsp;».
          </Bold>
        </P>
        <P>
          De la même manière, les études médicales ne parlent plus d'une question seulement de «&nbsp;motivations à
          l'arrêt&nbsp;» car si elle est bien entendu aidante, les personnes sont parfois prises au piège d'une spirale
          dont il voudrait se sortir. Mais les pulsions de consommer, les occasions où l'on ne sait pas dire
          «&nbsp;non&nbsp;» sont plus fortes.
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Comment savoir si on devient dépendant de l'alcool ?</H2>
        <Spacer size={20} />
        <P>
          Les symptômes d'addiction à l'alcool se voient dans le rapport qu'on entretient avec la boisson alcoolisée.
          Par exemple, on peut avoir envie de prendre un verre dès le matin au lever. On attend avec impatience l'heure
          de l'apéritif. Ou bien on boit en cachette de son entourage. La consommation à risque a de multiples visages :
          physique (tremblements, sueurs, insomnie à l'arrêt), psychologique (nervosité, envie de consommer ou craving)
          ou encore contextuelle (impossible d'imaginer une fête sans alcool). Le plus important est de s'
          <Bold>évaluer avec le plus de bienveillance et de transparence possible :</Bold>
        </P>
        <ButtonPrimary
          content={'Faites le test !'}
          onPress={() => navigation.navigate('ONBOARDING_QUIZZ')}
          widthSmall
          small
        />
      </TopContainer>
    </NavigationWrapper>
  );
};

export default AlcoolWithdrawalTreatment;
