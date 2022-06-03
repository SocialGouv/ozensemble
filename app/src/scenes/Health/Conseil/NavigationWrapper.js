import React from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import GoBackButtonText from '../../../components/GoBackButtonText';
import { TopContainer, TopTitle, ScreenBgStyled } from '../styles';
import Clock from '../../../components/Illustrations/Clock';
import TextStyled from '../../../components/TextStyled';
import matomo from '../../../services/matomo';

const NavigationWrapper = ({ children, title, timeReading }) => {
  const navigation = useNavigation();
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };
  return (
    <ScreenBgStyled
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          matomo.logScrollToEndArticle(title);
        }
      }}
      scrollEventThrottle={400}>
      <BackButton content="< Retour" bold onPress={() => navigation.goBack()} />
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
          <TextStyled>
            Source: Dr Talbot Geraldine, médecin Addictologue, médecin responsable Association CaPASSCité
          </TextStyled>
        </InformationArticle>
      </TopContainer>
      <BackButton content="< Retour" bold onPress={() => navigation.goBack()} bottom />
    </ScreenBgStyled>
  );
};

const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
  ${(props) => props.bottom && 'margin-bottom: 100px;'}
`;

const ReadTimeContainer = styled.View`
  flex-direction: row;
`;

const InformationArticle = styled.Text`
  font-size: 10px;
`;
export default NavigationWrapper;
