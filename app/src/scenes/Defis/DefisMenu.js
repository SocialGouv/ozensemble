import { useRecoilValue } from 'recoil';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useIsFocused } from '@react-navigation/native';
import TextStyled from '../../components/TextStyled';
import { ScreenBgStyled } from '../../components/ScreenBgStyled';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import OnBoardingModal from '../../components/OnBoardingModal';
import Lock from '../../components/illustrations/Lock';
import HowMakeSelfEvaluation from './HowMakeSelfEvaluation';
import UnderlinedButton from '../../components/UnderlinedButton';
import { autoEvaluationQuizzResultState } from '../../recoil/quizzs';
import { storage } from '../../services/storage';

const DefisMenu = ({ navigation }) => {
  const [openHowMakeSelfEvaluation, setOpenHowMakeSelfEvaluation] = useState(false);
  const autoEvaluationDone = useRecoilValue(autoEvaluationQuizzResultState);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showDefi2Modal, setshowDefi2Modal] = useState(false);
  const [defi1Day, setDefi1Day] = useState(Number(storage.getNumber('@Defi1_ValidatedDays') || 0));
  const [defi2Day, setDefi2Day] = useState(Number(storage.getNumber('@Defi2_ValidatedDays') || 0));

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setDefi1Day(Number(storage.getNumber('@Defi1_ValidatedDays') || 0));
    if (isFocused) setDefi2Day(Number(storage.getNumber('@Defi2_ValidatedDays') || 0));
  }, [isFocused]);

  const defi1CallToAction = useMemo(() => {
    if (!autoEvaluationDone || defi1Day === 0) return 'Je commence';
    if (defi1Day === 7) return 'Je consulte';
    // if (defi1Day === 6) return 'Je finis';
    return 'Je continue';
  }, [defi1Day, autoEvaluationDone]);

  const defi2CallToAction = useMemo(() => {
    if (!autoEvaluationDone || defi2Day === 0) return 'Je commence';
    if (defi2Day === 7) return 'Je consulte';
    // if (defi2Day === 6) return 'Je finis';
    return 'Je continue';
  }, [defi2Day, autoEvaluationDone]);

  return (
    <>
      <ScreenBgStyled>
        <Container>
          <TextStyled>
            J'évalue ma situation, motivations et risques liés à ma consommation grâce aux tests et bilans.
          </TextStyled>
          <CategorieMenu
            title={"Ma consommation d'alcool"}
            description={'Pour détecter des comportements à risque'}
            onButtonPress={() =>
              navigation.navigate('ONBOARDING_QUIZZ', {
                screen: autoEvaluationDone ? 'QUIZZ_RESULTS' : 'QUIZZ_QUESTIONS',
              })
            }
            image={require('../../assets/images/QuizzEvaluerMaConsommation.png')}
            callToAction={autoEvaluationDone ? 'Je consulte' : 'Je commence'}
          />
          {!autoEvaluationDone && (
            <UnderlinedButton
              color="#4030a5"
              withoutPadding
              content="Pourquoi faire cette auto-évaluation ?"
              onPress={() => setOpenHowMakeSelfEvaluation(true)}
            />
          )}
          <CategorieMenu
            title={'Premier défi'}
            description={'Faire le point en 7 jours '}
            onButtonPress={() => navigation.navigate('DEFI1')}
            image={require('../../assets/images/Defi1.png')}
            disabled={!autoEvaluationDone}
            disabledContainer={autoEvaluationDone}
            callToAction={defi1CallToAction}
            onContainerPress={() => setShowOnboardingModal(true)}
          />
          <CategorieMenu
            title={'Deuxième défi'}
            description={'Aller plus loin...'}
            onButtonPress={() => navigation.navigate('DEFI2')}
            image={require('../../assets/images/Defi2.png')}
            disabled={!autoEvaluationDone && defi1Day < 7}
            disabledContainer={autoEvaluationDone}
            callToAction={defi2CallToAction}
            onContainerPress={() => (!autoEvaluationDone ? setShowOnboardingModal(true) : setshowDefi2Modal(true))}
          />
          <CategorieMenu
            title={'Mes tests'}
            description={'Retrouver mes résultats'}
            onButtonPress={() => navigation.navigate('TESTS_DEFIS')}
            image={require('../../assets/images/TestsDesDefis.png')}
            callToAction="Je consulte"
            disabled={!autoEvaluationDone}
          />
        </Container>
        {openHowMakeSelfEvaluation && (
          <HowMakeSelfEvaluation
            visible={openHowMakeSelfEvaluation}
            onClose={() => setOpenHowMakeSelfEvaluation(false)}
          />
        )}
      </ScreenBgStyled>
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

const CategorieMenu = ({
  title,
  description,
  onButtonPress,
  image,
  callToAction,
  disabled,
  disabledContainer = true,
  onContainerPress = null,
}) => {
  return (
    <>
      <CategorieContainer disabled={disabledContainer} onPress={!disabledContainer ? onContainerPress : null}>
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
            <ButtonPrimary content={callToAction} onPress={onButtonPress} disabled={disabled} />
          </ButtonContainer>
        </TextContainer>
      </CategorieContainer>
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
