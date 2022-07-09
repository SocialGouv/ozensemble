import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { Spacer } from './../../../components/Articles';
import Clock from '../../../components/illustrations/Clock';
import TextStyled from '../../../components/TextStyled';
import { logEvent } from '../../../services/logEventsWithMatomo';
import BackButton from '../../../components/BackButton';
import Sources from '../../Quizzs/Sources';
import WrapperContainer from '../../../components/WrapperContainer';

const NavigationWrapper = ({ children, title, timeReading, link, link2, textLink2 }) => {
  const navigation = useNavigation();
  const hasScrollToEnd = useRef(false);
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1500; // almost to bottom

  return (
    <WrapperContainer
      onPressBackButton={navigation.goBack}
      title={title}
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
      <ReadTimeContainer>
        <ClockStyled size={20} />
        <TextStyled>Lecture: {timeReading} min </TextStyled>
      </ReadTimeContainer>
      {children}
      <Sources>
        <>
          <TextStyled>
            Dr Talbot Geraldine, médecin Addictologue, médecin responsable Association CaPASSCité{'\n'}
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
              <TextStyled />
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
      </Sources>
      <Spacer size={25} />
      <BackButton content="< Retour" bold onPress={navigation.goBack} bottom />
    </WrapperContainer>
  );
};

const ClockStyled = styled(Clock)`
  margin-right: 10px;
`;

const ReadTimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default NavigationWrapper;
