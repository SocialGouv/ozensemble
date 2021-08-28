import React from 'react';
import { TouchableWithoutFeedback, Modal, View } from 'react-native';
import styled from 'styled-components';
import TextStyled from '../../../components/TextStyled';
import CheckBox from '@react-native-community/checkbox';
import ButtonPrimary from '../../../components/ButtonPrimary';

import { Paragraph, SectionTitle } from './styles';

export default [
  {
    sectionTitle: 'Mon bien-être',
    sectionItems: [
      { id: '1.1', title: 'Perdre du poids' },
      { id: '1.2', title: 'Mieux dormir' },
      { id: '1.3', title: "Dépenser moins d'argent" },
    ],
  },
  {
    sectionTitle: 'Ma santé',
    sectionItems: [
      { id: '2.1', title: 'Être en meilleure santé' },
      { id: '2.2', title: 'Prévenir les maladies chroniques' },
      { id: '2.3', title: 'Être moins déprimé' },
      {
        id: '2.4',
        title: 'Ne pas trembler',
        alertText:
          'Votre corps peut être devenu dépendant à l’alcool, cela va se manifester par l’apparition de tremblements, d’une sensation de malaise, d’hallucinations visuelles lorsque vous essayer de réduire seul votre consommation.\n\nContactez au plus vite l’équipe Oz Ensemble ou votre professionnel de santé',
      },
      {
        id: '2.5',
        title: 'Je suis enceinte',
        alertText:
          'L’alcool peut entraîner des conséquences graves lorsqu’il est consommé pendant la grossesse : handicaps mentaux et moteurs, malformations.\n\nContactez au plus vite l’équipe Oz Ensemble ou votre professionnel de santé',
      },
    ],
  },
  {
    sectionTitle: 'Mes relations',
    sectionItems: [
      { id: '3.1', title: 'Avoir des relations plus saines' },
      { id: '3.2', title: 'Rassurer mes proches' },
      { id: '3.3', title: 'Être disponible pour mes enfants' },
    ],
  },
  {
    sectionTitle: 'Mes performances',
    sectionItems: [
      { id: '4.1', title: 'Ne plus avoir la gueule de bois' },
      { id: '4.2', title: 'Être plus performant au travail' },
      { id: '4.3', title: 'Être plus performant dans mes études' },
      { id: '4.4', title: 'Être plus performant dans ma vie intime' },
    ],
  },
  {
    sectionTitle: 'Ma sécurité',
    sectionItems: [
      { id: '5.1', title: 'Ne pas me mettre en danger' },
      { id: '5.2', title: 'Ne pas prendre le volant alcoolisé' },
      { id: '5.3', title: "Ne pas regretter ma soirée d'hier" },
    ],
  },
];

export const Section = ({ sectionTitle, sectionItems, onPress, answers, ...props }) => (
  <Paragraph>
    <SectionTitle>{sectionTitle} </SectionTitle>
    {sectionItems.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        title={item.title}
        alertText={item.alertText}
        onPress={() => onPress(item)}
        checked={!!answers.find((a) => a.id === item.id)}
        {...props}
      />
    ))}
  </Paragraph>
);

export const Item = ({ id, title, alertText, onPress, checked = false, disabled = false, navigation }) => (
  <TouchableWithoutFeedback onPress={() => onPress(id)}>
    <View>
      <ItemContainer>
        <CheckBoxContainer>
          <CheckBoxStyled
            // ios style
            onCheckColor="#4030a5"
            onTintColor="#4030a5"
            onFillColor="#4030a511"
            animationDuration={0.2}
            boxType="square"
            lineWidth={1}
            //android style
            tintColors={{ true: '#4030a5', false: '#c4c4c4' }}
            //common props
            disabled={disabled}
            value={checked}
          />
        </CheckBoxContainer>
        <TextStyled>{title}</TextStyled>
      </ItemContainer>
      {checked && alertText ? (
        <AlertContainer>
          <TextStyled color="#1a1a1a">{alertText}</TextStyled>
          <ButtonPrimaryStyled
            small
            content="Échanger avec un conseiller"
            onPress={() => navigation.navigate('CONTACT')}
          />
        </AlertContainer>
      ) : null}
    </View>
  </TouchableWithoutFeedback>
);
const CheckBoxContainer = styled.View`
  padding: 2px;
  height: 20px;
  width: 20px;
  flex-shrink: 0;
  margin-right: 10px;
`;

const CheckBoxStyled = styled(CheckBox)`
  height: 100%;
  width: 100%;
`;

const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 5px;
`;

const AlertContainer = styled.View`
  padding: 15px;
  border-radius: 10px;
  margin: 5px;
  background-color: #de285e11;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 20px;
`;
