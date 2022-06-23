import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import ElementDayDefi from '../../../components/ElementDayDefi';
import OMSIllustationsManAndWoman from '../../../components/OMSIllustationsManAndWoman';
import WrapperContainer from '../../../components/WrapperContainer';

const Defi2_Day2 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi2) setValidatedDays(route?.params?.day, '@Defi2');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Comprendre les normes">
      <ElementDayDefi
        content={
          <TextStyled>
            Selon l'OMS (Organisation Mondiale de la Santé), l'alcoolodépendance est avérée lorsque la consommation de
            boissons alcoolisées devient <TextStyled bold> prioritaire</TextStyled> par rapport aux autres comportements
            auparavant prédominants chez une personne.{'\n\n'}Le désir de boire de l'alcool devient
            <TextStyled bold> impossible à maîtriser</TextStyled> et doit être assouvi au détriment de toute autre
            considération.
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Il n'y a <TextStyled bold> pas de consommation d'alcool sans risque,</TextStyled> mais des consommations à
            risque plus ou moins élevé (en fonction de la quantité et de la fréquence)
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Chez l'adulte, cette valeur repère est de :{'\n    • '}
            <TextStyled bold>10 verres d'alcool standards par semaine</TextStyled> maximum,{'\n    • '}
            sans dépasser <TextStyled bold>2 verres standards par jour</TextStyled>
            {'\n    • '}et
            <TextStyled bold> pas tous les jours</TextStyled>
          </TextStyled>
        }
      />
      <OMSIllustationsManAndWoman />
      <ElementDayDefi
        content={
          <TextStyled>
            Pour chaque occasion de consommation, essayer : {'\n    • '}de réduire la quantité totale d'alcool bue à
            chaque occasion, {'\n    • '}de boire lentement, en mangeant et en alternant avec de l'eau, {'\n    • '}
            d'éviter les lieux et les activités à risque de consommation excessive d'alcool, {'\n    • '}de s'assurer
            d'être entouré de personnes de confiance et de pouvoir rentrer chez soi en toute sécurité après avoir
            consommé de l'alcool.
          </TextStyled>
        }
      />
      <ElementDayDefi
        content={
          <TextStyled>
            Et ne pas consommer d'alcool dans les situations suivantes : {'\n    • '}pendant toute la durée de la
            grossesse et de l'allaitement de l'enfant, {'\n    • '}pendant l'enfance, l'adolescence et toute la période
            de la croissance, {'\n    • '}en cas de conduite automobile, {'\n    • '}lors de pratique de sports (risque
            de chute, de blessure...), {'\n    • '}en cas de consommation de médicaments, car il existe de nombreuses
            interactions entre l'alcool et les médicaments.
          </TextStyled>
        }
      />
      <ButtonPrimary
        content="Je m'informe sur les normes"
        widthSmall
        onPress={() => navigation.navigate('ALCOHOL_AND_NORMS')}
      />
    </WrapperContainer>
  );
};

export default Defi2_Day2;
