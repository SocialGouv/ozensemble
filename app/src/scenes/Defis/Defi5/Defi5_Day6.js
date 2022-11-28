import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import WrapperContainer, { Title } from '../../../components/WrapperContainer';
import ToggleContent from '../../../components/ToggleContent';
import { defaultPaddingFontScale } from '../../../styles/theme';

const Defi5_Day6 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi5) setValidatedDays(route?.params?.day, '@Defi5');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer noPaddingHorizontal onPressBackButton={navigation.goBack} title="Comment me faire aider ?">
      <PaddingContainer>
        <Element
          content={
            <>
              Certaines personnes décident et parviennent à arrêter de boire sans l'aide de professionnels.{' '}
              <TextStyled bold>Toutefois, faire appel à une aide extérieure n'est pas un aveu de faiblesse.</TextStyled>
              {'\n\n'}
              Il est possible d'être accompagné par différents professionnels (médecin, psychologue ou autre
              professionnel de la santé). Il existe aussi des équipes spécialisées en alcoologie et en addictologie.
            </>
          }
        />
        <Element
          content={
            <>
              Une des conditions de la réussite du processus d'aide réside dans le choix de l'intervenant.{' '}
              <TextStyled bold>
                La relation entre le consultant et la personne qui l'accompagne est primordiale.
              </TextStyled>{' '}
              Elle doit être basée sur des principes de confiance, d'empathie et de professionnalisme.
            </>
          }
        />
        <Element
          content={
            <>
              Le professionnel adapte la démarche de soins à la <TextStyled bold> situation de la personne </TextStyled>{' '}
              pour tenir compte du souhait de celle-ci, de son histoire avec l'alcool, de ses vulnérabilités physique et
              psychique, ainsi que de son environnement (plutôt soutenant ou au contraire conflictuel).
              {'\n\n'}
              L'accompagnement peut porter sur les{' '}
              <TextStyled bold> différents domaines de la vie{'\u00A0'}:</TextStyled> la famille, le corps, la vie
              relationnelle, la vie professionnelle, la vie sociale et l'équilibre psychologique. Il s'inscrit dans la
              durée. <TextStyled bold>Persévérance et assiduité </TextStyled> seront souvent nécessaires à la réussite
              de ce projet.
            </>
          }
        />
      </PaddingContainer>
      <Title>Alors vers qui me tourner pour...</Title>

      <Dropdown>
        <ToggleContent title="Une écoute non spécialisée" paddingHorizontal>
          <PaddingContainer>
            <Element
              content={
                <>
                  {'   •  '}Parlez-en à un <TextStyled bold> professionnel de santé de confiance{'\u00A0'}:</TextStyled>{' '}
                  médecin traitant, médecin spécialiste, médecin du travail, pharmacien, infirmière, etc.
                  {'\n\n'}
                  {'   •  '}Des <TextStyled bold> mouvements d'entraide </TextStyled> existent sans doute près de chez
                  vous{'\u00A0'}: réunions, parrains, forum ou autres.
                </>
              }
            />
          </PaddingContainer>
        </ToggleContent>
        <ToggleContent title="Parler à un professionnel à distance" paddingHorizontal={true}>
          <PaddingContainer>
            <Element
              content={
                <>
                  {'   •  '} Échanger avec un{'  '}
                  <TextStyled onPress={() => navigation.navigate('CONTACT')} underline bold color="#4030A5">
                    professionnel d'Oz Ensemble
                  </TextStyled>{' '}
                  anonymement et gratuitement.{'\n\n'}
                  {'   •  '} <TextStyled bold>Alcool Info Service </TextStyled> est un service qui peut répondre
                  anonymement à vos questions et vous aider dans votre réflexion. Il est accessible par téléphone tous
                  les jours de 8h à 2h au{' '}
                  <TextStyled onPress={() => Linking.openURL('tel:+33980980930')} underline color="#4030A5">
                    0 980 980 930
                  </TextStyled>{' '}
                  ou par chat sur le site internet{' '}
                  <TextStyled
                    underline
                    color="#4030A5"
                    onPress={() => Linking.openURL('https://www.alcool-info-service.fr')}>
                    www.alcool-info-service.fr
                  </TextStyled>
                  .
                </>
              }
            />
          </PaddingContainer>
        </ToggleContent>
        <ToggleContent title="Une aide spécialisée" paddingHorizontal={true}>
          <PaddingContainer>
            <Element
              content={
                <>
                  {'   •  '}Des consultations ambulatoires spécialisées en addictologie existent au sein de beaucoup
                  d'hôpitaux. Il s'agit des <TextStyled bold> Consultations Hospitalières en Addictologie </TextStyled>
                  (CHA).
                  {'\n\n'}
                  {'   •  '}Les
                  <TextStyled bold>
                    {' '}
                    Centres de Soins d'Accompagnement et de Prévention en Addictologie{' '}
                  </TextStyled>{' '}
                  (CSAPA) sont des centres de proximités gratuits dévolus à l'addictologie.
                </>
              }
            />
          </PaddingContainer>
        </ToggleContent>
      </Dropdown>

      <PaddingContainer>
        <Element Illustration={<></>} content={<>Bien entendu, il ne s'agit pas d'une liste exhaustive.</>} />
        <ButtonPrimaryStyled content="J'ai compris" onPress={navigation.goBack} />
      </PaddingContainer>
    </WrapperContainer>
  );
};

const PaddingContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

const Dropdown = styled.View`
  margin-bottom: 40px;
`;

export default Defi5_Day6;
