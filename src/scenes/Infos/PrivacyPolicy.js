import React from 'react';
import { Linking, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styled from 'styled-components';
import Background from '../../components/Background';
import GoBackButtonText from '../../components/GoBackButtonText';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import { defaultPadding } from '../../styles/theme';

const PrivacyPolicy = ({ onClose }) => (
  <SafeAreaProvider>
    <Background color="#f9f9f9">
      <Container>
        <BackButton content="< Retour" onPress={onClose} bold />
        <H1>Mentions Légales & Politique de Confidentialité - Application Oz Ensemble</H1>
        <Spacer size={50} />
        <H2>Mentions Légales - Editeur de la plateforme</H2>
        <Spacer size={30} />
        <P>Association CaPASSCité</P>
        <P>Madame Géraldine TALBOT, Directrice</P>
        <P>70, rue Douy Delcupe</P>
        <P>93100 Montreuil</P>
        <Spacer size={30} />
        <H2>Traitement des données à caractère personnel</H2>
        <Spacer size={30} />
        <P>
          Le présent site « Oz-Ensemble » est un service développé et opéré par l'association CaPASSCité avec le soutien
          de la Fabrique des Ministères Sociaux.
        </P>
        <P>
          Le Responsable de traitement est madame la directrice de l'Association CaPASSCité, le docteur Géraldine
          TALBOT.
        </P>
        <Spacer size={30} />
        <H2>Finalités</H2>
        <Spacer size={30} />
        <P>Le site vise à présenter l'application OzEnsemble et ses fonctionnalités pour les différents acteurs.</P>
        <Spacer size={20} />
        <H2>Données à caractère personnel traitées</H2>
        <Spacer size={20} />
        <P>Le site peut collecter les données à caractère personnel suivantes : </P>
        <P> {'  -'} Données de connexion</P>
        <P> {'  -'} Cookies</P>
        <Spacer size={30} />
        <H2>Bases juridiques des traitements de données</H2>
        <Spacer size={30} />
        <P>
          Le traitement de données à caractère personnel est nécessaire au respect d'une obligation légale pesant sur le
          responsable de traitement telle qu'entendue par l'article 6-c du règlement (UE) n°2016/679 du Parlement
          européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du
          traitement des données à caractère personnel et à la libre circulation de ces données.
        </P>
        <P>
          Cette obligation légale est posée par la loi LCEN n° 2004-575 du 21 juin 2004 pour la confiance dans
          l'économie numérique et par l'article 1 du décret n°2021-1363 portant injonction, au regard de la menace grave
          et actuelle contre la sécurité nationale, de conservation pour une durée d'un an de certaines catégories de
          données de connexion.
        </P>
        <P>
          En application de l'article 5(3) de la directive 2002/58/CE modifiée concernant le traitement des données à
          caractère personnel et la protection de la vie privée dans le secteur des communications électroniques,
          transposée à l'article 82 de la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux
          libertés, les traceurs ou cookies suivent deux régimes distincts.
        </P>
        <P>
          Les cookies strictement nécessaires au service ou ayant pour finalité exclusive de faciliter la communication
          par voie électronique sont dispensés de consentement préalable au titre de l'article 82 de la loi n°78-17 du 6
          janvier 1978.
        </P>
        <P>
          Les cookies n'étant pas strictement nécessaires au service ou n'ayant pas pour finalité exclusive de faciliter
          la communication par voie électronique doivent être consenti par l'utilisateur.
        </P>
        <P>
          Ce consentement de la personne concernée pour une ou plusieurs finalités spécifiques constitue une base légale
          au sens du RGPD et doit être entendu au sens de l'article 6-a du Règlement (UE) 2016/679 du Parlement européen
          et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des
          données à caractère personnel et à la libre circulation de ces données.
        </P>
        <Spacer size={30} />
        <H2>Durée de conservation</H2>
        <Spacer size={30} />
        <P>Les données de connexion sont conservées par l'hébergeur pour une durée de 12 mois.</P>
        <P>Les cookies sont conservés pour une durée de 13 mois.</P>
        <Spacer size={30} />
        <H2>Droit des personnes concernées</H2>
        <Spacer size={30} />
        <P>Vous disposez des droits suivants concernant vos données à caractère personnel :</P>
        <P>- Droit d'information et droit d'accès aux données</P>
        <P>- Droit de rectification et le cas échéant de suppression des données</P>
        <P>- Droit à la limitation du traitement de données</P>
        <P>- Droit au retrait du consentement </P>
        <P>
          Pour les exercer, faites-nous parvenir une demande en précisant la date et l'heure précise de la requête – ces
          éléments sont indispensables pour nous permettre de retrouver votre recherche – par voie électronique à
          l'adresse suivante :
        </P>
        <P onPress={() => Linking.openURL('mailto:contact@ozensemble.fr')}>contact@ozensemble.fr</P>
        <P>
          En raison de l'obligation de sécurité et de confidentialité dans le traitement des données à caractère
          personnel qui incombe au responsable de traitement, votre demande ne sera traitée que si vous apportez la
          preuve de votre identité.
        </P>
        <P>
          Pour vous aider dans votre démarche, vous trouverez ici{' '}
          <Text onPress={() => Linking.openURL('https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces')}>
            https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces
          </Text>
          , un modèle de courrier élaboré par la CNIL.
        </P>
        <P>
          Le responsable de traitement s'engage à répondre dans un délai raisonnable qui ne saurait dépasser 1 mois à
          compter de la réception de votre demande.
        </P>
        <Spacer size={30} />
        <H2>Destinataires des données</H2>
        <Spacer size={30} />
        <P>
          Le responsable de traitement s'engage à ce que les données à caractère personnel soient traitées par les
          seules personnes autorisées : les acteurs partenaires dans le cadre de l'utilisation de « OzEnsemble » et
          l'équipe de la plateforme OzEnsemble.
        </P>
        <Spacer size={30} />
        <H2>Sécurité et confidentialité des données</H2>
        <Spacer size={30} />
        <P>
          Les mesures techniques et organisationnelles de sécurité adoptées pour assurer la confidentialité, l'intégrité
          et protéger l'accès des données sont notamment :
        </P>
        <P>- Chiffrement des données</P>
        <P>- Journalisation</P>
        <P>- Gestion des identités et des accès</P>
        <P>- Stockage des données en base de données</P>
        <P>- Stockage des mots de passe en base sont hâchés</P>
        <P>- Protection contre les virus, malwares et logiciels espions</P>
        <P>- Cloisonnement des données</P>
        <P>- Configuration et analyse des failles</P>
        <P>- Surveillance</P>
        <P>- Protection contre les virus, malwares et logiciels espions</P>
        <P>- Protection des réseaux</P>
        <P>- Sauvegarde</P>
        <P>- Mesures restrictives limitant l'accès physiques aux données à caractère personnel</P>
        <Spacer size={30} />
        <H2>Sous-traitants</H2>
        <Spacer size={30} />
        <P>Certaines données sont envoyées à de sous-traitants pour réaliser certaines missions.</P>
        <Spacer size={30} />
        <H2>Cookies</H2>
        <Spacer size={30} />
        <P>
          Un cookie est un fichier déposé sur votre terminal lors de la visite d'un site. Il a pour but de collecter des
          informations relatives à votre navigation et de vous adresser des services adaptés à votre terminal
          (ordinateur, mobile ou tablette).
        </P>
        <P>
          Le site dépose des cookies de mesure d'audience (nombre de visites, pages consultées), respectant les
          conditions d'exemption du consentement de l'internaute définies par la recommandation « Cookies » de la
          Commission nationale informatique et libertés (CNIL). Cela signifie, notamment, que ces cookies ne servent
          qu'à la production de statistiques anonymes et ne permettent pas de suivre la navigation de l'internaute sur
          d'autres sites. Le site dépose également des cookies de navigation, aux fins strictement techniques, qui ne
          sont pas conservés. La consultation de la plateforme n'est pas affectée lorsque les utilisateurs utilisent des
          navigateurs désactivant les cookies.
        </P>
        <P>
          <Bold>Nous utilisons pour cela Matomo,</Bold> un outil de mesure d'audience web libre, paramétré pour être en
          conformité avec la recommandation « Cookies » de la CNIL. Cela signifie que votre adresse IP, par exemple, est
          anonymisée avant d'être enregistrée. Il est donc impossible d'associer vos visites sur ce site à votre
          personne.
        </P>
        <P>
          Les données anonymisées issues de Matomo sont exportées vers un Metabase auquel aura accès l'équipe
          d'OzEnsemble.
        </P>
        <P>Il convient d'indiquer que :</P>
        <P> - Les données collectées ne sont pas recoupées avec d'autres traitements.</P>
        <P> - Les cookies ne permettent pas de suivre la navigation de l'internaute sur d'autres sites.</P>
      </Container>
    </Background>
  </SafeAreaProvider>
);

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 150,
  },
})`
  padding-horizontal: ${defaultPadding}px;
`;

const P = styled.Text`
  margin-bottom: 15px;
`;

const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
  margin-left: -20px;
  margin-bottom: 30px;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

export default PrivacyPolicy;
