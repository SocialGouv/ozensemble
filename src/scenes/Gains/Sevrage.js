import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { screenHeight } from '../../styles/theme';

const Sevrage = ({ navigation }) => {
  return (
    <ScreenBgStyled>
      <GoBack onPress={navigation.goBack}>
        <TextStyled bold>{'<'} Retour </TextStyled>
      </GoBack>
      <TopContainer>
        <TopTitle>
          <H1 color="#4030a5">Mes gains</H1>
        </TopTitle>
        <SevrageTitle>
          <H1 color="#000000">Repérez les signes de sevrages</H1>
        </SevrageTitle>
      </TopContainer>
      <TextContainer>
        <DescriptionSymptome>
          Le sevrage à l’alcool peut entraîner des complications graves et possiblement mortelles.
        </DescriptionSymptome>
        <DescriptionPink>
          Si vous présentez l’un ou plusieurs des symptômes suivants, consultez sans délai un professionnel de santé.
        </DescriptionPink>
        <Symptome>Tremblements</Symptome>
        <DescriptionSymptome>
          Il s'agit de tremblements involontaires et incontrôlables en particulier des mains, mais aussi parfois de la
          tête et de la langue. Il peut aller de légers tremblements à une trémulation forte.
        </DescriptionSymptome>
        <Symptome>Sueurs</Symptome>
        <DescriptionSymptome>
          Pouls accéléré Elles apparaissent généralement sous 24h à 48h et se manifestent quelques heures après les
          dernières consommations.
        </DescriptionSymptome>
        <Symptome>Hyperventillation</Symptome>
        <DescriptionSymptome>
          Normalement la fréquence cardiaque de l'adulte se situe en dessous de 80 battements/minutes au repos.
        </DescriptionSymptome>
        <DescriptionSymptome>
          Votre respiration s'accèlere nettement, même au repos, au delà de 17 cycles/minutes.
        </DescriptionSymptome>
        <Symptome>Forte agitation</Symptome>
        <DescriptionSymptome>
          L'agitation est la manifestation physique et motrice, d’un état d’excitation interne. C’est donc bien une
          tension interne qui se manifeste par le corps.
        </DescriptionSymptome>
      </TextContainer>
      <CTAButtonContainer>
        <ButtonPrimary content="J’ai compris et je commence " onPress={() => navigation.navigate('GAINS_MAIN_VIEW')} />
      </CTAButtonContainer>
    </ScreenBgStyled>
  );
};

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
`;

const TopContainer = styled.View`
  padding: 0px 30px 0px;
`;

const TopTitle = styled.View`
  flex-direction: row;
  flex-shrink: 0;
  margin-vertical: 20px;
`;

const SevrageTitle = styled.View`
  align-items: flex-start;
`;

const GoBack = styled.TouchableOpacity`
  padding: 20px 30px 0px;
`;

const CTAButtonContainer = styled.View`
  height: ${screenHeight * 0.22}px;
  align-items: center;
  background-color: #f9f9f9;
  margin-top: 30px;
  flex-shrink: 1;
`;

const TextContainer = styled.View`
  padding-horizontal: 20px;
`;

const Symptome = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #4030a5;
  margin: 20px 10px 10px;
`;

const DescriptionSymptome = styled.Text`
  font-size: 16px;
  color: #191919;
  margin: 0 10px 5px;
`;

const DescriptionPink = styled.Text`
  font-size: 16px;
  color: #de285e;
  margin: 0 10px 5px;
`;

export default Sevrage;
