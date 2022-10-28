import React from 'react';
import { Text } from 'react-native';
import { Spacer, P, TopContainer, Bold, Underlined } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import styled from 'styled-components';
import { View } from 'react-native';
import { defaultPaddingFontScale } from '../../../styles/theme';
import AlcoholAndHealthRisks1 from '../../../components/illustrations/articles/AlcoholAndHealthRisks1';
import AlcoholAndHealthRisks2 from '../../../components/illustrations/articles/AlcoholAndHealthRisks2';
import AlcoholAndHealthRisks3 from '../../../components/illustrations/articles/AlcoholAndHealthRisks3';
import AlcoholAndHealthRisks4 from '../../../components/illustrations/articles/AlcoholAndHealthRisks4';
import AlcoholAndHealthRisks5 from '../../../components/illustrations/articles/AlcoholAndHealthRisks5';
import AlcoholAndHealthRisks6 from '../../../components/illustrations/articles/AlcoholAndHealthRisks6';
import AlcoholAndHealthRisks7 from '../../../components/illustrations/articles/AlcoholAndHealthRisks7';

const AlcoholAndHealthRisks = ({ navigation }) => {
  const title = 'Alcool et risques santé';
  return (
    <NavigationWrapper
      title={title}
      timeReading={4}
      sourcesDrTalbot={false}
      link={'https://doi.org/10.1037/0708-5591.49.1.24'}
      noPaddingHorizontal>
      <TopContainer>
        <PaddingContainer>
          <P>
            <Bold>Même consommé en faible quantité</Bold>, l’alcool a une influence sur le développement de{' '}
            <Bold>nombreuses maladies</Bold> : cancers, maladies cardiovasculaires et digestives, maladies du système
            nerveux et troubles psychiques. L’alcool peut également être à l’origine de difficultés plus courantes
            (fatigue, tension artérielle trop élevée, troubles du sommeil, problèmes de mémoire ou de concentration,
            etc.).
          </P>
        </PaddingContainer>

        <WhiteBackground>
          <AlcoholAndHealthRisks1 />
        </WhiteBackground>

        <PaddingContainer>
          <H2 color={'#4030a5'}>Alcool et cancers</H2>
          <Spacer size={20} />
          <P>
            La consommation d’alcool augmente le risque de certains cancers et ce{' '}
            <Bold>à partir d’un verre par jour</Bold>.
          </P>
          <P>
            Ce risque est le même <Bold>quelle que soit la boisson alcoolisée</Bold> consommée : vin, bière, apéritif ou
            alcool fort (spiritueux). C’est la molécule d’alcool (l’éthanol) qui est cancérigène.
          </P>
          <P>
            <Bold>Sept cancers</Bold> ont un lien avéré avec une consommation d’alcool, dès un verre par jour :
            {'\n\n\u2022'} bouche et la gorge (larynx, pharynx), {'\n\u2022'} œsophage, {'\n\u2022'} foie, {'\n\u2022'}{' '}
            côlon et rectum, {'\n\u2022'} sein.
          </P>
          <P>
            La consommation associée d’alcool et de <Bold>tabac</Bold> augmente encore plus les risques de cancers
            comme, par exemple, ceux de la bouche et de la gorge.
          </P>
        </PaddingContainer>

        <WhiteBackground>
          <AlcoholAndHealthRisks2 />
        </WhiteBackground>

        <PaddingContainer>
          <H2 color={'#4030a5'}>Alcool et maladies cardiovasculaires</H2>
          <Spacer size={20} />
          <P>
            La consommation régulière d’alcool :{'\n\u2022'} augmente la pression artérielle et augmente le risque d’
            <Bold>hypertension</Bold>,{'\n\u2022'} favorise les <Bold>hémorragies cérébrales</Bold>,{'\n\u2022'} peut
            entraîner des <Bold>troubles du rythme cardiaque</Bold>.
          </P>
          <P>
            De plus, une <Bold>consommation aiguë d’alcool</Bold> (boire de grandes quantités d’alcool en une seule
            occasion), peut entraîner des <Bold>troubles du rythme cardiaque</Bold> et augmente le risque de{' '}
            <Bold>mort subite</Bold>.
          </P>
        </PaddingContainer>

        <WhiteBackground>
          <AlcoholAndHealthRisks3 />
        </WhiteBackground>

        <PaddingContainer>
          <H2 color={'#4030a5'}>Alcool et foie</H2>
          <Spacer size={20} />
          <P>
            L’alcool est la cause principale des <Bold>cirrhoses du foie</Bold>, autant pour les personnes
            alcoolo-dépendantes que pour celles qui ont une consommation régulière et excessive.
          </P>
          <P>
            La cirrhose du foie est une maladie chronique et irréversible. Il s’agit d’une destruction progressive des
            cellules qui sont remplacées par un tissu fibreux. Le foie devient dur et bosselé, il peut changer de taille
            mais surtout il ne fonctionne plus correctement. À plus ou moins long terme, la cirrhose peut se transformer
            en <Bold>cancer du foie</Bold>.
          </P>
          <P>
            Pour les cirrhoses avancées, le seul traitement envisageable est la{' '}
            <Bold>transplantation d’un nouveau foie</Bold>. Dans les cas moins graves, l’
            <Bold>arrêt complet de la consommation d’alcool</Bold> et la prise en charge{' '}
            <Bold>améliorent les chances de survie</Bold>.
          </P>
        </PaddingContainer>

        <WhiteBackground>
          <AlcoholAndHealthRisks4 />
        </WhiteBackground>

        <PaddingContainer>
          <H2 color={'#4030a5'}>Alcool et cerveau</H2>
          <Spacer size={20} />
          <P>
            Une consommation régulière et excessive d’alcool peut être responsable de <Bold>troubles cognitifs</Bold> :
            altération de la mémoire, des capacités de planification, de l’attention et de la prise de décisions. Ces
            troubles s’observent notamment chez les personnes souffrant de <Bold>carences nutritionnelles</Bold>.
          </P>
          <P>
            Plus la consommation d’alcool commence à un <Bold>âge précoce</Bold>, plus la détérioration du cerveau est
            importante.
          </P>
        </PaddingContainer>

        <WhiteBackground>
          <AlcoholAndHealthRisks5 />
        </WhiteBackground>

        <PaddingContainer>
          <H2 color={'#4030a5'}>Alcool et santé mentale</H2>
          <Spacer size={20} />
          <P>
            Une consommation excessive d’alcool est souvent associée à des <Bold>troubles psychiques</Bold>. Une
            consommation importante d'alcool peut déclencher une <Bold>dépression</Bold>. Inversement, une personne{' '}
            <Bold>anxieuse ou déprimée</Bold> peut chercher dans l’alcool un moyen de lutter contre son anxiété ou sa
            dépression. Une consommation régulière d’alcool peut alors s’installer et entraîner une{' '}
            <Bold>dépendance</Bold>.
          </P>
          <P>
            De plus, même si la consommation d’alcool semble apporter un mieux-être sur le moment, elle ne solutionne
            pas les difficultés de la personne. A l’inverse, à long terme, elle peut accroître sa dépression et son
            anxiété.
          </P>
          <P>
            Par ailleurs, même si l’alcool aide à s’endormir, il nuit à la qualité du sommeil et peut provoquer des{' '}
            <Bold>insomnies</Bold>.
          </P>
        </PaddingContainer>

        <WhiteBackground>
          <AlcoholAndHealthRisks6 />
        </WhiteBackground>

        <PaddingContainer>
          <H2 color={'#4030a5'}>Alcool et sexualité</H2>
          <Spacer size={20} />
          <P>
            Chez les <Bold>hommes</Bold>, l'alcool <Bold>perturbe l'érection</Bold>. Par le biais de la déshydratation,
            l’alcool altère le mécanisme de l'érection quand les corps caverneux du pénis se remplissent de sang.
          </P>
          <P>
            Chez les <Bold>femmes</Bold>, c'est la <Bold>lubrification vaginale</Bold> qui est perturbée, rendant alors
            le rapport inconfortable.
          </P>
        </PaddingContainer>

        <WhiteBackground>
          <AlcoholAndHealthRisks7 />
        </WhiteBackground>

        <PaddingContainer>
          <H2 color={'#4030a5'}>Alcool et grossesse</H2>
          <Spacer size={20} />
          <P>
            Boire de l'alcool pendant la grossesse est <Bold>toxique pour le fœtus</Bold> et peut entraîner diverses
            complications (retard de croissance, atteintes du système nerveux central, malformations, etc.), dont le{' '}
            <Bold>syndrome d'alcoolisation fœtale</Bold> est la forme la plus grave.
          </P>
          <P>Grossesse veut dire alcool zéro !</P>
        </PaddingContainer>
      </TopContainer>
    </NavigationWrapper>
  );
};

const WhiteBackground = styled.View`
  background-color: #fff;
  align-items: center;
  margin: 10px;
`;

const PaddingContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

export default AlcoholAndHealthRisks;
