/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import ButtonPrimary from '../../../components/ButtonPrimary';
import GoBackButton from '../../../components/GoBackButton';
import TextStyled from '../../../components/TextStyled';
import Sources from '../../Quizzs/Sources';
import { setValidatedDays } from '../utils';
import { P, Spacer } from '../../../components/Articles';
import WrapperContainer from '../../../components/WrapperContainer';

const Defi1_Day3 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer
      onPressBackButton={navigation.goBack}
      title="Avez-vous une dépendance physique à l'alcool qui necessite de consulter un professionel de santé ?">
      <ElemContainer>
        <P style={{ flex: 1 }}>
          Le sevrage à l'alcool peut entrainer des complications graves et possiblement mortelles.{'\n\n'}
          <P bold color="#de285e">
            Si vous présentez l'un ou plusieurs des symptômes suivants, consultez sans délai un professionnel de santé.
          </P>
        </P>
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
        <Elem content="L'agitation est la manifestation physique et motrice, d'un état d'excitation interne. C'est donc bien une tension interne qui se manifeste par le corps." />
      </ToggleContent>
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
          onPress={() => navigation.navigate('CONSO_FOLLOW_UP_NAVIGATOR', { screen: 'CONSO_FOLLOW_UP' })}
        />
      </ButtonContainer>
      <Spacer size={25} />
      <Sources>
        <TextStyled>
          - Mayo-Smith M.F. Pharmacological management of alcohol withdrawal: a meta-analysis and evidence-based
          practice guideline. JAMA 1997 ; 278(2) : 144-51.
        </TextStyled>
        <TextStyled>
          - Moore M., Gray M.G. Delirium tremens: a study of cases at the Boston City Hospital, 1915-1936. NEJM 1939 ;
          220(23) : 953-6.
        </TextStyled>
        <TextStyled>
          -Ferguson J.A., Suelzer C.J., Eckert G.J., et al. Risk factors for delirium tremens development. J Gen Intern
          Med 1996 ; 11(7) : 410-4.
        </TextStyled>
        <TextStyled>
          -Thiercelin N., et al. Facteurs de risque du delirium tremens : revue de la littérature. La Revue de médecine
          interne 2012 : 33 ; 18-22.
        </TextStyled>
      </Sources>
    </WrapperContainer>
  );
};

const Elem = ({ content }) => (
  <ElemContainer>
    <P style={{ flex: 1 }}>{content}</P>
  </ElemContainer>
);

const ToggleContent = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <TitleStyled>
          <P color="#4030a5" noMarginBottom bold>
            {title}
          </P>
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

export default Defi1_Day3;
