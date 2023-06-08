import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import HeaderQuizzsResult from '../../Defis/HeaderQuizzsResult';
import H3 from '../../../components/H3';
import TextStyled from '../../../components/TextStyled';
import CheckboxLabelled from '../../../components/CheckboxLabelled';
import sections from './sections';
import { screenWidth } from '../../../styles/theme';
import { motivationsQuizzAnswersState } from '../../../recoil/quizzs';
import ButtonPrimary from '../../../components/ButtonPrimary';

const Wrapper = ({ children, wrapped, inMyTests }) => {
  const motivationsQuizzAnswers = useRecoilValue(motivationsQuizzAnswersState);
  if (!wrapped) return <>{children}</>;
  return (
    <FullScreenBackground>
      <HeaderQuizzsResult inMyTests={inMyTests}>
        {!!motivationsQuizzAnswers && <ResultContainer>{children}</ResultContainer>}
      </HeaderQuizzsResult>
    </FullScreenBackground>
  );
};

const ResultsMotivations = ({ wrapped = true, route }) => {
  const motivationsQuizzAnswers = useRecoilValue(motivationsQuizzAnswersState);
  const navigation = useNavigation();
  const inDay7Defis = route?.name === 'DEFI1_DAY_7';
  if (!motivationsQuizzAnswers?.length) return null;

  const inMyTests = route?.params?.rootRoute === 'QUIZZ_MENU';

  return (
    <Wrapper wrapped={wrapped} inMyTests={inMyTests}>
      <ContainerSection>
        <ResultTitle>Vos motivations à changer</ResultTitle>
        {!motivationsQuizzAnswers.length && (
          <TextStyled>
            Vous n'avez pas encore sélectionné de motivations à changer, vous pouvez revenir à ce questionnaire en
            allant dans la rubrique<TextStyled bold>Mes tests</TextStyled> dynamiques
            <TextStyled bold> Activités</TextStyled>.
          </TextStyled>
        )}
        <ItemsContainer>
          {motivationsQuizzAnswers.map((answerKey) => {
            const item = sections
              .find((section) => section.answers.map((a) => a.answerKey).includes(answerKey))
              ?.answers?.find((a) => a.answerKey === answerKey);
            return (
              <CheckboxLabelled
                key={item?.answerKey}
                answerKey={item?.answerKey}
                content={item?.content}
                alertText={item?.alertText}
                checked
                disabled
                result
              />
            );
          })}
        </ItemsContainer>
        <View className="flex flex-row justify-center">
          {inDay7Defis ? (
            <ButtonPrimary
              content="Commencer l'activité 2"
              shadowColor="#201569"
              onPress={() => {
                navigation.navigate('DEFIS_MENU');
              }}
              style={{ marginVertical: 30, flexGrow: 0 }}
            />
          ) : (
            <ButtonPrimary
              content="Retour à l'activité"
              shadowColor="#201569"
              onPress={() => navigation.navigate('DEFI1', { screen: 'DEFI1_MENU' })}
              style={{ marginVertical: 30, flexGrow: 0 }}
            />
          )}
        </View>
      </ContainerSection>
    </Wrapper>
  );
};

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const ResultContainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
  height: 100%;
`;

const ContainerSection = styled.View`
  margin: 5px 0 20px 0;
`;

const ItemsContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ResultTitle = styled(H3)`
  width: 100%;
  flex-shrink: 0;
  font-weight: bold;
  color: #4030a5;
  margin-bottom: 10px;
`;

export default ResultsMotivations;
