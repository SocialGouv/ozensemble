import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import SortableList from 'react-native-sortable-list';
import H1 from '../../../components/H1';
import H2 from '../../../components/H2';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { setValidatedDays } from '../utils';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import { defi2AnswersRiskSituationsState } from '../../../recoil/defis';

const Defi2_Day4 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  const [answersRiskSituations, setAnswersRiskSituations] = useRecoilState(defi2AnswersRiskSituationsState);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <BackButton onPress={navigation.goBack} />
        <TopTitle>
          <H1 color="#4030a5">Hiérachiser mes situations</H1>
        </TopTitle>
        <TextStyled>
          Toutes les situations à risque ne sont pas égales : classez-les par ordre de motivation à réduire votre
          consommation. Placez les plus motivantes au début et les plus difficiles à la fin de la liste.
        </TextStyled>
        <H2 color="#4030a5">Je suis plus motivé(e) à réduire l'alcool : </H2>
        <ButtonPrimary content="J'ai fini de classer" widthSmall onPress={() => navigation.navigate('DEFI2_MENU')} />
      </TopContainer>
    </ScreenBgStyled>
  );
};

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

const ContainerText = styled.View`
  margin-left: 30px;
  margin-bottom: 30px;
`;

export default Defi2_Day4;
