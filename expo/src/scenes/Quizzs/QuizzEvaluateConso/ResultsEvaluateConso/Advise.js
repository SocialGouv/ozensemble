import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import GoBackButton from "../../../../components/GoBackButton";
import Stars from "../../../../components/illustrations/Stars";
import TextStyled from "../../../../components/TextStyled";
import WrapperContainer from "../../../../components/WrapperContainer";

const ToggleContent = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <TitleStyled>
          <TextStyled color="#4030a5" bold>
            {title}
          </TextStyled>
          <GoBackButton onPress={() => setVisible(!visible)} rotate={visible ? "90" : "-90"} />
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
  margin: 15px;
`;

export default ({ navigation }) => {
  return (
    <WrapperContainer
      onPressBackButton={navigation.goBack}
      title="Conseils pour diminuer ma consommation d'alcool">
      <ToggleContent title="Planifier">
        <Elem content="Eviter les personnes et les endroits qui incitent à consommer plus qu'on ne le souhaite" />
        <Elem content="Ne pas conserver d'alcool chez soi lorsqu'on a des difficultés à ne pas boire" />
        <Elem content="Se souvenir qu'une envie de consommer finira toujours par passer" />
        <Elem
          content="Ne pas oublier les raisons pour lesquelles on souhaite changer et se concentrer sur des façons plus saines
              de passer le temps"
        />
      </ToggleContent>
      <ToggleContent title="S'occuper">
        <Elem
          content="Occuper son temps libre avec des passes-temps et des personnes dynamiques qui améliorent notre santé et
              notre bien-être"
        />
        <Elem
          content="Trouver de meilleurs façons d'être à l'aise dans nos activités sociales, de gérer notre humeur et de faire
              face à nos problèmes"
        />
        <Elem content="Participer à une activité qui n'implique aucune consommation d'alcool" />
      </ToggleContent>
      <ToggleContent title="Prendre son temps">
        <Elem
          content="Ne pas consommer plus d'un verre standard par heure et, pour chaque verre d'alcool, boire une boisson non
              alcoolisée"
        />
        <Elem content="Ne pas boire l'estomac vide. Manger quelque chose pour que l'organisme absorbe l'alcool plus lentement" />
        <Elem
          content="Tout en mangeant sainement, ne pas oublier qu'un des effets secondaire de l'alcool est la prise de poids.
              Un seul verre de vin contient plus de 120 calories et une bouteille de bière près de 130"
        />
      </ToggleContent>
      <ToggleContent title='Se préparer à dire "Non merci"'>
        <Elem content={'"Non merci, je conduis."'} />
        <Elem content={'"Non merci, je viens de finir un verre."'} />
        <Elem content={'"Non merci, je suis au régime."'} />
        <Elem content={'"Non merci, j\'ai un examen demain pour lequel je veux être en forme."'} />
        <Elem
          content={
            '"Non merci, j\'ai un match important demain pour lequel je veux être en forme."'
          }
        />
        <Elem content={'"Non merci, j\'ai dit à ma famille que je boirai moins."'} />
        <Elem content={'"Non merci, je fais Dry January."'} />
      </ToggleContent>
    </WrapperContainer>
  );
};

const Elem = ({ content }) => (
  <ElemContainer>
    <Stars color="#4030a5" style={{ marginRight: 10 }} size={20} />
    <TextStyled style={{ flex: 1 }}>{content}</TextStyled>
  </ElemContainer>
);

const ElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
`;
