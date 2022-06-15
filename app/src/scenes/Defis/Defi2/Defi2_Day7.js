import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import H1 from '../../../components/H1';
import { defaultPaddingFontScale } from '../../../styles/theme';
import { setValidatedDays } from '../utils';
import { ScreenBgStyled } from '../../../components/ScreenBgStyled';
import BackButton from '../../../components/BackButton';
import TextStyled from '../../../components/TextStyled';
import ElementDayDefi from '../../../components/ElementDayDefi';
import H2 from '../../../components/H2';
import ManAndWomanBust from '../../../components/illustrations/ManAndWomanBust';
import Sources from '../../Quizzs/Sources';

const Defi2_Day7 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <ScreenBgStyled>
      <TopContainer>
        <BackButton onPress={navigation.goBack} />
        <TopTitle>
          <H1 color="#4030a5">Bilan de la semaine</H1>
        </TopTitle>
        <H2 color="#4030a5">Ma situation la plus facile à changer</H2>
        <TextStyled>
          Si vous êtes parvenu à <TextStyled bold>gérer la situation</TextStyled> dans le cadre de ce défi, vous êtes{' '}
          <TextStyled bold>capable de trouver seul(e) des solutions pour faire autrement.</TextStyled>
          {'\n\n'}
          <TextStyled bold>Sinon, vous avez pu mieux identifier quels sont vos points de blocage.</TextStyled>
          {'\n\n'}A tout moment: contactez nos équipes pour recourir à une aide complémentaire, gratuite et anonyme.
        </TextStyled>
        <ElementDayDefi content={<H2 color="#4030a5">Conclusion de ma semaine</H2>} />
        <TextStyled bold>
          Vous n'êtes pas la seule personne à ressentir ces émotions qui impactent sur l'envie de boire !
        </TextStyled>
        <Spacer />
        <TextStyled>
          Chacun réagit différemment à l'alcool. Et les émotions peuvent aussi bien positives que négatives.
        </TextStyled>
        <Spacer />
        <TextStyled>
          L'enquête du <TextStyled bold>British Medical Journal Open</TextStyled> montre que les émotions perçues
          varient en fonction du type d'alcool consommé.
        </TextStyled>
        <Spacer />
        <EmotionsConsommateursContainer>
          <EmotionsConsommateurs
            drinkCategorie="spiritueux"
            emotion1="59% plus confiants"
            emotion2="58% sous tension"
            emotion3="29 % plus aggressifs"
          />
          <Spacer />
          <EmotionsConsommateurs
            drinkCategorie="vin"
            emotion1="53% plus détendus"
            emotion2="60 % fatigués"
            emotion3="17 % tristes"
          />
          <Spacer />
          <TextStyled>
            L'<TextStyled bold>intensité des émotions augmente avec la vitesse et la quantité consommée</TextStyled>, et
            plus particuliérement pour l'agressivité.
          </TextStyled>
          <Spacer />
          <TextStyled>
            Bien évidemment, ces émotions peuvent être affectées par l'humeur du consommateur avant le premier verre.
          </TextStyled>
        </EmotionsConsommateursContainer>
        <Spacer />
        <TextStyled>
          Comme les deux faces d'une même pièce, l'alcool comporte des plaisirs mais aussi des effets négatifs. Alors
          quand vous choissiez de consommer :
          <TextStyled bold>
            {'\n    • '}identifiez votre état émotionnel avant le premier verre,{'\n    • '} choisissez le type de
            boisson,
            {'\n    • '} sachez fixer une limite, {'\n    • '}veillez à boire lentement.
          </TextStyled>
        </TextStyled>
        <Spacer />
        <Sources
          content={
            <TextStyled>
              {'\n    • '}BMJ Open November 22 2017 DOI: 10.1136 bmjopen-2017-016089 {'\n    • '}Le site Améli “L'alcool
              : définition et repères de consommation”
              https://www.ameli.fr/assure/sante/themes/alcool-sante/definition-reperes-consommation {'\n    • '}OMS -
              Organisation mondiale de la Santé
            </TextStyled>
          }
        />
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

const Spacer = styled.View`
  height: 20px;
`;

const EmotionsConsommateursContainer = styled.View`
  background-color: #efefef;
  margin-horizontal: -20px;
  padding: 20px;
`;

const EmotionsConsommateurs = ({ drinkCategorie, emotion1, emotion2, emotion3 }) => (
  <EmotionsContainer>
    <TextStyled>
      Les consommateurs de <TextStyled bold>{drinkCategorie}</TextStyled> ont déclaré être à :
    </TextStyled>
    <ManAndWomanBustsContainer>
      <ManAndWomanBustContainer>
        <ManAndWomanBust size={60} color={'#4030A5'} />
        <ManAndWomanBustText color="#4030A5">{emotion1}</ManAndWomanBustText>
      </ManAndWomanBustContainer>
      <ManAndWomanBustContainer>
        <ManAndWomanBust size={60} />
        <ManAndWomanBustText color="#DE285E">{emotion2}</ManAndWomanBustText>
      </ManAndWomanBustContainer>
      <ManAndWomanBustContainer>
        <ManAndWomanBust size={60} />
        <ManAndWomanBustText color="#DE285E">{emotion3}</ManAndWomanBustText>
      </ManAndWomanBustContainer>
    </ManAndWomanBustsContainer>
  </EmotionsContainer>
);

const EmotionsContainer = styled.View``;

const ManAndWomanBustsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ManAndWomanBustContainer = styled.View`
  width: 33.33%;
  align-items: center;
`;

const ManAndWomanBustText = styled(TextStyled)`
  text-align: center;
`;

export default Defi2_Day7;
