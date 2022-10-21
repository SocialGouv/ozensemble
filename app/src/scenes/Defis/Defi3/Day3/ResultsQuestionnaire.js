import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import HeaderQuizzsResult from '../../HeaderQuizzsResult';
import H3 from '../../../../components/H3';
import TextStyled from '../../../../components/TextStyled';
import CheckboxLabelled from '../../../../components/CheckboxLabelled';
import sections from './sections';
import { screenWidth } from '../../../../styles/theme';
import { Defi3_Day3_Answers_Difficulties_State, Defi3_Day3_Answers_Help_State } from '../../../../recoil/quizzs';
import SmileyGreen from '../../../../assets/illustrations/SmileyGreen';
import SmileyRed from '../../../../assets/illustrations/SmileyRed';
import ToggleContent from '../../../../components/ToggleContent';
import Element from '../../../../components/ElementDayDefi';
import { View } from 'react-native';
import ButtonPrimary from '../../../../components/ButtonPrimary';

const Wrapper = ({ children, wrapped, inMyTests }) => {
  const Defi3_Day3_Answers_Difficulties = useRecoilValue(Defi3_Day3_Answers_Difficulties_State);
  const Defi3_Day3_Answers_Help = useRecoilValue(Defi3_Day3_Answers_Help_State);

  if (!wrapped) return <>{children}</>;
  return (
    <FullScreenBackground>
      <HeaderQuizzsResult inMyTests={inMyTests}>
        {!!(Defi3_Day3_Answers_Difficulties || Defi3_Day3_Answers_Help) && (
          <ResultContainer>{children}</ResultContainer>
        )}
      </HeaderQuizzsResult>
    </FullScreenBackground>
  );
};

