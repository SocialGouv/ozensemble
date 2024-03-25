import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import H2 from '../../components/H2';
import TextStyled from '../../components/TextStyled';
import { listConseils } from './ListConseil';
import { defaultPaddingFontScale, screenHeight, screenWidth } from '../../styles/theme';
import AppointmentHeart from '../../components/illustrations/AppointmentHeart';
import NetInfo from '@react-native-community/netinfo';
import H1 from '../../components/H1';
import { storage } from '../../services/storage';
import API from '../../services/api';
import ChatBubbles from '../../components/illustrations/Chatbubbles';
import { View, TouchableOpacity, Text } from 'react-native';

import { logEvent } from '../../services/logEventsWithMatomo';
import WrapperContainer from '../../components/WrapperContainer';

const Conseils = ({ navigation }) => {
  const [isWellLocated, setIsWellLocated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let location = storage.getString('isWellLocated');
      if (location === undefined) {
        const matomoId = storage.getString('@UserIdv2');
        const ip = await NetInfo.fetch().then((state) => state.details.ipAddress);
        const response = await API.get({ path: '/user/location', query: { matomoId, ip } });
        if (response && response.isWellLocated) {
          location = true;
        } else {
          location = false;
        }
      }
      storage.set('isWellLocated', location);
      setIsWellLocated(location);
    };

    fetchData();
  }, []);
  return (
    <WrapperContainer title="Santé">
      {isWellLocated && (
        <>
          <H2 color="#4030a5" className="mb-2">
            Parler avec un professionnel
          </H2>
          <H2 color="#000000" className="mb-2">
            Gratuitement et anonymement
          </H2>
          <CategorieContainer
            onPress={() => {
              logEvent({
                category: 'CONTACT',
                action: 'CONTACT_OPEN',
                name: 'HEALTH',
              });
              navigation.navigate('CONTACT');
            }}>
            <IconContainer>
              <AppointmentHeart size={40} />
            </IconContainer>
            <TextContainer>
              <TextStyled> Prendre un RDV</TextStyled>
              <TextStyled> avec Doctolib</TextStyled>
            </TextContainer>
          </CategorieContainer>
        </>
      )}

      <H2 color="#4030a5" className="mb-2">
        Témoignages
      </H2>
      <View className="border border-[#4030A5] bg-white rounded-md shadow-md my-4 py-4 px-3 mb-8">
        <TouchableOpacity
          className="flex-row"
          onPress={() => {
            navigation.navigate('TESTIMONIES');
          }}>
          <ChatBubbles size={40} className="ml-6" />
          <Text className="ml-8">Consulter des{'\n'} témoignages</Text>
        </TouchableOpacity>
      </View>
      <H2 color="#4030a5">Mes articles conseils</H2>
      <ViewConseilsContainer>
        {listConseils.map((conseil, index) => (
          <ConseilContainer
            onPress={() => {
              logEvent({
                category: 'HEALTH',
                action: 'HEALTH_ARTICLE',
                name: conseil.title,
              });
              navigation.navigate(conseil.link);
            }}
            key={index}>
            <ImageStyled source={conseil.img} />
            <TitleConseilContainer>
              <TextStyled> {conseil.title}</TextStyled>
            </TitleConseilContainer>
          </ConseilContainer>
        ))}
        <Space />
      </ViewConseilsContainer>
    </WrapperContainer>
  );
};

const ViewConseilsContainer = styled.View`
  margin-left: -${defaultPaddingFontScale()}px;
  margin-right: -${defaultPaddingFontScale()}px;
  margin-top: 20px;
  padding-left: ${defaultPaddingFontScale()}px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ConseilContainer = styled.TouchableOpacity`
  shadow-color: #000000cc;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.34;
  shadow-radius: 6.27px;
  elevation: 10;
  width: ${screenWidth * 0.4}px;
  border-radius: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const TitleConseilContainer = styled(TextStyled)`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CategorieContainer = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 40px;
  border: 1px solid #4030a5;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  shadow-color: #4030a5;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.09;
  shadow-radius: 2px;
`;

const IconContainer = styled.View`
  width: 30%;
  align-items: center;
`;

const TextContainer = styled.View`
  margin: 20px 0px 20px;
`;

const ImageStyled = styled.Image`
  width: ${screenWidth * 0.4}px;
  height: ${screenHeight * 0.15}px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const Space = styled.View`
  width: 50px;
`;

export default Conseils;
