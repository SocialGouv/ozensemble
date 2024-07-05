import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import H2 from '../../../components/H2';
import { P, Spacer } from '../../../components/Articles';
import PiggyBank from '../../../components/illustrations/icons/PiggyBank';
import Weight from '../../../components/illustrations/icons/Weight';
import Skin from '../../../components/illustrations/icons/Skin';
import SchemaAlcoholCalories from '../../../components/illustrations/SchemaAlcoholCalories';

const Defi4_Day3 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi4) setValidatedDays(route?.params?.day, '@Defi4');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Quels bénéfices à changer ?">
      <Element
        content={
          <>
            Nous avons abordé jusqu’à présent la fonction que l’alcool peut remplir pour vous. Il est également
            souhaitable de penser aux{' '}
            <TextStyled bold>
              raisons qui peuvent vous pousser à limiter votre consommation ou à vous abstenir
            </TextStyled>{' '}
            totalement.
          </>
        }
      />

      <Element
        content={<>Vous trouverez ci-dessous quelques exemples de raisons de contrôler sa consommation d’alcool.</>}
      />

      <WhiteBackground>
        <KeyContainer>
          <KeyPNG source={require('../../../assets/illustrations/driving.png')} height={36} />
          <TextContainer>
            <H2 color="#4030A5">Prendre le volant</H2>
            <P>
              « <TextStyled italic>Boire ou conduire, il faut choisir</TextStyled> ».{'\n'}
              Voici l’un des slogans les plus connus des campagnes de lutte contre l’alcool au volant. Et pour cause,
              selon la sécurité routière, l’alcool cause <TextStyled bold>un tiers des accidents mortels</TextStyled>.
            </P>
          </TextContainer>
        </KeyContainer>
        <KeyContainer>
          <KeyPNG source={require('../../../assets/illustrations/cancer.png')} height={48} />
          <TextContainer>
            <H2 color="#4030A5">Réduire mon risque de cancer</H2>
            <P>
              En Europe, l’alcool est responsable de plus de 7% des maladies et décès prématurés. En France, il est à
              l’origine de <TextStyled bold>49 000 décès par an</TextStyled>. Sept cancers ont un lien avéré avec
              l’alcool.
            </P>
          </TextContainer>
        </KeyContainer>
        <KeyContainer>
          <Skin />
          <TextContainer>
            <H2 color="#4030A5">Une peau plus belle</H2>
            <P>
              L’alcool engendre rapidement des signes visibles au niveau de la peau et en particulier du visage :
              cernes, lèvres gonflées, teint chiffonné et rouge, visage bouffi. Ces signes{' '}
              <TextStyled bold>s’atténuent en moins de deux semaines</TextStyled> en cas de réduction de la consommation
              d’alcool.
            </P>
          </TextContainer>
        </KeyContainer>
        <KeyContainer>
          <Weight />
          <TextContainer>
            <H2 color="#4030A5">Perdre du poids</H2>
            <P>
              L'alcool fait <TextStyled bold>grossir</TextStyled>. Il est non seulement inintéressant d'un point de vue
              nutritionnel mais il est en plus <TextStyled bold>calorique</TextStyled>. Un gramme d'alcool représente 7
              kcal, soit 107 kcal pour un verre de vin en moyenne.
            </P>
            <SchemaAlcoholCaloriesStyled />
          </TextContainer>
        </KeyContainer>
        <KeyContainer>
          <PiggyBank />
          <TextContainer>
            <H2 color="#4030A5">Faire des économies</H2>
            <P>
              Arrêter l’alcool est très bon pour la santé de votre corps mais aussi pour celle de votre porte-monnaie !
            </P>
            <TextStyled bold color="#DE285E">
              À vous de trouver les vôtres !
            </TextStyled>
            <Spacer size={20} />
          </TextContainer>
        </KeyContainer>
      </WhiteBackground>

      <ButtonPrimaryStyled content="J’ai trouvé mes raisons" onPress={() => navigation.navigate('DEFI4_MENU')} />
    </WrapperContainer>
  );
};

const KeyPNG = styled.Image`
  width: 35px;
  height: ${(props) => props.height}px;
`;

const SchemaAlcoholCaloriesStyled = styled(SchemaAlcoholCalories)`
  width: 100%;
  margin-bottom: 15px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  flex: 1;
  margin-left: 10px;
`;

const WhiteBackground = styled.View`
  background-color: #fff;
  shadow-offset: 0px 5px;
  shadow-color: #000000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
  padding: 10px;
`;

const KeyContainer = styled.View`
  flex-direction: row;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
  align-self: center;
`;

export default Defi4_Day3;
