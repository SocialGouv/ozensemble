import React from 'react';
import styled from 'styled-components';
import TextStyled from '../../../../components/TextStyled';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import Element from '../../../../components/ElementDayDefi';
import WrapperContainer from '../../../../components/WrapperContainer';
import { TouchableOpacity } from 'react-native';
import { Spacer } from '../../../../components/Articles';
import TestimonyQuote from '../../../../components/illustrations/TestimonyQuote';
import TestimonyQuoteInversed from '../../../../components/illustrations/TestimonyQuoteInversed';

export const Screen1 = ({ navigation }) => (
  <WrapperContainer onPressBackButton={navigation.goBack} title="Je ne suis pas seul(e) : témoignages">
    <Element
      content={
        <>
          La consommation d’alcool implique une variété de <TextStyled bold>motifs et de besoins</TextStyled>. {'\n\n'}
          Identifier le rôle de l’alcool pour vous est la première étape pour vous permettre de trouver des
          solutions pour statisfaire ce besoin autrement.
        </>
      }
    />

    <Element
      content={
        <>
          Mais vous n’êtes pas seul(e) dans ce cas, découvrez les <TextStyled bold>témoignages d’usagers</TextStyled>{' '}
          recueilli en consultation. Ils/Elles répondaient à la question “
          <TextStyled itaic>pourquoi buvez-vous ?</TextStyled>”
        </>
      }
    />

    <Testimony
      color="#4030a5"
      initials={'RG'}
      content={
        <>
          “Il y a beaucoup de raisons pour lesquelles les gens boivent. {'\n\n'}
          Moi-même, j’ai bu pendant longtemps pour ressentir l’effet de l’alcool et me sentir autrement.{'\n\n'}
          L’alcool était une solution à court terme à mes problèmes et, la plupart du temps, il a entraîné encore plus
          de problèmes.”
        </>
      }
    />

    <Contact navigation={navigation} />
    <ButtonPrimaryStyled content="Suivant" onPress={() => navigation.navigate('SCREEN2')} />
  </WrapperContainer>
);

export const Screen2 = ({ navigation }) => (
  <WrapperContainer onPressBackButton={navigation.goBack} title="Je ne suis pas seul(e) : témoignages">
    <Testimony
      color="#39CEC1"
      initials={'DB'}
      content={
        <>
          “Les gens boivent de l’alcool pour les raisons les plus variées, mais en général simplement pour passer du bon
          temps. {'\n\n'}
          L’alcool lève les inhibitions et les blocages. On peut considérer que c’est un bien ou un mal. Cela peut faire
          de toi l’âme et le noyau dur d’une fête, mais ça peut aussi te rendre très vulnérable. {'\n\n'}
          Certains boivent pour fuir. D’autres boivent pour oublier leurs problèmes et leurs angoisses. Certains adultes
          boivent simplement un verre de vin par jour. On dit que c’est bon pour la santé.”
        </>
      }
    />
    <Testimony
      color="#EE7738"
      initials={'DA'}
      content={
        <>
          “Personnellement, j’aime bien boire de l’alcool pour plusieurs raisons. Parce que c’est une tradition, par
          goût, comme un rituel, pour partager avec les collègues. {'\n\n'}
          Je ne peux pas non plus nier que j’aime bien boire, car l’alcool crée la bonne humeur !”
        </>
      }
    />

    <Contact navigation={navigation} />
    <ButtonPrimaryStyled content="Suivant" onPress={() => navigation.navigate('SCREEN3')} />
  </WrapperContainer>
);

export const Screen3 = ({ navigation }) => (
  <WrapperContainer onPressBackButton={navigation.goBack} title="Je ne suis pas seul(e) : témoignages">
    <Testimony
      color="#20B55C"
      initials={'DA'}
      content={
        <>
          “Pour oublier ses problèmes, se sentir mieux, parce que tous les autres en font autant, parce qu’on pense que
          c’est chouette, parce que ça fait plaisir. {'\n\n'}
          Pour déconnecter après le travail, pour pouvoir attribuer à l’alcool la responsabilité de ses fautes.”
        </>
      }
    />
    <Testimony
      color="#DE285E"
      initials={'JA'}
      content={
        <>
          “La plupart du temps, pour des raisons sociales (amis, rendez-vous, etc.). {'\n\n'}
          Mais beaucoup de personnes sont dépendantes et boivent parce que c’est pour elles la seule façon d’assumer la
          journée.”
        </>
      }
    />

    <Contact navigation={navigation} />
    <ButtonPrimaryStyled content="J’ai compris" onPress={() => navigation.navigate('DEFI3_MENU')} />
  </WrapperContainer>
);

const Contact = ({ navigation }) => (
  <>
    <Spacer size={20} />
    <TextStyled>
      À tout moment,{' '}
      <TextStyled underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
        contactez nos équipes pour recourir à une aide complémentaire, gratuite et anonyme.
      </TextStyled>
    </TextStyled>
  </>
);

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
  align-self: center;
`;

const Testimony = ({ color, content, initials }) => (
  <TestimonyContainer>
    <TestimonyQuoteStyled color={color} />
    <InitalsContainer>
      <Initals color={color}>
        <TextStyled bold color="#FFFFFF" size="25">
          {initials}
        </TextStyled>
      </Initals>
    </InitalsContainer>
    <TestimonyText color={color}>
      <TextStyled>{content}</TextStyled>
    </TestimonyText>
    <TestimonyQuoteInversedStyled color={color} />
  </TestimonyContainer>
);

const TestimonyQuoteStyled = styled(TestimonyQuote)`
  position: absolute;
  z-index: 1;
  left: -10px;
  top: -20px;
`;

const TestimonyQuoteInversedStyled = styled(TestimonyQuoteInversed)`
  position: absolute;
  z-index: 1;
  right: 0px;
  bottom: -10px;
`;

const TestimonyContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const TestimonyText = styled.View`
  width: 95%;
  border: 1px;
  border-color: ${({ color }) => color};
  padding: 15px;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #ffffff;
`;

const InitalsContainer = styled.View`
  position: absolute;
  top: -55px;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 1;
`;

const Initals = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 80px;
  width: 80px;
  height: 80px;
  background-color: ${({ color }) => color};
  shadow-offset: 0px 5px;
  shadow-color: #000000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;
