import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { TopContainer, Spacer } from './../../../components/Articles';
import Clock from '../../../components/illustrations/Clock';
import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import { logEvent } from '../../../services/logEventsWithMatomo';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import Sources from '../../Quizzs/Sources';

const NavigationWrapper = ({ children, title, timeReading, link, link2, textLink2 }) => {
  const navigation = useNavigation();
  const hasScrollToEnd = useRef(false);
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 300; // almost to bottom

  return (
    <ScreenBgStyled
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !hasScrollToEnd.current) {
          hasScrollToEnd.current = true;
          logEvent({
            category: 'HEALTH',
            action: 'HEALTH_SCROLL_ARTICLE_TO_BOTTOM',
            name: title,
          });
        }
      }}
      scrollEventThrottle={400}>
      <BackButton content="< Retour" bold onPress={() => navigation.goBack()} marginLeft />
      <TopContainer>
        <TopTitle>
          <TextStyled color="#4030a5">{title}</TextStyled>
        </TopTitle>
        <ReadTimeContainer>
          <ClockStyled size={20} />
          <TextStyled>Lecture: {timeReading} min </TextStyled>
        </ReadTimeContainer>
      </TopContainer>
      {children}
      <TopContainer>
        <Sources
          content={
            <>
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

              {link2 && (
                <>
                  <TextStyled>{'\n\n'}</TextStyled>
                  <TextStyled
                    color="#4030a5"
                    onPress={() => {
                      Linking.openURL(link2);
                    }}>
                    {textLink2}
                  </TextStyled>
                </>
              )}
            </>
          }
        />
        <Spacer size={25} />
        <BackButton content="< Retour" bold onPress={navigation.goBack} bottom />
      </TopContainer>
      <Spacer size={100} />
    </ScreenBgStyled>
  );
};

const ClockStyled = styled(Clock)`
  margin-right: 10px;
`;

const ReadTimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TopTitle = styled(H1)`
  width: 95%;
  flex-shrink: 0;
  margin-top: 0px;
  margin-bottom: 10px;
`;
export default NavigationWrapper;
