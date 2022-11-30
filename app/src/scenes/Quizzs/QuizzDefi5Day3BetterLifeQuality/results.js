import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { quizzDefi5Day3partie1AnswersState } from '../../../recoil/quizzs';
import TextStyled from '../../../components/TextStyled';
import WrapperContainer from '../../../components/WrapperContainer';
import Element from '../../../components/ElementDayDefi';
import ButtonPrimary from '../../../components/ButtonPrimary';

const ResultsQuizzDefi5Day3 = ({ navigation, route }) => {
  const answersState = useRecoilValue(quizzDefi5Day3partie1AnswersState);

  const answers = Object.values(answersState);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Le conseil d'Oz Ensemble">
      {answers.filter((answer) => answer === 'Oui')?.length === 2 && (
        <Element
          content={
            <>
              Votre qualité de vie s'est améliorée parce que vous avez fait des efforts pour modifier votre consommation
              d'alcool.{'\n\n'}
              <TextStyled bold>Continuez ainsi et vous atteindrez probablement votre objectif sous peu !</TextStyled>
            </>
          }
        />
      )}
      {answers.filter((answer) => answer === 'None')?.length === 2 && (
        <Element
          content={
            <>
              Votre qualité de vie a diminué, mais ce n'est pas de rapport avec votre consommation d'alcool.{'\n\n'}
              <TextStyled bold>
                La vie nous joue parfois de bien mauvais tours. On rencontre des obstacles inattendus sur notre route.
                Soyez bon(ne) avec vous-même et essayez de continuer à votre rythme.
              </TextStyled>
              {'\n\n'}
              Par contre, si vous traversez une période très difficile à la suite d'un événement grave (décès d'un
              proche, divorce, etc), il serait peut-être préférable de{' '}
              <TextStyled underline color="#4030A5" onPress={() => navigation.navigate('CONTACT')}>
                prendre conseil auprès d'un professionnel d'Oz Ensemble
              </TextStyled>{' '}
              susceptible de vous épauler.
            </>
          }
        />
      )}
      {answers[0] === 'Oui' && answers[1] === 'Non' && (
        <Element
          content={
            <>
              Votre qualité de vie s'est améliorée mais ce n'est pas en rapport avec des efforts pour modifier votre
              consommation d'alcool.{'\n\n'}
              <TextStyled bold>
                Tant mieux ! Cette situation peut jouer en votre faveur. Puisque vous avez moins de difficultés à
                résoudre, vous pourrez ainsi vous concentrer plus facilement sur votre objectif : modifier votre
                consommation d'alcool.
              </TextStyled>
            </>
          }
        />
      )}
      {answers[0] === 'Non' && answers[1] === 'Oui' && (
        <Element
          content={
            <>
              Votre qualité de vie a diminué malgré vos efforts pour modifier votre consommation d'alcool.
              {'\n\n\n'}
              <TextStyled bold>
                {'   • '} Votre relation de couple est moins satisfaisante{'\u00A0'}?
              </TextStyled>
              {'\n\n'}
              Il peut être très difficile de modifier vos habitudes de consommation si votre partenaire boit autant ou
              plus que vous, surtout s'il n'encourage pas votre décision.
              {'\n\n'}
              Mais cela signifie seulement que <TextStyled bold>vous devez être plus déterminé(e).</TextStyled> C'est
              une raison pour demeurer encore plus concentré(e) et engagé(e). Vous faites la bonne chose. Vous pouvez
              réussir et vous seul(e) pouvez décider de modifier votre consommation. Vous pouvez également faire part de
              vos besoins à votre conjoint.
              {'\n\n\n'}
              <TextStyled bold>
                {'   • '} Vos activités sociales et vos relations interpersonnelles sont affectées{'\u00A0'}?
              </TextStyled>
              {'\n\n'}
              Vous pourriez avoir peur de perdre des amis parce que vous avez changé.
              {'\n\n'}
              Sont-ils réellement de bons amis si tout ce que vous avez en commun est l'alcool{'\u00A0'}?{'\n\n'}
              <TextStyled bold>
                Le fait de modifier vos habitudes changera certainement votre vie, mais vous avez de bonnes raisons de
                le faire.
              </TextStyled>{' '}
              Vous pourriez même gagner de nouveaux amis.
              {'\n\n\n'}
              <TextStyled bold>
                {'   • '} Votre bien-être psychologique est moins satisfaisant{'\u00A0'}?
              </TextStyled>
              {'\n\n'}
              Vous pouvez ressentir un manque de plaisir dans votre vie ou vous sentir envahi(e) par des sentiments de
              colère, d'ennui ou de tristesse. Au début, ce que vous ressentez peut être désagréable.
              {'\n\n'}
              <TextStyled bold>
                Trouver d'autres sources de plaisir vous aidera à traverser cette période.
              </TextStyled>{' '}
              Vous faites des progrès. Mais le changement est un processus graduel de sorte que vous devez être bon(ne)
              avec vous-même et vous donner du temps.
            </>
          }
        />
      )}

      <ButtonPrimaryStyled content={route.params.cta} onPress={() => navigation.navigate(route.params.nextRoute)} />
    </WrapperContainer>
  );
};

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

export default ResultsQuizzDefi5Day3;
