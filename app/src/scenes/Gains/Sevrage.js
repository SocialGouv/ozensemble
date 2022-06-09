import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import matomo from '../../services/matomo';
import { defaultPaddingFontScale, screenHeight } from '../../styles/theme';
import { ScreenBgStyled } from '../../components/Styles/ScreenBgStyled';
import BackButton from '../../components/Styles/BackButton';

const Sevrage = ({ navigation }) => {
  return (
    <ScreenBgStyled>
      <Container>
        <BackButton onPress={navigation.goBack} />
        <TopTitle>
          <H1 color="#4030a5">Les signes de sevrages</H1>
        </TopTitle>
        <DescriptionSymptome>
          Le sevrage à l'alcool peut entraîner des complications graves et possiblement mortelles.
        </DescriptionSymptome>
        <DescriptionPink>
          Si vous présentez l'un ou plusieurs des symptômes suivants, consultez sans délai un professionnel de santé.
        </DescriptionPink>
        <Symptome>Tremblements</Symptome>
        <DescriptionSymptome>
          Il s'agit de tremblements involontaires et incontrôlables en particulier des mains, mais aussi parfois de la
          tête et de la langue. Il peut aller de légers tremblements à une trémulation forte.
        </DescriptionSymptome>
        <Symptome>Sueurs</Symptome>
        <DescriptionSymptome>
          Elles apparaissent généralement sous 24h à 48h et se manifestent quelques heures après les dernières
          consommations.
        </DescriptionSymptome>
        <Symptome>Pouls accéléré</Symptome>
        <DescriptionSymptome>
          Normalement la fréquence cardiaque de l'adulte se situe en dessous de 80 battements/minutes au repos.
        </DescriptionSymptome>
        <Symptome>Hyperventillation</Symptome>
        <DescriptionSymptome>
          Votre respiration s'accèlere nettement, même au repos, au delà de 17 cycles/minutes.
        </DescriptionSymptome>
        <Symptome>Forte agitation</Symptome>
        <DescriptionSymptome>
          L'agitation est la manifestation physique et motrice, d'un état d'excitation interne. C'est donc bien une
          tension interne qui se manifeste par le corps.
        </DescriptionSymptome>
      </Container>
      <CTAButtonContainer>
        <ButtonPrimary
          content="J'ai compris et je commence "
          onPress={() => {
            matomo.logGoalFinish();
            navigation.navigate('GAINS_MAIN_VIEW');
          }}
        />
      </CTAButtonContainer>
    </ScreenBgStyled>
  );
};

const TopTitle = styled.View`
  flex-direction: row;
  flex-shrink: 0;
  margin-vertical: 20px;
`;

const CTAButtonContainer = styled.View`
  height: ${screenHeight * 0.22}px;
  align-items: center;
  background-color: #f9f9f9;
  margin-top: 30px;
  flex-shrink: 1;
`;

const Container = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const Symptome = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #4030a5;
  margin-top: 30px;
`;

const DescriptionSymptome = styled.Text`
  font-size: 16px;
  color: #191919;
  margin-top: 10px;
`;

const DescriptionPink = styled.Text`
  font-size: 16px;
  color: #de285e;
  margin-top: 10px;
`;

export default Sevrage;
