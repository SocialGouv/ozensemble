import { useRecoilValue } from 'recoil';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useIsFocused } from '@react-navigation/native';
import { View, TouchableOpacity, Text } from 'react-native';
import TextStyled from '../../components/TextStyled';
import { defaultPaddingFontScale, screenWidth } from '../../styles/theme';
import OnBoardingModal from '../../components/OnBoardingModal';
import Lock from '../../components/illustrations/Lock';
import { autoEvaluationQuizzResultState } from '../../recoil/quizzs';
import { storage } from '../../services/storage';
import WrapperContainer from '../../components/WrapperContainer';
import ArrowRight from '../../components/ArrowRight';
import AutoEvaluation from '../../components/illustrations/activities/AutoEvaluation';
import Activity1 from '../../components/illustrations/activities/Activity1';
import Activity2 from '../../components/illustrations/activities/Activity2';
import Activity3 from '../../components/illustrations/activities/Activity3';
import Activity4 from '../../components/illustrations/activities/Activity4';
import Activity5 from '../../components/illustrations/activities/Activity5';
import Results from '../../components/illustrations/activities/Results';

const DefisMenu = ({ navigation }) => {
  const autoEvaluationDone = useRecoilValue(autoEvaluationQuizzResultState);
  const autoEvaluationToCompletedDays = autoEvaluationDone ? 7 : 0;
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
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

  return (
    <WrapperContainer title={'Mes activités'}>
      <View className="mb-4">
        <TextStyled lineHeight={18}>
          Chaque activité dure 7 jours et est composée de tests, de quiz et de lectures qui vous aideront à diminuer
          votre consommation et à accroitre votre motivation{'\u00A0'}!
        </TextStyled>
      </View>
      <CategorieMenu
        title={'Auto-évaluation'}
        description={'Détecter mon niveau de risque'}
        onPress={() =>
          navigation.navigate('ONBOARDING_QUIZZ', {
            screen: autoEvaluationDone ? 'QUIZZ_RESULTS' : 'QUIZZ_QUESTIONS',
          })
        }
        image="autoEvaluation"
        onBoardingPress={() => navigation.navigate('ONBOARDING_QUIZZ')}
        nbStepsCompleted={autoEvaluationToCompletedDays}
      />

      <CategorieMenu
        title={'Activité 1'}
        description={'Diminuer ma consommation d’alcool'}
        onPress={() => navigation.navigate('DEFI1')}
        image="Activity1"
        disabled={!autoEvaluationDone}
        onBoardingPress={() => setShowOnboardingModal(true)}
        nbStepsCompleted={defi1Day}
      />
      <CategorieMenu
        title={'Activité 2'}
        description={'Repérer mes situations à risque'}
        onPress={() => {
          navigation.navigate('DEFI2');
        }}
        image="Activity2"
        disabled={!autoEvaluationDone || defi1Day < 7}
        onBoardingPress={() => setShowOnboardingModal(true)}
        nbStepsCompleted={defi2Day}
      />
      <CategorieMenu
        title={'Activité 3'}
        description={"Saisir le rôle de l'alcool dans ma vie"}
        onPress={() => {
          navigation.navigate('DEFI3');
        }}
        image="Activity3"
        disabled={!autoEvaluationDone || defi2Day < 7}
        onBoardingPress={() => setShowOnboardingModal(true)}
        nbStepsCompleted={defi3Day}
      />

      <CategorieMenu
        title={'Activité 4'}
        description={'Me fixer un objectif de consommation'}
        onPress={() => {
          navigation.navigate('DEFI4');
        }}
        image="Activity4"
        disabled={!autoEvaluationDone || defi3Day < 7}
        onBoardingPress={() => setShowOnboardingModal(true)}
        nbStepsCompleted={defi4Day}
      />
      <CategorieMenu
        title={'Activité 5'}
        description={'Faire mon bilan après 4 semaines'}
        onPress={() => {
          navigation.navigate('DEFI5');
        }}
        image="Activity5"
        disabled={!autoEvaluationDone || defi4Day < 7}
        onBoardingPress={() => setShowOnboardingModal(true)}
        nbStepsCompleted={defi5Day}
      />
      <CategorieMenu
        title={'Mes résultats'}
        description={'Retrouver tous mes tests des activités'}
        onPress={() => navigation.navigate('TESTS_DEFIS')}
        image="Results"
        disabled={!autoEvaluationDone}
        disabledContainer={!autoEvaluationDone}
        onBoardingPress={() => setShowOnboardingModal(true)}
      />
      <OnBoardingModal
        title="Activité non disponible"
        description="Vous êtes déjà dans une activité, terminez la avant de pouvoir commencer celle-ci :)"
        visible={showOnboardingModal}
        hide={() => {
          setShowOnboardingModal(false);
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
  disabled,
  disabledContainer,
  nbStepsCompleted,
}) => {
  // disabled = __DEV__ ? false : disabled;
  return (
    <>
      <TouchableOpacity
        disabled={disabledContainer}
        onPress={disabled ? onBoardingPress : onPress}
        className="border border-[#E8E8EA] rounded-xl flex flex-row my-1.5 p-2 items-center justify-around">
        {disabled ? (
          <View className=" flex flex-row items-center opacity-50">
            {image === 'autoEvaluation' && <AutoEvaluation />}
            {image === 'Activity1' && <Activity1 />}
            {image === 'Activity2' && <Activity2 />}
            {image === 'Activity3' && <Activity3 />}
            {image === 'Activity4' && <Activity4 />}
            {image === 'Activity5' && <Activity5 />}
            {image === 'Results' && <Results />}
            <View className="px-3 py-1 basis-3/4">
              <TitleDisabledContainer>
                <Text className="text-[#4030A5] font-bold">{title}</Text>
              </TitleDisabledContainer>
              <Text className="text-[#4030A5] text-xs font-semibold">{description}</Text>
              <View className="rounded-xl bg-[#E8E8EA] h-1.5 flex  mt-3 w-full" />
            </View>
          </View>
        ) : (
          <View className=" flex flex-row items-center">
            {image === 'autoEvaluation' && <AutoEvaluation />}
            {image === 'Activity1' && <Activity1 />}
            {image === 'Activity2' && <Activity2 />}
            {image === 'Activity3' && <Activity3 />}
            {image === 'Activity4' && <Activity4 />}
            {image === 'Activity5' && <Activity5 />}
            {image === 'Results' && <Results />}
            <View className="px-3 py-1 basis-3/4">
              <TitleContainer>
                <Text className="text-[#4030A5] font-bold">{title}</Text>
              </TitleContainer>
              <Text className="text-[#4030A5] text-xs font-semibold">{description}</Text>
              {title !== 'Mes résultats' && (
                <View className="rounded-xl bg-[#E8E8EA] h-1.5 flex  mt-3 w-full">
                  <View
                    className="rounded-xl h-1.5"
                    style={{
                      backgroundColor: '#39CEC1',
                      width: (nbStepsCompleted / 7) * 100 + '%',
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        )}

        <View>{disabled ? <Lock color={'#959595'} size={20} /> : <ArrowRight color={'#4030A5'} size={15} />}</View>
      </TouchableOpacity>
    </>
  );
};

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

export default DefisMenu;
