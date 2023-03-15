import { useRecoilValue } from 'recoil';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useIsFocused } from '@react-navigation/native';
import TextStyled from '../../components/TextStyled';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';
import OnBoardingModal from '../../components/OnBoardingModal';
import Lock from '../../components/illustrations/Lock';
import UnderlinedButton from '../../components/UnderlinedButton';
import { autoEvaluationQuizzResultState } from '../../recoil/quizzs';
import { storage } from '../../services/storage';
import { Bold, P } from '../../components/Articles';
import WrapperContainer from '../../components/WrapperContainer';
import ValidateIcon from '../../components/ValidateIcon';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import H3 from '../../components/H3';

const DefisMenu = ({ navigation }) => {
  const autoEvaluationDone = useRecoilValue(autoEvaluationQuizzResultState);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showDefi2Modal, setshowDefi2Modal] = useState(false);
  const [showDefi3Modal, setshowDefi3Modal] = useState(false);
  const [showDefi4Modal, setshowDefi4Modal] = useState(false);
  const [showDefi5Modal, setshowDefi5Modal] = useState(false);
  const [showHowMakeSelfEvaluation, setShowHowMakeSelfEvaluation] = useState(false);
  const [defi1Day, setDefi1Day] = useState(Number(storage.getNumber('@Defi1_ValidatedDays') || 0));
  const [defi2Day, setDefi2Day] = useState(Number(storage.getNumber('@Defi2_ValidatedDays') || 0));
  const [defi3Day, setDefi3Day] = useState(Number(storage.getNumber('@Defi3_ValidatedDays') || 0));
  const [defi4Day, setDefi4Day] = useState(Number(storage.getNumber('@Defi4_ValidatedDays') || 0));
  const [defi5Day, setDefi5Day] = useState(Number(storage.getNumber('@Defi5_ValidatedDays') || 0));

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setDefi1Day(Number(storage.getNumber('@Defi1_ValidatedDays') || 0));
    if (isFocused) setDefi2Day(Number(storage.getNumber('@Defi2_ValidatedDays') || 0));
    if (isFocused) setDefi3Day(Number(storage.getNumber('@Defi3_ValidatedDays') || 0));
    if (isFocused) setDefi4Day(Number(storage.getNumber('@Defi4_ValidatedDays') || 0));
    if (isFocused) setDefi5Day(Number(storage.getNumber('@Defi5_ValidatedDays') || 0));
  }, [isFocused]);

  const defi1CallToAction = useMemo(() => {
    if (!autoEvaluationDone || defi1Day === 0) return 'Je commence';
    if (defi1Day === 7) return 'Mes résultats';
    return 'Je continue';
  }, [defi1Day, autoEvaluationDone]);

  const defi2CallToAction = useMemo(() => {
    if (!autoEvaluationDone || defi2Day === 0) return 'Je commence';
    if (defi2Day === 7) return 'Mes résultats';
    return 'Je continue';
  }, [defi2Day, autoEvaluationDone]);

  const defi3CallToAction = useMemo(() => {
    if (!autoEvaluationDone || defi3Day === 0) return 'Je commence';
    if (defi3Day === 7) return 'Mes résultats';
    return 'Je continue';
  }, [defi3Day, autoEvaluationDone]);

  const defi4CallToAction = useMemo(() => {
    if (!autoEvaluationDone || defi4Day === 0) return 'Je commence';
    if (defi4Day === 7) return 'Mes résultats';
    return 'Je continue';
  }, [defi4Day, autoEvaluationDone]);

  const defi5CallToAction = useMemo(() => {
    if (!autoEvaluationDone || defi5Day === 0) return 'Je commence';
    if (defi5Day === 7) return 'Mes résultats';
    return 'Je continue';
  }, [defi5Day, autoEvaluationDone]);

  return (
    <WrapperContainer title={'Mes activités'}>
      <SubTitle>
        <TextStyled>
          Chaque activité dure 7 jours et est composée de tests, de quiz et de lectures qui vous aideront à diminuer
          votre consommation et à accroitre votre motivation !
        </TextStyled>
      </SubTitle>
      <CategorieMenu
        title={'Auto-évaluation'}
        description={'Détecter mon niveau de risque'}
        onPress={() =>
          navigation.navigate('ONBOARDING_QUIZZ', {
            screen: autoEvaluationDone ? 'QUIZZ_RESULTS' : 'QUIZZ_QUESTIONS',
          })
        }
        image={require('../../assets/images/AutoEvaluation.png')}
        callToAction={autoEvaluationDone ? 'Mon résultat' : 'Je commence'}
        onBoardingPress={() => navigation.navigate('ONBOARDING_QUIZZ')}
      />
      {!autoEvaluationDone && (
        <UnderlinedButton
          color="#4030a5"
          withoutPadding
          content="Pourquoi faire cette auto-évaluation ?"
          onPress={() => {
            setShowHowMakeSelfEvaluation(true);
          }}
        />
      )}
      <CategorieMenu
        title={'Activité 1'}
        description={'Apprendre à diminuer ma consommation'}
        onPress={() => navigation.navigate('DEFI1')}
        image={require('../../assets/images/Activity1.png')}
        disabled={!autoEvaluationDone}
        callToAction={defi1CallToAction}
        onBoardingPress={() => setShowOnboardingModal(true)}
      />
      <CategorieMenu
        title={'Activité 2'}
        description={'Repérer mes situations à risque'}
        onPress={() => {
          navigation.navigate('DEFI2');
        }}
        image={require('../../assets/images/Activity2.png')}
        disabled={!autoEvaluationDone || defi1Day < 7}
        callToAction={defi2CallToAction}
        onBoardingPress={() => (!autoEvaluationDone ? setShowOnboardingModal(true) : setshowDefi2Modal(true))}
      />
      <CategorieMenu
        title={'Activité 3'}
        description={"Réfléchir au rôle de l'alcool au quotidien"}
        onPress={() => {
          navigation.navigate('DEFI3');
        }}
        image={require('../../assets/images/Activity3.png')}
        disabled={!autoEvaluationDone || defi2Day < 7}
        callToAction={defi3CallToAction}
        onBoardingPress={() => (!autoEvaluationDone ? setShowOnboardingModal(true) : setshowDefi3Modal(true))}
      />

      <CategorieMenu
        title={'Activité 4'}
        description={'Me fixer un objectif de consommation'}
        onPress={() => {
          navigation.navigate('DEFI4');
        }}
        image={require('../../assets/images/Activity4.png')}
        disabled={!autoEvaluationDone || defi3Day < 7}
        callToAction={defi4CallToAction}
        onBoardingPress={() => (!autoEvaluationDone ? setShowOnboardingModal(true) : setshowDefi4Modal(true))}
      />
      <CategorieMenu
        title={'Activité 5'}
        description={'Faire mon bilan après 4 semaines'}
        onPress={() => {
          navigation.navigate('DEFI5');
        }}
        image={require('../../assets/images/Activity5.png')}
        disabled={!autoEvaluationDone || defi4Day < 7}
        callToAction={defi5CallToAction}
        onBoardingPress={() => (!autoEvaluationDone ? setShowOnboardingModal(true) : setshowDefi5Modal(true))}
      />
      <CategorieMenu
        title={'Mes resultats'}
        description={'Retrouver tous mes tests des activités'}
        onPress={() => navigation.navigate('TESTS_DEFIS')}
        image={require('../../assets/images/Resultats.png')}
        callToAction="Mes résultats"
        disabled={!autoEvaluationDone}
        disabledContainer={!autoEvaluationDone}
      />
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
        boutonTitle={`${defi1CallToAction} le\u000Apremier\u00A0défi`}
        onPress={() => {
          setshowDefi2Modal(false);
          navigation.navigate('DEFI1');
        }}
        visible={showDefi2Modal}
        hide={() => {
          setshowDefi2Modal(false);
        }}
      />
      <OnBoardingModal
        title="Faites le deuxième défi avant"
        description="Commencez le défi 2 avant d'aller plus loin :) "
        boutonTitle={`${defi2CallToAction} le\u000Adeuxième\u00A0défi`}
        onPress={() => {
          setshowDefi3Modal(false);
          navigation.navigate('DEFI2');
        }}
        visible={showDefi3Modal}
        hide={() => {
          setshowDefi3Modal(false);
        }}
      />
      <OnBoardingModal
        title="Faites le troisième défi avant"
        description="Commencez le défi 3 avant d'aller plus loin :) "
        boutonTitle={`${defi3CallToAction} le\u000Atroisième\u00A0défi`}
        onPress={() => {
          setshowDefi4Modal(false);
          navigation.navigate('DEFI3');
        }}
        visible={showDefi4Modal}
        hide={() => {
          setshowDefi4Modal(false);
        }}
      />
      <OnBoardingModal
        title="Faites le quatrième défi avant"
        description="Commencez le défi 4 avant d'aller plus loin :) "
        boutonTitle={`${defi4CallToAction} le\u000Aquatrième\u00A0défi`}
        onPress={() => {
          setshowDefi5Modal(false);
          navigation.navigate('DEFI4');
        }}
        visible={showDefi5Modal}
        hide={() => {
          setshowDefi5Modal(false);
        }}
      />
      <OnBoardingModal
        title="Pourquoi faire cette auto-évaluation ?"
        description={
          <>
            <P>
              En faisant cette évaluation en 4 questions, nous pourrons <Bold>améliorer votre expérience</Bold> au sein
              de l'application en vous donnant des <Bold>conseils adaptés</Bold>.{'\n\n'}
            </P>
            <P>
              De vous même, vous prendez <Bold>consicence du résultat</Bold> et vous pourrez alors y remédier en
              apprenant à réduire votre consommation d'alcool.
            </P>
          </>
        }
        boutonTitle="Je m'évalue"
        onPress={() => {
          setShowHowMakeSelfEvaluation(false);
          navigation.navigate('ONBOARDING_QUIZZ');
        }}
        visible={showHowMakeSelfEvaluation}
        hide={() => {
          setShowHowMakeSelfEvaluation(false);
        }}
      />
    </WrapperContainer>
  );
};

