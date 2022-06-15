import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import H1 from '../../../../components/H1';
import { defaultPaddingFontScale } from '../../../../styles/theme';
import { setValidatedDays } from '../../utils';
import { ScreenBgStyled } from '../../../../components/ScreenBgStyled';
import BackButton from '../../../../components/BackButton';
import TextStyled from '../../../../components/TextStyled';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import { defi2EmotionState } from '../../../../recoil/defis';
import emotions from './emotions';

const Defi2_Day5 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  const [smileySelect, setSmileySelect] = useState(0);
  const [emotion, setEmotion] = useRecoilState(defi2EmotionState);

  const TipsSelected = () => {
    switch (smileySelect) {
      case 0:
        return null;
      case 1:
        return <TipsNoReassuredSmiley />;
      case 2:
        return <TipsPleasureSmiley />;
      case 3:
        return <TipsAngrySmiley />;
      case 4:
        return <TipsSadSmiley />;
      case 5:
        return <TipsIllSmiley />;
    }
  };
  return (
    <ScreenBgStyled>
      <TopContainer>
        <BackButton onPress={navigation.goBack} />
        <TopTitle>
          <H1 color="#4030a5">Affronter une situation à risque</H1>
        </TopTitle>
        <TextStyled bold>Dans cette situation, sélectionner l'émotion que vous ressentez.</TextStyled>
        <TextStyled>
          {'\n'}“Quand ma relation avec quelqu'un de mon entourage m'inquiète ou me rend anxieux(se) “ je bois pour :{' '}
        </TextStyled>
        <SmileysContainer>
          {emotions.map((emotion, index) => (
            <SmileyContainer
              index={index}
              color={emotion.value}
              onPress={() => setSmileySelect(emotion.value === smileySelect.value ? 0 : emotion)}>
              {smileySelect.value === emotion.value ? emotion.iconclicked : emotion.icon}
              <TextEmotionView>
                <TextStyled
                  color={smileySelect.value === emotion.value ? '#DE285E' : '#000'}
                  bold={smileySelect.value === emotion.value}>
                  <TextEmotion>{emotion.description}</TextEmotion>
                </TextStyled>
              </TextEmotionView>
            </SmileyContainer>
          ))}
        </SmileysContainer>
        {TipsSelected()}
        {smileySelect !== 0 ? (
          <ButtonPrimary
            content="J'ai compris"
            widthSmall
            onPress={() => {
              navigation.navigate('DEFI2_MENU');
              setEmotion(smileySelect);
            }}
          />
        ) : null}
      </TopContainer>
    </ScreenBgStyled>
  );
};

const TopContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px 0px;
  margin-bottom: 150px;
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
  border: 1px solid #000;
  background-color: #fefefe
  shadow-offset: 0px 5px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
  margin-top: 20px;
`;

const SmileyContainer = styled.TouchableOpacity`
  align-items: center;
  width: 33%;
  padding: 5px;
  margin-vertical: 15px;
`;

const TextEmotionView = styled.View`
  margin-vertical: 10px;
`;

const TextEmotion = styled.Text`
  text-align: center;
`;

const TipsNoReassuredSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies :{'\n\n'}1/ Jes
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

const TipsPleasureSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je m'
      <TextStyled bold>accorde d'autres récompenses,</TextStyled>
      des petites douceurs pour me féliciter, {'\n\n'}2/ Je découvre des{' '}
      <TextStyled bold>boissons non alcoolisées</TextStyled> (cocktails et bières sans alcool, jus de fruit…), {'\n\n'}
      3/ Je me <TextStyled bold>fixe un objectif</TextStyled> et je m'y tiens (par exemple, je bois lentement et
      j'alterne avec un verre d'eau, je prends un alcool de meilleure qualité mais je n'augmente pas la quantité),{' '}
      {'\n\n'}4/ Je me rappelle qu'un plaisir offert trop souvent devient une habitude…
    </TextStyled>
  </TipsContainer>
);

const TipsAngrySmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je{' '}
      <TextStyled bold>fais un tour</TextStyled> pour me changer les idées,
      {'\n\n'}2/ Je fais un <TextStyled bold>exercice de sport</TextStyled> ou je m'inscris à un cours d'
      <TextStyled bold>arts martiaux pour libérer ma tension,</TextStyled> {'\n\n'}3/ Je tente un{' '}
      <TextStyled bold>exercice de respiration profonde</TextStyled> (à répéter 3 fois): je prends une profonde
      inspiration par le nez en comptant lentement jusqu'à 4 je laisse l'air gonfler mon ventre j'expire doucement par
      la bouche en comptant jusqu'à 8. {'\n\n'}4/ J'écris ce qui me vient à l'esprit et je le déchire, {'\n\n'}5/
      J'apprends à<TextStyled bold> reconnaître les signes de colère</TextStyled> pour mieux les contrôler et verbaliser
      mon insatisfaction et mes désirs.
    </TextStyled>
  </TipsContainer>
);

const TipsSadSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ Je vais{' '}
      <TextStyled bold>marcher</TextStyled> pour me changer les idées,
      {'\n\n'}2/ Je fais un exercice de <TextStyled bold>sport</TextStyled> ou je découvre une nouvelle{' '}
      <TextStyled bold>activité culturelle,</TextStyled> {'\n\n'}3/ Je prends soin de moi (bain, lecture, musique, film,
      sieste, relaxation…), {'\n\n'}4/ J'<TextStyled bold>appelle un proche</TextStyled> pour être réconforté(e),{' '}
      {'\n\n'}5/ Je<TextStyled bold> ne remets plus au lendemain</TextStyled> des tâches et je m'occupe l'esprit
      (rangement, ménage, administratif…)
    </TextStyled>
  </TipsContainer>
);

const TipsIllSmiley = () => (
  <TipsContainer>
    <H1>Les conseils d'Oz Ensemble</H1>
    <TextStyled>
      {'\n'}Désormais, quand la situation se présente, je teste ces stratégies : {'\n\n'}1/ J'identifie ma douleur (car
      la connaître favorise sa maîtrise) et j'en <TextStyled bold>parle à un professionnel,</TextStyled> {'\n\n'}2/ Je
      pratique des techniques de
      <TextStyled bold> relaxation</TextStyled> pour baisser mon stress, chasser les pensées négatives… Cet{' '}
      <TextStyled bold>exercice de respiration profonde</TextStyled> (à répéter 3 fois): je prends une profonde
      inspiration par le nez en comptant lentement jusqu'à 4 je laisse l'air gonfler mon ventre j'expire doucement par
      la bouche en comptant jusqu'à 8. {'\n\n'}3/ Si mon état de santé le permet, je fais du
      <TextStyled bold> sport régulièrement</TextStyled> car cela aide à contrôler la douleur et me donne de l'énergie,{' '}
      {'\n\n'}4/ Je sors pour <TextStyled bold>voir du monde</TextStyled> et ne pas rester seul.e
    </TextStyled>
  </TipsContainer>
);

const TipsContainer = styled.View`
  margin-vertical: 20px;
`;

export default Defi2_Day5;
