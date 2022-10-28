import React from 'react';
import TextStyled from '../../../components/TextStyled';

const TextResult = ({ questionKey }) => {
  switch (questionKey) {
    case 0:
      return (
        <TextStyled>
          L’alcool provoque une <TextStyled bold>sensation de chaleur</TextStyled> en augmentant la taille des vaisseaux
          superficiels situés sous la peau (appelée vasodilatation). {'\n\n'}
          Mais si la température extérieure est basse, cette vasodilatation{' '}
          <TextStyled bold>accélère la perte de chaleur</TextStyled> de l’organisme. {'\n\n'}
          <TextStyled bold>Donc l’alcool ne réchauffe pas, bien au contraire !</TextStyled>
        </TextStyled>
      );

    case 1:
      return (
        <TextStyled>
          Être dépendant ne signifie pas nécessairement boire tous les jours mais{' '}
          <TextStyled bold>ne plus pouvoir s’en passer</TextStyled>.{'\n\n'}
          <TextStyled bold>Donc on peut être dépendant sans boire tous les jours !</TextStyled>
        </TextStyled>
      );

    case 2:
      return (
        <TextStyled>
          Plus grands et plus lourds en moyenne que les femmes,{' '}
          <TextStyled bold>les hommes affichent une alcoolémie plus basse</TextStyled> pour une même dose d’alcool
          ingérée.
          {'\n\n'}
          <TextStyled bold>
            Cependant, les effets produits par l’alcool dépendent de nombreux critères individuels !
          </TextStyled>
        </TextStyled>
      );

    case 3:
      return (
        <TextStyled>
          Boire de l’eau ni diminue pas l’alcoolémie.{'\n\n'}
          En revanche, cela permet de <TextStyled bold>lutter contre la déshydratation</TextStyled> provoquée par
          l’alcool et peut aider à <TextStyled bold>diminuer certains effets secondaires</TextStyled> tels que les maux
          de tête.
        </TextStyled>
      );

    case 4:
      return (
        <TextStyled>
          De nombreuses études montrent que la consommation régulière d’alcool favorise le développement de{' '}
          <TextStyled bold>
            symptômes dépressifs. {'\n\n'}
            Il s’agit par exemple de troubles du sommeil, de difficultés de concentration et de prise de décision ou
            d’un sentiment de culpabilité.
          </TextStyled>
        </TextStyled>
      );

    default:
      return <></>;
  }
};

export default TextResult;
