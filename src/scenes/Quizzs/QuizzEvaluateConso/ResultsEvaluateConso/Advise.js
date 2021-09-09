import React from 'react';
import styled from 'styled-components';
import H1 from '../../../../components/H1';
import TextStyled from '../../../../components/TextStyled';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import Background from '../../../../components/Background';
import GoBackButton from '../../../../components/GoBackButton';
import Diagram from '../../../ConsoFollowUp/Diagram';
import { TouchableOpacity, View } from 'react-native';

const ToggleContent = ({ children, title }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <TextStyled>{title}</TextStyled>
      </TouchableOpacity>
      {visible ? <View>{children}</View> : null}
    </View>
  );
};

export default ({ navigation }) => {
  return (
    <Background color="#39cec0" withSwiperContainer>
      {/* <HeaderBackground /> */}
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <GoBackButton onPress={navigation.goBack} />
            <Spacer />
            <H1 color="#4030a5">Conseils pour diminuer ma consommation d’alcool </H1>
          </TopTitle>
          <ToggleContent title="Planifier">
            <TextStyled>
              Eviter les personnes et les endroits qui incitent à consommer plus qu’on ne le souhaite
            </TextStyled>
            <TextStyled>Ne pas conserver d’alcool chez soi lorsqu'on a des difficultés à ne pas boire</TextStyled>
            <TextStyled>Se souvenir qu’une envie de consommer finira toujours par passer</TextStyled>
            <TextStyled>
              Ne pas oublier les raisons pour lesquelles on souhaite changer et se concentrer sur des façons plus saines
              de passer le temps
            </TextStyled>
          </ToggleContent>
          <ToggleContent title="S'occuper">
            <TextStyled>
              Occuper son temps libre avec des passes-temps et des personnes dynamiques qui améliorent notre santé et
              notre bien-être
            </TextStyled>
            <TextStyled>
              Trouver de meilleurs façons d’être à l’aise dans nos activités sociales, de gérer notre humeur et de faire
              face à nos problèmes
            </TextStyled>
            <TextStyled>Participer à une activité qui n’implique aucune consommation d’alcool</TextStyled>
          </ToggleContent>
          <ToggleContent title="Prendre son temps">
            <TextStyled>
              Ne pas consommer plus d’un verre standard par heure et, pour chaque verre d’alcool, boire une boisson non
              alcoolisée{' '}
            </TextStyled>
            <TextStyled>
              Ne pas boire l’estomac vide. Manger quelque chose pour que l’organisme absorbe l’alcool plus lentement
            </TextStyled>
            <TextStyled>
              Tout en mangeant sainement, ne pas oublier qu’un des effets secondaire de l’alcool est la prise de poids.
              Un seul verre de vin contient plus de 120 calories et une bouteille de bière près de 130
            </TextStyled>
          </ToggleContent>
          <ToggleContent title='Se préparer à dire "Non merci"'>
            <TextStyled>"Non merci, je conduis."</TextStyled>
            <TextStyled>"Non merci, je viens de finir un verre."</TextStyled>
            <TextStyled>"Non merci, je suis au régime."</TextStyled>
            <TextStyled>"Non merci, j’ai un examen demain pour lequel je veux être en forme."</TextStyled>
            <TextStyled>"Non merci, j’ai un match important demain pour lequel je veux être en forme."</TextStyled>
            <TextStyled>"Non merci, j’ai dit à ma famille que je boirai moins."</TextStyled>
            <TextStyled>"Non merci, je fais Dry January."</TextStyled>
          </ToggleContent>
        </TopContainer>
      </ScreenBgStyled>
    </Background>
  );
};

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

const AddConsoCTAContainer = styled.View`
  margin-bottom: 100px;
  align-items: center;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 50px;
`;
const IconWrapper = styled.View`
  align-items: center;
`;
const Volume = styled(TextStyled)`
  margin-top: 5px;
`;
const EqualWrapper = styled.View`
  padding: 10px;
  padding-bottom: 50px;
`;
