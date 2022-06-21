import React from 'react';
import styled from 'styled-components';
import Background from '../../../components/Background';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import Equality from '../../../components/illustrations/Equality';
import HotDog from '../../../components/illustrations/drinksAndFood/HotDog';
import PinaColada from '../../../components/illustrations/drinksAndFood/PinaColada';
import CiderBottle from '../../../components/illustrations/drinksAndFood/CiderBottle';
import SpagettiPlate from '../../../components/illustrations/drinksAndFood/SpagettiPlate';
import Shoot from '../../../components/illustrations/drinksAndFood/Shoot';
import Banasplit from '../../../components/illustrations/drinksAndFood/Banasplit';
import Esquimau from '../../../components/illustrations/drinksAndFood/Esquimau';
import Glace from '../../../components/illustrations/drinksAndFood/Glace';
import Mojito from '../../../components/illustrations/drinksAndFood/Mojito';

const AlcoholAndCalories = () => {
  const title = "L'alcool et les calories";

  return (
    <Background color="#39cec0" withSwiperContainer>
      <NavigationWrapper
        title={title}
        timeReading={2}
        link={'https://www.rsph.org.uk/our-work/policy/drugs/alcohol-calorie-labelling-.html '}>
        <TopContainer>
          <H2 color={'#4030a5'}>Beaucoup de personnes ignorent que l'alcool fait grossir</H2>
          <Spacer size={20} />
          <P>
            Les études montrent que l'alcool est une boisson très calorique et sa consommation peut provoquer une
            <Bold> prise de poids</Bold>.
          </P>
          <P>
            De nombreuses études révèlent que l'alcool représente en moyenne entre 4 et 6% des apports énergétiques des
            régimes alimentaires occidentaux.
          </P>
          <P>Pour autant, cette valeur énergétique n'apparaît pas sur les bouteilles d'alcool.</P>
          <Spacer size={20} />
          <H2 color={'#4030a5'}>L'alcool diminue l'élimination de graisse</H2>
          <Spacer size={20} />
          <P>
            L'alcool diminue l'élimination des graisses car les calories apportées par l'alcool sont brûlées très
            rapidement avant celles des graisses.{'\n'}La consommation d'alcool favorise ainsi
            <Bold> l'accumulation des graisses</Bold>, essentiellement au niveau abdominal, situation fréquente chez les
            grands consommateurs de bière.
          </P>
          <P bold>
            L'alcool stimule l'appétit en induisant une hypoglycémie: plus on boit d'alcool et plus on ressent des
            fringales !
          </P>
          <P>
            A titre indicatif, voici 4 équivalences alcool / nourriture pour mieux se rendre compte de la teneur en
            sucre des boissons alcoolisées :
          </P>
          <Correspondance
            text1="2 piña colada de 20"
            text2="4 hot-dogs de 140g "
            icon1={
              <PinaColadaContainer>
                <PinaColada size={60} />
                <PinaColada size={60} />
              </PinaColadaContainer>
            }
            icon2={<HotDog size={70} />}
            kcal1="1280"
            kcal2="1305"
          />
          <Spacer size={20} />
          <Correspondance
            text1="1 bouteille de cidre de 75 cl "
            text2="2 assiettes de spaghetti de 100g "
            icon1={<CiderBottle size={70} />}
            icon2={
              <>
                <SpagettiPlate size={50} />
                <SpagettiPlate size={50} />
              </>
            }
            kcal1="262"
            kcal2="264"
          />
          <Spacer size={20} />
          <Correspondance
            text1="1 mojito de 24 cl "
            text2="1 glace vanille de 100g "
            icon1={<Mojito size={50} />}
            icon2={<Glace size={50} />}
            kcal1="242"
            kcal2="207"
          />
          <Spacer size={20} />
          <Correspondance
            text1="3 verres de rhum de 6 cl"
            text2="1 banasplit de 200g + 1 esquimau chocolat"
            icon1={
              <>
                <Shoot size={40} />
                <Shoot size={40} />
                <Shoot size={40} />
              </>
            }
            icon2={
              <>
                <Banasplit size={50} />
                <Esquimau size={50} />
              </>
            }
            kcal1="516"
            kcal2="524"
          />
          <Spacer size={20} />
          <P>Et pour en savoir plus, voici une liste de boissons avec leurs valeurs énergétiques :</P>
          <P>
            Ci-dessous, vous trouverez les 10 cocktails préférés des Français associés à leur valeurs énergétiques. Les
            cocktails comprenant aussi plus de sucre, ils sont donc plus caloriques :
          </P>
          <P>
            Et sinon… <Bold>l'eau est un bon substitut</Bold> car quand vous buvez 100 ml, 200 ml ou 300 ml, vous
            absorbez <Bold>0 calorie !</Bold>
            {'\n'}L'eau est également une excellente manière d'<Bold>éviter la gueule de bois</Bold> à coup sûr.
          </P>
        </TopContainer>
      </NavigationWrapper>
    </Background>
  );
};

const Correspondance = ({ text1, text2, icon1, icon2, kcal1, kcal2 }) => {
  return (
    <CorrespondanceContainer>
      <Categorie text={text1} kcal={kcal1} icon={icon1} />
      <EqualityContainer>
        <Equality size={35} color="#ffffff" />
        <Equality size={35} color="#DE285E" />
      </EqualityContainer>
      <Categorie text={text2} kcal={kcal2} icon={icon2} />
    </CorrespondanceContainer>
  );
};

const Categorie = ({ text, kcal, icon }) => (
  <CategorieContainer>
    <CorrespondanceTitleContainer>
      <P bold noMarginBottom textCenter>
        {text}
      </P>
      <KcalText>({kcal} kcal)</KcalText>
    </CorrespondanceTitleContainer>
    <CorrespondanceIconContainer>{icon}</CorrespondanceIconContainer>
  </CategorieContainer>
);

const CorrespondanceContainer = styled.View`
  background: #ffffff;
  border: 1px solid #4030a5;
  border-radius: 3px;
  padding: 8px;
  flex-direction: row;
`;

const CorrespondanceTitleContainer = styled.View`
  margin-bottom: 5px;
`;

const CategorieContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

const EqualityContainer = styled.View`
  justify-content: space-between;
`;

const CorrespondanceIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const KcalText = styled.Text`
  text-align: center;
  font-size: 10px;
  font-weight: 700;
`;

const PinaColadaContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5%;
`;

export default AlcoholAndCalories;
