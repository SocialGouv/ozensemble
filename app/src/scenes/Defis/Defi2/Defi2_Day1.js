import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ElementDayDefi from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';

const Defi2_Day1 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Pourquoi changer mes habitudes de consommation ?">
      <ElementDayDefi
        content={
          <TextStyled>
            Changer une habitude est un <TextStyled bold>processus long</TextStyled> et parfois douloureux, car il faut
            au minimum 21 jours pour ancrer un changement.
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Mais vous n'êtes <TextStyled bold>pas seul,</TextStyled> et vous pouvez
            <TextStyled bold> être fier</TextStyled> de suivre ce deuxième défi, car nous avons
            <TextStyled bold> tous une bonne raison pour modifier</TextStyled> nos habitudes à consommer de l'alcool.
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Pour changer une habitude, il faut être en capacité de
            <TextStyled bold> mesurer clairement et consciement</TextStyled> celle-ci. Pour cela il est important de
            compter précisément vos consommations.
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            <TextStyled bold>
              Souvenez-vous qu'il est préférable de ne pas trop attendre pour remplir son agenda de consommation dans
              les premières phases où l'on réduit.
            </TextStyled>
            {'\n\n'}
            Sinon vous risquez d'en oublier ou de vous tromper : il est toujours plus difficile de se rappeler sa
            consommation du lundi lorsque l'on est le dimanche que le soir même !{'\n\n'}Oz Ensemble est une application
            discrète, mais si vous êtes dans un lieu public, ou que vous ne voulez pas qu'on vous voit écrire, vous
            pouvez le faire plus tranquillement le soir en rentrant chez vous.
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Suivez vos progrès dans votre page dédiée : <TextStyled bold>remerciez-vous</TextStyled> de commencer à
            réduire l'alcool dans votre vie.
          </TextStyled>
        }
      />
      <ButtonPrimary
        content="Je vois mon progrès"
        widthSmall
        onPress={() => navigation.navigate('GAINS_NAVIGATOR', { screen: 'GAINS_MAIN_VIEW' })}
      />
    </WrapperContainer>
  );
};

export default Defi2_Day1;
