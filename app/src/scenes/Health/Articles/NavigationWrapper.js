import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { Spacer } from './../../../components/Articles';
import Clock from '../../../components/illustrations/Clock';
import TextStyled from '../../../components/TextStyled';
import { logEvent } from '../../../services/logEventsWithMatomo';
import BackButton from '../../../components/BackButton';
import Sources from '../../Quizzs/Sources';
import WrapperContainer from '../../../components/WrapperContainer';
import { defaultPaddingFontScale } from '../../../styles/theme';
import API from '../../../services/api';
import { storage } from '../../../services/storage';

const NavigationWrapper = ({
  children,
  title,
  timeReading,
  sourcesDrTalbot = true,
  sources,
  link,
  link2,
  textLink2,
  noPaddingHorizontal,
}) => {
  const navigation = useNavigation();
  const hasScrollToEnd = useRef(false);
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1500; // almost to bottom
  const isFocused = useIsFocused();

  useEffect(() => {
    const matomoId = storage.getString('@UserIdv2');
    if (!isFocused) {
      API.post({
        path: '/articles/display',
        body: {
          matomoId: matomoId,
        },
      });
    }
  }, [isFocused]);

  return (
    <WrapperContainer
      noPaddingHorizontal={noPaddingHorizontal}
      onPressBackButton={() => {
        const matomoId = storage.getString('@UserIdv2');
        API.post({
          path: '/articles/display',
          body: {
            matomoId: matomoId,
          },
        });
        navigation.goBack();
      }}
      title={title}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !hasScrollToEnd.current) {
          hasScrollToEnd.current = true;
          logEvent({
            category: 'HEALTH',
            action: 'HEALTH_SCROLL_ARTICLE_TO_BOTTOM',
            name: title,
          });
          const matomoId = storage.getString('@UserIdv2');
          API.post({
            path: '/articles',
            body: {
              matomoId: matomoId,
              articleTitle: title,
            },
          });
        }
      }}
      scrollEventThrottle={400}>
      <ConditionalPaddingContainer noPaddingHorizontal={noPaddingHorizontal}>
        <ReadTimeContainer>
          <ClockStyled size={20} />
          <TextStyled>Lecture: {timeReading} min </TextStyled>
        </ReadTimeContainer>
      </ConditionalPaddingContainer>
      {children}
      <ConditionalPaddingContainer noPaddingHorizontal={noPaddingHorizontal}>
        <Sources>
          <>
            {sourcesDrTalbot && (
              <TextStyled>
                Dr Talbot Geraldine, médecin Addictologue, médecin responsable Association CaPASSCité{'\n'}
              </TextStyled>
            )}

            {sources && (
              <TextStyled>
                {'\n'}
                {sources}
                {'\n'}
              </TextStyled>
            )}
            {Array.isArray(link) ? (
              link.map((l) => (
                <SourcesLink key={l}>
                  <TextStyled
                    color="#4030a5"
                    onPress={() => {
                      Linking.openURL(l);
                    }}>
                    {l}
                  </TextStyled>
                </SourcesLink>
              ))
            ) : (
              <TextStyled
                color="#4030a5"
                onPress={() => {
                  Linking.openURL(link);
                }}>
                {link}
              </TextStyled>
            )}

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
        <BackButton
          content="< Retour"
          bold
          onPress={() => {
            const matomoId = storage.getString('@UserIdv2');
            API.post({
              path: '/articles/display',
              body: {
                matomoId: matomoId,
              },
            });
            navigation.goBack();
          }}
          bottom
        />
      </ConditionalPaddingContainer>
    </WrapperContainer>
  );
};

const ConditionalPaddingContainer = styled.View`
  ${(props) => props.noPaddingHorizontal && `padding-horizontal: ${defaultPaddingFontScale()}px;`}
`;

const ClockStyled = styled(Clock)`
  margin-right: 10px;
`;

const ReadTimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SourcesLink = styled.View`
  margin-bottom: 10px;
`;

export default NavigationWrapper;
