/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Background from '../../../components/Background';
import ButtonPrimary from '../../../components/ButtonPrimary';
import GoBackButton from '../../../components/GoBackButton';
import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import Sources from '../../Quizzs/Sources';
import { setValidatedDays } from './utils';

const ToggleContent = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <TitleStyled>
          <TextStyled color="#4030a5" bold>
            {title}
          </TextStyled>
          <GoBackButton onPress={() => setVisible(!visible)} rotate={visible ? '90' : '-90'} />
        </TitleStyled>
      </TouchableOpacity>
      {visible ? <View>{children}</View> : null}
    </View>
  );
};

const TitleStyled = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Day3 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi7Days) setValidatedDays(route?.params?.day);
  }, [route?.params, isFocused]);

  return (
    <Background color="#39cec0" withSwiperContainer>
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <GoBackButton onPress={navigation.goBack} />
            <Spacer />
            <H1 color="#4030a5">
              Avez-vous une dépendance physique à l’alcool qui necessite de consulter un professionel de santé ?
            </H1>
          </TopTitle>
          <ElemContainer>
            <TextStyled style={{ flex: 1 }}>
              Le sevrage à l’alcool peut entrainer des complications graves et possiblement mortelles.{'\n\n'}
              <TextStyled bold color="#de285e">
                Si vous présentez l’un ou plusieurs des symptômes suivants, consultez sans délai un professionnel de
                santé.
              </TextStyled>
            </TextStyled>
          </ElemContainer>
          <ToggleContent title="Tremblements">
            <Elem content="Il s'agit de tremblements involontaires et incontrôlables en particulier des mains, mais aussi parfois de la tête et de la langue. Il peut aller de légers tremblements à une trémulation forte." />
          </ToggleContent>
          <ToggleContent title="Sueurs">
            <Elem content="Elles apparaissent généralement sous 24h à 48h et se manifestent quelques heures après les dernières consommations." />
          </ToggleContent>
          <ToggleContent title="Pouls accéléré">
            <Elem content="Normalement la fréquence cardiaque de l'adulte se situe en dessous de 80 battements/minutes au repos." />
          </ToggleContent>
          <ToggleContent title="Hyperventillation">
            <Elem content="Votre respiration s'accèlere nettement, même au repos, au delà de 17 cycles/minutes." />
          </ToggleContent>
          <ToggleContent title="Forte agitation">
            <Elem content="L'agitation est la manifestation physique et motrice, d’un état d’excitation interne. C’est donc bien une tension interne qui se manifeste par le corps." />
          </ToggleContent>
          <>
            <ButtonContainer>
              <ButtonPrimary
                content="Échanger avec un conseiller"
                onPress={() => navigation.navigate('CONTACT')}
                style={{ marginVertical: 30 }}
              />
              <Button
                small
                content="Retour au suivi"
                shadowColor="#201569"
                color="#4030A5"
                onPress={() => navigation.navigate('CONSO_FOLLOW_UP')}
              />
            </ButtonContainer>
          </>
          <Sources
            content={
              <TextStyled>
                -Mayo-Smith M.F. Pharmacological management of alcohol withdrawal: a meta-analysis and evidence-based
                practice guideline. JAMA 1997 ; 278(2) : 144-51.{'\n'}-Moore M., Gray M.G. Delirium tremens: a study of
                cases at the Boston City Hospital, 1915-1936. NEJM 1939 ; 220(23) : 953-6.{'\n'}-Ferguson J.A., Suelzer
                C.J., Eckert G.J., et al. Risk factors for delirium tremens development. J Gen Intern Med 1996 ; 11(7) :
                410-4.{'\n'}-Thiercelin N., et al. Facteurs de risque du delirium tremens : revue de la littérature. La
                Revue de médecine interne 2012 : 33 ; 18-22.
              </TextStyled>
            }
          />
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const Elem = ({ content }) => (
  <ElemContainer>
    <TextStyled style={{ flex: 1 }}>{content}</TextStyled>
  </ElemContainer>
);

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const TopContainer = styled.View`
  padding: 20px 30px 0px;
  padding-bottom: 100px;
`;

const Spacer = styled.View`
  width: 5%;
`;

const TopTitle = styled.View`
  width: 95%;
  flex-direction: row;
  flex-shrink: 0;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;
const Button = styled(ButtonPrimary)`
  flex-grow: 0;
`;
const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export default Day3;