const CategorieMenu = ({
  title,
  description,
  onBoardingPress,
  onPress,
  image,
  callToAction,
  disabled,
  disabledContainer,
}) => {
  // disabled = __DEV__ ? false : disabled;
  return (
    <>
      <TouchableOpacity
        disabled={disabledContainer}
        onPress={disabled ? onBoardingPress : onPress}
        className="border border-[#E8E8EA] rounded-md flex flex-row my-1 p-2">
        <Image source={image} />
        <View className="px-2 py-1">
          {disabled ? (
            <TitleDisabledContainer>
              <H3 bold color="#4030A5">
                {title}
              </H3>
              <Lock color={'#000'} size={16} />
            </TitleDisabledContainer>
          ) : (
            <TitleContainer>
              <H3 bold color="#4030A5">
                {title}
              </H3>
              {!!callToAction.includes('résultat') && (
                <ValidateBg>
                  <ValidateIcon fill="#fff" size={20} />
                </ValidateBg>
              )}
            </TitleContainer>
          )}
          <Text className="text-[#4030A5]">{description}</Text>
          {/* <ButtonContainer>
            <ButtonPrimary
              color={callToAction.includes('résultat') ? '#4030a5' : '#de285e'}
              content={callToAction}
              onPress={onPress}
              disabled={disabled}
            />
          </ButtonContainer> */}
        </View>
      </TouchableOpacity>
    </>
  );
};

const CategorieContainer = styled.TouchableOpacity`
  border: 1px solid #79747e;
  border-radius: 12px;
  flex-direction: row;
  margin-vertical: 30px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  justify-content: space-around;
  margin-horizontal: 10px;
  flex: 1;
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

const SubTitle = styled.View``;

const ValidateBg = styled.View`
  background-color: #39cec0;
  border-radius: 20px;
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

export default DefisMenu;
