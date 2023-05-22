import React from 'react';
import { Linking, Text, View } from 'react-native';
import styled from 'styled-components';
import H2 from '../../components/H2';
import WrapperContainer from '../../components/WrapperContainer';
import TextStyled from '../../components/TextStyled';
import { Bold } from '../../components/Articles';

const MentionsLegales = ({ onClose }) => (
  <WrapperContainer title="Mentions Légales - Application Oz Ensemble" onPressBackButton={onClose}>
    <Spacer size={20} />
    <H2>Editeur de l'application</H2>
    <Spacer size={30} />
    <P>
      L'application est éditée par l’Agence régionale de santé Île-de-France située{'\u00A0'}: {'\n\n'}
      Immeuble Le Curve{'\n'}
      13 Rue du Landy{'\n'}
      93200 Saint-Denis{'\n'}
      Téléphone : 01 44 02 00 00
    </P>
    <Spacer size={30} />
    <H2>Directrice de l’application</H2>
    <Spacer size={30} />
    <P>Madame Amélie Verdier, Directrice générale de l’Agence régionale de santé (ARS) Île-de-France.</P>
    <Spacer size={30} />
    <H2>Hébergement de l’application</H2>
    <Spacer size={30} />
    <P>Cette application est hébergée par{'\u00A0'}:</P>
    <P>
      Microsoft Azure France{'\n'}
      37 Quai du Président Roosevelt{'\n'}
      92130 Issy-les-Moulineaux{'\n'}
      France
    </P>
    <Spacer size={30} />
    <H2>Accessibilité</H2>
    <Spacer size={30} />
    <P>
      La conformité aux normes d’accessibilité numérique est un objectif ultérieur mais nous tâchons de rendre ce site
      accessible à toutes et à tous.
    </P>
    <Spacer size={30} />
    <H2>En savoir plus</H2>
    <Spacer size={30} />
    <P>
      Pour en savoir plus sur la politique d’accessibilité numérique de l’État{'\u00A0'}:{' '}
      <Text
        className="text-indigo-700"
        onPress={() => {
          Linking.openURL('http://references.modernisation.gouv.fr/accessibilite-numerique');
        }}>
        http://references.modernisation.gouv.fr/accessibilite-numerique
      </Text>
    </P>
    <Spacer size={30} />
    <H2>Signaler un dysfonctionnement</H2>
    <Spacer size={30} />
    <P>
      Si vous rencontrez un défaut d'accessibilité vous empêchant d'accéder à un contenu ou une fonctionnalité du site,
      merci de nous en faire part ici{'\u00A0'}:{' '}
      <Text className="text-indigo-700">ozensemble@fabrique.social.gouv.fr</Text>
    </P>
    <P>Pour le rejoindre vous pouvez{'\u00A0'}:</P>
    <View className="flex flex-row">
      <View>
        <P noMarginBottom>
          <Bold>{'   •  '}</Bold>
        </P>
      </View>
      <View className="flex flex-row basis-11/12">
        <P noMarginBottom>
          Utiliser le formulaire de contact en ligne ici{'\u00A0'}:{' '}
          <Text
            className="text-indigo-700"
            onPress={() => {
              Linking.openURL('http://references.modernisation.gouv.fr/accessibilite-numerique');
            }}>
            https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016
          </Text>
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
          Utiliser le formulaire de contact en ligne ici{'\u00A0'}:{' '}
          <Text className="text-indigo-700">Composer le 09 69 39 00 00 (du lundi au vendredi de 8h à 20h)</Text>
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
          Envoyer un courrier (sans timbre) à l’adresse suivante : Défenseur des droits, Libre réponse 71120, 75342
          Paris CEDEX 07.
        </P>
      </View>
    </View>
    <Spacer size={30} />
    <H2>Sécurité</H2>
    <Spacer size={30} />
    <P>
      Le site est protégé par un certificat électronique matérialisé pour la grande majorité des navigateurs par un
      cadenas. Cette protection participe à la confidentialité des échanges. En aucun cas, les services associés à
      l’application ne seront à l’origine d’envoi de courriels pour demander la saisie d’informations personnelles.
    </P>
    <Spacer size={30} />
    <P>Association CaPASSCité</P>
    <P>Madame Géraldine TALBOT, Directrice</P>
    <P>70, rue Douy Delcupe</P>
    <P>93100 Montreuil</P>
  </WrapperContainer>
);

const P = styled(TextStyled)`
  margin-bottom: 15px;
`;

const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export default MentionsLegales;
