import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import H1 from '../../../components/H1';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { setValidatedDays } from '../utils';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ElementDayDefi from '../../../components/ElementDayDefi';

const Defi2_Day6 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <BackButton onPress={navigation.goBack} />
        <TopTitle>
          <H1 color="#4030a5">Savoir dire Non</H1>
        </TopTitle>
        <ElementDayDefi
          content={
            <TextStyled>
              L'un de vos principaux atouts pour relever le défi, c'est de{' '}
              <TextStyled bold>
                vous préparer à dire “non merci” lorsque l'on va vous proposer un verre d'alcool.
              </TextStyled>
              {'\n'}
              Cette capacité à <TextStyled bold>expliquer sa démarche</TextStyled> à quelqu'un qui vous propose un verre
              sans que cela ne vous affecte ou ne vous culpabilise{' '}
              <TextStyled bold>
                s'anticipe.
                {'\n'}
              </TextStyled>
              Il est toujours plus <TextStyled bold>compliqué de répondre “non” sans y être préparé.</TextStyled>
            </TextStyled>
          }
        />
        <ElementDayDefi
          content={
            <TextStyled>
              Si initialement, il peut être commode de piocher dans nos “trucs et astuces”, plus le temps va passer,
              plus vous allez vous sentir confiant(e) dans votre décision de réduction pour{' '}
              <TextStyled bold>invoquer vos raisons plus personnelles.</TextStyled>
            </TextStyled>
          }
        />
        <ElementDayDefi
          content={
            <TextStyled>
              Nos équipes reçoivent des témoignages : “Bien que je n'ai pas bu d'alcool depuis 6 mois… mes amis et ma
              famille ne semblent pas réussir à intégrer que je n'en bois plus. Il continue de m'en proposer au bar, à
              Noël… Mais maintenant je sais répondre : c'est comme la musculation, ça se travaille”.
            </TextStyled>
          }
        />
        <ContainerText>
          <TextStyled>
            Pour aller plus loin, lisez notre article pour savoir :
            <TouchableOpacity onPress={() => navigation.navigate('TO_SAY_NO')}>
              <TextStyled underline color="#4030a5">
                comment dire non, dans la rubrique Santé.
              </TextStyled>
            </TouchableOpacity>
          </TextStyled>
        </ContainerText>
        <ButtonPrimary content="Je peux dire Non" widthSmall onPress={() => navigation.navigate('DEFI2_MENU')} />
      </TopContainer>
    </ScreenBgStyled>
  );
};

const TopContainer = styled.View`
  padding: 0px ${defaultPaddingFontScale()}px 0px;
  margin-bottom: 100px;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ContainerText = styled.View`
  margin-left: 30px;
  margin-bottom: 30px;
`;

export default Defi2_Day6;
