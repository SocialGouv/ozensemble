import React from 'react';
import { Linking, Text } from 'react-native';
import styled from 'styled-components';
import H2 from '../../components/H2';
import WrapperContainer from '../../components/WrapperContainer';
import TextStyled from '../../components/TextStyled';

const MentionsLegales = ({ onClose }) => (
  <WrapperContainer title="Mentions Légales - Application Oz Ensemble" onPressBackButton={onClose}>
    <Spacer size={50} />
    <H2>Editeur de la plateforme</H2>
    <Spacer size={30} />
    <P>
      La Plateforme est éditée par l’Agence régionale de santé Île-de-France située : {'\n\n'}
      Immeuble Le Curve{'\n'}
      13 Rue du Landy{'\n'}
      93200 Saint-Denis{'\n'}
      Téléphone : 01 44 02 00 00{'\n'}
    </P>
    <P>Association CaPASSCité</P>
    <P>Madame Géraldine TALBOT, Directrice</P>
    <P>70, rue Douy Delcupe</P>
    <P>93100 Montreuil</P>
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
