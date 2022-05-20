import React from 'react';
import styled from 'styled-components';
import { TopContainer, TopTitle } from '../styles';
import GoBackButtonText from '../../../components/GoBackButtonText';
import Clock from '../../../components/Illustrations/Clock';
import TextStyled from '../../../components/TextStyled';

const TopArticle = ({ navigation, title, timeReading }) => (
  <>
    <BackButton content="< Retour" bold onPress={() => navigation.goBack()} />
    <TopContainer>
      <TopTitle>
        <TextStyled color="#4030a5">{title}</TextStyled>
      </TopTitle>
      <ReadTimeContainer>
        <Clock size={20} />
        <ReadTimeText>
          <TextStyled>Lecture: {timeReading} min </TextStyled>
        </ReadTimeText>
      </ReadTimeContainer>
    </TopContainer>
  </>
);

const BackButton = styled(GoBackButtonText)`
  margin-right: auto;
`;

const ReadTimeContainer = styled.View`
  flex-direction: row;
`;

const ReadTimeText = styled.Text`
  font-size: 10px;
`;

export default TopArticle;
