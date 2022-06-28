import React from 'react';
import styled from 'styled-components';
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

const energetiquesValuesDrinks = [
  { boisson: "Boissons\u000A(1 unité d'alcool)", glucide: 'Glucides', kcal: 'Kcal' }, //title
  { boisson: 'Vin blanc sec', glucide: 0, kcal: 70 },
  { boisson: 'Vin rouge', glucide: 0, kcal: 70 },
  { boisson: 'Champagne brut', glucide: 0, kcal: 70 },
  { boisson: 'Rhum agricole', glucide: 0, kcal: 70 },
  { boisson: 'Porto', glucide: 5, kcal: 90 },
  { boisson: 'Whisky', glucide: 0, kcal: 70 },
  { boisson: 'Vodka Coca', glucide: 13, kcal: 122 },
  { boisson: 'Demi de bière pils', glucide: 10, kcal: 110 },
];

const energetiquesValuesCocktails = [
  { boisson: 'Cocktails', kcal: 'Valeurs en kcal (kilocalories)' }, //title
  { boisson: 'Mojito (18 cl)', kcal: '160 kcal' },
  { boisson: 'Kir Royal (15cl)', kcal: '160 kcal' },
  { boisson: 'Piña colada (25cl)', kcal: '138 kcal' },
  { boisson: 'Ti Punch (6 cl)', kcal: '490 kcal' },
  { boisson: 'Margarita (12cl)', kcal: '243 kcal' },
  { boisson: 'Gin Tonic (17cl) ', kcal: '168 kcal' },
  { boisson: 'Daïquiri (6cl)', kcal: '138 kcal' },
  { boisson: 'Dry martini (6cl)', kcal: '138 kcal' },
  { boisson: 'Cosmopolitan (6cl)', kcal: '138 kcal' },
  { boisson: 'Whiskey sour (9cl)', kcal: '138 kcal' },
];
const AlcoholAndCalories = () => {
  const title = "L'alcool et les calories";

  return (
    <NavigationWrapper
      title={title}
      timeReading={2}
      link={'https://www.rsph.org.uk/our-work/policy/drugs/alcohol-calorie-labelling-.html '}>
      <TopContainer>
        <H2 color={'#4030a5'}>Beaucoup de personnes ignorent que l'alcool fait grossir</H2>
        <Spacer size={20} />
        <P>
          <Bold>
            Les études montrent que l'alcool est une boisson très calorique et sa consommation peut provoquer une prise
            de poids.
          </Bold>
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
          rapidement avant celles des graisses.{'\n'}La consommation d'alcool favorise ainsi l'accumulation des
          graisses, essentiellement au niveau abdominal, situation fréquente chez les grands consommateurs de bière.
        </P>
        <P bold>
          L'alcool stimule l'appétit en induisant une hypoglycémie: plus on boit d'alcool et plus on ressent des
          fringales !
        </P>
        <P>
          À titre indicatif, voici 4 équivalences alcool / nourriture pour mieux se rendre compte de la teneur en sucre
          des boissons alcoolisées :
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
              <SpagettiPlateStyled size={50} />
              <SpagettiPlateStyled size={50} />
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
              <ShootStyled size={45} />
              <ShootStyled size={45} />
              <ShootStyled size={45} />
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
        <P>
          De plus, voici une liste de boissons avec leurs valeurs énergétiques.{'\n'}Pour rappel, une unité d'alcool
          équivaut à 10 g d'alcool quelque soit le contenant.
        </P>
        <Table value={energetiquesValuesDrinks} firstWidth={50} />
        <Spacer size={20} />
        <P>
          <Bold>
            Ci-dessous, vous trouverez les 10 cocktails préférés des Français associés à leur valeurs énergétiques.
          </Bold>{' '}
          Les cocktails comprenant aussi plus de sucre, ils sont donc plus caloriques :
        </P>
        <Table value={energetiquesValuesCocktails} firstWidth={50} />
        <Spacer size={20} />
        <P>
          Et sinon… <Bold>l'eau est un bon substitut</Bold> car quand vous buvez 100 ml, 200 ml ou 300 ml, vous absorbez{' '}
          <Bold>0 calorie !</Bold>
          {'\n'}L'eau est également une excellente manière d'<Bold>éviter la gueule de bois</Bold> à coup sûr.
        </P>
      </TopContainer>
    </NavigationWrapper>
  );
};

const Correspondance = ({ text1, text2, icon1, icon2, kcal1, kcal2 }) => {
  return (
    <CorrespondanceContainer>
      <Categorie text={text1} kcal={kcal1} icon={icon1} />
      <EqualityContainer>
        <Equality size={30} color="#ffffff" />
        <Equality size={30} color="#DE285E" />
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
  overflow: hidden;
`;

const CorrespondanceTitleContainer = styled.View`
  margin-bottom: 10px;
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
  flex-shrink: 1;
  justify-content: space-evenly;
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

const Table = ({ value, firstWidth }) => {
  const titles = Object.values(value[0]);
  const rows = value.slice(1).map((row) => Object.values(row));

  return (
    <TableContainer>
      <Tr backgroundColor={'#4030a5'}>
        {titles.map((title, index) => (
          <TdContainer key={index} width={index === 0 ? firstWidth : (100 - firstWidth) / (titles.length - 1)}>
            <Td color="#eee" noMarginBottom textCenter>
              {title}
            </Td>
          </TdContainer>
        ))}
      </Tr>
      {rows.map((values, index) => (
        <Tr key={index}>
          {values.map((a, index) => (
            <TdContainer key={index} width={index === 0 ? firstWidth : (100 - firstWidth) / (titles.length - 1)}>
              <Td noMarginBottom textCenter={index !== 0}>
                {a}
              </Td>
            </TdContainer>
          ))}
        </Tr>
      ))}
    </TableContainer>
  );
};

const TableContainer = styled.View``;

const TdContainer = styled.View`
  width: ${({ width }) => width}%;
  border: 0.5px solid #eee;
  padding-horizontal: 5px;
  justify-content: center;
`;
const Td = styled(P)`
  padding-horizontal: 5px;
  padding-vertical: 10px;
`;

const Tr = styled.View`
  flex-direction: row;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#fff')};
`;

const ShootStyled = styled(Shoot)`
  margin-bottom: 5px;
`;

const SpagettiPlateStyled = styled(SpagettiPlate)`
  margin-left: 5px;
`;

export default AlcoholAndCalories;
