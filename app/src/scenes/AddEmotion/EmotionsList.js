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
import { selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import GoBackButtonText from '../../components/GoBackButtonText';
import Modal from '../../components/Modal';
import { emotionIcon, contextKeysByCategory, contextsCatalogObject, getDisplayName } from './contextsCatalog';
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
import PeopleIcon from '../../components/illustrations/icons/PeopleIcon';
import Clock from '../../components/illustrations/icons/Clock';
import Location from '../../components/illustrations/icons/Location';
import Research from '../../components/illustrations/icons/Research';
import { drinksContextsState } from '../../recoil/contexts';

const EmotionsList = ({ navigation, route, addDrinkModalTimestamp }) => {
  const date = addDrinkModalTimestamp ? dayjs(addDrinkModalTimestamp).format('YYYY-MM-DD') : route?.params?.date;
  if (!date) {
    throw new Error('date is required');
  }
  const isOpenedFromFeed = route?.params?.isOpenedFromFeed;
  const [drinksContexts, setDrinksContexts] = useRecoilState(drinksContextsState);
  const [ownContextModalVisible, setOwnContextModalVisible] = useState(false);
  const drinksContext = drinksContexts[date] ?? {};
  const [note, setNote] = useState(drinksContext.note ?? '');
  const [context, setContext] = useState(drinksContext.context ?? []);
  const [selectedEmotion, setSelectedEmotion] = useState(drinksContext.emotion ?? '');

  const toast = useToast();
  const scrollRef = useRef(null);
  const onValidateEmotions = () => {
    const newContextToSave = {
      note: note,
      context,
      emotion: selectedEmotion,
    };
    const contextChanged = JSON.stringify(drinksContext) !== JSON.stringify(newContextToSave);
    if (!contextChanged) {
      navigation.navigate('TABS');
      return;
    }
    const newDrinksContexts = { ...drinksContexts };
    newDrinksContexts[date] = newContextToSave;
    setDrinksContexts(newDrinksContexts);
    navigation.navigate('TABS');
    logEvent({
      category: 'CONTEXT',
      action: 'VALIDATE_CONTEXT',
      name: newDrinksContexts[date],
      value: newDrinksContexts[date],
    });
    toast.show('Contexte de consommation enregistré');
  };

  return (
    <>
      <Container>
        <ModalContent className="bg-[#EFEFEF]" ref={scrollRef} disableHorizontal>
          {!isOpenedFromFeed && (
            <View className="h-2.5 flex-row w-full px-10 mb-6 ">
              <View className="bg-[#4030A5] h-full flex-1 rounded-full mr-4" />
              <View className="bg-[#4030A5] h-full flex-1 rounded-full mr-2" />
            </View>
          )}
          <View className="mb-4 py-0.5 mx-7 rounded-xl bg-white sm:px-2 md:px-4 lg:px-20 xl:px-30">
            <Text className="text-[#4030A5] self-center font-bold mt-2">Comment s'est passée votre journée ?</Text>
            <Container className="flex flex-row mb-2 ml-2 mr-0 px-1">
              {Object.keys(emotionIcon).map((emotion) => {
                const Emoji = emotionIcon[emotion];
                return (
                  <TouchableOpacity
                    className={[
                      'bg-white border border-[#E4E4E4] flex-1 rounded-lg px-1 py-1 mr-3 ',
                      selectedEmotion === emotion ? 'bg-[#4030A5]' : 'bg-white',
                    ].join(' ')}
                    key={emotion}
                    onPress={() => {
                      if (emotion === selectedEmotion) {
                        setSelectedEmotion('');
                      } else {
                        setSelectedEmotion(emotion);
                      }
                    }}>
                    <Emoji />
                  </TouchableOpacity>
                );
              })}
            </Container>
          </View>
          <View className="mb-4 py-0.5 mx-7 rounded-xl bg-white sm:px-2 md:px-4 lg:px-20 xl:px-30">
            <Text className="text-[#4030A5] self-center font-bold mt-2">Note du jour</Text>

            <TextInput
              className="bg-white h-40 rounded-lg border border-[#E4E4E4] mr-2 mt-2 mb-2 ml-2 py-4 px-3"
              placeholder="Noter les événements qui sont arrivés ce jour vous aidera par la suite à mieux identifier les situations à risque pour votre consommation"
              multiline={true}
              keyboardType="decimal-pad"
              value={String(note)}
              onChangeText={(value) => setNote(value)}
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
                {contextKeysByCategory['people'].map((name) => {
                  return <ContextButton key={name} name={name} context={context} setContext={setContext} />;
                })}
                <OtherButton category={'otherpeople'} />
              </View>
              <View className="flex flex-row bg-[#DE285E] ml-2 rounded-lg items-center py-1 px-2 mt-8 mb-1">
                <View className="mr-1">
                  <Location />
                </View>
                <Text className="text-white font-bold">Où ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-lg items-center py-1 px-2">
                {contextKeysByCategory['places'].map((name) => {
                  return <ContextButton key={name} name={name} context={context} setContext={setContext} />;
                })}
                <OtherButton category={'otherpeople'} />
              </View>
              <View className="flex flex-row bg-[#DE285E] ml-2 rounded-lg items-center py-1 px-2 mt-8 mb-1">
                <View className="mr-1">
                  <Clock />
                </View>
                <Text className="text-white font-bold">Quand ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-lg items-center py-1 px-2">
                {contextKeysByCategory['events'].map((name) => {
                  return <ContextButton key={name} name={name} context={context} setContext={setContext} />;
                })}
                <OtherButton category={'otherpeople'} />
              </View>
              <View className="flex flex-row bg-[#DE285E] ml-2 rounded-lg items-center py-1 px-2 mt-8 mb-1">
                <View className="mr-1">
                  <Research />
                </View>
                <Text className="text-white font-bold">Quel(s) besoin(s) a comblé l'alcool ?</Text>
              </View>
              <View className="flex flex-row flex-wrap rounded-lg items-center py-1 px-2">
                {contextKeysByCategory['needs'].map((name) => {
                  return <ContextButton key={name} name={name} context={context} setContext={setContext} />;
                })}
                <OtherButton category={'otherpeople'} />
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
      <View></View>
    </>
  );
};

const ContextButton = ({ name, context, setContext }) => {
  return (
    <TouchableOpacity
      className={[
        'bg-[#FFFFFF] border border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2',
        context.includes(name) ? 'bg-[#4030A5]' : 'bg-white',
      ].join(' ')}
      onPress={() => {
        setContext((prevContext) => {
          const newContext = [...prevContext];
          const index = newContext.indexOf(name);
          if (index !== -1) {
            newContext.splice(index, 1);
          } else {
            newContext.splice(0, 0, name);
          }
          return newContext;
        });
      }}>
      <Text className={['', context.includes(name) ? 'color-white' : 'color-black'].join(' ')}>
        {getDisplayName(name, contextsCatalogObject)}
      </Text>
    </TouchableOpacity>
  );
};

const OtherButton = ({ category }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onValidate = () => {
    logEvent();
    // send this like NPS
    // category, new value
  };

  return (
    <>
      <TouchableOpacity
        className={'bg-[#FFFFFF] border flex-row border-dashed border-[#E4E4E4] rounded-lg py-2 px-2 mr-2 mb-2'}
        onPress={() => setModalVisible(true)}>
        <View className="bg-gray-200 rounded-2xl items-center mr-1">
          <Text className="color-white"> + </Text>
        </View>
        <Text>autre</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        withBackground
        hideOnTouch
        className="border">
        <View className="bg-white rounded-xl">
          <View className="mb-4 p-2">
            <Text color="#000" className="text-center mb-1 text-xl font-extrabold">
              Nouvelle catégorie ?
            </Text>
            <View className="space-y-2 bg-[#F5F6FA] rounded-lg p-2 mt-4">
              <ButtonPrimary content={'Valider et continuer'} onPress={onValidate} />
            </View>
          </View>
        </View>
      </Modal>
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
