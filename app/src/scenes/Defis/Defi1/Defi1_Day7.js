import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components';
import { useIsFocused } from '@react-navigation/native';

import Background from '../../../components/Background';
import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { ResultsEvaluateConso } from '../../Quizzs/QuizzEvaluateConso/ResultsEvaluateConso';
import ResultLifeQuality from '../../Quizzs/QuizzLifeQuality/ResultsLifeQuality';
import ResultsMotivations from '../../Quizzs/QuizzMotivations/ResultsMotivations';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';

import Sources from '../../Quizzs/Sources';
import BackButton from '../../../components/BackButton';
import { setValidatedDays } from '../utils';

const Defi1_Day7 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused]);

  return (
    <Background color="#39cec0" withSwiperContainer>
      <ScreenBgStyled>
        <TopContainer>
          <BackButton onPress={navigation.goBack} />
          <TopTitle>
            <H1 color="#4030a5">Le bilan de mon Défi 7 jours</H1>
          </TopTitle>
          <ResultsEvaluateConso wrapped={false} hideButtons />
          <ResultLifeQuality wrapped={false} />
          <ResultsMotivations wrapped={false} />
          <Sources>
            <TextStyled>
              Santé publique France,{'\n'}
              <TextStyled
                color="#4030a5"
                onPress={() => {
                  Linking.openURL(
                    'https://www.santepubliquefrance.fr/les-actualites/2017/avis-d-experts-relatif-a-l-evolution-du-discours-public-en-matiere-de-consommation-d-alcool-en-france-organise-par-sante-publique-france-et-l-insti'
                  );
                }}>
                Voir l'article sur santepubliquefrance.fr
              </TextStyled>
              {'\n\n'}
              Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
              Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
              Consumption II. Addiction 1993 Jun ; 88(6) : 791-804.
              {'\n\n'}
              “How to Score and Interpret Single-Item Health Status Measures: A Manual for Users of the SF-8 Health
              Survey” Ware, Kosinski, Dewey & Gandek, 2001.
            </TextStyled>
          </Sources>
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const TopContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px 0px;
  padding-bottom: 100px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

export default Defi1_Day7;
