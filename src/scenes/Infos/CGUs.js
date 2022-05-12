import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styled from 'styled-components';
import Background from '../../components/Background';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import UnderlinedButton from '../../components/UnderlinedButton';
import { defaultPadding } from '../../styles/theme';

const CGUs = ({ onClose }) => (
  <SafeAreaProvider>
    <Background color="#f9f9f9">
      <Container>
        <BackButton content="< Retour" onPress={onClose} bold />

        <H1>Conditions Générales d'Utilisation - OzEnsemble</H1>
        <Spacer size={50} />
        <P>
          Les présentes conditions générales d’utilisation (dites « CGU ») fixent le cadre juridique de l’application
          OzEnsemble et définissent les conditions d’accès et d’utilisation des services par l’Utilisateur.
        </P>
        <P>
          Le service est développé et opéré par l’association CaPASSCité avec le soutien de la Fabrique des Ministères
          Sociaux.
        </P>
        <Spacer size={30} />
        <H2>Article 1 - Champ d’application</H2>
        <Spacer size={30} />
        <P>
          Le présent document a pour objet d’encadrer l’utilisation de l’application, qui est d’accès libre et gratuit à
          tout Utilisateur. Le téléchargement de l’application suppose l’acceptation par tout Utilisateur des présentes
          conditions générales d’utilisation.
        </P>
        <P>
          L’inscription sur l’application peut entraîner l’application de conditions spécifiques, listées dans les
          présentes Conditions d’Utilisation.
        </P>
        <P>
          Toute utilisation du service est subordonnée à l’acceptation préalable et au respect intégral des présentes
          conditions générales d’utilisation (CGU).
        </P>
        <Spacer size={30} />
        <H2>Article 2 - Objet</H2>
        <Spacer size={30} />
        <P>
          Le présent service numérique « Oz-Ensemble » est un service à l’initiative de l’association CaPASSCité, avec
          l’appui de la Fabrique numérique des Ministères sociaux et de l’association CaPASSCité et a pour objet :
        </P>
        <P>- Le suivi et l’auto-évaluation de sa propre consommation d’alcool ; </P>
        <P>- La mise en relation avec un professionnel compétent et spécialisé en addiction.</P>
        <Spacer size={30} />
        <H2>Article 3 - Fonctionnalités</H2>
        <Spacer size={30} />
        <H2>Evaluation de la consommation quotidienne d’alcool et suivi</H2>
        <Spacer size={20} />
        <P>
          En téléchargeant l’application, l’Utilisateur peut accéder au formulaire d’auto-évaluation, sans aucune
          identification personnelle. Il doit néanmoins donner son consentement libre et éclairé au traitement de
          données à caractère personnel en cochant la case à cet effet.
        </P>
        <P>Le formulaire permet de l’aider à évaluer les risques liés à sa consommation d’alcool.</P>
        <P>
          Chaque Utilisateur peut évaluer sa consommation d’alcool et peut établir un suivi fondé sur ses propres
          déclarations.
        </P>
        <Spacer size={20} />
        <H2>Mise en relation avec un professionnel compétent</H2>
        <Spacer size={20} />
        <P>
          S’il le souhaite et qu’il estime sa consommation dangereuse, l’Utilisateur peut demander le suivi d’un
          professionnel, en détaillant son prénom ou un pseudonyme, ainsi que son numéro de téléphone.
        </P>
        <P>
          Le service met à disposition un numéro de téléphone permettant à l’Utilisateur de joindre anonymement un
          spécialiste. Lorsque l’Utilisateur a rempli le formulaire de contact et consenti au traitement de ses données,
          il est créé une demande de rendez-vous contenant les informations relatives à l’Utilisateur qui permettra la
          mise en contact.
        </P>
        <Spacer size={30} />
        <H2>Article 4 - Responsabilités </H2>
        <Spacer size={30} />
        <H2>OzEnsemble</H2>
        <Spacer size={20} />
        <P>
          Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement de la Plateforme et
          sous réserve de toute interruption ou modification en cas de maintenance, n'engage pas la responsabilité de
          l’association CaPASSCité.
        </P>
        <P>L’éditeur s’engage à mettre en œuvre toutes mesures appropriées, afin de protéger les données traitées.</P>
        <P>
          L’éditeur s’engage à la sécurisation de la Plateforme, notamment en prenant toutes les mesures nécessaires
          permettant de garantir la sécurité et la confidentialité des informations fournies.
        </P>
        <P>
          L’éditeur fournit les moyens nécessaires et raisonnables pour assurer un accès continu, sans contrepartie
          financière, à la Plateforme. Il se réserve la liberté de faire évoluer, de modifier ou de suspendre, sans
          préavis, la plateforme pour des raisons de maintenance ou pour tout autre motif jugé nécessaire.
        </P>
        <Spacer size={30} />
        <H2>Article 5 – Traitement de Données à caractère personnel</H2>
        <Spacer size={30} />
        <H2>5.1 Responsable de traitement</H2>
        <Spacer size={20} />
        <P>
          Le Responsable de traitement est Madame la directrice de l’Association CaPASSCité, le docteur Géraldine
          TALBOT.
        </P>
        <Spacer size={20} />
        <H2>5.2 Données personnelles traitées</H2>
        <Spacer size={20} />
        <P>La présente application traite les données personnelles des Utilisateurs suivantes :</P>
        <P>
          - Données relatives à la mise en relation avec un professionnel compétent (prénom, pseudonyme, numéro de
          téléphone, score d’auto-évaluation)
        </P>
        <P>
          - Données permettant l’auto-évaluation de la consommation d’alcool sur sa santé (informations de santé
          relatives à la consommation d’alcool).
        </P>
        <Spacer size={20} />
        <H2>5.3 Finalités des traitements</H2>
        <Spacer size={20} />
        <P>L’application a pour finalité : </P>
        <P>- Le suivi et l’auto-évaluation de sa propre consommation d’alcool</P>
        <P>
          - La mise en relation avec un professionnel compétent et spécialisé en addiction, sur demande de
          l’Utilisateur.{' '}
        </P>
        <Spacer size={20} />
        <H2>5.4 Bases juridiques des traitements de données</H2>
        <Spacer size={20} />
        <P>
          A – Base juridique du traitement concernant les données permettant l’auto-évaluation de la consommation
          d’alcool sur sa santé
        </P>
        <P>
          Le traitement de données à caractère personnel est fondé sur le consentement de la personne concernée tel
          qu’entendu par l’article 6-a du règlement (UE) n°2016/679 du Parlement européen et du Conseil du 27 avril 2016
          relatif à la protection des personnes physiques à l’égard du traitement des données à caractère personnel et à
          la libre circulation de ces données.
        </P>
        <P>
          Le consentement relatif aux données d’auto-évaluation de la consommation d’alcool est collecté sous la forme
          d’une case à cocher, après le téléchargement de l’application et est conservé par l’association.
        </P>
        <P>
          B – Base juridique du traitement concernant les données relatives à la mise en relation avec un professionnel
          compétent.
        </P>
        <P>
          Le traitement de données à caractère personnel est fondé sur le consentement de la personne concernée tel
          qu’entendu par l’article 6-a du règlement (UE) n°2016/679 du Parlement européen et du Conseil du 27 avril 2016
          relatif à la protection des personnes physiques à l’égard du traitement des données à caractère personnel et à
          la libre circulation de ces données.
        </P>
        <P>
          Le consentement relatif aux données de mise en relation avec un professionnel compétent est collecté sous la
          forme d’une case à cocher, après avoir rempli le formulaire de mise en contact et est conservé par
          l’association.
        </P>
        <Spacer size={20} />
        <H2>5.5 Durée de conservation des traitements de données</H2>
        <Spacer size={20} />
        <P>
          Les données d’auto-évaluation de la consommation d’alcool sont conservées sur l’appareil mobile de
          l’Utilisateur et peuvent être supprimées à tout moment par lui.{' '}
        </P>
        <P>Ces données ne sont pas transférées ni à L’association, ni à la Fabrique des ministères sociaux.</P>
        <P>
          Les données relatives à la mise en relation avec un professionnel compétent sont conservées pendant 1 an à
          compter. En cas de retrait du consentement, les données sont supprimées dans les plus brefs délais.
        </P>
        <Spacer size={20} />
        <H2>5.6 Sécurité et confidentialité </H2>
        <Spacer size={20} />
        <P>
          Les données d’auto-évaluation de la consommation d’alcool sont conservées sur l’appareil mobile de
          l’Utilisateur et peuvent être supprimées à tout moment par lui.
        </P>
        <P>Les moyens de sécurisation suivants ont notamment été mis en œuvre : </P>
        <P>
          Les mesures techniques et organisationnelles de sécurité adoptées pour assurer la confidentialité, l’intégrité
          et protéger l’accès des données sont notamment :
        </P>
        <P>- Contrôle des accès </P>
        <P>- Chiffrement des données</P>
        <P>- Journalisation</P>
        <P>- Protection contre les virus, malwares et logiciels espions</P>
        <P>- Protection des réseaux</P>
        <P>- Sauvegarde</P>
        <P>- Mesures restrictives limitant l’accès physiques aux données à caractère personnel</P>
        <Spacer size={30} />
        <H2>Article 6 - Mise à jour des conditions d’utilisation</H2>
        <Spacer size={30} />
        <P>
          Les termes des présentes conditions d’utilisation peuvent être amendés à tout moment sans préavis, en fonction
          des modifications apportées à la plateforme, de l’évolution ou pour tout autre motif jugé nécessaire.
        </P>
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

const BackButton = styled(UnderlinedButton)`
  margin-right: auto;
  margin-left: -20px;
  margin-bottom: 30px;
`;

export default CGUs;
