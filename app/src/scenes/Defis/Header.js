import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import BackButton from '../../components/BackButton';
import { P } from '../../components/Articles';

const Header = ({ title, description, inMyTests }) => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <TopContainer>
      <BackButton
        onPress={() => (route?.params?.rootRoute ? navigation.navigate(route?.params?.rootRoute) : navigation.goBack())}
      />
      <TopTitleContainer>
        <TopTitle>
          <TextStyled color="#4030a5">{title ? title : route?.params?.title}</TextStyled>
        </TopTitle>
      </TopTitleContainer>
      <SectionTitle color="#de285e" noMarginBottom>
        C'est déjà terminé !
      </SectionTitle>
      <TextParagraph>{description ? description : "Merci d'avoir répondu au questionnaire !"}</TextParagraph>
      {!inMyTests && (
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

const SectionTitle = styled(P)`
  font-weight: bold;
  margin-bottom: 5px;
`;

const TextParagraph = styled(P)`
  margin-bottom: 8px;
`;

const TopContainer = styled.View`
  padding: 0px 20px;
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
