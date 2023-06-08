import React from 'react';
import { Text } from 'react-native';
import { Spacer, P, TopContainer, Bold, Underlined } from './../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';

const ToHelpMeReduce = ({ navigation }) => {
  const title = "Pour m'aider à réduire";
  return (
    <NavigationWrapper
      title={title}
      timeReading={3}
      link={'https://www.ameli.fr/assure/sante/themes/alcool-sante/conseils-reduire-consommation'}>
      <TopContainer>
        <H2 color={'#4030a5'}>Quelques conseils généraux...</H2>
        <Spacer size={20} />
        <P>
          Avant de boire de l'alcool, mangez quelque chose si vous avez faim et buvez de l'eau si vous avez soif.
          L'alcool ne permet pas de calmer la soif. C'est même le contraire.{'\n'}
          <Bold>À chaque fois que vous consommez de l'alcool, prenez le réflexe de boire un verre d'eau.</Bold>
        </P>
        <P>Ne buvez pas systématiquement de l'alcool si vous êtes fatigué, stressé ou préoccupé.</P>
        <P>
          <Bold>Lors des sorties</Bold>
        </P>
        <P>
          Lors d'une sortie au restaurant, commencez toujours le repas par un grand verre d'eau : l'envie de boire
          rapidement se fait plus sentir lorsque l'on est déshydraté ou que l'on a faim.
        </P>
        <P>
          Pensez à prendre un petit encas diététique avant d'arriver au restaurant comme batonnets de carottes, de
          concombre ou de céleri. La faim pousse à boire plus rapidement car l'alcool est calorique.
        </P>
        <P>
          Si vous buvez toujours un verre après le travail, ajoutez à cela une autre habitude plaisante au moins deux
          jours par semaine. Par exemple, vous pouvez vous accorder un plaisir culinaire, faire une promenade, prendre
          une bonne douche, etc.
        </P>
        <P>
          <Bold>À domicile </Bold>
        </P>
        <P>
          Si vous buvez principalement à domicile, ne faites plus de grande réserve d'alcool et/ou faites en sorte de ne
          pas en avoir du tout chez vous à intervalles réguliers.
        </P>
        <P>
          Buvez de préférence dans un verre et non à la bouteille. En effet, vous boirez probablement plus à la
          bouteille. Car vous aurez plus de mal à quantifier.
        </P>
        <P>
          Ne buvez pas seul, il est trop facile de <Bold>commencer à boire en quantité excessive</Bold>. Imposez-vous
          cette règle : ne boire qu'entre amis, pour le plaisir.{'\n'} «&nbsp;Après le boulot, je bois toujours un verre
          de vin blanc&nbsp;»... <Bold>ces routines de consommation d'alcool</Bold> sont de véritables pièges. Essayez
          de les reconnaître et de trouver une alternative. Il peut s'agir d'un thé, d'un smoothie, ou d'une simple
          promenade.
        </P>
        <P>N'utilisez pas l'alcool pour étancher votre soif, mais uniquement pour le plaisir.</P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Dans la vie de tous les jours...</H2>
        <Spacer size={20} />
        <P>
          Prévoyez toujours des <Bold>boissons non alcoolisées lors d'une fête</Bold> ou lors de vos courses en cas de
          visite.
        </P>
        <P>
          Si vous sortez à plusieurs, mettez-vous d'accord auparavant sur celui ou celle qui restera sobre et ramènera
          les autres en voiture. Ou organisez un retour en taxi.
        </P>
        <P>
          Prenez la peine d'essayer des <Bold>cocktails sans alcool</Bold> appelé également mocktail.
        </P>
        <P>
          Privilégiez des lieux de rencontre ou de <Bold>sortie qui n'impliquent pas la consommation d'alcool</Bold> tel
          que se promener dans un parc, une visite culturelle, plutôt que dans un bar.{'\n'}D'autres possibilités
          incluent des restaurants, des salons de thé, des marchands de yaourt glacé, ou encore des lieux de
          restauration rapide.
        </P>
        <P>
          Si vous avez du mal à dire non, par exemple dans un café, anticipez ce que vous ferez si la situation se
          présente. Vous pouvez éventuellement penser à une raison claire pour vous justifier.
        </P>
        <P>
          Regardez les événements sportifs avec vos amis en les invitant chez vous : vous pourrez proposer des boissons
          rafraîchissantes qui ne contiennent pas d'alcool (thé glacé, eau fruitée, virgin mojito, punch sans alcool…).
        </P>
        <P>
          À chaque fois que vous consommez de l'alcool, prenez le réflexe de
          <Bold> boire un verre d'eau.</Bold>
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Oz Ensemble est là pour vous aider</H2>
        <Spacer size={20} />
        <P>
          <Bold>Vous voulez réduire votre consommation d'alcool&nbsp;?</Bold>
        </P>
        <P>
          <Bold>Changez également vos habitudes liées à cette consommation.</Bold>
          {'\n'}
          Fixez vous un nombre maximum de verres d'alcool à ne pas dépasser. Ou encore choisissez des jours où vous
          n'allez pas consommer de boissons alcoolisées.
        </P>
        <P>
          <Bold>
            N'hésitez pas à utiliser la possibilité de vous fixer un objectif grâce à Oz Ensemble&nbsp;!{'\n'}
          </Bold>
          Notez votre consommation : tenez un journal de bord de votre consommation journalière sur plusieurs semaines.
          En effet, il est plus facile de prendre conscience de sa consommation réelle quand celle-ci apparaît «noir sur
          blanc». Il suffit de cliquer sur (+) pour ajouter une consommation.
        </P>
        <P>
          <Bold>Constatez la quantité d'argent que vous économisez en réduisant l'alcool chaque semaine&nbsp;:</Bold>
          {'\n'}
          {'    - '}Est-ce que vous ne pourriez pas l'utiliser pour vous faire plaisir&nbsp;? Vous offrir un après-midi
          au spa&nbsp;?{'\n'}
          {'    - '}Vous pouvez vous engager à ne dépenser que la moitié de ce montant en loisir, pour constituer une
          épargne avec le reste.
        </P>
      </TopContainer>
    </NavigationWrapper>
  );
};

export default ToHelpMeReduce;
