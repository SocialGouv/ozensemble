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
      Le Responsable de traitement est Madame la directrice de l'Association CaPASSCité, le docteur Géraldine TALBOT.
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
    <P>Cookies</P>
    <P>Ozensemble, en tant qu'éditeur de la présente Plateforme, pourra faire usage de cookies.</P>
    <P>
      Certains cookies sont dispensés du recueil préalable de votre consentement dans la mesure où ils sont strictement
      nécessaires à la fourniture du service. Les traceurs ont vocation à être conservés sur le poste informatique de
      l'Internaute pour une durée allant jusqu'à 13 mois.
    </P>
    <P>
      Ils permettent d'établir des mesures statistiques de fréquentation et d'utilisation du site pouvant être utilisées
      à des fins de suivi et d'amélioration du service :
    </P>
    <P>- Les données collectées ne sont pas recoupées avec d'autres traitements.</P>
    <P>- Le cookie déposé sert uniquement à la production de statistiques anonymes.</P>
    <P>- Le cookie ne permet pas de suivre la navigation de l'internaute sur d'autres sites</P>
    <P>
      La mesure d'audience (nombre de visites, pages consultées) est réalisée par un outil libre intitulé Matomo
      spécifiquement paramétré, respectant les conditions d'exemption du consentement de l'internaute définies par la
      recommandation «&nbsp;Cookies&nbsp;» de la Commission nationale informatique et libertés (CNIL).
    </P>
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
