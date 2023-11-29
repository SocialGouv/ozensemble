import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native';
import { BackHandler, Platform, View, Text, TouchableOpacity, TextInput, InteractionManager } from 'react-native';
import { selectorFamily, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import GoBackButtonText from '../../components/GoBackButtonText';
import { contextsCategories, peopleContextsKeys, contextsCatalogObject} from './contextsCatalog';
import { logEvent } from '../../services/logEventsWithMatomo';
import { useToast } from '../../services/toast';
import H2 from '../../components/H2';
import { buttonHeight, defaultPaddingFontScale } from '../../styles/theme';
import DateAndTimePickers from '../AddDrink/DateAndTimePickers';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import dayjs from 'dayjs';
import API from '../../services/api';
import { storage } from '../../services/storage';
import TextStyled from '../../components/TextStyled';
import { capture } from '../../services/sentry';
import DepressedEmotion from '../../components/illustrations/emotion/DepressedEmotion';
import EcstaticEmotion from '../../components/illustrations/emotion/EcstaticEmotion';
import FineEmotion from '../../components/illustrations/emotion/FineEmotion';
import NeutralEmotion from '../../components/illustrations/emotion/NeutralEmotion';
import SadEmotion from '../../components/illustrations/emotion/SadEmotion';

// const initDrinkState = { name: '', volume: '', degrees: '', isNew: true, code: null };


const EmotionsList = ({ navigation, route }) => {
  const [addEmotionModalTimestamp, setEmotionModalTimestamp] = useState(() => timestamp);
  const [dayNote, setDayNote] = useState("");
  const [context, setContext] = useState("");
  const currentPeopleContextsKeys = peopleContextsKeys;
  console.log(currentPeopleContextsKeys);
  const timestamp = route?.params?.timestamp || new Date();
  const toast = useToast();
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();
  const onValidateEmotions = async () => {
    navigation.goBack();
    
  };

  const onCancelEmotions = useCallback(() => {
    navigation.replace('CONSOS_LIST', { timestamp: addEmotionModalTimestamp });
  }, [navigation]);
  return (
    <>
      <Container>
        <ModalContent ref={scrollRef} disableHorizontal>
          <Title>Yo</Title>
          <EmotionContainer>
            <TextStyled bold>Comment s'est passée votre journée ?</TextStyled>
            <TouchableOpacity>
              <View><EcstaticEmotion/>
              </View>
              </TouchableOpacity>
            </EmotionContainer>
            <DayNoteContainer>
            <TextStyled bold>Note du jour</TextStyled>
            <TextInput
              className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
              placeholder="Noter les événements qui sont arrivés ce jour vous aidera par la suite à mieux identifier les situations à risque pour votre consommation"
              keyboardType="decimal-pad"
              value={String(dayNote)}
              onChangeText={(value) => setDayNote(value)}
            />
            </DayNoteContainer>
        <ContextCategoryContainer>
        <TextStyled bold>Contexte de vos consommations</TextStyled>
        {currentPeopleContextsKeys.map((name) => (
            <TouchableOpacity
            onPress={() => {
              setContext(name);
            }}>
            <Text className="text-[#4030A5] text-center underline text-base mt-2">
              {name}
            </Text>
          </TouchableOpacity>
          ))}
        <ButtonsContainer>
        </ButtonsContainer>
        </ContextCategoryContainer>
        
          
          <MarginBottom />
        </ModalContent>
        <ButtonsContainerSafe>
          <ButtonsContainer>
            <BackButton content="Retour" bold onPress={onCancelEmotions} />
            <ButtonPrimary content="Valider" onPress={onValidateEmotions} />
          </ButtonsContainer>
        </ButtonsContainerSafe>
      </Container>
    </>
  );
};

const BackButton = styled(GoBackButtonText)`
  margin-right: 0;
`;

const Container = styled.View`
  background-color: #f9f9f9;
  flex: 1;
  padding-top: 20px;
`;

const ModalContent = styled.ScrollView`
  width: 100%;
  background-color: #f9f9f9;
`;

const Title = styled(H2)`
  font-weight: ${Platform.OS === 'android' ? 'bold' : '800'};
  color: #4030a5;
  margin: 50px ${defaultPaddingFontScale()}px 15px;
`;

const buttonsPadding = 10;

const ButtonsContainerSafe = styled.SafeAreaView`
  position: absolute;
  margin: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  border-top-color: #eee;
  border-top-width: 1px;
`;
const ContextCategoryContainer = styled.View`
  border: #5150a215;
  padding: 10px 5px;
  margin-horizontal: ${defaultPaddingFontScale()}px;
  border-radius: 5px;
  margin-bottom: 10px;
  elevation: 5;
  shadow-offset: 0px 5px;
  shadow-color: #efefef;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
`;
const EmotionContainer = styled.View`
  border: #5150a215;
  padding: 10px 5px;
  margin-horizontal: ${defaultPaddingFontScale()}px;
  border-radius: 5px;
  margin-bottom: 10px;
  elevation: 5;
`;
const DayNoteContainer = styled.View`
  border: #5150a215;
  padding: 10px 5px;
  margin-horizontal: ${defaultPaddingFontScale()}px;
  border-radius: 5px;
  margin-bottom: 10px;
  elevation: 5;
  shadow-offset: 0px 5px;
  shadow-color: #efefef;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props) => (props.flexStart ? 'flex-start' : 'space-around')};
  margin: 0;
  width: 100%;
  padding: ${buttonsPadding}px;
  align-items: center;
`;
const ContextButton = styled.TouchableOpacity`
  ${(props) => props.disabled && 'opacity: 0;'}/* border: 1px solid black; */
`;
const MarginBottom = styled.View`
  height: ${({ small }) => buttonHeight * (small ? 0 : 2) + 2 * buttonsPadding}px;
  flex-shrink: 0;
`;

export default EmotionsList;
