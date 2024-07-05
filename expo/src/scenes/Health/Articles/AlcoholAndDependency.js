import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { screenWidth } from '../../../styles/theme';

const AlcoholAndDependency = () => {
  const title = 'Dépendance physique à l’alcool';
  const navigation = useNavigation();
  return (
    <NavigationWrapper
      title={title}
      timeReading={2}
      sourcesDrTalbot={false}
      link={[
        'https://www.addictaide.fr/les-signes-du-sevrage-a-connaitre-si-vous-arretez-de-boire-dun-seul-coup',
        'https://www.inserm.fr/dossier/alcool-sante',
        'https://www.ameli.fr/assure/sante/themes/alcool-sante',
      ]}>
      <TopContainer>
        <P>
          Selon l'OMS, l'alcoolodépendance est avérée lorsque la consommation de boissons alcoolisées devient{' '}
          <Bold>prioritaire par rapport aux autres comportements</Bold> auparavant prédominants chez une personne.
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Le syndrome de sevrage</H2>
        <Spacer size={20} />
        <P>
          Le syndrome de sevrage est un ensemble de{' '}
          <Bold>symptômes qui apparaissent dans les suites de l’arrêt de la consommation d’alcool</Bold>
          {'\n\n\u2022'} soit immédiatement,
          {'\n\u2022'} soit de manière différée, jusqu’au dixième jour suivant cet arrêt.
        </P>
        <P>
          Ces manifestations traduisent un état de manque <Bold>psychique, comportemental et physique</Bold>.
        </P>
        <P>
          Même en l’absence de dépendance physique, 5% des personnes avec une consommation d’alcool font malgré tout un
          syndrome de sevrage.
        </P>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Les symptômes</H2>
        <Spacer size={20} />
        <P>
          Le syndrome de sevrage associe de façon variable plusieurs types de manifestations. Il apparaît généralement
          de <Bold>6h à 8h après le dernier verre d’alcool</Bold>. Dans la grande majorité des cas, il se manifeste par
          les symptômes suivants :{'\n\n\u2022'} <Bold>Troubles psychiques</Bold> : anxiété, agitation, irritabilité,
          insomnie, cauchemars.
          {'\n\u2022'} <Bold>Troubles neurovégétatifs</Bold> : sueurs, tremblements, tachycardie, hypertension
          artérielle.
          {'\n\u2022'} <Bold>Troubles digestifs</Bold> : anorexie, nausées, vomissements.
        </P>
        <P>
          Dans les heures qui suivent, ce tableau peut se compliquer :{'\n\n\u2022'} De signes confusionnels.
          {'\n\u2022'} D’hallucinations.
          {'\n\u2022'} De delirium tremens.
          {'\n\u2022'} De convulsions.
          {'\n\u2022'} D’hyperthermie.
        </P>
        <P>
          Les <Bold>accidents de sevrage</Bold> sont représentés par les crises convulsives et ultimement le delirium
          tremens. Ces accidents surviennent lors d’un sevrage en alcool trop brutal du corps sans suivi médical.{'\n'}
          Un projet d’accompagnement médical de sevrage est proposé à toute personne désireuse de réduire sa
          consommation d’alcool.
        </P>
        <ImageContainer>
          <ImageStyled source={require('../../../assets/illustrations/illustrationSevrage.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>Prise en charge</H2>
        <Spacer size={20} />
        <P>
          L’apparition de ce syndrome justifie dans tous les cas une <Bold>évaluation médicale</Bold> et souvent une{' '}
          <Bold>hospitalisation</Bold> suivant la gravité.Les risques à ne pas consulter face à ces symptômes est leur
          aggravation, puis la confusion, le coma et le <Bold>décès</Bold>. Le syndrome de sevrage est{' '}
          <Bold>résolutif sous traitement</Bold> en 2 à 5 jours.
        </P>
        <P>
          Si vous avez beaucoup bu pendant une période ou que des symptômes de sevrage apparaissent lorsque vous essayez
          de réduire ou d'arrêter votre consommation d'alcool,{' '}
          <Bold>il est fortement conseillé de consulter votre médecin généraliste ou un médecin addictologue</Bold>.
        </P>
        <P>
          Il est impossible de prévoir comment votre situation évoluera et un médecin peut vous prescrire un traitement
          qui atténue les symptômes du sevrage et limite les risques d’aggravation des symptômes.
        </P>
        <ButtonPrimary
          content={'J’échange avec un professionnel'}
          onPress={() => navigation.navigate('CONTACT')}
          widthSmall
          small
        />
      </TopContainer>
    </NavigationWrapper>
  );
};

const ImageContainer = styled.View`
  align-items: center;
`;

const ImageStyled = styled.Image`
  width: ${screenWidth * 0.9}px;
  height: ${screenWidth * 0.9 * 0.48}px;
`;

export default AlcoholAndDependency;
