import React from 'react';
import styled from 'styled-components';
import H2 from '../../components/H2';
import WrapperContainer from '../../components/WrapperContainer';
import TextStyled from '../../components/TextStyled';

const CGUs = ({ onClose }) => (
  <WrapperContainer title="Conditions Générales d'Utilisation - Oz Ensemble" onPressBackButton={onClose}>
    <Spacer size={50} />
    <P>
      Les présentes conditions générales d'utilisation (dites « CGU ») fixent le cadre juridique de l'application Oz
      Ensemble et définissent les conditions d'accès et d'utilisation des services par l'Utilisateur.
    </P>
    <P>
      Le service est développé et opéré par l’Agence régionale de santé (ARS) Île-de-France avec le soutien de la
      Fabrique des Ministères Sociaux.
    </P>
    <Spacer size={30} />
    <H2>Article 1 - Champ d'application</H2>
    <Spacer size={30} />
    <P>
      Le présent document a pour objet d'encadrer l'utilisation de l'application, qui est d'accès libre et gratuit à
      tout Utilisateur. Le téléchargement de l'application suppose l'acceptation par tout Utilisateur des présentes
      conditions générales d'utilisation.
    </P>
    <P>
      L'inscription sur l'application peut entraîner l'application de conditions spécifiques, listées dans les présentes
      Conditions d'Utilisation.
    </P>
    <P>
      Toute utilisation du service est subordonnée à l'acceptation préalable et au respect intégral des présentes
      conditions générales d'utilisation (CGU).
    </P>
    <Spacer size={30} />
    <H2>Article 2 - Objet</H2>
    <Spacer size={30} />
    <P>
      Le présent service numérique « Oz-Ensemble » est un service à l'initiative de l'association CaPASSCité, avec
      l'appui de la Fabrique numérique des Ministères sociaux et de l'association CaPASSCité et a pour objet :
    </P>
    <P>- Le suivi et l'auto-évaluation de sa propre consommation d'alcool ; </P>
    <P>- La mise en relation avec un professionnel compétent et spécialisé en addiction.</P>
    <Spacer size={30} />
    <H2>Article 3 - Fonctionnalités</H2>
    <Spacer size={30} />

    <Spacer size={30} />
    <H2>3.1 L’évaluation et le suivi de la consommation quotidienne d’alcool via un agenda</H2>
    <Spacer size={20} />
    <P>
      En téléchargeant l’application, l’Utilisateur peut accéder au formulaire d’auto-évaluation, sans aucune
      identification personnelle.
    </P>
    <P>
      Chaque Utilisateur peut évaluer sa consommation d’alcool et peut établir un suivi fondé sur ses propres
      déclarations. Il devra renseigner chaque jour sa consommation d’alcool, en fonction du type d’alcool (vins,
      bières, cocktails et spiritueux) et de la quantité (verre, demi, pinte, bouteille). Ces informations sont ajoutées
      manuellement ou par le biais d’un scan de la boisson.
    </P>
    <P>
      En outre, OzEnsemble propose désormais des conseils pour vous permettre de gérer certaines situations dans
      lesquelles vous vous trouvez.
    </P>
    <Spacer size={30} />
    <H2>3.2 Mes Conseils et informations</H2>
    <Spacer size={20} />
    <P>
      Vous pouvez également recevoir des informations à propos de la consommation d’alcool en général et de ses effets.
    </P>

    <Spacer size={30} />
    <H2>3.3 Mise en relation avec un professionnel compétent</H2>
    <Spacer size={20} />
    <P>
      S’il le souhaite et qu’il estime sa consommation dangereuse, l’Utilisateur peut demander le suivi d’un
      professionnel. En effet, l’application propose un lien de prise de rendez-vous via Doctolib. C’est dès lors
      directement via Doctolib que l’Utilisateur pourra prendre un rendez-vous.
    </P>

    <Spacer size={30} />
    <H2>3.4 Notifications</H2>
    <Spacer size={20} />
    <P>
      Vous pouvez accepter une notification quotidienne ou hebdomadaire qui vous rappellera que vous devez remplir votre
      agenda dans le but de suivre les évolutions et gains.
    </P>
    <P>Vous pouvez donner votre avis sur l’application grâce à une notification reçue une fois à 7 jours.</P>

    <Spacer size={30} />
    <H2>Article 4 - Responsabilités de l’éditeur </H2>
    <Spacer size={20} />
    <P>
      Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement de la Plateforme et sous
      réserve de toute interruption ou modification en cas de maintenance, n'engage pas la responsabilité de
      l'association CaPASSCité.
    </P>
    <P>L'éditeur s'engage à mettre en œuvre toutes mesures appropriées, afin de protéger les données traitées.</P>
    <P>
      L'éditeur s'engage à la sécurisation de la Plateforme, notamment en prenant toutes les mesures nécessaires
      permettant de garantir la sécurité et la confidentialité des informations fournies.
    </P>
    <P>
      L'éditeur fournit les moyens nécessaires et raisonnables pour assurer un accès continu, sans contrepartie
      financière, à la Plateforme. Il se réserve la liberté de faire évoluer, de modifier ou de suspendre, sans préavis,
      la plateforme pour des raisons de maintenance ou pour tout autre motif jugé nécessaire.
    </P>

    <Spacer size={30} />
    <H2>Article 5 - Mise à jour des conditions d'utilisation</H2>
    <Spacer size={30} />
    <P>
      Les termes des présentes conditions d'utilisation peuvent être amendés à tout moment sans préavis, en fonction des
      modifications apportées à la plateforme, de l'évolution ou pour tout autre motif jugé nécessaire.
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

export default CGUs;
