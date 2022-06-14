import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import H1 from '../../../../components/H1';
import { defaultPaddingFontScale } from '../../../../styles/theme';
import { setValidatedDays } from '../../utils';
import { ScreenBgStyled } from '../../../../components/ScreenBgStyled';
import BackButton from '../../../../components/BackButton';
import TextStyled from '../../../../components/TextStyled';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import emotions from './emotions';

const Defi2_Day6 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  const [smileySelect, setSmileySelect] = useState(0);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <BackButton onPress={navigation.goBack} />
        <TopTitle>
          <H1 color="#4030a5">Affronter une situation à risque</H1>
        </TopTitle>
        <TextStyled bold>Dans cette situation, sélectionner l'émotion que vous ressentez.</TextStyled>
        <TextStyled>
          “Quand ma relation avec quelqu'un de mon entourage m'inquiète ou me rend anxieux(se) “ je bois pour :{' '}
        </TextStyled>
        <SmileysContainer>
          {emotions.map((emotion) => (
            <SmileyContainer onPress={() => setSmileySelect(emotion.value === smileySelect.value ? 0 : emotion)}>
              {smileySelect.value === emotion.value ? emotion.iconclicked : emotion.icon}
              <TextStyled color={smileySelect.value === emotion.value ? '#DE285E' : '#000'}>
                {emotion.description}
              </TextStyled>
            </SmileyContainer>
          ))}
        </SmileysContainer>
        {smileySelect?.tips}
        <ButtonPrimary content="J'ai compris" widthSmall onPress={() => navigation.navigate('DEFI2_MENU')} />
      </TopContainer>
    </ScreenBgStyled>
  );
};

export const TipsNoReassuredSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      Désormais, quand la situation se présente, je teste ces stratégies :{'\n\n'}1/ Jes
      <TextStyled bold> parle de ce qui m'inquiète</TextStyled> à mes proches, à des professionnels, à des groupes de
      paroles pour prendre du recul et m'aider,
      {'\n\n'}2/ Je continue à chercher de l'information pour diminuer mon anxiété,
      {'\n\n'}3/ Je <TextStyled bold>prends soin de moi</TextStyled> en m'accordant du temps (bain, lecture, musique,
      film, sieste, relaxation…),
      {'\n\n'}4/ Je fais de l'<TextStyled bold>exercice sportif</TextStyled> pour lutter contre le stress,
      {'\n\n'}5/ J'essaye de ne pas en faire trop en même temps pour accomplir une chose à la fois et être fier(e) de
      moi-même.
    </TextStyled>
  </TipsContainer>
);

export const TipsPleasureSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je m'accorde d'autres récompenses,
      des petites douceurs pour me féliciter, {'\n\n'}2/ Je découvre des boissons non alcoolisées (cocktails et bières
      sans alcool, jus de fruit…), {'\n\n'}3/ Je me fixe un objectif et je m'y tiens (par exemple, je bois lentement et
      j'alterne avec un verre d'eau, je prends un alcool de meilleure qualité mais je n'augmente pas la quantité),{' '}
      {'\n\n'}4/ Je me rappelle qu'un plaisir offert trop souvent devient une habitude…
    </TextStyled>
  </TipsContainer>
);

export const TipsAngrySmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je fais un tour pour me changer
      les idées,
      {'\n\n'}2/ Je fais un exercice de sport ou je m'inscris à un cours d'arts martiaux pour libérer ma tension,{' '}
      {'\n\n'}3/ Je tente un exercice de respiration profonde (à répéter 3 fois): je prends une profonde inspiration par
      le nez en comptant lentement jusqu'à 4 je laisse l'air gonfler mon ventre j'expire doucement par la bouche en
      comptant jusqu'à 8. {'\n\n'}4/ J'écris ce qui me vient à l'esprit et je le déchire, {'\n\n'}5/ J'apprends à
      reconnaître les signes de colère pour mieux les contrôler et verbaliser mon insatisfaction et mes désirs.
    </TextStyled>
  </TipsContainer>
);

export const TipsSadSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je vais marcher pour me changer
      les idées,
      {'\n\n'}2/ Je fais un exercice de sport ou je découvre une nouvelle activité culturelle, {'\n\n'}3/ Je prends soin
      de moi (bain, lecture, musique, film, sieste, relaxation…), {'\n\n'}4/ J'appelle un proche pour être
      réconforté(e), {'\n\n'}5/ Je ne remets plus au lendemain des tâches et je m'occupe l'esprit (rangement, ménage,
      administratif…)
    </TextStyled>
  </TipsContainer>
);

export const TipsIllSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ J'identifie ma douleur (car la
      connaître favorise sa maîtrise) et j'en parle à un professionnel, {'\n\n'}2/ Je pratique des techniques de
      relaxation pour baisser mon stress, chasser les pensées négatives… Cet exercice de respiration profonde (à répéter
      3 fois): je prends une profonde inspiration par le nez en comptant lentement jusqu'à 4 je laisse l'air gonfler mon
      ventre j'expire doucement par la bouche en comptant jusqu'à 8. {'\n\n'}3/ Si mon état de santé le permet, je fais
      du sport régulièrement car cela aide à contrôler la douleur et me donne de l'énergie, {'\n\n'}4/ Je sors pour voir
      du monde et ne pas rester seul.e
    </TextStyled>
  </TipsContainer>
);

const TopContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px 0px;
  margin-bottom: 100px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const SmileysContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const SmileyContainer = styled.TouchableOpacity``;

const TipsContainer = styled.View``;

export default Defi2_Day6;
