import React from 'react';
import TextStyled from '../../../components/TextStyled';
import { ScreenBgStyled, TopContainer, TopTitle, Paragraph } from './styles';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Background from '../../../components/Background';
import GoBackButton from '../../../components/GoBackButton';

const ContactForm = ({ navigation }) => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      {/* <HeaderBackground /> */}
      <ScreenBgStyled>
        <GoBackButton onPress={navigation.goBack()} />
        <TopContainer>
          <TopTitle>
            <TextStyled color="#4030a5">Comment compter sa consommation d'alcool ?</TextStyled>
          </TopTitle>
          <Paragraph>
            <TextStyled>
              Un agenda de consommation est à votre disposition dans l’onglet Suivi. Vous pouvez saisir une consommation
              depuis l’agenda ou en appyant sur le bouton “+”
            </TextStyled>
          </Paragraph>
          <Paragraph>
            <TextStyled>
              Quand vous saisissez une consommation d’alcool, celle-ci est automatiquement comptabilisée en unité
              d’alcool.{'\n\n'}A titre indicatif chaque consommation ci-dessous compte pour une unité d’alcool.
            </TextStyled>
          </Paragraph>
          {/* todo doses */}
          <Paragraph>
            <TextStyled>
              Si vous ne trouvez pas votre boisson dans les choix de base, vous pouvez en paramétrer une. Vous pouvez
              aussi scanner l’étiquette de la bouteille.
            </TextStyled>
          </Paragraph>
          <Paragraph>
            <TextStyled>
              Nous vous conseillons de noter vos consommation au fure et à mesure de la journée sans attendre le
              lendemain !
            </TextStyled>
          </Paragraph>
          <Paragraph>
            <TextStyled>
              Un graphique vous permet de suivre vos consommation en unité d’alcool consommées sur une journée. {'\n\n'}
              La ligne verte représente le seuil de l’OMS. Elle est à 2 verres par jour pour une femme et 3 verres par
              jour pour un homme.
            </TextStyled>
          </Paragraph>
          {/* todo example graph */}
          <Paragraph>
            <TextStyled>
              Retrouvez le détail de vos consommations dans le fil du journal de l’onglet suivi. Vous pouvez les
              modifier ou les compléter pour les jours précédents.
            </TextStyled>
          </Paragraph>
        </TopContainer>
        <ButtonPrimary
          onPress={() => navigation.push('ADD_DRINK', { timestamp: Date.now() })}
          content="Ajouter une consommation"
        />
      </ScreenBgStyled>
    </Background>
  );
};

export default ContactForm;
