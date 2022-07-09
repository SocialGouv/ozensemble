import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import GoBackButton from '../../../components/GoBackButton';
import TextStyled from '../../../components/TextStyled';
import Sources from '../../Quizzs/Sources';
import { setValidatedDays } from '../utils';
import { P } from '../../../components/Articles';
import ElementDayDefi from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';

const ToggleContent = ({ children, title }) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        <TitleStyled>
          <P noMarginBottom color="#4030a5" bold>
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
  margin-vertical: 15px;
`;

const Defi1_Day5 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi1) setValidatedDays(route?.params?.day, '@Defi1');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer title="Conseils pour diminuer ma consommation d'alcool" onPressBackButton={navigation.goBack}>
      <ToggleContent title="Planifier">
        <ElementDayDefi content="Eviter les personnes et les endroits qui incitent à consommer plus qu'on ne le souhaite" />
        <ElementDayDefi content="Ne pas conserver d'alcool chez soi lorsqu'on a des difficultés à ne pas boire" />
        <ElementDayDefi content="Se souvenir qu'une envie de consommer finira toujours par passer" />
        <ElementDayDefi
          content="Ne pas oublier les raisons pour lesquelles on souhaite changer et se concentrer sur des façons plus saines
              de passer le temps"
        />
      </ToggleContent>
      <ToggleContent title="S'occuper">
        <ElementDayDefi
          content="Occuper son temps libre avec des passes-temps et des personnes dynamiques qui améliorent notre santé et
              notre bien-être"
        />
        <ElementDayDefi
          content="Trouver de meilleurs façons d'être à l'aise dans nos activités sociales, de gérer notre humeur et de faire
              face à nos problèmes"
        />
        <ElementDayDefi content="Participer à une activité qui n'implique aucune consommation d'alcool" />
      </ToggleContent>
      <ToggleContent title="Prendre son temps">
        <ElementDayDefi
          content="Ne pas consommer plus d'un verre standard par heure et, pour chaque verre d'alcool, boire une boisson non
              alcoolisée"
        />
        <ElementDayDefi content="Ne pas boire l'estomac vide. Manger quelque chose pour que l'organisme absorbe l'alcool plus lentement" />
        <ElementDayDefi
          content="Tout en mangeant sainement, ne pas oublier qu'un des effets secondaire de l'alcool est la prise de poids.
              Un seul verre de vin contient plus de 120 calories et une bouteille de bière près de 130"
        />
      </ToggleContent>
      <ToggleContent title='Se préparer à dire "Non merci"'>
        <ElementDayDefi content={'"Non merci, je conduis."'} />
        <ElementDayDefi content={'"Non merci, je viens de finir un verre."'} />
        <ElementDayDefi content={'"Non merci, je suis au régime."'} />
        <ElementDayDefi content={'"Non merci, j\'ai un examen demain pour lequel je veux être en forme."'} />
        <ElementDayDefi content={'"Non merci, j\'ai un match important demain pour lequel je veux être en forme."'} />
        <ElementDayDefi content={'"Non merci, j\'ai dit à ma famille que je boirai moins."'} />
        <ElementDayDefi content={'"Non merci, je fais Dry January."'} />
      </ToggleContent>
      <Sources>
        <TextStyled>
          Santé publique France,{'\n'}
          <TextStyled
            color="#4030a5"
            onPress={() => {
              Linking.openURL(
                'https://www.santepubliquefrance.fr/les-actualites/2017/avis-d-experts-relatif-a-l-evolution-du-discours-public-en-matiere-de-consommation-d-alcool-en-france-organise-par-sante-publique-france-et-l-insti'
              );
            }}>
            Voir l'article sur santepubliquefrance.fr
          </TextStyled>
        </TextStyled>
      </Sources>
    </WrapperContainer>
  );
};

export default Defi1_Day5;
