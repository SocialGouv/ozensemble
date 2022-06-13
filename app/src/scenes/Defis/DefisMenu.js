import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import TextStyled from '../../components/TextStyled';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import OnBoardingModal from '../../components/OnBoardingModal';
import Lock from '../../components/illustrations/Lock';
import { storage } from '../../services/storage';
import HowMakeSelfEvaluation from './HowMakeSelfEvaluation';
import UnderlinedButton from '../../components/UnderlinedButton';

const DefisMenu = () => {
  const navigation = useNavigation();
  const [openHowMakeSelfEvaluation, setOpenHowMakeSelfEvaluation] = useState(false);

  return (
    <ScreenBgStyled>
      <Container>
        <TextStyled>
          J'évalue ma situation, motivations et risques liés à ma consommation grâce aux tests et bilans.
        </TextStyled>
        <CategorieMenu
          title={"Ma consommation d'alcool"}
          description={'Pour détecter des comportements à risque'}
          onPress={() => navigation.navigate('ONBOARDING_QUIZZ')}
          image={require('../../assets/images/QuizzEvaluerMaConsommation.png')}
          isAutoEvalutation
        />
        <UnderlinedButton
          color="#4030a5"
          withoutPadding
          content="Pourquoi faire cette auto-évaluation ?"
          onPress={() => setOpenHowMakeSelfEvaluation(true)}
        />
        <CategorieMenu
          title={'Premier défi'}
          description={'Faire le point en 7 jours '}
          onPress={() => navigation.navigate('DEFI1')}
          image={require('../../assets/images/Defi1.png')}
        />
        <CategorieMenu
          title={'Deuxième défi'}
          description={'Aller plus loin...'}
          onPress={() => navigation.navigate('DEFI2')}
          image={require('../../assets/images/Defi2.png')}
          disabledButton={false}
        />
        <CategorieMenu
          title={'Mes tests'}
          description={'Retrouver mes résultats'}
          onPress={() => navigation.navigate('TESTS_DEFIS')}
          image={require('../../assets/images/TestsDesDefis.png')}
          done
        />
      </Container>
      {openHowMakeSelfEvaluation && (
        <HowMakeSelfEvaluation
          visible={openHowMakeSelfEvaluation}
          onClose={() => setOpenHowMakeSelfEvaluation(false)}
        />
      )}
    </ScreenBgStyled>
  );
};

const CategorieMenu = ({ title, description, onPress, done, image, isAutoEvalutation, disabledButton }) => {
  const navigation = useNavigation();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showDefi2Modal, setshowDefi2Modal] = useState(false);
  const [autoEvaluationDone, setAutoEvaluationDone] = useState(storage.getString('@Quizz_result'));

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setAutoEvaluationDone(storage.getString('@Quizz_result'));
  }, [isFocused]);

  const disabled = (!isAutoEvalutation && !autoEvaluationDone) || disabledButton;

  done = isAutoEvalutation ? autoEvaluationDone : done;

  return (
    <>
      <CategorieContainer
        disabled={disabledButton ? false : isAutoEvalutation || autoEvaluationDone}
        onPress={() =>
          disabledButton ? setshowDefi2Modal(true) : disabled ? setShowOnboardingModal(true) : onPress()
        }>
        <ImageStyled source={image} />
        <TextContainer>
          {disabled ? (
            <TitleDisabledContainer>
              <TextStyled bold>{title}</TextStyled>
              <Lock size={16} />
            </TitleDisabledContainer>
          ) : (
            <TitleContainer>
              <TextStyled bold>{title}</TextStyled>
            </TitleContainer>
          )}
          <TextStyled>{description}</TextStyled>
          <ButtonContainer>
            <ButtonPrimary content={done ? 'Je consulte' : 'Je commence'} onPress={onPress} disabled={disabled} />
          </ButtonContainer>
        </TextContainer>
      </CategorieContainer>
      <OnBoardingModal
        title="Sans évaluation, pas de défis"
        description="En 4 questions, je peux évaluer ma consommation et ensuite commencer mes défis."
        boutonTitle="Je m'évalue"
        onPress={() => {
          setShowOnboardingModal(false);
          navigation.navigate('ONBOARDING_QUIZZ');
        }}
        visible={showOnboardingModal}
        hide={() => {
          setShowOnboardingModal(false);
        }}
      />
      <OnBoardingModal
        title="Faites le premier défi avant"
        description="Commencez le défi pour faire le point en 7 jours avant d'aller plus loin :) "
        boutonTitle="Je commence le défi 1"
        onPress={() => {
          setshowDefi2Modal(false);
          navigation.navigate('DEFI1');
        }}
        visible={showDefi2Modal}
        hide={() => {
          setshowDefi2Modal(false);
        }}
      />
    </>
  );
};

const Container = styled.View`
  padding: 20px ${defaultPaddingFontScale()}px 0px;
  margin-bottom: 75px;
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
  padding: 5px;
  margin-horizontal: 10px;
  width: ${screenWidth * 0.7 - defaultPaddingFontScale() - 20}px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${screenWidth * 0.68 - defaultPaddingFontScale() - 10}px;
`;
const TitleDisabledContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${screenWidth * 0.65 - defaultPaddingFontScale() - 10}px;
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
