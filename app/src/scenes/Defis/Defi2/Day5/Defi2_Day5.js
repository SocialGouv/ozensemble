import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import H1 from '../../../../components/H1';
import { setValidatedDays } from '../../utils';
import { P } from '../../../../components/Articles';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import { defi2EmotionState } from '../../../../recoil/defis';
import { riskSituationsQuizzAnswersState } from '../../../../recoil/quizzs';
import emotions from '../../../../components/emotions';
import riskSituations from '../../../Quizzs/QuizzRiskSituations/riskSituations';
import WrapperContainer from '../../../../components/WrapperContainer';
import TextStyled from '../../../../components/TextStyled';

const Defi2_Day5 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  const [smileySelect, setSmileySelect] = useRecoilState(defi2EmotionState);
  const riskSituationsQuizzAnswers = useRecoilValue(riskSituationsQuizzAnswersState);
  const firstRiskSituations = riskSituations
    .find((section) => section.answers.map((a) => a.answerKey).includes(riskSituationsQuizzAnswers[0]))
    ?.answers?.find((a) => a.answerKey === riskSituationsQuizzAnswers[0]);
  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Affronter une situation à risque">
      <P bold>Dans cette situation, sélectionner l'émotion que vous ressentez.</P>
      <P>"{firstRiskSituations?.content}", je bois pour&nbsp;:</P>
      <SmileysContainer>
        {emotions.map((emotion, index) => (
          <SmileyContainer
            key={emotion.value}
            index={index}
            onPress={() => setSmileySelect(emotion.value === smileySelect ? 0 : emotion.value)}>
            {smileySelect === emotion.value ? emotion.iconclicked : emotion.icon}
            <TextEmotionView>
              <TextEmotion
                color={smileySelect === emotion.value ? '#DE285E' : '#000'}
                bold={smileySelect === emotion.value}>
                {emotion.description}
              </TextEmotion>
            </TextEmotionView>
          </SmileyContainer>
        ))}
      </SmileysContainer>
      <TipsSelected smileySelectValue={smileySelect} />
      {!!smileySelect && (
        <ButtonPrimary
          content="J'ai compris"
          widthSmall
          onPress={() => navigation.navigate(route?.params?.rootRoute)}
        />
      )}
    </WrapperContainer>
  );
};

const TipsSelected = ({ smileySelectValue }) => {
  if (smileySelectValue === 1) return <TipsNoReassuredSmiley />;
  if (smileySelectValue === 2) return <TipsPleasureSmiley />;
  if (smileySelectValue === 3) return <TipsAngrySmiley />;
  if (smileySelectValue === 4) return <TipsSadSmiley />;
  if (smileySelectValue === 5) return <TipsIllSmiley />;
  return null;
};

const SmileysContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid #000;
  background-color: #fefefe
  shadow-offset: 0px 5px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
  margin-top: 20px;
  padding-top: 15px;
  `;

const SmileyContainer = styled.TouchableOpacity`
  align-items: center;
  width: 33%;
  padding: 5px;
  margin-bottom: 15px;
`;

const TextEmotionView = styled.View`
  margin-top: 10px;
  align-self: center;
`;

const TextEmotion = styled(TextStyled)`
  text-align: center;
  color: ${({ color }) => color || '#000'};
  ${({ bold }) => bold && 'font-weight: bold'};
  align-items: center;
`;

const TipsNoReassuredSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <P>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies :{'\n\n'}1/ Je
      <P bold> parle de ce qui m'inquiète</P> à mes proches, à des professionnels, à des groupes de paroles pour prendre
      du recul et m'aider,
      {'\n\n'}2/ Je continue à chercher de l'information pour diminuer mon anxiété,
      {'\n\n'}3/ Je <P bold>prends soin de moi</P> en m'accordant du temps (bain, lecture, musique, film, sieste,
      relaxation…),
      {'\n\n'}4/ Je fais de l'<P bold>exercice sportif</P> pour lutter contre le stress,
      {'\n\n'}5/ J'essaye de ne pas en faire trop en même temps pour accomplir une chose à la fois et être fier(e) de
      moi-même.
    </P>
  </TipsContainer>
);

const TipsPleasureSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <P>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je m'
      <P bold>accorde d'autres récompenses,</P>
      des petites douceurs pour me féliciter, {'\n\n'}2/ Je découvre des <P bold>boissons non alcoolisées</P> (cocktails
      et bières sans alcool, jus de fruit…), {'\n\n'}
      3/ Je me <P bold>fixe un objectif</P> et je m'y tiens (par exemple, je bois lentement et j'alterne avec un verre
      d'eau, je prends un alcool de meilleure qualité mais je n'augmente pas la quantité), {'\n\n'}4/ Je me rappelle
      qu'un plaisir offert trop souvent devient une habitude…
    </P>
  </TipsContainer>
);

const TipsAngrySmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <P>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je <P bold>fais un tour</P>{' '}
      pour me changer les idées,
      {'\n\n'}2/ Je fais un <P bold>exercice de sport</P> ou je m'inscris à un cours d'
      <P bold>arts martiaux pour libérer ma tension,</P> {'\n\n'}3/ Je tente un{' '}
      <P bold>exercice de respiration profonde</P> est à répéter 3 fois&nbsp;: je prends une profonde inspiration par le
      nez en comptant lentement jusqu'à 4, je laisse l'air gonfler mon ventre, j'expire doucement par la bouche en
      comptant jusqu'à 8. {'\n\n'}4/ J'écris ce qui me vient à l'esprit et je le déchire, {'\n\n'}
      5/ J'apprends à<P bold> reconnaître les signes de colère</P> pour mieux les contrôler et verbaliser mon
      insatisfaction et mes désirs.
    </P>
  </TipsContainer>
);

const TipsSadSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <P>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je vais <P bold>marcher</P>{' '}
      pour me changer les idées,
      {'\n\n'}2/ Je fais un exercice de <P bold>sport</P> ou je découvre une nouvelle <P bold>activité culturelle,</P>{' '}
      {'\n\n'}3/ Je prends soin de moi (bain, lecture, musique, film, sieste, relaxation…), {'\n\n'}4/ J'
      <P bold>appelle un proche</P> pour être réconforté(e), {'\n\n'}5/ Je<P bold> ne remets plus au lendemain</P> des
      tâches et je m'occupe l'esprit (rangement, ménage, administratif…)
    </P>
  </TipsContainer>
);

const TipsIllSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <P>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ J'identifie ma douleur (car
      la connaître favorise sa maîtrise) et j'en <P bold>parle à un professionnel,</P> {'\n\n'}
      2/ Je pratique des techniques de
      <P bold> relaxation</P> pour baisser mon stress, chasser les pensées négatives… Cet{' '}
      <P bold>exercice de respiration profonde</P> est à répéter 3 fois&nbsp;: je prends une profonde inspiration par le
      nez en comptant lentement jusqu'à 4, je laisse l'air gonfler mon ventre, j'expire doucement par la bouche en
      comptant jusqu'à 8. {'\n\n'}3/ Si mon état de santé le permet, je fais du
      <P bold> sport régulièrement</P> car cela aide à contrôler la douleur et me donne de l'énergie, {'\n\n'}4/ Je sors
      pour <P bold>voir du monde</P> et ne pas rester seul(e).
    </P>
  </TipsContainer>
);

const TipsContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 25px;
`;

export default Defi2_Day5;
