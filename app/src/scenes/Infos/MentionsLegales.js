import React from 'react';
import { Linking, Text, View } from 'react-native';
import styled from 'styled-components';
import H2 from '../../components/H2';
import WrapperContainer from '../../components/WrapperContainer';
import TextStyled from '../../components/TextStyled';
import { Bold } from '../../components/Articles';

const MentionsLegales = ({ onClose }) => (
  <WrapperContainer title="Mentions Légales - Application Oz Ensemble" onPressBackButton={onClose}>
    <Spacer size={20} />
    <H2>Édtieur de l'application</H2>
    <Spacer size={30} />
    <P>
      L'application est éditée par l’Agence régionale de santé (ARS) Île-de-France située{'\u00A0'}: {'\n\n'}
      Immeuble Le Curve{'\n'}
      13 Rue du Landy{'\n'}
      93200 Saint-Denis{'\n'}
      Téléphone : 01 44 02 00 00
    </P>
    <Spacer size={30} />
    <H2>Directrice de l’application</H2>
    <Spacer size={30} />
    <P>Madame Amélie Verdier, Directrice générale de l’Agence régionale de santé Île-de-France.</P>
    <Spacer size={30} />
    <H2>Hébergement de l’application</H2>
    <Spacer size={30} />
    <P>L'pplication est hébergée par{'\u00A0'}:</P>
    <P>
      OVH SAS{'\n'}2 rue Kellermann{'\n'}
      59100 Roubaix{'\n'}
      France
    </P>
  </WrapperContainer>
);

const P = styled(TextStyled)`
  margin-bottom: 15px;
`;

const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export default MentionsLegales;
