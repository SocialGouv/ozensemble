import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import styled from "styled-components";
import { setValidatedDays } from "../utils";
import TextStyled from "../../../components/TextStyled";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ElementDayDefi from "../../../components/ElementDayDefi";
import { P, Underlined } from "../../../components/Articles";
import WrapperContainer from "../../../components/WrapperContainer";

const Defi2_Day6 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, "@Defi2");
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer title="Savoir dire Non" onPressBackButton={navigation.goBack}>
      <ElementDayDefi
        content={
          <TextStyled>
            L'un de vos principaux atouts pour relever le défi, c'est de{" "}
            <TextStyled bold>
              vous préparer à dire “non merci” lorsque l'on va vous proposer un verre d'alcool.
            </TextStyled>
            {"\n"}
            Cette capacité à <TextStyled bold>expliquer sa démarche</TextStyled> à quelqu'un qui
            vous propose un verre sans que cela ne vous affecte ou ne vous culpabilise{" "}
            <TextStyled bold>
              s'anticipe.
              {"\n"}
            </TextStyled>
            Il est toujours plus{" "}
            <TextStyled bold>compliqué de répondre “non” sans y être préparé.</TextStyled>
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Si initialement, il peut être commode de piocher dans nos “trucs et astuces”, plus le
            temps va passer, plus vous allez vous sentir confiant(e) dans votre décision de
            réduction pour <TextStyled bold>invoquer vos raisons plus personnelles.</TextStyled>
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Nos équipes reçoivent des témoignages : “Bien que je n'ai pas bu d'alcool depuis 6 mois…
            mes amis et ma famille ne semblent pas réussir à intégrer que je n'en bois plus. Il
            continue de m'en proposer au bar, à Noël… Mais maintenant je sais répondre : c'est comme
            la musculation, ça se travaille”.
          </TextStyled>
        }
      />
      <ContainerText>
        <P>
          Pour aller plus loin, lisez notre article pour savoir&nbsp;:{" "}
          <Underlined onPress={() => navigation.navigate("TO_SAY_NO")} color="#4030a5">
            comment dire non, dans la rubrique Santé.
          </Underlined>
        </P>
      </ContainerText>
      <ButtonPrimary
        content="Je peux dire Non"
        widthSmall
        onPress={() => navigation.navigate("TO_SAY_NO")}
      />
    </WrapperContainer>
  );
};

const ContainerText = styled.View`
  margin-left: 30px;
  margin-bottom: 30px;
`;

export default Defi2_Day6;
