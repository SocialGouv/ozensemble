import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { TouchableWithoutFeedback } from 'react-native';
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
              <TextStyled bold> Continuez ainsi et vous atteindrez probablement votre objectif sous peu !</TextStyled>
            </>
          }
        />
      )}
      {answers.filter((answer) => answer === 'Oui')?.length === 1 && (
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
      {answers.filter((answer) => answer === 'Oui')?.length === 0 && (
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

      <ButtonPrimaryStyled content={route.params.cta} onPress={() => navigation.navigate(route.params.nextRoute)} />
    </WrapperContainer>
  );
};

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

export default ResultsQuizzDefi5Day3;
