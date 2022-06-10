import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { TopContainer, Spacer, Underlined } from './../../../components/Articles';
import Clock from '../../../components/illustrations/Clock';
import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import matomo from '../../../services/matomo';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';

const NavigationWrapper = ({ children, title, timeReading, link }) => {
  const navigation = useNavigation();
  const hasScrollToEnd = useRef(false);
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 300; // almost to bottom

  return (
    <ScreenBgStyled
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !hasScrollToEnd.current) {
          hasScrollToEnd.current = true;
          matomo.logScrollToEndArticle(title);
        }
      }}
      scrollEventThrottle={400}>
      <BackButton content="< Retour" bold onPress={() => navigation.goBack()} marginLeft />
      <TopContainer>
        <TopTitle>
          <TextStyled color="#4030a5">{title}</TextStyled>
        </TopTitle>
        <ReadTimeContainer>
          <Clock size={20} />
          <InformationArticle>
            <TextStyled>Lecture: {timeReading} min </TextStyled>
          </InformationArticle>
        </ReadTimeContainer>
      </TopContainer>
      {children}
      <TopContainer>
        <InformationArticle>
          <Underlined>
            <TextStyled>Sources:{'\n'}</TextStyled>
          </Underlined>
          <TextStyled>
            Dr Talbot Geraldine, médecin Addictologue, médecin responsable Association CaPASSCité{'\n\n'}
          </TextStyled>
          <TextStyled
            color="#4030a5"
            onPress={() => {
              Linking.openURL(link);
            }}>
            {link}
          </TextStyled>
        </InformationArticle>
      </TopContainer>
      <Spacer size={25} />
      <BackButton content="< Retour" bold onPress={navigation.goBack} bottom />
    </ScreenBgStyled>
  );
};

const ReadTimeContainer = styled.View`
  flex-direction: row;
`;

const InformationArticle = styled.Text`
  font-size: 10px;
  display: flex;
`;

const TopTitle = styled(H1)`
  width: 95%;
  flex-shrink: 0;
  margin-top: 0px;
  margin-bottom: 10px;
`;
export default NavigationWrapper;
