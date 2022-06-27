import React from 'react';
import Background from '../../../components/Background';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import OneDoseAlcoolExplanation from '../../../components/OneDoseAlcoolExplanation';
import NavigationWrapper from './NavigationWrapper';
import OMSIllustationsManAndWoman from '../../../components/OMSIllustationsManAndWoman';

const AlcoholAndNorms = () => {
  const title = "L'alcool et les normes";

  return (
    <NavigationWrapper
      title={title}
      timeReading={4}
      link={'https://www.vidal.fr/maladies/psychisme/alcool-dependance.html'}
      textLink2={"Les chiffres de l'Alcool en France selon OMS - Janvier 2019"}
      link2={
        'https://cdn.who.int/media/docs/default-source/country-profiles/substances-abuse/fra.pdf?sfvrsn=86adcfbe_3&download=true'
      }>
      <TopContainer>
        <P>
          Dans le langage courant, la consommation excessive, répétée et incontrôlable de boissons alcoolisées est le
          plus souvent nommée « alcoolisme ». Cependant, le manque de précision de ce terme a amené l'Organisation
          mondiale de la santé <Bold>(OMS)</Bold> à proposer un terme plus précis, « <Bold>alcoolodépendance</Bold> »,
          qui met en avant le <Bold>caractère addictif de l'alcool</Bold> et le parallèle qui existe avec les autres
          troubles de l'addiction (dépendance aux dérivés de l'opium, aux jeux d'argent, au sexe, etc.).
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>1/ Qu'est-ce qu'une consommation d'alcool à risque ?</H2>
        <Spacer size={20} />
        <P>
          Pour les autorités sanitaires françaises, il n'y a <Bold>pas de consommation d'alcool sans risque</Bold>, mais
          des consommations à risque plus ou moins élevé.{'\n'}
          On parle de consommation de boissons alcoolisées « <Bold>à risque</Bold> » lorsque la quantité d'alcool
          ingérée et la fréquence des prises est telle que, si ce comportement persiste sur une durée prolongée, des
          <Bold>complications physiques, psychiques et sociales</Bold> surviendront inévitablement.
        </P>
        <P>
          Des experts de Santé publique France et de l'Institut national du cancer ont tenté de définir des risques
          acceptables et propose une <Bold>valeur repère unique aussi bien pour les hommes que pour les femmes</Bold>{' '}
          exprimée sous la forme d'un nombre de verres d'alcool standard.
        </P>
        <P bold>
          Chez l'adulte, cette valeur repère est : {'\n    - '}de 10 verres d'alcool standard par semaine, maximum,
          {'\n    - '}
          sans dépasser 2 verres standard par jour.{'\n    - '} d'avoir des jours dans la semaine sans consommation
        </P>
        <P>
          Et, pour chaque occasion de consommation :{'\n   • '} de réduire la quantité totale d'alcool bue à chaque
          occasion, {'\n   • '}de boire lentement, en mangeant et en alternant avec de l'eau, {'\n   • '}d'éviter les
          lieux et les activités à risque de consommation excessive d'alcool, {'\n   • '}de s'assurer d'être entouré de
          personnes de confiance et de pouvoir rentrer chez soi en toute sécurité après avoir consommé de l'alcool.
        </P>
        <OMSIllustationsManAndWoman />
        <Spacer size={20} />
        <P color={'#4030a5'} bold>
          À quoi correspond un verre de boisson alcoolisée ?
        </P>
        <P>
          En France, par tradition, la contenance des verres est adaptée au degré alcoolique des boissons qu'ils sont
          supposés contenir. Nous parlerons d'unité d'alcool car dans tous les cas un verre de boisson apporte 10
          grammes d'alcool pur :
        </P>
        <OneDoseAlcoolExplanation noMinHeight />
        <H2 color={'#4030a5'}>2/ Qu'appelle t-on alcoolodépendance ?</H2>
        <Spacer size={20} />
        <P>
          L'alcoolodépendance est une addiction à l'alcool sous forme de boissons plus ou moins « fortes». La
          <Bold> consommation répétée</Bold> de boissons alcoolisées peut prendre différentes formes selon le rythme de
          consommation et la quantité d'alcool ingérée.{'\n'} On distingue divers degrés de sévérité qui vont de
          l'abstinence (aucune prise d'alcool) à la dépendance avérée, selon un continuum d'intensité.
        </P>
        <P>
          L'alcoolodépendance a des <Bold>conséquences néfastes sur la santé</Bold>, la <Bold>vie sociale</Bold> et la
          <Bold> vie affective</Bold>.
        </P>
        <P>
          En France, on estime qu'environ 1,5 millions de personnes sont alcoolodépendantes et que 2,5 millions de
          personnes ont une consommation à risque.{'\n'} L'addiction à l'alcool est plus souvent masculine : 14 % des
          hommes contre 5 % de la population féminine. La consommation excessive d'alcool serait responsable, selon les
          sources, de 33 000 à 49 000 décès par an en France.
        </P>
        <P>
          Selon l'OMS, l'alcoolodépendance est avérée lorsque la consommation de boissons alcoolisées devient
          prioritaire par rapport aux autres comportements auparavant prédominants chez une personne. Le
          <Bold> désir de boire de l'alcool devient impossible à maîtriser</Bold> et doit être assouvi au détriment de
          toute autre considération. L'alcool devient une <Bold>obsession</Bold>. Sa consommation doit être poursuivie
          même lorsqu'elle entraîne des conséquences manifestement problématiques. Tout d'abord, le buveur développe une
          tolérance. Il doit <Bold>boire des quantités toujours plus importantes</Bold> d'alcool pour obtenir les effets
          recherchés.
        </P>
        <P>
          Puis le buveur passe à un stade où il ne peut plus contrôler sa consommation. Une dépendance physique
          s'installe. L'arrêt des boissons alcoolisées provoque alors des <Bold>symptômes de manque</Bold> (sueurs,
          tremblements, vertiges, etc.) qui sont difficiles à supporter.
        </P>
        <Spacer size={20} />
        <P color={'#4030a5'} bold>
          La France, un pays où l'on boit moins qu'avant
        </P>
        <P>
          <Bold>En France, la consommation de boissons alcoolisées a fortement baissé en quarante ans : </Bold>
          de 22 litres d'alcool pur par personne de plus de 15 ans et par an en 1970, nous sommes passés à environ 12
          litres (en nombre de verres par jour, cela correspond à respectivement 5 verres par jour et par personne et
          2,6 verres par jour et par personne). Cette diminution de moitié de la consommation globale est
          essentiellement due à une baisse de la consommation de vin. Mais ces chiffres optimistes ne doivent pas cacher
          la réalité :
          <Bold>
            {' '}
            la consommation moyenne des hommes en France reste autour de 4,4 verres par jour et par personne !
          </Bold>{' '}
          20% des Français et 7 % des Françaises de 12 à 75 ans déclarent consommer une boisson alcoolisée tous les
          jours de l'année et les mêmes pourcentages déclarent avoir été au moins une fois en état d'ivresse au cours
          des douze derniers mois. Entre 65 et 75 ans, les consommateurs quotidiens représentent 56 % des hommes et 23 %
          des femmes. {'\n'}
          <Bold>En France, la consommation de boissons alcoolisées se compose essentiellement de vins</Bold> (58 %, en
          baisse sensible), de spiritueux (22 % avec une tendance à l'augmentation) et de bière (17,5 %, une valeur
          constante depuis des années).{'\n'} Dans l'Union européenne, la France se place en 15e position en terme de
          consommation d'alcool par habitant, un peu au dessus de la moyenne. Les pays d'Europe centrale et de l'Est
          restent les plus gros consommateurs de boissons alcoolisées.
        </P>
        <Spacer size={20} />
        <P color={'#4030a5'} bold>
          Zoom sur la France, un pays où l'on boit moins qu'avant
        </P>
        <P>
          La consommation de boissons alcoolisées <Bold>a fortement baissé depuis 1970</Bold> : nous sommes passés de 22
          litres d'alcool pur par an et par personne de plus de 15 ans (soit 5 verres par jour), à environ
          <Bold> 12 litres</Bold> (soit 2,6 verres par jour).
        </P>
        <P> Cette diminution de moitié est essentiellement due à une baisse de la consommation de vin. </P>
        <P>
          Mais ces chiffres optimistes ne doivent pas cacher la réalité :{' '}
          <Bold>
            la consommation moyenne des hommes en France reste autour de 4,4 verres par jour et par personne !
          </Bold>
        </P>
        <P>
          <Bold>Que boivent les Français ?</Bold>
          {'\n'} Majoritairement, 58% boivent du <Bold>vin</Bold> (en baisse sensible), 22% des <Bold>spiritueux</Bold>{' '}
          (en augmentation) et 17,5% de la <Bold>bière</Bold> (stable depuis des années).
        </P>
        <P>
          <Bold>Qui sont les consommateurs quotidiens ?</Bold> 20% des hommes et 7 % des femmes de 12 à 75 ans déclarent
          consommer une boisson alcoolisée tous les jours, et pour la tranche d'âge 65-75 ans, ce taux montent à 56 %
          des hommes et 23 % des femmes.
        </P>
        <P>
          Dans l'Union européenne, la France se place en 15e position en terme de consommation d'alcool par habitant, un
          peu au dessus de la moyenne. Les pays d'Europe centrale et de l'Est restent les plus gros consommateurs de
          boissons alcoolisées.
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>3/ Qu'est ce qu'une consommation épisodique massive ou “binge drinking” ?</H2>
        <Spacer size={20} />
        <P>
          Certaines personnes boivent des quantités d'alcool importantes (au moins six verres) en un minimum de temps.
          Cette consommation occasionnelle et massive, également appelée « binge drinking » ou «{' '}
          <Bold>biture express</Bold> », est devenue fréquente chez les adolescents et les jeunes adultes. Elle est
          particulièrement dangereuse, car elle peut être responsable d'intoxication aiguë (déliriums) pouvant entraîner
          le décès par arrêt cardiaque.
        </P>
        <P>
          Récemment, une forme particulière de binge drinking est apparue, la « <Bold>neknomination</Bold> », où des
          adolescents se lancent des défis via la mise en ligne de vidéos où ils ingurgitent de grandes quantités
          d'alcool « cul sec ».
        </P>
      </TopContainer>
    </NavigationWrapper>
  );
};

export default AlcoholAndNorms;
