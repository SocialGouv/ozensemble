/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components';
import Background from '../../../components/Background';
import H1 from '../../../components/H1';
import Stars from '../../../components/illustrations/Stars';
import TextStyled from '../../../components/TextStyled';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { setValidatedDays } from '../utils';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import WrapperContainer from '../../../components/WrapperContainer';

const screenWidth = Dimensions.get('window').width;

const Elem = ({ content, bold }) => (
  <ElemContainer>
    <Stars color="#4030a5" style={{ marginRight: 10 }} size={20} />
    <TextStyled bold={bold} style={{ flex: 1 }}>
      {content}
    </TextStyled>
  </ElemContainer>
);

const Br = ({ lines = 1 }) => <TextStyled>{'\n'.repeat(lines)}</TextStyled>;

const Defi1_OnboardingInfo = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="À qui s'adresse ce défi 7 jours ?">
      <Paragraph>
        <Elem
          bold
          content="Oz ensemble a été conçu pour les adultes qui désirent modifier leurs habitudes sans nécessairement viser l'abstinence."
        />
      </Paragraph>
      <Paragraph>
        <ElemContainer>
          <Stars color="#4030a5" style={{ marginRight: 10 }} size={20} />
          <TextStyled style={{ flex: 1 }}>
            Toutefois, si vous êtes dans l'une des situations ci-dessous,{' '}
            <TextStyled bold>
              vous devez prendre conseil auprès de votre médecin ou d'un professionnel Oz Ensemble
            </TextStyled>{' '}
            avant de commencer ce défi 7 jours :
            <Br lines={2} />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled bold color="#de285e" style={{ flex: 1, width: screenWidth * 0.7 }}>
                Vous êtes enceinte
              </TextStyled>
            </View>
            <Br />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled style={{ flex: 1, width: screenWidth * 0.7 }}>
                <TextStyled bold color="#de285e">
                  Vous ressentez des symptômes de sevrage
                </TextStyled>{' '}
                lorsque vous cessez de consommer de l'alcool tel que le besoin de prendre un verre d'alcool le matin,
                tremblements, transpiration excessive, hallucinations, besoin de consommer.
              </TextStyled>
            </View>
            <Br />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled style={{ flex: 1, width: screenWidth * 0.7 }}>
                <TextStyled bold color="#de285e">
                  Vous prenez des médicaments prescrits{' '}
                </TextStyled>
                : l'alcool entre en interaction avec plusieurs médicaments
              </TextStyled>
            </View>
            <Br />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled style={{ flex: 1, width: screenWidth * 0.7 }}>
                Vous prenez des{' '}
                <TextStyled bold color="#de285e">
                  drogues illégales
                </TextStyled>{' '}
                en association avec l'alcool. Ce défi n'a pas été conçu pour les personnes qui consomment des substances
                autres que l'alcool.
              </TextStyled>
            </View>
          </TextStyled>
        </ElemContainer>
      </Paragraph>
      <Paragraph>
        <ElemContainer>
          <Stars color="#4030a5" style={{ marginRight: 10 }} size={20} />
          <TextStyled style={{ flex: 1 }}>
            D'une façon générale, l'option la plus sûre est de{' '}
            <TextStyled bold color="#de285e">
              NE PAS CONSOMMER D'ALCOOL
            </TextStyled>{' '}
            en cas de :
            <Br lines={2} />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled>conduite automobile</TextStyled>
            </View>
            <Br />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled style={{ flex: 1, width: screenWidth * 0.7 }}>
                manipulation d'outils ou de machines (bricolage, etc.)
              </TextStyled>
            </View>
            <Br />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled style={{ flex: 1, width: screenWidth * 0.7 }}>pratique de sports à risque</TextStyled>
            </View>
            <Br />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled style={{ flex: 1, width: screenWidth * 0.7 }}>
                consommation de certains médicaments
              </TextStyled>
            </View>
            <Br />
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TextStyled style={{ marginRight: 10 }}>• </TextStyled>
              <TextStyled style={{ flex: 1, width: screenWidth * 0.7 }}>existence de certaines pathologies</TextStyled>
            </View>
            <Br />
          </TextStyled>
        </ElemContainer>
      </Paragraph>
    </WrapperContainer>
  );
};

const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const TopContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default Defi1_OnboardingInfo;
