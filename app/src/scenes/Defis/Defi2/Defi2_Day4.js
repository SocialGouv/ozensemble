import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import H1 from '../../../components/H1';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { setValidatedDays } from '../utils';
import BackButton from '../../../components/BackButton';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import DraggableFlatListDay4 from './DraggableFlatListDay4';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import DraggableHand from '../../../components/illustrations/DraggableHand';
import { Bold, P } from '../../../components/Articles';

const Defi2_Day4 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <BackButton onPress={navigation.goBack} />
        <TopTitle>
          <H1 color="#4030a5">Hiérachiser mes situations</H1>
        </TopTitle>
        <P>
          Toutes les situations à risque ne sont pas égales :{' '}
          <Bold>classez-les par ordre de motivation à réduire votre consommation.</Bold>
          {'\n'}
          <Bold>Placez les plus motivantes au début</Bold> et les plus difficiles à la fin de la liste.
        </P>
        <DraggableContainer>
          <DraggableHand size={40} />
          <DraggableTextContainer>
            <TextStyled bold>
              Vous pouvez faire glisser les situations pour changer leur ordre en appuyant longtemps sur chacune
            </TextStyled>
          </DraggableTextContainer>
        </DraggableContainer>
        <P bold color="#4030a5">
          Je suis plus motivé(e) à réduire l'alcool :{' '}
        </P>
      </TopContainer>
      <FlatListStyled
        horizontal
        alwaysBounceHorizontal={false}
        noPadding
        data={[]}
        ListEmptyComponent={<DraggableFlatListDay4 />}
      />
      <ButtonContainer>
        <ButtonPrimary
          content="J'ai fini de classer"
          widthSmall
          onPress={() => navigation.navigate(route?.params?.rootRoute)}
        />
      </ButtonContainer>
    </ScreenBgStyled>
  );
};

const FlatListStyled = styled.FlatList`
  flex-grow: 1;
  flex-shrink: 0;
`;

const TopContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 150px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const DraggableContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const DraggableTextContainer = styled.View`
  margin-left: 15px;
  width: 80%;
`;

export default Defi2_Day4;
