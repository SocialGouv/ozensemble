import React from "react";
import styled from "styled-components";
import H2 from "../../components/H2";
import WrapperContainer from "../../components/WrapperContainer";
import TextStyled from "../../components/TextStyled";
import { Bold } from "../../components/Articles";

const MentionsLegales = ({ onClose }) => (
  <WrapperContainer
    title="Mentions Légales de la plateforme Oz Ensemble"
    onPressBackButton={onClose}>
    <Spacer size={20} />
    <H2>Édtieur de la Plateforme</H2>
    <Spacer size={30} />
    <P>
      L'application est éditée par la Fabrique numérique des ministères sociaux, située{"\u00A0"}:{" "}
      {"\n\n"}
      Tour Mirabeau{"\n"}
      39-43 quai André-Citroën{"\n"}
      75739 Paris Cedex 15{"\n"}
      France{"\n"}
      {"\n"}
      Téléphone : 01 44 38 36 02
    </P>
    <Spacer size={30} />
    <H2>Directrice de la publication</H2>
    <Spacer size={30} />
    <P>Madame Anne JEANJEAN, Directrice du numérique des ministères sociaux.</P>
    <Spacer size={30} />
    <H2>Hébergement de la Plateforme</H2>
    <Spacer size={30} />
    <P>Cette plateforme est hébergée par{"\u00A0"}:</P>
    <P>
      OVH SAS{"\n"}2 rue Kellermann{"\n"}
      59100 Roubaix{"\n"}
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
