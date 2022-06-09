import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled, { css } from 'styled-components';
import GoBackButton from '../../components/GoBackButton';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';

const Header = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <TopContainer>
      <TopTitleContainer>
        <GoBackButton
          onPress={() =>
            route?.params?.rootRoute ? navigation.navigate(route?.params?.rootRoute) : navigation.goBack()
          }
        />
        <TopTitle>
          <TextStyled color="#4030a5">{route?.params?.title}</TextStyled>
        </TopTitle>
      </TopTitleContainer>
      <SectionTitle color="#de285e">C'est déjà terminé !</SectionTitle>
      <TextParagraph>Merci d'avoir répondu au questionnaire !</TextParagraph>
      {!!route?.params?.inDefi7Days && (
        <>
          <TextParagraph>
            Vos réponses seront intégrées à votre <TextStyled bold>bilan de fin de semaine.</TextStyled>
          </TextParagraph>
          <TextParagraph>
            Vous pourrez retrouver ce questionnaire dans l'onglet <TextStyled bold>Tests</TextStyled> de l'application.
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

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

const TopContainer = styled.View`
  padding: 20px 25px;
`;

const TopTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
`;

const TopTitle = styled(H1)`
  padding: 0 10px;
  margin-top: 10px;
`;
