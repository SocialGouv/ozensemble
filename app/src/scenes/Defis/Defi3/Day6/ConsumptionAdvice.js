import React from 'react';
import TextStyled from '../../../../components/TextStyled';
import riskSituationsConsumptionAdvice from './riskSituationsConsumptionAdvice';

const ConsumptionAdvice = ({ emotionType, answerKey, navigation }) => (
  <>
    <TextStyled>
      {riskSituationsConsumptionAdvice[answerKey]?.[emotionType].text} (
      <TextStyled bold>{riskSituationsConsumptionAdvice[answerKey]?.[emotionType].motif}</TextStyled>).
      {'\n\n'}
    </TextStyled>

    <TextStyled bold color="#DE285E">
      Le conseil d’Oz Ensemble{'\n'}
    </TextStyled>

    <SwitchAdvice navigation={navigation} answerKey={answerKey} emotionType={emotionType} />
  </>
);

const SwitchAdvice = ({ navigation, answerKey, emotionType }) => {
  if (emotionType === 'negativeEmotion') {
    switch (answerKey) {
      case '1.1':
        return (
          <>
            <TextStyled>
              Si l’alcool peut aider à gérer la frustration ou la colère, il désinhibe et exacerbe également ces
              émotions lorsque l’on devient ivre. Rappelez-vous que le verre qui vous aide à tenir au départ peut vous
              pousser aussi à faire des choses que vous regretterez par la suite comme être agressif ou violent. Parfois
              sans vous en souvenir !{'\n\n'}
            </TextStyled>

            <TextStyled>
              Si votre entourage vous fait du mal, dites-le leur simplement et calmez-vous autrement en vous isolant un
              temps ou en parlant à une personne de confiance.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Si ces problèmes sont trop difficiles à aborder seul, les conseils d’un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel
              </TextStyled>{' '}
              pourraient vous aider à gérer ces problèmes relationnels mieux que l’alcool.
            </TextStyled>
          </>
        );

      case '1.2':
        return (
          <>
            <TextStyled>
              Si l’alcool peut aider à gérer la tristesse ou la colère, il désinhibe et exacerbe également ces émotions
              lorsque l’on devient ivre. Rappelez-vous que le verre qui vous aide à tenir au départ peut vous pousser
              aussi à dire des choses à votre entourage que vous regretterez par la suite. Voire même ne pas vous en
              souvenir ! {'\n\n'}
            </TextStyled>

            <TextStyled>
              Si votre entourage vous fait du mal, dites-le leur simplement et calmez-vous autrement en vous isolant un
              temps ou en parlant à une personne de confiance. Prenez le temps de parler des sujets qui fâchent quand
              vous êtes apaisé et sobre.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Si ces sujets sont trop difficiles à aborder seul, les conseils d’un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                psychologue
              </TextStyled>{' '}
              pourraient vous aider à gérer ces problèmes relationnels mieux que l’alcool.
            </TextStyled>
          </>
        );
      case '1.3':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur. N’ayez pas peur du regard des autres. Tout le monde n’est pas parfait et c’est tant
              mieux !{'\n\n'}
            </TextStyled>

            <TextStyled>
              Rappelez-vous que c’est en vous que vous puiserez toutes les ressources nécessaires pour faire face aux
              évènements du quotidien et non dans l’alcool.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              N’hésitez pas en en discuter avec une autre personne pour faire ce pas de côté.
            </TextStyled>
          </>
        );
      case '1.4':
        return (
          <>
            <TextStyled>
              Si l’alcool peut aider à gérer la tristesse ou la colère, il désinhibe et exacerbe également ces émotions
              lorsque l’on devient ivre. Rappelez-vous que le verre qui vous aide à tenir au départ peut vous pousser
              aussi à dire des choses à votre entourage que vous regretterez par la suite. Voire même ne pas vous en
              souvenir !{'\n\n'}
            </TextStyled>

            <TextStyled>
              Si votre entourage vous fait du mal, dites-le leur simplement et calmez-vous autrement en vous isolant un
              temps ou en parlant à une personne de confiance. Prenez le temps de parler des sujets qui fâchent quand
              vous êtes apaisé et sobre.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Si ces sujets sont trop difficiles à aborder seul, les conseils d’un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                psychologue
              </TextStyled>
              pourraient vous aider à gérer ces problèmes relationnels mieux que l’alcool.
            </TextStyled>
          </>
        );
      case '1.5':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur car chaque individu apporte sa contribution à la société. {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Rappelez-vous que c’est en vous que vous puiserez toutes les ressources nécessaires pour ne pas vous
              sentir isolé(e). Sinon, demandez-vous si ce groupe mérite votre présence ?
            </TextStyled>
          </>
        );
      case '1.6':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, n’ayez pas peur des autres car c’est en vous que vous puiserez toutes les ressources
              nécessaires pour faire face et non dans l’alcool. {'\n\n'}
            </TextStyled>

            <TextStyled>
              Si cette situation se répète, posez-vous des questions sur ces orientations de votre vie : cette relation
              est-elle bonne pour vous ? Ce choix de carrière ne vous détruit-il pas ?{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Des{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnels du soin
              </TextStyled>
              , de l’insertion et des travailleurs sociaux existent pour vous accompagner et vous aider à y voir plus
              clair.
            </TextStyled>
          </>
        );
      case '1.7':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, n’ayez pas peur des autres car c’est en vous que vous puiserez toutes les ressources
              nécessaires pour faire face et non dans l’alcool. {'\n\n'}
            </TextStyled>

            <TextStyled>
              Si cette situation se répète, posez-vous des questions sur ces orientations de votre vie : cette relation
              est-elle bonne pour vous ? Ce choix de carrière ne vous détruit-il pas ?{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Des{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnels du soin
              </TextStyled>
              , de l’insertion et des travailleurs sociaux existent pour vous accompagner et vous aider à y voir plus
              clair.
            </TextStyled>
          </>
        );
      case '1.8':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, n’ayez pas peur du regard des autres car dire “non merci“ à ce verre doit être
              simple, possible et naturel.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Vous pouvez expliquer vos raisons de diminuer votre consommation d’alcool si vous le souhaitez ou demandez
              une boisson sans alcool comme alternative.
            </TextStyled>
          </>
        );
      case '2.1':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur en parlant à des proches ou à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance pour mieux gérer vos émotions et pardonnez-vous certains de vos comportements.{' '}
              {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation importante d’alcool.
            </TextStyled>
          </>
        );
      case '2.2':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur en parlant à des proches ou à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance pour mieux gérer vos émotions. L’alcool pourra avoir un effet positif sur vos
              tensions mais à long terme, il est dommageable pour votre santé.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation importante d’alcool.
            </TextStyled>
          </>
        );
      case '2.3':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur en parlant à des proches ou à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance pour mieux gérer vos émotions. L’alcool pourra avoir un effet positif sur vos
              tensions mais à long terme, il est dommageable pour votre santé.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation importante d’alcool.
            </TextStyled>
          </>
        );
      case '2.4':
        return (
          <>
            <TextStyled>
              La douleur est un signal de votre corps. Prenez de la hauteur en parlant à des proches ou à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance. Les effets de l’alcool peuvent détendre à court terme mais engendrer à long
              terme des problèmes de santé plus graves.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation d’alcool.
            </TextStyled>
          </>
        );

      case '2.5':
        return (
          <>
            <TextStyled>
              Les effets de l’alcool peuvent détendre à court terme et favoriser l’endormissement, mais engendrer à long
              terme des problèmes de santé plus graves. Favorisez une bonne hygiène de sommeil et essayez des méthodes
              de relaxation (comme la méditation ou le yoga). {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation d’alcool.
            </TextStyled>
          </>
        );

      case '2.6':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, n’ayez pas peur car c’est en vous que vous puiserez toutes les ressources
              nécessaires pour faire face et non dans l’alcool. {'\n\n'}
            </TextStyled>

            <TextStyled>
              Si cette situation se répète, posez-vous des questions sur ces orientations de votre vie : cette situation
              est-elle bonne pour vous ? Ce choix de carrière ne vous détruit-il pas ?{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Des{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnels du soin
              </TextStyled>{' '}
              , de l’insertion et des travailleurs sociaux existent pour vous accompagner et vous aider à y voir plus
              clair.
            </TextStyled>
          </>
        );
      case '2.7':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur en parlant à des proches ou à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance pour mieux gérer vos émotions et pardonnez-vous certains de vos comportements.{' '}
              {'\n\n'}
            </TextStyled>

            <TextStyled>
              L’alcool pourra avoir un effet positif sur vos tensions mais à long terme il est dommageable pour votre
              santé{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation importante d’alcool.
            </TextStyled>
          </>
        );
      case '2.8':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur en parlant à des proches ou à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance pour mieux gérer vos émotions contradictoires.
              {'\n\n'}
            </TextStyled>

            <TextStyled>
              L’alcool pourra avoir un effet positif sur vos tensions mais à long terme il est dommageable pour votre
              santé{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation importante d’alcool.
            </TextStyled>
          </>
        );
      default:
        return <></>;
    }
  } else if (emotionType === 'positiveEmotion') {
    switch (answerKey) {
      case '1.1':
        return (
          <>
            <TextStyled>
              Si l’alcool peut aider à gérer la frustration ou la colère, il désinhibe et exacerbe également ces
              émotions lorsque l’on devient ivre. Rappelez-vous que le verre qui vous aide à tenir au départ peut vous
              pousser aussi à faire des choses que vous regretterez par la suite comme être agressif ou violent. Parfois
              sans vous en souvenir !{'\n\n'}
            </TextStyled>

            <TextStyled>
              Si votre entourage vous fait du mal, dites-le leur simplement et calmez-vous autrement en vous isolant un
              temps ou en parlant à une personne de confiance.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Si ces problèmes sont trop difficiles à aborder seul, les conseils d’un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel
              </TextStyled>{' '}
              pourraient vous aider à gérer ces problèmes relationnels mieux que l’alcool.
            </TextStyled>
          </>
        );

      case '1.2':
        return (
          <>
            <TextStyled>
              Si l’alcool peut aider à gérer la tristesse ou la colère, il désinhibe et exacerbe également ces émotions
              lorsque l’on devient ivre. Rappelez-vous que le verre qui vous aide à tenir au départ peut vous pousser
              aussi à dire des choses à votre entourage que vous regretterez par la suite. Voire même ne pas vous en
              souvenir ! {'\n\n'}
            </TextStyled>

            <TextStyled>
              Si votre entourage vous fait du mal, dites-le leur simplement et calmez-vous autrement en vous isolant un
              temps ou en parlant à une personne de confiance. Prenez le temps de parler des sujets qui fâchent quand
              vous êtes apaisé et sobre.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Si ces sujets sont trop difficiles à aborder seul, les conseils d’un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                psychologue
              </TextStyled>{' '}
              pourraient vous aider à gérer ces problèmes relationnels mieux que l’alcool.
            </TextStyled>
          </>
        );
      case '1.3':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, demandez-vous si consommer systématiquement un verre avec des amis après une
              mauvaise journée est une bonne raison ?{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Ne vous réfugiez pas dans l’alcool pour faire face à cette situation, testez un mocktail ou une bière sans
              alcool par exemple lors d’une prochaine sortie.
            </TextStyled>
          </>
        );
      case '1.4':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur et essayer d’être honnête avec la personne ou d’en parler à un autre proche, ou
              encore à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance. {'\n\n'}
            </TextStyled>

            <TextStyled bold>Ne vous réfugiez pas dans l’alcool pour faire face à cette situation.</TextStyled>
          </>
        );
      case '1.5':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, nous pouvons vivre des moments conviviaux avec nos proches sans être dans l’excès.
              Sinon, demandez-vous si cette personne vous veut réellement du bien ?{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Essayez de trouver des activités vous apportant du plaisir mais sans alcool : une sortie culturelle, une
              balade dans la nature ou des activités sportives.
            </TextStyled>
          </>
        );
      case '1.6':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, n’ayez pas peur des autres car c’est en vous que vous puiserez toutes les ressources
              nécessaires pour faire face et non dans l’alcool. {'\n\n'}
            </TextStyled>

            <TextStyled>
              Si cette situation se répète, posez-vous des questions sur ces orientations de votre vie : cette relation
              est-elle bonne pour vous ? Ce choix de carrière ne vous détruit-il pas ?{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Des{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnels du soin
              </TextStyled>
              , de l’insertion et des travailleurs sociaux existent pour vous accompagner et vous aider à y voir plus
              clair.
            </TextStyled>
          </>
        );
      case '1.7':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, n’ayez pas peur des autres car c’est en vous que vous puiserez toutes les ressources
              nécessaires pour faire face et non dans l’alcool. {'\n\n'}
            </TextStyled>

            <TextStyled>
              Si cette situation se répète, posez-vous des questions sur ces orientations de votre vie : cette relation
              est-elle bonne pour vous ? Ce choix de carrière ne vous détruit-il pas ?{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Des{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnels du soin
              </TextStyled>
              , de l’insertion et des travailleurs sociaux existent pour vous accompagner et vous aider à y voir plus
              clair.
            </TextStyled>
          </>
        );
      case '1.8':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur, nous pouvons vivre des moments conviviaux avec nos proches sans être dans l’excès.
              Sinon demandez-vous si cette personne vous veut réellement du bien ?{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Ne vous réfugiez pas dans l’alcool pour faire face à cette situation. Une autre alternative peut être de
              tester des boissons sans alcool. La fête ne sera pas gâchée, bien au contraire !
            </TextStyled>
          </>
        );
      case '2.1':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur pour ne pas vous réfugiez dans la consommation d’alcool comme excuse à votre
              mal-être. Tentez à la place de nouvelle activités pour vous dépasser.
              {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation importante d’alcool.
            </TextStyled>
          </>
        );
      case '2.2':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur pour ne pas vous réfugiez dans la consommation d’alcool comme excuse à votre
              mal-être. Tentez plutôt de nouvelles activités pour faire des rencontres ou découvrez des méthodes de
              relaxation (comme la méditation ou le yoga). {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation d’alcool.
            </TextStyled>
          </>
        );
      case '2.3':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur pour ne pas vous réfugiez dans la consommation d’alcool comme excuse à votre
              mal-être. Tentez plutôt de nouvelles activités pour faire des rencontres ou découvrez des méthodes de
              relaxation (comme la méditation ou le yoga). {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation d’alcool.
            </TextStyled>
          </>
        );
      case '2.4':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur pour ne pas vous réfugiez dans la consommation d’alcool comme remède à votre mal-être
              physique. Parlez en à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance. Les effets de l’alcool peuvent détendre à court terme mais engendrer à long
              terme des problèmes de santé plus graves. {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation d’alcool.
            </TextStyled>
          </>
        );

      case '2.5':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur pour ne pas tomber dans le piège de la sensation d’ébriété qui remplacerait
              favorablement le repos dont votre corps à besoin.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation d’alcool.
            </TextStyled>
          </>
        );

      case '2.6':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur pour ne pas vous réfugiez dans la consommation d’alcool comme habitude, car un
              plaisir offert trop souvent devient une habitude. Tentez de vous accorder d’autres récompenses ou des
              petites douceurs.{'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation d’alcool.
            </TextStyled>
          </>
        );
      case '2.7':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur pour ne pas vous réfugiez dans la consommation d’alcool comme remède à votre mal-être
              psychologique. Parlez-en à un{' '}
              <TextStyled bold underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>{' '}
              en qui vous avez confiance. {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              Les effets de l’alcool peuvent détendre à court terme mais engendrer à long terme des problèmes de santé
              plus graves.
            </TextStyled>
          </>
        );
      case '2.8':
        return (
          <>
            <TextStyled>
              Prenez de la hauteur pour ne pas vous réfugiez dans la consommation d’alcool comme habitude, car un
              plaisir offert trop souvent devient une habitude.
              {'\n\n'}
            </TextStyled>

            <TextStyled>
              Tentez de vous accorder d’autres récompenses ou des petites douceurs et pourquoi pas de consommer une
              boisson non alcoolisée ? {'\n\n'}
            </TextStyled>

            <TextStyled bold>
              C’est en vous que vous puiserez toutes les ressources nécessaires pour faire face et non dans la
              consommation d’alcool.
            </TextStyled>
          </>
        );
      default:
        return <></>;
    }
  }
  return <></>;
};

export default ConsumptionAdvice;
