import React from 'react';
import styled from 'styled-components';
import H3 from '../../components/H3';
import Screen2 from '../../components/Illustrations/Screen2';
import { FeedButtonStyled } from './styles';

const numberOfDaysSinceBeginningOfTimes = (day) => Math.round(Date.parse(day) / 1000 / 60 / 60 / 24);

const ThoughtOfTheDay = ({ day, selected }) => {
  return (
    <FeedButtonStyled backgroundColor="#deeceb" borderColor="#aae3dd" showAsSelected={selected}>
      <Content>
        <Screen2 height={25} width={25} color="#de285e" fillOpacity={1} />
        <TextContent>
          <Caption>Pensée du jour</Caption>
          <CTA>{thoughts[numberOfDaysSinceBeginningOfTimes(day) % thoughts.length]}</CTA>
        </TextContent>
      </Content>
    </FeedButtonStyled>
  );
};

const Content = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding-vertical: 15px;
  padding-horizontal: 5px;
  flex-shrink: 1;
  max-width: 95%;
`;

const TextContent = styled.View`
  margin-left: 10px;
  flex-shrink: 1;
`;

const Caption = styled.Text`
  font-size: 11px;
  margin-bottom: 3px;
  flex-shrink: 1;
`;

const CTA = styled(H3)`
  font-weight: bold;
  flex-shrink: 1;
`;

export default ThoughtOfTheDay;

const thoughts = [
  "Buvez de l'eau si vous avez soif. L'alcool ne permet pas de calmer la soif. C'est même le contraire.",
  "Avant de boire de l'alcool, mangez quelque chose si vous avez faim.",
  'Buvez de préférence dans un verre et non à la bouteille. En effet, vous boirez probablement plus à la bouteille. Car vous en verrez moins vite le fond... ',
  'Si vous buvez, alternez avec des boissons non alcoolisées.',
  'Donnez-vous un maximum de verres à ne pas dépasser. Ou bien, fixez-vous une heure à laquelle vous arrêterez de boire.',
  'Ne mélangez pas plusieurs sortes de boissons alcoolisées. ',
  "Ne buvez pas systématiquement de l'alcool si vous êtes fatigué, stressé ou préoccupé.\nLors d'une sortie au restaurant, commandez aussi de l'eau si vous aimez bien accompagner votre plat d'un verre de vin.",
  "Vous voulez réduire votre consommation d'alcool ? Changez également vos habitudes liées à cette consommation.",
  'Si vous buvez toujours un verre après le travail, ajoutez à cela une autre habitude plaisante au moins deux jours par semaine. Par exemple, vous pouvez vous accorder un plaisir culinaire, faire une promenade, prendre une bonne douche, etc.',
  "Demandez-vous ce que vous feriez s'il n'y avait pas d'alcool vendu près de chez vous ?",
  "Si vous buvez principalement à domicile, ne faites plus de grande réserve d'alcool et/ou faites en sorte de ne pas en avoir du tout chez vous à intervalles réguliers.",
  'Notez votre consommation. Tenez un journal de bord de votre consommation journalière sur plusieurs semaines. En effet, il est plus difficile de nier sa consommation quand celle-ci apparaît «noir sur blanc».',
  'Ne buvez pas seul, il est trop facile de commencer à boire en quantité excessive.\nImposez-vous cette règle : ne boire qu’entre amis, pour le plaisir.',
  '« Après le boulot, je bois toujours un verre de vin blanc »…ces routines de consommation d’alcool sont de véritables pièges. Essayez de les reconnaître et de trouver une alternative. Il peut s’agir d’un thé, d’un smoothie, ou d’une simple promenade.',
  "N'utilisez pas l'alcool pour étancher votre soif, mais uniquement pour le plaisir.",
  'Calculez la quantité d’argent que vous dépensez en alcool chaque semaine. Est-ce que vous ne pourriez pas l’utiliser pour un après-midi au spa, ou pour faire des économies ?',
  'Calculez la quantité d’argent que vous dépensez en alcool chaque semaine. Vous pouvez vous engager à ne dépenser que la moitié de ce montant, et profiter de cet argent pour vous.',
];
