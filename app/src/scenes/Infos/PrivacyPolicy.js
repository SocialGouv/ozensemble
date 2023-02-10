import React from 'react';
import { Linking, Text } from 'react-native';
import styled from 'styled-components';
import H2 from '../../components/H2';
import WrapperContainer from '../../components/WrapperContainer';
import TextStyled from '../../components/TextStyled';

const PrivacyPolicy = ({ onClose }) => (
  <WrapperContainer
    title="Mentions Légales & Politique de Confidentialité - Application Oz Ensemble"
    onPressBackButton={onClose}>
    <Spacer size={50} />
    <H2>Mentions Légales - Editeur de la plateforme</H2>
    <Spacer size={30} />
    <P>
      La Plateforme est éditée par l’Agence régionale de santé Île-de-France située : {'\n'}
      Immeuble Le Curve{'\n'}
      13 Rue du Landy{'\n'}
      93200 Saint-Denis{'\n'}
      Téléphone : 01 44 02 00 00{'\n'}
    </P>
    <P>Association CaPASSCité</P>
    <P>Madame Géraldine TALBOT, Directrice</P>
    <P>70, rue Douy Delcupe</P>
    <P>93100 Montreuil</P>
    <Spacer size={30} />
    <H2>Traitement des données à caractère personnel</H2>
    <Spacer size={30} />
    <P>
      La présente application « Oz-Ensemble » est un service développé et opéré par l'association CaPASSCité avec
      l'appui de la Fabrique des Ministères Sociaux.
    </P>
    <P>
      Le Responsable de traitement est Madame Amélie Verdier, Directrice générale de l’Agence régionale de santé
      Île-de-France.
    </P>
    <Spacer size={30} />
    <H2>Finalités</H2>
    <Spacer size={30} />
    <P>
      L'application peut collecter des données à caractère personnel pour auto-évaluer sa consommation d'alcool, et sur
      la base du volontariat être mis en relation avec un professionnel compétent.
    </P>
    <P>Ses finalités sont :</P>
    <P>- Le suivi et l'auto-évaluation de sa propre consommation d'alcool</P>
    <P>
      - La mise en relation avec un professionnel compétent et spécialisé en addiction, sur demande de l'Utilisateur
    </P>
    <Spacer size={20} />
    <H2>Données à caractère personnel traitées</H2>
    <Spacer size={20} />
    <P>L'application peut collecter les données à caractère personnel suivantes :</P>
    <P>
      - Données relatives à la mise en relation avec un professionnel compétent (prénom, pseudonyme, numéro de
      téléphone, score d'auto-évaluation)
    </P>
    <P>
      Données permettant l'auto-évaluation de la consommation d'alcool sur sa santé (informations relatives à la
      consommation d'alcool).
    </P>
    <Spacer size={30} />
    <H2>Bases juridiques des traitements de données</H2>
    <Spacer size={30} />
    <P>
      Le traitement de données à caractère personnel est fondée sur le consentement de la personne concernée tel
      qu'entendu par l'article 6-a du règlement (UE) n°2016/679 du Parlement européen et du Conseil du 27 avril 2016
      relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la
      libre circulation de ces données.
    </P>
    <P>
      Cette obligation légale est posée par la loi LCEN n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie
      numérique et par l’article 1 du décret n°2021-1363 portant injonction, au regard de la menace grave et actuelle
      contre la sécurité nationale, de conservation pour une durée d'un an de certaines catégories de données de
      connexion.
    </P>
    <Spacer size={30} />
    <H2>Durée de conservation</H2>
    <Spacer size={30} />
    <P>
      Les données d'auto-évaluation de la consommation d'alcool sont conservées sur l'appareil mobile de l'Utilisateur
      et peuvent être supprimées à tout moment par lui en supprimant l'application. Ces données ne sont pas transférées.
    </P>
    <P>
      Les données relatives à la mise en relation avec un professionnel compétent sont conservées pendant 1 an à compter
      de l'inactivité du compte. En cas de retrait du consentement, les données sont supprimées dans les plus brefs
      délais.
    </P>
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
      éléments sont indispensables pour nous permettre de retrouver votre recherche – par voie électronique à l'adresse
      suivante :
    </P>
    <P onPress={() => Linking.openURL('mailto:contact@ozensemble.fr')}>contact@ozensemble.fr</P>
    <P>
      En raison de l'obligation de sécurité et de confidentialité dans le traitement des données à caractère personnel
      qui incombe au responsable de traitement, votre demande ne sera traitée que si vous apportez la preuve de votre
      identité.{' '}
    </P>
    <P>
      Pour vous aider dans votre démarche, vous trouverez ici{' '}
      <TextStyled onPress={() => Linking.openURL('https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces')}>
        https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces
      </TextStyled>
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
      Le responsable de traitement s'engage à ce que les données à caractère personnel soient traitées par les seules
      personnes autorisées : les acteurs partenaires dans le cadre de l'utilisation de « Oz Ensemble&nbsp;» et l'équipe
      de l'application Oz Ensemble, ainsi que les sous-traitants de l'association CaPASSCité dans le cadre de
      l'application.
    </P>
    <Spacer size={30} />
    <H2>Sécurité et confidentialité des données</H2>
    <Spacer size={30} />
    <P>
      Les données d'auto-évaluation de la consommation d'alcool sont conservées sur l'appareil mobile de l'Utilisateur
      et peuvent être supprimées à tout moment par lui.{' '}
    </P>
    <P>
      Les données personnelles relatives à la mise en relation sont transmises par un canal sécurisé et mises à la
      disposition des seuls personnes habilitées à organiser la mise en relation et la prise de contact.
    </P>
    <P>Les moyens de sécurisation suivants ont notamment été mis en œuvre : </P>
    <P>
      Les mesures techniques et organisationnelles de sécurité adoptées pour assurer la confidentialité, l'intégrité et
      protéger l'accès des données sont notamment :
    </P>
    <P>- Contrôle des accès </P>
    <P>- Chiffrement des données</P>
    <P>- Journalisation</P>
    <P>- Protection contre les virus, malwares et logiciels espions</P>
    <P>- Protection des réseaux</P>
    <P>- Sauvegarde</P>
    <P>- Mesures restrictives limitant l'accès physiques aux données à caractère personnel</P>
    <P>Sous-traitants</P>
    <P>Certaines données sont envoyées à de sous-traitants pour réaliser certaines missions.</P>
    <P>- Partenaire : Microsoft Azure</P>
    <P>- Pays destinataire : Union européenne</P>
    <P>- Traitement réalisé : Hébergement des données</P>
    <P>- Garanties : https://privacy.microsoft.com/fr-fr/privacystatement</P>
    <P>Cookies</P>
    <P>Ozensemble, en tant qu'éditeur de la présente Plateforme, pourra faire usage de cookies.</P>
    <P>
      Un cookie est un fichier déposé sur votre terminal lors de la visite d’un site. Il a pour but de collecter des
      informations relatives à votre navigation et de vous adresser des services adaptés à votre terminal (ordinateur,
      mobile ou tablette).
    </P>
    <P>
      En application de l’article 5(3) de la directive 2002/58/CE modifiée concernant le traitement des données à
      caractère personnel et la protection de la vie privée dans le secteur des communications électroniques, transposée
      à l’article 82 de la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, les
      traceurs ou cookies suivent deux régimes distincts.
    </P>
    <P>
      Les cookies strictement nécessaires au service ou ayant pour finalité exclusive de faciliter la communication par
      voie électronique sont dispensés de consentement préalable au titre de l’article 82 de la loi n°78-17 du 6 janvier
      1978. Les cookies n’étant pas strictement nécessaires au service ou n’ayant pas pour finalité exclusive de
      faciliter la communication par voie électronique doivent être consenti par l’utilisateur.
    </P>
    <P>
      Ce consentement de la personne concernée pour une ou plusieurs finalités spécifiques constitue une base légale au
      sens du RGPD et doit être entendu au sens de l'article 6-a du Règlement (UE) 2016/679 du Parlement européen et du
      Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à
      caractère personnel et à la libre circulation de ces données.
    </P>
    <P>
      Le site dépose des cookies de mesure d’audience (nombre de visites, pages consultées), respectant les conditions
      d’exemption du consentement de l’internaute définies par la recommandation « Cookies » de la Commission nationale
      informatique et libertés (CNIL). Cela signifie, notamment, que ces cookies ne servent qu’à la production de
      statistiques anonymes et ne permettent pas de suivre la navigation de l’internaute sur d’autres sites. Le site
      dépose également des cookies de navigation, aux fins strictement techniques, qui ne sont pas conservés. La
      consultation de la plateforme n’est pas affectée lorsque les utilisateurs utilisent des navigateurs désactivant
      les cookies.
    </P>
    <P>
      Nous utilisons pour cela Matomo, un outil de mesure d’audience web libre, paramétré pour être en conformité avec
      la recommandation « Cookies » de la CNIL. Cela signifie que votre adresse IP, par exemple, est anonymisée avant
      d’être enregistrée. Il est donc impossible d’associer vos visites sur ce site à votre personne.
    </P>
    <P>Il convient d’indiquer que :</P>
    <P>Les données collectées ne sont pas recoupées avec d’autres traitements.</P>
    <P>Les cookies ne permettent pas de suivre la navigation de l’internaute sur d’autres sites.</P>
  </WrapperContainer>
);

const P = styled(TextStyled)`
  margin-bottom: 15px;
`;

const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export default PrivacyPolicy;