const ResultsMotivations = ({ wrapped = true, route, navigation }) => {
  const Defi3_Day3_Answers_Difficulties = useRecoilValue(Defi3_Day3_Answers_Difficulties_State);
  const Defi3_Day3_Answers_Help = useRecoilValue(Defi3_Day3_Answers_Help_State);

  if (!Defi3_Day3_Answers_Difficulties || !Defi3_Day3_Answers_Help) return null;

  const inMyTests = route?.params?.rootRoute === 'QUIZZ_MENU';
  return (
    <Wrapper wrapped={wrapped} inMyTests={inMyTests}>
      <ContainerSection>
        <ResultTitleContainer>
          <SmileyRed />
          <ResultTitle color="#DE285E">
            Motifs de difficulté à maintenir dans le temps mon objectif de réduction.
          </ResultTitle>
        </ResultTitleContainer>

        {!Defi3_Day3_Answers_Difficulties.length && (
          <TextStyled>
            Vous n'avez pas encore sélectionné de facteurs de difficultés, vous pouvez revenir à ce questionnaire en
            allant dans la rubrique <TextStyled bold>Mes tests</TextStyled> dynamiques
            <TextStyled bold> Défis</TextStyled>.
          </TextStyled>
        )}
        <View>
          {Defi3_Day3_Answers_Difficulties.some((answerKey) => answerKey.split('.')[0] == 1) && (
            <ToggleContent title="Motif récréatif">
              <Element
                content={
                  <>
                    <TextStyled>
                      Votre raison de consommer serait plutôt la recherche de sensations fortes d’amusement, de{' '}
                      <TextStyled bold>ressentir les effets positifs de l’alcool</TextStyled>. {'\n\n'}
                      Vous associez donc la consommation d’alcool à un{' '}
                      <TextStyled bold>plaisir gustatif ou à l’ivresse</TextStyled> procurée et à une{' '}
                      <TextStyled bold>sensation de lâcher prise</TextStyled>. {'\n\n'}
                      Ex : “<TextStyled italic>j’ai bu car je suis plus créatif</TextStyled>” ou “
                      <TextStyled italic>j’aime les sensations que cela me procure</TextStyled>”.
                    </TextStyled>
                  </>
                }
              />
            </ToggleContent>
          )}
          {Defi3_Day3_Answers_Difficulties.some((answerKey) => answerKey.split('.')[0] == 2) && (
            <ToggleContent title="Motif social">
              <Element
                content={
                  <>
                    <TextStyled>
                      Votre raison de consommer serait plutôt la{' '}
                      <TextStyled bold>recherche du plaisir et de situations conviviales</TextStyled>, comme boire pour
                      passer une meilleure soirée. {'\n\n'}
                      Vous associez la consommation d’alcool à un <TextStyled bold>
                        état d’esprit positif
                      </TextStyled>{' '}
                      couplé à des <TextStyled bold>situations extérieures</TextStyled> à votre personne : vous avez du
                      mal à “<TextStyled italic>fêter sans consommer</TextStyled>”.
                      {'\n\n'}
                      Ex : “<TextStyled italic>j’ai bu car cela m’amuse</TextStyled>”, car “
                      <TextStyled italic>j’aime la sensation que cela me procure</TextStyled>” ou car “
                      <TextStyled italic>j’apprécie plus le moment avec mes proches</TextStyled>”.
                    </TextStyled>
                  </>
                }
              />
            </ToggleContent>
          )}
          {Defi3_Day3_Answers_Difficulties.some((answerKey) => answerKey.split('.')[0] == 3) && (
            <ToggleContent title="Motif d’oubli des soucis">
              <Element
                content={
                  <>
                    <TextStyled>
                      Votre raison de consommer serait plutôt l’
                      <TextStyled bold>atténuation de vos soucis</TextStyled>.{'\n\n'}
                      Vous associez la comsommation d’alcool au fait d’<TextStyled bold>aller moins mal</TextStyled> et
                      de <TextStyled bold>mieux gérer vos sentiments négatifs</TextStyled>. {'\n\n'}
                      Ex : “
                      <TextStyled italic>je bois car cela m’aide quand je suis je suis nerveux ou déprimé</TextStyled>”
                      ou “<TextStyled italic>pour oublier mes problèmes</TextStyled>”.
                    </TextStyled>
                  </>
                }
              />
            </ToggleContent>
          )}
          {Defi3_Day3_Answers_Difficulties.some((answerKey) => answerKey.split('.')[0] == 4) && (
            <ToggleContent title="Motif de conformité">
              <Element
                content={
                  <>
                    <TextStyled>
                      Votre raison de consommer serait plutôt liée à un{' '}
                      <TextStyled bold>besoin de vous conformer au groupe social</TextStyled>
                      (famille, amis ou collègues) pour ne pas vous sentir exclu(e).{'\n\n'}
                      Vous pouvez avoir <TextStyled bold>du mal à refuser un verre</TextStyled> qui vous est proposé par
                      quelqu’un lors d’un moment convivial. {'\n\n'}
                      Ex : “<TextStyled italic>je bois pour faire partie d’un groupe</TextStyled>” ou “
                      <TextStyled italic>pour être apprécié(e)</TextStyled>”.
                    </TextStyled>
                  </>
                }
              />
            </ToggleContent>
          )}
        </View>
      </ContainerSection>
      <ContainerSection>
        <ResultTitleContainer>
          <SmileyGreen />
          <ResultTitle color="#20B55C">Motifs d’aide à maintenir dans le temps mon objectif de réduction.</ResultTitle>
        </ResultTitleContainer>

        {!Defi3_Day3_Answers_Help.length && (
          <TextStyled>
            Vous n'avez pas encore sélectionné de facteurs d'aide, vous pouvez revenir à ce questionnaire en allant dans
            la rubrique <TextStyled bold>Mes tests</TextStyled> dynamiques
            <TextStyled bold> Défis</TextStyled>.
          </TextStyled>
        )}
        <View>
          {Defi3_Day3_Answers_Help.some((answerKey) => answerKey.split('.')[0] == 5) && (
            <ToggleContent title="Motif psychologique">
              <Element
                content={
                  <>
                    <TextStyled>
                      Vous savez porter une attention particulière à votre “<TextStyled italic>insight</TextStyled>”,
                      processus par lequel un sujet se saisit d'un aspect de sa propre dynamique psychique jusque-là
                      méconnu de lui. {'\n\n'}
                      Vous savez <TextStyled bold>ne pas utiliser l’alcool pour gérer vos émotions</TextStyled>, c'est
                      pourtant un piège récurrent dans lequel il peut être facile de tomber. {'\n\n'}
                      <TextStyled bold>
                        L’alcool ne doit pas être un consolant lorsqu’on ressent une émotion négative, par exemple
                        lorsqu’on est triste, anxieux ou stressé.
                      </TextStyled>
                    </TextStyled>
                  </>
                }
              />
            </ToggleContent>
          )}
          {Defi3_Day3_Answers_Help.some((answerKey) => answerKey.split('.')[0] == 6) && (
            <ToggleContent title="Motif social">
              <Element
                content={
                  <>
                    <TextStyled>
                      Vous savez votre difficulté face à l’alcool et{' '}
                      <TextStyled bold>vous vous appuyez sur votre entourage pour trouver de la motivation</TextStyled>,
                      de la force et la volonté d’essayer de la surmonter. {'\n\n'}{' '}
                      <TextStyled bold>Pourquoi ne pas tester les groupes d’entraide ?</TextStyled> {'\n\n'}
                      Ces groupes fonctionnent sur la base de réunions régulières. Ils permettent aux personnes
                      souffrant de d’<TextStyled bold>addiction à l’alcool</TextStyled> d’en rencontrer d’autres pour
                      rompre l’isolement, partager leur expérience de l’alcool, obtenir des conseils utiles et recréer
                      des liens sociaux indispensables pour faire évoluer favorablement sa situation.
                    </TextStyled>
                  </>
                }
              />
            </ToggleContent>
          )}
          {Defi3_Day3_Answers_Help.some((answerKey) => answerKey.split('.')[0] == 7) && (
            <ToggleContent title="Motif biologique">
              <Element
                content={
                  <>
                    <TextStyled>
                      Vous êtes attentif à votre santé : quelque soit votre situation et votre consommation, un médecin
                      vous recommandera toujours de diminuer votre consommation. {'\n\n'}
                      Les motivations peuvent être variables d’une personne à l’autre, mais vous trouverez forcément un
                      bénéfice sur votre corps à plus ou moins long terme comme retrouver{' '}
                      <TextStyled bold>
                        des cycles de sommeil plus réparateurs, une humeur plus stable au quotidien, une meilleure
                        fonction du foie, une meilleure capacité de concentration ou encore une espérance de vie
                        rallongée.
                      </TextStyled>
                    </TextStyled>
                  </>
                }
              />
            </ToggleContent>
          )}
        </View>
      </ContainerSection>
      <TextStyled>
        Vos réponses seront intégrées à votre <TextStyled bold>bilan de fin de semaine</TextStyled>. Vous pourrez
        retrouver ce questionnaire dans la rubrique <TextStyled bold>Mes tests</TextStyled> dans{' '}
        <TextStyled bold>Défis</TextStyled>.
      </TextStyled>
      <ButtonPrimaryStyled content="J’ai compris" onPress={() => navigation.navigate('DEFI3_MENU')} />
    </Wrapper>
  );
};

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const ResultContainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
  height: 100%;
`;

const ContainerSection = styled.View`
  margin: 5px 0 20px 0;
`;

const ResultTitle = styled(H3)`
  flex-shrink: 0;
  font-weight: bold;
  color: ${({ color }) => color || '#4030a5'};
  margin-left: 8px;
  margin-bottom: 10px;
`;

const ResultTitleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export default ResultsMotivations;
