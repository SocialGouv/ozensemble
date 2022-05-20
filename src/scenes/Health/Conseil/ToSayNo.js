import React from 'react';
import Background from '../../../components/Background';
import HeaderBackground from '../../../components/HeaderBackground';
import { ScreenBgStyled, Spacer, P, TopContainer, Bold } from '../styles';
import TopArticle from './TopArticle';
import H2 from '../../../components/H2';

const ToSayNo = ({ navigation }) => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <ScreenBgStyled>
        <TopArticle navigation={navigation} title={'Pour dire Non ? '} timeReading={5} />
        <TopContainer>
          <P>
            Elles sont nombreuses les occasions où nous sommes <Bold>invités à boire un ou plusieurs verres </Bold>
            d’alcool : un repas de famille, un apéritif entre collègues, une fête de famille... Lors de ces moments, il
            n’est pas toujours facile de refuser un verre de plus (ou le verre de trop) sans passer pour le moralisateur
            de la bande.
          </P>
          <P>
            Au niveau mondial, <Bold>la France</Bold> figure parmi les <Bold>pays les plus consommateurs d’alcool</Bold>
            . Si la consommation globale a considérablement diminué depuis les années 50, dans notre pays, boire de
            l’alcool reste synonyme de convivialité. C’est pourquoi la nouvelle campagne de l’INPES tente de valoriser
            les <Bold>moyens d’agir au quotidien pour refuser le verre de trop</Bold>. Les spots évitent tout discours
            moralisateur et ne pointent pas les dangers liés à la consommation d’alcool mais nous encouragent à
            considérer que ceux qui refusent un verre
            <Bold> ne gâchent pas la fête et ne font pas figure de rabat-joie.</Bold>
          </P>
          <P>
            Le but est d’amener chacun d’entre nous à considérer que
            <Bold> dire non à l’alcool devrait être simple, possible et naturel</Bold>.
          </P>
          <P>
            Vous verrez que le plus souvent, c’est de ne pas s’être préparé à émettre un refus qui fait que sur le
            moment on se sent obligé d’accepter.{'\n'} Préparez tranquillement votre refus et tenez-y tranquillement.
            {'\n'}
            <Bold>« Je ne t’empêche pas, mais pour moi ça ira »</Bold> peut devenir votre <Bold>mantra</Bold> !
          </P>
          <Spacer size={20} />
          <H2 color={'#4030a5'}>Aux repas :</H2>
          <Spacer size={20} />
          <P>
            <Bold>{'    - '}“Non merci, je viens d’en terminer un verre.”</Bold>
          </P>
          <P>
            Ce que vous ressentez après une boisson est une question individuelle, et si vous ne voulez pas boire un
            autre verre instantanément, tout ce que cela implique est de bonnes <Bold>limites personnelles</Bold> autour
            de votre propre <Bold>confort</Bold>. Il montre également que vous n'êtes pas un buveur compulsif.
          </P>
          <P>
            <Bold>{'    - '}”J'ai eu ma limite pour ce soir.”</Bold>
          </P>
          <P>
            C'est la meilleure réponse si vous buvez régulièrement avec les mêmes personnes. Vous voulez contrôler votre
            consommation d'alcool, et avez <Bold>fixé une limite</Bold>.
          </P>
          <P>
            <Bold>{'    - '}“Je veux garder une tête claire.”</Bold>
          </P>
          <P>
            Les variations sur cette réponse sont: {'\n'}- "Non merci, j'ai du travail demain",{'\n'}- "Non merci, j'ai
            un départ tôt le matin," {'\n'}- ou "Non merci, je ne veux pas avoir une gueule de bois." {'\n'}C'est une
            excellente façon de faire savoir aux gens que l'
            <Bold>alcool ne gouverne pas votre vie</Bold>, et que vous ne la laisserez pas interférer avec votre
            fonctionnement au jour le jour.
          </P>
          <P>
            <Bold>{'    - '}“Je ne bois pas”</Bold>
          </P>
          <Spacer size={20} />
          <H2 color={'#4030a5'}>En soirée :</H2>
          <Spacer size={20} />
          <P>{'   - '}Proposer de conduire</P>
          <P>
            {'   - '}Répondez que vous faites attention à votre hygiène de vie en ce moment : sommeil, alimentation,
            sport…
          </P>
          <P>
            {'   - '}Prenez le contrôle de la bouteille d’alcool – si c’est vous qui servez, vous pourrez mieux
            quantifier la dose{' '}
          </P>
          <P>
            {'   - '}Commander un cocktail sans alcool ou une bière sans alcool : rien n’empêche de trinquer et partager
            avec un verre de soft
          </P>
          <P>{'   - '}Répondez que vous avez assez bu et que vous passez aux softs.</P>
          <Spacer size={20} />
          <H2 color={'#4030a5'}>Et quelques mises en situation …</H2>
          <Spacer size={20} />
          <P>
            <Bold color={'#4030a5'}>Je suis à un repas avec des amis</Bold>
          </P>
          <P>
            <Bold>1. Dites non directement.</Bold>
          </P>
          <P>
            Si quelqu'un vous propose de l'alcool, la <Bold>meilleure réponse et la plus simple</Bold> est un simple{' '}
            <Bold>« Non, merci ».</Bold>
            {'\n'}
            Parfois, des gens peuvent vous pousser à consommer ou ne respectent pas vos choix. Si la personne qui
            insiste vous interroge, vous pouvez essayer des réponses plus détaillées comme par exemple «Non merci mais
            je dois conduire » ou simplement lui demander de respecter votre choix, même si à du mal à le comprendre.
          </P>
          <Spacer size={100} />
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

export default ToSayNo;
