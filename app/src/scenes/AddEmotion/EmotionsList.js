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
import {
  contextKeysByCategory,
  contextsCatalogObject,
  getDisplayName,
  PEOPLE,
  PLACES,
  EVENTS,
  NEEDS,
} from './contextsCatalog';
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

const EmotionsList = ({ navigation, route }) => {
  const [addEmotionModalTimestamp, setEmotionModalTimestamp] = useState(() => timestamp);
  const [dayNote, setDayNote] = useState('');
  const [context, setContext] = useState([PEOPLE, PLACES, EVENTS, NEEDS]);
  const [emotion, setEmotion] = useState('');
  const emotions = ['Ecstatic', 'Fine', 'Neutral', 'Sad', 'Depressed'];
  const timestamp = route?.params?.timestamp || new Date();
  const toast = useToast();
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();
  const onValidateEmotions = async () => {
    navigation.goBack();
  };

  const renderEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'Ecstatic':
        return <EcstaticEmotion />;
      case 'Fine':
        return <FineEmotion />;
      case 'Neutral':
        return <NeutralEmotion />;
      case 'Sad':
        return <SadEmotion />;
      case 'Depressed':
        return <DepressedEmotion />;
      // Add more cases for different emotions and their respective icons
      default:
        return null; // Return null for cases where there's no specific icon
    }
  };
  const onCancelEmotions = useCallback(() => {
    navigation.replace('CONSOS_LIST');
  }, [navigation]);
  return (
    <>
      <Container>
        <ModalContent style={{ backgroundColor: '#F3F3F6' }} ref={scrollRef} disableHorizontal>
          <SafeAreaView>
            <Container
              className="py-6 px-6"
              style={{ borderRadius: 0, backgroundColor: '#F3F3F6', flexDirection: 'row' }}>
              <View style={{ borderRadius: 10, flex: 1, height: 10, backgroundColor: '#4030A5', marginRight: 5 }} />
              <View style={{ borderRadius: 10, flex: 1, height: 10, backgroundColor: '#4030A5', marginRight: 5 }} />
            </Container>
          </SafeAreaView>

          <SubContainer>
            <TextStyled color="#4030A5" center bold>
              Comment s'est passée votre journée ?
            </TextStyled>
            <Container className="flex flex-row">
              {emotions.map((String, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    if (String === emotion) {
                      setEmotion('');
                    } else {
                      setEmotion(String);
                    }
                    console.log(emotion);
                  }}
                  style={{
                    backgroundColor: emotion === String ? '#4030A5' : 'white',
                    borderRadius: 8,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    padding: 8,
                    marginVertical: 4,
                    marginHorizontal: 3,
                  }}>
                  {renderEmotionIcon(String)}
                </TouchableOpacity>
              ))}
            </Container>
          </SubContainer>
          <SubContainer>
            <TextStyled color="#4030A5" center bold>
              Note du jour
            </TextStyled>
            <TextInput
              style={{
                backgroundColor: '#F3F3F6',
                height: 100,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#DBDBE9',
                color: 'black',
                paddingHorizontal: 16,
                marginTop: 8,
              }}
              placeholder="Noter les événements qui sont arrivés ce jour vous aidera par la suite à mieux identifier les situations à risque pour votre consommation"
              multiline={true}
              keyboardType="decimal-pad"
              value={String(dayNote)}
              onChangeText={(value) => setDayNote(value)}
            />
          </SubContainer>

          <SubContainer>
            <View className="items-center w-full mb-2">
              <TextStyled color="#4030A5" bold>
                Contexte de vos consommations
              </TextStyled>
              <Text className="color-[#ADADAE]">plusieurs choix autorisés</Text>
            </View>
            <View className="py-2 flex flex-col items-start">
              <View className="flex flex-row bg-[#DE285E] rounded-md items-center py-1 px-2">
                <View className="mr-2">
                  <PeopleIcon />
                </View>
                <Text className="text-white font-bold">Avec qui ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-md items-center py-1 px-2">
                {contextKeysByCategory[PEOPLE].map((name, index) => (
                  <TouchableOpacity
                    className="bg-[#FFFFFF] rounded-md py-2 px-2 mr-2 mb-2"
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
                    }}
                    style={{ backgroundColor: context.includes(name) ? '#4030A5' : 'white' }}>
                    <Text style={{ color: context.includes(name) ? 'white' : 'black' }} className="color-[#000000]">
                      {getDisplayName(name, contextsCatalogObject)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex flex-row bg-[#DE285E] rounded-md items-center py-1 px-2">
                <View className="mr-2">
                  <PeopleIcon />
                </View>
                <Text className="text-white font-bold">Où ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-md items-center py-1 px-2">
                {contextKeysByCategory[PLACES].map((name, index) => (
                  <TouchableOpacity
                    className="bg-[#FFFFFF] rounded-md py-2 px-2 mr-2 mb-2"
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
                    }}
                    style={{ backgroundColor: context.includes(name) ? '#4030A5' : 'white' }}>
                    <Text style={{ color: context.includes(name) ? 'white' : 'black' }} className="color-[#000000]">
                      {getDisplayName(name, contextsCatalogObject)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex flex-row bg-[#DE285E] rounded-md items-center py-1 px-2">
                <View className="mr-2">
                  <PeopleIcon />
                </View>
                <Text className="text-white font-bold">Quand ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-md items-center py-1 px-2">
                {contextKeysByCategory[EVENTS].map((name, index) => (
                  <TouchableOpacity
                    className="bg-[#FFFFFF] rounded-md py-2 px-2 mr-2 mb-2"
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
                    }}
                    style={{ backgroundColor: context.includes(name) ? '#4030A5' : 'white' }}>
                    <Text style={{ color: context.includes(name) ? 'white' : 'black' }} className="color-[#000000]">
                      {getDisplayName(name, contextsCatalogObject)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex flex-row bg-[#DE285E] rounded-md items-center py-1 px-2">
                <View className="mr-2">
                  <PeopleIcon />
                </View>
                <Text className="text-white font-bold">Quel(s) besoin(s) a comblé l'alcool ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-md items-center py-1 px-2">
                {contextKeysByCategory[NEEDS].map((name, index) => (
                  <TouchableOpacity
                    className="bg-[#FFFFFF] rounded-md py-2 px-2 mr-2 mb-2"
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
                    }}
                    style={{ backgroundColor: context.includes(name) ? '#4030A5' : 'white' }}>
                    <Text style={{ color: context.includes(name) ? 'white' : 'black' }} className="color-[#000000]">
                      {getDisplayName(name, contextsCatalogObject)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </SubContainer>

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
const SubSubContainer = styled.View`
  margin-bottom: 10px;
  elevation: 5;
  shadow-offset: 0px 5px;
  shadow-color: #efefef;
  shadow-opacity: 0.3;
  shadow-radius: 3.84px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
`;
const SubContainer = styled.View`
  border: #5150a215;
  padding: 10px 5px;
  margin-horizontal: ${defaultPaddingFontScale()}px;
  border-radius: 5px;
  margin-bottom: 10px;
  elevation: 5;
  background-color: #f9f9f9;
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
