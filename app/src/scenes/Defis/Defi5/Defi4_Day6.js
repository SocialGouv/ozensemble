import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ElementDayDefi from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import styled from 'styled-components';
import Danger from '../../../components/illustrations/icons/Danger';

const Defi4_Day6 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi4) setValidatedDays(route?.params?.day, '@Defi4');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Un objectif qui protège ma santé">
      <ElementDayDefi
        contentView={
          <>
            <TextSizeStyled>
              <TextStyled bold>Toujours garder de l’eau sur soi et en boire régulièrement !</TextStyled>
              {'\n'}C'est un geste indispensable où que vous soyez : bar, restaurant, concert, festival, chez des amis
              ou même chez vous. Ayez toujours de l’eau sur vous pour en boire régulièrement lorsque vous consommez de
              l'alcool.
            </TextSizeStyled>
          </>
        }
      />
      <ElementDayDefi
        contentView={
          <>
            <TextSizeStyled>
              Vous pouvez vous fixer des{' '}
              <TextStyled bold>règles qui vous aideront à boire de l'eau lorsque vous buvez de l'alcool</TextStyled> :
              {'\n'}
            </TextSizeStyled>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} À chaque fois que vous consommez de l’alcool dans un bar ou un restaurant, prenez le réflexe
                de <TextStyled bold>demander un verre d’eau en même temps</TextStyled>.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} Au cours des soirées, pensez à boire un grand verre d’eau entre chaque verre d’alcool. Le
                calcul est simple : <TextStyled bold>un verre d'alcool = un verre d'eau</TextStyled>. C'est une
                prévention imparable pour éviter la gueule de bois le lendemain matin.
              </TextSizeStyled>
            </BulletPoint>
            <BulletPoint>
              <TextSizeStyled>
                {'\u2022'} Si vous avez soif, rien n'est meilleur que l'eau : c'est ce que prouvent toutes les études
                scientifiques. <TextStyled bold>N'utilisez pas l'alcool pour étancher votre soif</TextStyled>.
              </TextSizeStyled>
            </BulletPoint>
            <TextSizeStyled>
              Plus généralement, pour vous aidez à rester en bonne santé, il est conseillé de boire{' '}
              <TextStyled bold>1 litre et demi d'eau par jour</TextStyled>.{' '}
            </TextSizeStyled>
          </>
        }
      />
      <ElementDayDefi
        contentView={
          <>
            <TextSizeStyled>
              <TextStyled bold>Comment et par quoi remplacer l'alcool ?</TextStyled>
              {'\n'}
              Les routines de consommation d’alcool sont de véritables pièges :
            </TextSizeStyled>
            <BulletPoint>
              <TextSizeStyled>{'\n\u2022'} « C’est l’heure de l’apéritif. »</TextSizeStyled>
              <TextSizeStyled>{'\n\u2022'} « Après le boulot, je bois toujours une bière. »</TextSizeStyled>
              <TextSizeStyled>
                {'\n\u2022'} « À table, les repas c’est avec un verre de vin ! »{'\n'}
              </TextSizeStyled>
            </BulletPoint>
            <TextSizeStyled>
              Essayez de les <TextStyled bold>reconnaître</TextStyled> et de{' '}
              <TextStyled bold>trouver une alternative</TextStyled> telle qu’une autre boisson (thé ou smoothie par
              exemple) ou une promenade. L’astuce est de trouver d’
              <TextStyled bold>autres boissons que l’on aime</TextStyled> mais sans nécessairement s’ennuyer et boire
              toujours la même chose.
            </TextSizeStyled>
            <TextSizeStyled>
              Si vous n'aimez pas trop boire de l'eau, vous pouvez la remplacer par de l’eau pétillante aromatisée pas
              trop sucrée, ajouter du concombre ou du citron. Les boissons à base de fruits et de légumes sans sucre
              ajouté sont une bonne alternative (gaspacho ou jus de tomate avec un peu de piment ou des épices par
              exemple).
            </TextSizeStyled>
          </>
        }
      />
      <ElementDayDefi
        Illustration={<Danger />}
        contentView={
          <>
            <TextSizeStyled>
              Attention aux boissons sans alcool de type <TextStyled bold>bière ou cocktail sans alcool</TextStyled>.
              Les personnes qui en boivent gardent les <TextStyled bold>mécanismes sensoriels de l’alcool</TextStyled>.
              Il faut trouver de nouveaux types de boissons, qui ne rappellent pas sa consommation d’alcool et qui
              contiennent peu de sucres. Évitez également de remplacer l’alcool par des{' '}
              <TextStyled bold>boissons énergisantes</TextStyled> ou le <TextStyled bold>café</TextStyled>.
            </TextSizeStyled>
          </>
        }
      />
      <ElementDayDefi
        contentView={
          <>
            <TextSizeStyled>
              Si votre entourage consomme régulièrement de l'alcool, rencontrez-vous{' '}
              <TextStyled bold>plutôt dans un café que dans un bar</TextStyled>. Vous pouvez également essayer les
              buffets en libre service, les salons de thé, les marchands de yaourt glacé, les corner à bubble tea, ou
              encore les restaurants de cuisine du monde où boire de l’alcool à table est moins courant.{'\n'}
              Regardez les événements sportifs avec vos amis chez vous plutôt que chez eux : vous pourrez proposer des
              boissons qui ne contiennent pas d’alcool.
            </TextSizeStyled>
          </>
        }
      />

      <ButtonPrimaryStyled content="J'ai compris" widthSmall onPress={() => navigation.navigate('DEFI4_MENU')} />
    </WrapperContainer>
  );
};

const TextSizeStyled = styled(TextStyled)`
  font-size: 16px;
  line-height: 24px;
`;

const BulletPoint = styled.View`
  margin: 10px;
`;

const SmallTextStyled = styled(TextStyled)`
  font-size: 12px;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-bottom: 50px;
`;

export default Defi4_Day6;
