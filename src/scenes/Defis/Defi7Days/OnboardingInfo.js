import React from 'react';
import styled from 'styled-components';
import H1 from '../../../components/H1';
import TextStyled from '../../../components/TextStyled';
import Background from '../../../components/Background';
import GoBackButton from '../../../components/GoBackButton';
import Stars from '../../../components/Illustrations/Stars';
import { useFocusEffect } from '@react-navigation/native';
import { setValidatedDays } from './Defi7Days';

const Elem = ({ content, bold }) => (
  <ElemContainer>
    <Stars color="#4030a5" style={{ marginRight: 10 }} size={20} />
    <TextStyled bold={bold} style={{ flex: 1 }}>
      {content}
    </TextStyled>
  </ElemContainer>
);
const SubElem = ({ children }) => (
  <SubElemContainer>
    <TextStyled style={{ marginRight: 10 }}>•</TextStyled>
    {children}
  </SubElemContainer>
);

const Br = ({ lines = 1 }) => <TextStyled>{'\n'.repeat(lines)}</TextStyled>;

export default ({ navigation, route }) => {
  useFocusEffect(() => {
    route?.params?.inDefi7Days && setValidatedDays(route?.params?.day);
  });
  return (
    <Background color="#39cec0" withSwiperContainer>
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <GoBackButton onPress={navigation.goBack} />
            <Spacer />
            <H1 color="#4030a5">À qui s'adresse ce défi 7 jours ?</H1>
          </TopTitle>
          <Paragraph>
            <Elem
              bold
              content="Oz ensemble a été conçu pour les adultes qui désirent modifier leurs habitudes sans nécessairement viser l’abstinence."
            />
          </Paragraph>
          <Paragraph>
            <Elem
              content={
                <>
                  Toutefois, si vous êtes dans l’une des situations ci-dessous,{' '}
                  <TextStyled bold>
                    vous devez prendre conseil auprès de votre médecin ou d’un professionnel Oz Ensemble
                  </TextStyled>{' '}
                  avant de commencer ce défi 7 jours :
                  <Br lines={2} />
                  <SubElem>
                    <TextStyled bold color="#de285e">
                      Vous êtes enceinte
                    </TextStyled>
                  </SubElem>
                  <SubElem>
                    <TextStyled>
                      <TextStyled bold color="#de285e">
                        Vous ressentez des symptômes de sevrage
                      </TextStyled>{' '}
                      lorsque vous cessez de consommer de l’alcool tel que le besoin de prendre un verre d’alcool le
                      matin, tremblements, transpiration excessive, hallucinations, besoin de consommer.
                    </TextStyled>
                  </SubElem>
                  <SubElem>
                    <TextStyled>
                      <TextStyled bold color="#de285e">
                        Vous prenez des médicaments prescrits{' '}
                      </TextStyled>
                      : l’alcool entre en interaction avec plusieurs médicaments
                    </TextStyled>
                  </SubElem>
                  <SubElem>
                    <TextStyled>
                      Vous prenez des{' '}
                      <TextStyled bold color="#de285e">
                        drogues illégales
                      </TextStyled>{' '}
                      en association avec l’alcool. Ce défi n’a pas été conçu pour les personnes qui consomment des
                      substances autres que l’alcool.
                    </TextStyled>
                  </SubElem>
                </>
              }
            />
          </Paragraph>
          <Paragraph>
            <Elem
              content={
                <>
                  D’une façon générale, l’option la plus sûre est de{' '}
                  <TextStyled bold color="#de285e">
                    NE PAS CONSOMMER D’ALCOOL
                  </TextStyled>{' '}
                  en cas de :
                  <Br lines={2} />
                  <SubElem>
                    <TextStyled>conduite automobile</TextStyled>
                  </SubElem>
                  <SubElem>
                    <TextStyled>manipulation d'outils ou de machines (bricolage, ect.)</TextStyled>
                  </SubElem>
                  <SubElem>
                    <TextStyled>pratique de sports à risque</TextStyled>
                  </SubElem>
                  <SubElem>
                    <TextStyled>consommation de certains médicaments</TextStyled>
                  </SubElem>
                  <SubElem>
                    <TextStyled>existence de certaines pathologies</TextStyled>
                  </SubElem>
                </>
              }
            />
          </Paragraph>
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;
const SubElemContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const Paragraph = styled.View`
  margin-bottom: 25px;
`;

const TopContainer = styled.View`
  padding: 20px 30px 0px;
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
