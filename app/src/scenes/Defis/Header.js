import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import BackButton from '../../components/BackButton';

const Header = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <TopContainer>
      <BackButton
        onPress={() => (route?.params?.rootRoute ? navigation.navigate(route?.params?.rootRoute) : navigation.goBack())}
      />
      <TopTitleContainer>
        <TopTitle>
          <TextStyled color="#4030a5">{route?.params?.title}</TextStyled>
        </TopTitle>
      </TopTitleContainer>
      <SectionTitle color="#de285e">C'est déjà terminé !</SectionTitle>
      <TextParagraph>Merci d'avoir répondu au questionnaire !</TextParagraph>
      {!!route?.params?.inDefi1 && (
        <>
          <TextParagraph>
            Vos réponses seront intégrées à votre <TextStyled bold>bilan de fin de semaine.</TextStyled>
          </TextParagraph>
          <TextParagraph>
            Vous pourrez retrouver ce questionnaire dans la rubrique <TextStyled bold>Mes tests</TextStyled> dans
            <TextStyled bold> Défis</TextStyled>.
          </TextParagraph>
        </>
      )}
    </TopContainer>
  );
};
export default Header;

const SectionTitle = styled(TextStyled)`
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
`;

const TextParagraph = styled(TextStyled)`
  margin-bottom: 8px;
  font-size: 13px;
`;

const TopContainer = styled.View`
  padding: 20px 20px;
`;

const TopTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const TopTitle = styled(H1)`
  margin-top: 10px;
`;
