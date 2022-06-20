import React from 'react';
import Background from '../../../components/Background';
import HeaderBackground from '../../../components/HeaderBackground';
import { Spacer, P, TopContainer, Bold } from './../../../components/Articles';
import H2 from '../../../components/H2';
import OneDoseAlcoolExplanation from '../../../components/OneDoseAlcoolExplanation';
import NavigationWrapper from './NavigationWrapper';
import { defaultPaddingFontScale } from '../../../styles/theme';

const DidYouKnow = () => {
  const title = 'Le saviez-vous ?';

  return (
    <Background color="#39cec0" withSwiperContainer>
      <HeaderBackground />
      <NavigationWrapper
        title={title}
        timeReading={2}
        link={
          'https://www.santepubliquefrance.fr/determinants-de-sante/alcool/documents/brochure/alcool-vous-en-savez-quoi'
        }>
        <TopContainer>
          <P>Pour une santé optimale, il est conseillé de limiter au maximum la consommation d'alcool.</P>
          <P>
            La règle d'or : ne pas dépasser les{' '}
            <Bold>deux verres par jour pour les hommes et les femmes, avec une journée sans consommer d'alcool</Bold>.
            {/* (pour
            plus de renseignements, voir notre article sur les normes) */}
          </P>
          <Spacer size={20} />
          <H2 color={'#4030a5'}>C'est quoi déjà un verre standard ?</H2>
          <Spacer size={20} />
          <P>
            {'    - '} Un verre "standard" <Bold>contient 10 grammes d'alcool pur</Bold>, quel que soit le type de
            boisson alcoolisée que vous consommez (vin, bière ou alcool fort). (illustration à récupérer dans Figma sur
            le frame : Bottom sheet Compter verre d'alcool )
          </P>
          <OneDoseAlcoolExplanation marginOffset={defaultPaddingFontScale()} noMinHeight />
          <P>
            {'    - '} <Bold>Six minutes </Bold>suffisent après la consommation de deux doses d'alcool pour que le
            <Bold> fonctionnement des neurones cérébraux</Bold> soit modifié par cette quantité d'alcool.
          </P>
          <P>
            {'    - '}Mais il faudra environ 1h30 pour éliminer chaque verre d'alcool et ce temps dépend de nombreux
            critères individuels. Il est bon de savoir que les “recettes de grand-mère” comme une douche ou du café ne
            fonctionnent pas pour éliminer plus rapidement l'alcool ingéré,{' '}
            <Bold>seul le temps compte pour faire baisser son alcoolémie</Bold>.
          </P>
          <Spacer size={20} />
          <H2 color={'#4030a5'}>Alcool et santé physique </H2>
          <Spacer size={20} />
          <P>
            {'    - '}L'alcool <Bold>déshydrate</Bold>, ce qui peut occasionner fatigue, maux de tête et difficulté de
            concentration et la fameuse "gueule de bois”.
          </P>
          <P>
            {'    - '}L'alcool favorise la formation de radicaux libres, ce qui provoque un{' '}
            <Bold>vieillissement cutané</Bold> plus précoce.
          </P>
          <P>
            {'    - '}L'alcool affecte votre taux de sucre sanguin et peut, dans certaines conditions, entraîner des{' '}
            <Bold>symptômes d'hypoglycémie</Bold>.
          </P>
          <P>{'    - '}L'alcool nuit à l'absorption de vitamines et minéraux.</P>
          <P>{'    - '}L'alcool peut atténuer l'efficacité des médicaments ou nuire à leur élimination.</P>
          <P>
            {'    - '}L'alcool perturbe le <Bold>cycle du sommeil</Bold> (perturbation proportionnelle à la dose
            d'alcool).
          </P>
          <Spacer size={20} />
          <H2 color={'#4030a5'}>Alcool et santé mentale </H2>
          <Spacer size={20} />
          <P>
            {'    - '}L'alcool est un <Bold>dépresseur du système nerveux</Bold>.
          </P>
          <P>
            {'    - '}L'alcool peut contribuer à l'<Bold>apparition de problèmes de santé mentale</Bold>, notamment chez
            les personnes ayant une prédisposition génétique ou une sensibilité aux effets de l'alcool
          </P>
          <P>
            {'    - '}L'alcool peut aggraver les problèmes de santé mentale comme l'
            <Bold>anxiété et la dépression</Bold>.
          </P>
          <P>{'    - '}L'alcool peut être festif mais peut induire rapidement des symptômes dépressifs</P>
          <P>
            {'    - '}L'alcool procure un effet <Bold>calmant</Bold>, mais qui tend à s'<Bold>estomper</Bold> avec une
            consommation régulière d'alcool.
          </P>
          <Spacer size={20} />
          <H2 color={'#4030a5'}>Alcool et sexe</H2>
          <Spacer size={20} />
          <P>
            {'    - '}L'alcool peut <Bold>nuire à l'érection</Bold> masculine car l'alcool peut diminuer le niveau de
            testostérone et la quantité des fibres élastiques du pénis, éléments nécessaires à une érection.
          </P>
          <P>
            {'    - '}Le risque d'avoir des problèmes sexuels masculins augmente en fonction du nombre de verres
            d'alcool consommés quotidiennement.
          </P>
          <P>
            {'    - '}Et l'alcool peut <Bold>nuire</Bold> également à la capacité féminine d'
            <Bold>atteindre l'orgasme</Bold>.
          </P>
          <P>
            {'    - '}L'alcool peut pousser à des <Bold>comportements à risques</Bold> (comme des rapports sexuels sans
            protection), ce qui peut générer des infections sexuellement transmissibles ou des grosesses non désirées.
          </P>
        </TopContainer>
      </NavigationWrapper>
    </Background>
  );
};

export default DidYouKnow;
