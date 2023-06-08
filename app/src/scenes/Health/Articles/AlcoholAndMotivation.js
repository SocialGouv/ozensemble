import React from 'react';
import styled from 'styled-components';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import KeyAutonomy from '../../../components/illustrations/icons/KeyAutonomy';
import KeyCompetency from '../../../components/illustrations/icons/KeyCompetency';
import KeyLink from '../../../components/illustrations/icons/KeyLink';
import KeyMeaning from '../../../components/illustrations/icons/KeyMeaning';

const AlcoholAndMotivation = () => {
  const title = 'Alcool et motivation';
  return (
    <NavigationWrapper
      title={title}
      timeReading={2}
      sources={
        "Deci, E. L., & Ryan, R. M. (2008). Favoriser la motivation optimale et la santé mentale dans les divers milieux de vie [Facilitating optimal motivation and psychological well-being across life's domains]. Canadian Psychology/Psychologie canadienne, 49(1), 24-34."
      }
      link={'https://doi.org/10.1037/0708-5591.49.1.24'}>
      <TopContainer>
        <H2 color={'#4030a5'}>La psychologie positive</H2>
        <Spacer size={20} />
        <P>
          La psychologie positive investigue les champs du fonctionnement optimal de l’individu. Des recherches dans ce
          domaine ont porté sur la motivation humaine : {'\n'}- Qu’est-ce qui m’aide à me lancer quand je me sens
          coincé(e) ?{'\n'}- Comment arrêter de procrastiner ?{'\n'}- Comment ne pas abandonner ?{'\n'}- Comment y
          arriver quand j’ai peur de ne pas y arriver ou quand je m’ennuie ?{'\n'}- Par quoi commencer ?{'\n'}- Quels
          facteurs doivent être réunis pour que j’ai envie de m’y mettre ?{'\n'}- Comment les mobiliser pour réussir ce
          que je fais ?
        </P>
        <P>
          <Bold>Voici quelques clefs pour vous motiver !</Bold>
        </P>

        <H2 color={'#4030a5'}>L'autodétermination</H2>
        <P>
          Parmi toutes les théories existantes, celle de <Bold>Deci & Ryan</Bold> a marqué tout le courant de la
          psychologie positive. En effet, ces deux chercheurs ont démontré que nous oscillons entre différents types de
          motivation allant de la motivation “<Bold>extrinsèque à soi</Bold>” à la motivation “
          <Bold>intrinsèque à soi</Bold>”. Autrement dit, soit nous nous motivons pour obtenir quelque chose de la
          situation comme un salaire ou des avantages, soit nous nous motivons pour{' '}
          <Bold>quelque chose à l’intérieur de nous</Bold>. C’est cette motivation qui est dite intrinsèque et qui est
          celle que nous devons chercher à atteindre pour être vraiment motivé.
        </P>

        <H2 color={'#4030a5'}>Comment vous y prendre ?</H2>
        <P>
          Deci & Ryan nous donnent des pistes que nous vous partageons. Nous avons tous 4 types de besoins fondamentaux.
          Les <Bold>4 clefs</Bold> scientifiques de la motivation intrinsèque sont celles qui nous aide à dire “
          <Bold>je le fais car j’aime le faire</Bold>” et non “<Bold>parce que je dois le faire</Bold>” :
        </P>
        <WhiteBackground>
          <KeyContainer>
            <KeyAutonomyStyled />
            <TextContainer>
              <H2>L’autonomie</H2>
              <P>Décider volontairement de son action, être l’agent qui la réalise en congruence avec soi-même.</P>
            </TextContainer>
          </KeyContainer>
          <KeyContainer>
            <KeyCompetencyStyled />
            <TextContainer>
              <H2>La compétence</H2>
              <P>Être efficace dans son environnement, se sentir responsable des effets qui se produisent.</P>
            </TextContainer>
          </KeyContainer>
          <KeyContainer>
            <KeyLinkStyled />
            <TextContainer>
              <H2>Le lien à l’autre</H2>
              <P>
                Être relié(e) à des personnes qui sont importantes pour soi, ressentir leur attention délicate et
                sympathique.
              </P>
            </TextContainer>
          </KeyContainer>
          <KeyContainer>
            <KeyMeaningStyled />
            <TextContainer>
              <H2>Le sens</H2>
              <P>
                Savoir pourquoi on se lance dans un projet, connaître la raison et le but que l’on veut atteindre.
                Passer de “je le fais parce que je dois le faire” à “je le fais parce que j’aime le faire”.{' '}
              </P>
            </TextContainer>
          </KeyContainer>
        </WhiteBackground>
      </TopContainer>
    </NavigationWrapper>
  );
};

const KeyAutonomyStyled = styled(KeyAutonomy)`
  margin: 10px;
  margin-rigth: 15px;
  margin-left: 5px;
`;
const KeyCompetencyStyled = styled(KeyCompetency)`
  margin: 10px;
  margin-rigth: 15px;
  margin-left: 5px;
`;
const KeyLinkStyled = styled(KeyLink)`
  margin: 10px;
  margin-rigth: 15px;
  margin-left: 5px;
`;
const KeyMeaningStyled = styled(KeyMeaning)`
  margin: 10px;
  margin-rigth: 15px;
  margin-left: 5px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

const WhiteBackground = styled.View`
  background-color: #fff;
  shadow-offset: 0px 5px;
  shadow-color: #000000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
  padding: 10px;
`;

const KeyContainer = styled.View`
  flex-direction: row;
`;

export default AlcoholAndMotivation;
