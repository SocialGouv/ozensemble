import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { setValidatedDays } from '../utils';
import TextStyled from '../../../components/TextStyled';
import ButtonPrimary from '../../../components/ButtonPrimary';
import Element from '../../../components/ElementDayDefi';
import WrapperContainer from '../../../components/WrapperContainer';
import styled from 'styled-components';
import ToggleContent from '../../../components/ToggleContent';
import Danger from '../../../components/illustrations/icons/Danger';
import { defaultPaddingFontScale, screenWidth } from '../../../styles/theme';
import ArrowProsAndCons from '../../../components/ArrowProsAndCons';

const Defi4_Day2 = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.inDefi4) setValidatedDays(route?.params?.day, '@Defi4');
  }, [route?.params, isFocused]);

  return (
    <WrapperContainer
      noPaddingHorizontal
      onPressBackButton={navigation.goBack}
      title="Modération ou abstinence : un choix personnel">
      <PaddingContainer>
        <Element
          content={
            <>
              En <TextStyled bold>l’absence de dépendance physique</TextStyled> à l’alcool, les gens qui consomment plus
              qu’ils ne le désirent ont le <TextStyled bold>choix entre l’abstinence et la modération</TextStyled>. Pour
              eux, aucune des deux options n’est supérieure à l'autre.
            </>
          }
        />

        {/* TODO: add link/navigation to article (not ready yet) */}
        <Element
          Illustration={<Danger />}
          content={
            <>
              Pour en savoir plus, consultez{' '}
              <TextStyled underline color="#4030A5">
                l’article sur la dépendance physique à l’alcool
              </TextStyled>
              . En cas de{' '}
              <TextStyled bold color="#DE285E">
                dépendance physique à l’alcool
              </TextStyled>
              , il est conseillé de <TextStyled bold>consulter sans délai</TextStyled> un{' '}
              <TextStyled color="#4030A5" underline onPress={() => navigation.navigate('CONTACT')}>
                professionnel de santé
              </TextStyled>
              .
            </>
          }
        />

        <Element
          content={
            <>
              Si vous êtes indécis(e), nous avons dressé une liste des principaux{' '}
              <TextStyled bold>avantages et inconvénients</TextStyled> associés à chaque option. Vous pourrez bien sûr
              en trouver d’autres !
            </>
          }
        />
      </PaddingContainer>

      <Dropdown>
        <ToggleContent title="Modération" paddingHorizontal={true}>
          <ProsAndCons
            Pros={
              <>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Permet de continuer à prendre un verre</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Plus facile de se joindre aux buveurs</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Peut être un objectif plus réaliste à court terme</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Permet de continuer d’appécier le goût</TextStyled>
                </BulletPoint>
              </>
            }
            Cons={
              <>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Besoin d’être vigilant (planifier, mesurer, contrôler)</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} L’entourage peut craindre un retour aux anciennes habitudes</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Pourrait déclencher une forte envie de boire</TextStyled>
                </BulletPoint>
              </>
            }
          />
        </ToggleContent>
        <ToggleContent title="Abstinence" paddingHorizontal={true}>
          <ProsAndCons
            Pros={
              <>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Pas de risque pour la santé</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Rassure l’entourage</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Peut être plus facile que de contrôler sa consommation</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Pas besoin de planifier des stratégies pour gérer sa consommation</TextStyled>
                </BulletPoint>
              </>
            }
            Cons={
              <>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Perte du plaisir associé à l’alcool</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Se sentir à part en présence de buveurs</TextStyled>
                </BulletPoint>
                <BulletPoint>
                  <TextStyled>{'\u2022'} Devoir résister à la pression sociale de boire</TextStyled>
                </BulletPoint>
              </>
            }
          />
        </ToggleContent>
      </Dropdown>

      <PaddingContainer>
        <Element
          content={
            <>
              Quel que soit votre objectif,{' '}
              <TextStyled bold>changer ses habitudes de consommation n’est pas facile</TextStyled>.{'\n'}
              Les conséquences agréables de l’alcool sont immédiates alors que les conséquences désagréables sont plus
              éloignées dans le temps. Par exemple, l’acool me relaxe immédiatement mais j’ai mal à la tête le lendemain
              matin. Et généralement, les <TextStyled bold>conséquences immédiates</TextStyled> ont plus d’influence sur
              notre comportement que les <TextStyled bold>conséquences à long terme</TextStyled>.
            </>
          }
        />

        <ButtonPrimaryStyled content="J’ai compris" onPress={() => navigation.navigate('DEFI4_MENU')} />
      </PaddingContainer>
    </WrapperContainer>
  );
};

const ProsAndCons = ({ Pros, Cons }) => (
  <>
    <FullWidthContainer>
      <ArrowContainer>
        <ArrowsTextContainer>
          <ArrowText bold color="#FFF">
            Avantages
          </ArrowText>
          <ArrowText bold color="#FFF">
            Inconvénients
          </ArrowText>
        </ArrowsTextContainer>
        <ArrowProsAndConsStyled />
      </ArrowContainer>

      <HalfScreenBackground color="rgba(129,219,149,0.2)">{Pros}</HalfScreenBackground>
      <HalfScreenBackground color="rgba(222,40,94,0.2)">{Cons}</HalfScreenBackground>
    </FullWidthContainer>
  </>
);

const BulletPoint = styled.View`
  margin: 10px;
`;

const ArrowsTextContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  padding-left: 3%;
  padding-right: 3%;
`;

const ArrowText = styled(TextStyled)`
  flex: 1;
  text-align: center;
  font-size: 17px;
`;

const ArrowContainer = styled.View`
  width: ${screenWidth};
  height: ${screenWidth * 0.12};
  position: absolute;
  top: 0;
`;

const ArrowProsAndConsStyled = styled(ArrowProsAndCons)`
  position: absolute;
  width: 100%;
  align-items: flex-start;

  z-index: -1;
`;

const PaddingContainer = styled.View`
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const FullWidthContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;

const HalfScreenBackground = styled.View`
  padding-top: ${screenWidth * 0.13};
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 15px;
  width: 50%;
  background-color: ${({ color }) => color || '#FFF'};
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 40px;
`;

const Dropdown = styled.View`
  margin-bottom: 40px;
`;

export default Defi4_Day2;
