import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import { P, Spacer } from '../../components/Articles';
import WrapperContainer from '../../components/WrapperContainer';
import { defaultPaddingFontScale } from '../../styles/theme';
import ButtonPrimary from '../../components/ButtonPrimary';

const HeaderQuizzsResult = ({ title, description, inMyTests, children, buttonCTA, onPressCTA, noMarginBottom }) => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <WrapperContainer
      title={title ? title : route?.params?.title}
      onPressBackButton={() =>
        route?.params?.rootRoute ? navigation.navigate(route?.params?.rootRoute) : navigation.goBack()
      }
      noPaddingHorizontal
      noMarginBottom={noMarginBottom}>
      <Content>
        <SectionTitle color="#de285e" noMarginBottom>
          C'est déjà terminé !
        </SectionTitle>
        <TextParagraph>{description ? description : "Merci d'avoir répondu au questionnaire !"}</TextParagraph>
      </Content>
      {children}
      <Content>
        {!inMyTests && (
          <TextParagraph>
            Vos réponses seront intégrées à votre <TextStyled bold>bilan de fin de semaine.</TextStyled>
          </TextParagraph>
        )}
        {!inMyTests && (
          <TextParagraph>
            Vous pourrez retrouver ce questionnaire dans la rubrique <TextStyled bold>Mes tests</TextStyled> dans
            <TextStyled bold> Activités</TextStyled>.
          </TextParagraph>
        )}
      </Content>
      <Spacer size={5} />
      {!!buttonCTA && <ButtonPrimary content={buttonCTA} onPress={onPressCTA} widthSmall />}
    </WrapperContainer>
  );
};
export default HeaderQuizzsResult;

const SectionTitle = styled(P)`
  font-weight: bold;
  margin-bottom: 5px;
`;

const TextParagraph = styled(P)`
  margin-bottom: 8px;
`;

const Content = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
  margin-bottom: 20px;
`;
