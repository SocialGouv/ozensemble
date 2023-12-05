import React, { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native';
import {
  BackHandler,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  InteractionManager,
  SafeAreaView,
  ViewBase,
} from 'react-native';
import { selectorFamily, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import GoBackButtonText from '../../components/GoBackButtonText';
import { contextKeysByCategory, contextsCatalogObject, getDisplayName } from './contextsCatalog';
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
import PeopleIcon from '../../components/illustrations/icons/PeopleIcon';
import Clock from '../../components/illustrations/icons/Clock';
import Location from '../../components/illustrations/icons/Location';
import Research from '../../components/illustrations/icons/Research';

const emotions = ['Depressed', 'Sad', 'Neutral', 'Fine', 'Ecstatic'];

const EmotionsList = ({ navigation, route }) => {
  const timestamp = route?.params?.timestamp || new Date();
  const [addEmotionModalTimestamp, setEmotionModalTimestamp] = useState(() => timestamp);
  const [dayNote, setDayNote] = useState('');
  const [context, setContext] = useState([]);
  const [emotion, setEmotion] = useState('');

  const toast = useToast();
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();
  const onValidateEmotions = useCallback(() => {
    navigation.navigate('CONSO_FOLLOW_UP_NAVIGATOR');
    logEvent({
      category: 'CONSO_FOLLOW_UP_NAVIGATOR',
      action: 'CONSO_FOLLOW_UP_NAVIGATOR',
    });
    return true;
  }, [navigation]);

  const renderEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'Depressed':
        return <DepressedEmotion />;
      case 'Sad':
        return <SadEmotion />;
      case 'Neutral':
        return <NeutralEmotion />;
      case 'Fine':
        return <FineEmotion />;
      case 'Ecstatic':
        return <EcstaticEmotion />;

      // Add more cases for different emotions and their respective icons
      default:
        return null; // Return null for cases where there's no specific icon
    }
  };

  return (
    <>
      <Container>
        <ModalContent className="bg-[#EFEFEF]" ref={scrollRef} disableHorizontal>
          <View className="h-2.5 flex-row w-full px-10 mb-6 ">
            <View className="bg-[#4030A5] h-full flex-1 rounded-full mr-4" />
            <View className="bg-[#4030A5] h-full flex-1 rounded-full mr-2" />
          </View>
          <View className="mb-4 py-0.5 mx-7 rounded-xl bg-white sm:px-2 md:px-4 lg:px-20 xl:px-30">
            <Text className="text-[#4030A5] self-center font-bold mt-2">Comment s'est passée votre journée ?</Text>
            <Container className="flex flex-row mb-2 ml-2 mr-0 px-1">
              {emotions.map((selectedEmotion, index) => (
                <TouchableOpacity
                  className={[
                    'bg-white border border-[#E4E4E4] flex-1 rounded-lg px-1 py-1 mr-3 ',
                    emotion.includes(selectedEmotion) ? 'bg-[#4030A5]' : 'bg-white',
                  ].join(' ')}
                  key={index.toString()}
                  onPress={() => {
                    if (selectedEmotion === emotion) {
                      setEmotion('');
                    } else {
                      setEmotion(selectedEmotion);
                    }
                    console.log(emotion);
                  }}>
                  {renderEmotionIcon(selectedEmotion)}
                </TouchableOpacity>
              ))}
            </Container>
          </View>
          <View className="mb-4 py-0.5 mx-7 rounded-xl bg-white sm:px-2 md:px-4 lg:px-20 xl:px-30">
            <Text className="text-[#4030A5] self-center font-bold mt-2">Note du jour</Text>

            <TextInput
              className="bg-white h-40 rounded-lg border border-[#E4E4E4] mr-2 mt-2 mb-2 ml-2 py-4 px-3"
              placeholder="Noter les événements qui sont arrivés ce jour vous aidera par la suite à mieux identifier les situations à risque pour votre consommation"
              multiline={true}
              keyboardType="decimal-pad"
              value={String(dayNote)}
              onChangeText={(value) => setDayNote(value)}
            />
          </View>

          <View className="mb-4 py-0.5 mx-7 rounded-xl bg-white sm:px-2 md:px-4 lg:px-20 xl:px-30">
            <View className="items-center w-full mb-6">
              <Text className="text-[#4030A5] mt-2 font-bold">Contexte de vos consommations</Text>
              <Text className="color-[#ADADAE] mt-1 ">plusieurs choix autorisés</Text>
            </View>
            <View className="py-2 flex flex-col items-start">
              <View className="flex flex-row bg-[#DE285E] rounded-lg items-center ml-2 py-1 px-2 mb-1">
                <View className="mr-1">
                  <PeopleIcon />
                </View>
                <Text className="text-white font-bold">Avec qui ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-lg items-center py-1 px-2">
                {contextKeysByCategory['people'].map((name, index) => (
                  <TouchableOpacity
                    className={[
                      'bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2',
                      context.includes(name) ? 'bg-[#4030A5]' : 'bg-white',
                    ].join(' ')}
                    key={index.toString()}
                    onPress={() => {
                      setContext((prevContext) => {
                        const newContext = [...prevContext];
                        const index = newContext.indexOf(name);
                        if (index !== -1) {
                          newContext.splice(index, 1);
                        } else {
                          newContext.splice(0, 0, name);
                        }
                        console.log('après click', newContext);
                        return newContext;
                      });
                    }}>
                    <Text className={['', context.includes(name) ? 'color-white font-bold' : 'color-black'].join(' ')}>
                      {getDisplayName(name, contextsCatalogObject)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex flex-row bg-[#DE285E] ml-2 rounded-lg items-center py-1 px-2 mt-8 mb-1">
                <View className="mr-1">
                  <Location />
                </View>
                <Text className="text-white font-bold">Où ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-lg items-center py-1 px-2">
                {contextKeysByCategory['places'].map((name, index) => (
                  <TouchableOpacity
                    className={[
                      'bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2',
                      context.includes(name) ? 'bg-[#4030A5]' : 'bg-white',
                    ].join(' ')}
                    key={index.toString()}
                    onPress={() => {
                      setContext((prevContext) => {
                        const newContext = [...prevContext];
                        const index = newContext.indexOf(name);
                        if (index !== -1) {
                          newContext.splice(index, 1);
                        } else {
                          newContext.splice(0, 0, name);
                        }
                        console.log('après click', newContext);
                        return newContext;
                      });
                    }}>
                    <Text className={['', context.includes(name) ? 'color-white font-bold' : 'color-black'].join(' ')}>
                      {getDisplayName(name, contextsCatalogObject)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex flex-row bg-[#DE285E] ml-2 rounded-lg items-center py-1 px-2 mt-8 mb-1">
                <View className="mr-1">
                  <Clock />
                </View>
                <Text className="text-white font-bold">Quand ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-lg items-center py-1 px-2">
                {contextKeysByCategory['events'].map((name, index) => (
                  <TouchableOpacity
                    className={[
                      'bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2',
                      context.includes(name) ? 'bg-[#4030A5]' : 'bg-white',
                    ].join(' ')}
                    key={index.toString()}
                    onPress={() => {
                      setContext((prevContext) => {
                        const newContext = [...prevContext];
                        const index = newContext.indexOf(name);
                        if (index !== -1) {
                          newContext.splice(index, 1);
                        } else {
                          newContext.splice(0, 0, name);
                        }
                        console.log('après click', newContext);
                        return newContext;
                      });
                    }}>
                    <Text className={['', context.includes(name) ? 'color-white font-bold' : 'color-black'].join(' ')}>
                      {getDisplayName(name, contextsCatalogObject)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex flex-row bg-[#DE285E] ml-2 rounded-lg items-center py-1 px-2 mt-8 mb-1">
                <View className="mr-1">
                  <Research />
                </View>
                <Text className="text-white font-bold">Quel(s) besoin(s) a comblé l'alcool ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-lg items-center py-1 px-2">
                {contextKeysByCategory['needs'].map((name, index) => (
                  <TouchableOpacity
                    className={[
                      'bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2',
                      context.includes(name) ? 'bg-[#4030A5]' : 'bg-white',
                    ].join(' ')}
                    key={index.toString()}
                    onPress={() => {
                      setContext((prevContext) => {
                        const newContext = [...prevContext];
                        const index = newContext.indexOf(name);
                        if (index !== -1) {
                          newContext.splice(index, 1);
                        } else {
                          newContext.splice(0, 0, name);
                        }
                        console.log('après click', newContext);
                        return newContext;
                      });
                    }}>
                    <Text className={['', context.includes(name) ? 'color-white font-bold' : 'color-black'].join(' ')}>
                      {getDisplayName(name, contextsCatalogObject)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <MarginBottom />
        </ModalContent>
        <ButtonsContainerSafe>
          <ButtonsContainer>
            <BackButton content="Retour" bold onPress={navigation.goBack} />
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

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props) => (props.flexStart ? 'flex-start' : 'space-around')};
  margin: 0;
  width: 100%;
  padding: ${buttonsPadding}px;
  align-items: center;
`;
const MarginBottom = styled.View`
  height: ${({ small }) => buttonHeight * (small ? 0 : 2) + 2 * buttonsPadding}px;
  flex-shrink: 0;
`;

export default EmotionsList;
