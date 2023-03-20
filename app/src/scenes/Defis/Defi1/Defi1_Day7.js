import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import TextStyled from '../../../components/TextStyled';
import { ResultsEvaluateConso } from '../../Quizzs/QuizzEvaluateConso/ResultsEvaluateConso';
import { ResultsLifeQuality } from './Defi1_Day4';
import ResultsMotivations from '../../Quizzs/QuizzMotivations/ResultsMotivations';
import Sources from '../../Quizzs/Sources';
import { setValidatedDays } from '../utils';
import WrapperContainer from '../../../components/WrapperContainer';

const Defi1_Day7 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Le bilan de mon activité 1">
      <ResultsEvaluateConso wrapped={false} hideButtons />
      <ResultsLifeQuality wrapped={false} route={route} />
      <ResultsMotivations wrapped={false} route={route} />
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
          “How to Score and Interpret Single-Item Health Status Measures: A Manual for Users of the SF-8 Health Survey”
          Ware, Kosinski, Dewey & Gandek, 2001.
        </TextStyled>
      </Sources>
    </WrapperContainer>
  );
};

export default Defi1_Day7;
