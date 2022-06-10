import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import TextStyled from '../../components/TextStyled';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import { Underlined } from '../../components/Articles';
import Cadena from '../../components/illustrations/Cadena';
import OnBoardingModal from '../../components/OnBoardingModal';
import { fetchStoredAnswers } from '../../components/Quizz/utils';

const DefisMenu = () => {
  const navigation = useNavigation();
  const [openHowMakeSelfEvaluation, setOpenHowMakeSelfEvaluation] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const memoryKeyResult = '@Quizz_result';
  const memoryKeyAnswers = '@Quizz_answers';
  const nextState = fetchStoredAnswers({ memoryKeyAnswers, memoryKeyResult });
  const autoEvaluationDone = nextState.result !== null;

  return (
    <ScreenBgStyled>
      <Container>
        <TextStyled>
          J'évalue ma situation, motivations et risques liés à ma consommation grâce aux tests et bilans.
        </TextStyled>
        <CategorieMenu
          title={'Évaluer ma consommation'}
          description={'Pour détecter des comportements à risque'}
          onPressButton={() => navigation.navigate('ONBOARDING_QUIZZ')}
          image={require('../../assets/images/QuizzEvaluerMaConsommation.png')}
          done={autoEvaluationDone}
          disabledContainer={autoEvaluationDone === true}
          onPressContainer={() => setShowOnboardingModal(true)}
        />
        <HowMakeSelfEvaluation onPress={() => setOpenHowMakeSelfEvaluation(true)}>
          <Underlined>
            <TextStyled color="#4030A5">Pourquoi faire cette auto-évaluation ? </TextStyled>
          </Underlined>
        </HowMakeSelfEvaluation>
        <CategorieMenu
          title={'Premier challenge'}
          description={'Faire le point en 7 jours '}
          onPressButton={() => navigation.navigate('DEFI1')}
          image={require('../../assets/images/Defi1.png')}
          disabledButton={autoEvaluationDone === false}
          disabledContainer={autoEvaluationDone === true}
          onPressContainer={() => setShowOnboardingModal(true)}
        />
        <CategorieMenu
          title={'Deuxième challenge'}
          description={'Aller plus loin ...'}
          onPressButton={() => navigation.navigate('DEFI2')}
          image={require('../../assets/images/Defi2.png')}
          disabledButton={autoEvaluationDone === false}
          disabledContainer={autoEvaluationDone === true}
          onPressContainer={() => setShowOnboardingModal(true)}
        />
        <CategorieMenu
          title={'Tests des défis'}
          description={'Retrouver mes résultats'}
          onPressButton={() => navigation.navigate('TESTS_DEFIS')}
          image={require('../../assets/images/TestsDesDefis.png')}
          disabledButton={autoEvaluationDone === false}
          disabledContainer={autoEvaluationDone === true}
          onPressContainer={() => setShowOnboardingModal(true)}
        />
        <OnBoardingModal
          title="Sans évaluation, pas de défis"
          description="En 4 questions, je peux évaluer ma consommation et ensuite commencer mes défis."
          boutonTitle="Je m’évalue"
          onPress={() => {
            setShowOnboardingModal(false);
            navigation.navigate('ONBOARDING_QUIZZ');
          }}
          visible={showOnboardingModal}
          hide={() => {
            setShowOnboardingModal(false);
          }}
        />
      </Container>
      {openHowMakeSelfEvaluation && <TextStyled>HowMakeSelfEvaluation</TextStyled>}
    </ScreenBgStyled>
  );
};

const CategorieMenu = ({
  title,
  description,
  done,
  onPressButton,
  onPressContainer,
  image,
  disabledButton,
  disabledContainer,
}) => (
  <CategorieContainer disabled={disabledContainer} onPress={onPressContainer}>
    <ImageStyled source={image} />
    <TextContainer>
      {disabledButton ? (
        <TitleDisabledContainer>
          <TextStyled bold>{title}</TextStyled>
          <Cadena size={16} />
        </TitleDisabledContainer>
      ) : (
        <TitleContainer>
          <TextStyled bold>{title}</TextStyled>
        </TitleContainer>
      )}
      <TextStyled>{description}</TextStyled>
      <ButtonContainer>
        <ButtonPrimary
          content={done ? 'Je consulte' : 'Je commence'}
          onPress={onPressButton}
          disabled={disabledButton}
        />
      </ButtonContainer>
    </TextContainer>
  </CategorieContainer>
);

const Container = styled.View`
  padding: 20px ${defaultPaddingFontScale()}px 0px;
`;

const HowMakeSelfEvaluation = styled.TouchableOpacity`
  align-items: center;
`;

const CategorieContainer = styled.TouchableOpacity`
  border: 1px solid #79747e;
  border-radius: 12px;
  flex-direction: row;
  margin-vertical: 30px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: space-around;
  padding: 5px
  width: ${screenWidth * 0.7 - defaultPaddingFontScale()}px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${screenWidth * 0.68 - defaultPaddingFontScale()}px;
`;
const TitleDisabledContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${screenWidth * 0.65 - defaultPaddingFontScale()}px;
`;

const ButtonContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  margin-right: 5px;
`;

const ImageStyled = styled.Image`
  border-bottom-left-radius: 11px;
  border-top-left-radius: 11px;
  width: ${screenWidth * 0.3 - defaultPaddingFontScale()}px;
  height: ${screenWidth * 0.4}px;
`;

export default DefisMenu;
