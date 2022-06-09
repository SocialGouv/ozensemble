import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import H3 from '../../../../components/H3';
import H2 from '../../../../components/H2';
import H1 from '../../../../components/H1';
import UnderlinedButton from '../../../../components/UnderlinedButton';
import { screenWidth } from '../../../../styles/theme';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import TextStyled from '../../../../components/TextStyled';
import Sources from '../../Sources';
import ResultsIllustration from '../../../../components/Illustrations/ResultsIllustration';
import NoSmiley from '../../../../components/Illustrations/NoSmiley';
import YesSmiley from '../../../../components/Illustrations/YesSmiley';
import { BackButton } from '../../../../components/Styles/BackButton';

const Result = ({ navigation, isInOnboarding, route, result }) => {
  return (
    <FullScreenBackground>
      <TopContainer>
        <BackButton onPress={() => navigation.goBack()} marginBottom />
        <ResultTitle>Résultat</ResultTitle>
        {result === 'risk' && <ResultRisk navigation={navigation} />}
      </TopContainer>
      <TopContainer>
        <Sources
          content="Saunders JB, Aasland OG, Babor TF, de la Fuente JR, Grant M. Development of the Alcohol Use Disorders
        Identification Test (AUDIT): WHO Collaborative Project on Early Detection of Persons with Harmful Alcohol
        Consumption II. Addiction 1993 Jun ; 88(6) : 791-804."
        />
      </TopContainer>
    </FullScreenBackground>
  );
};

const ResultRisk = ({ navigation }) => {
  const [feeling, setFeeling] = useState(null);

  return (
    <>
      <TopTitle>
        <TextStyled color="#4030a5">Vous pourriez présenter des risques d’addiction à l’alcool !</TextStyled>
      </TopTitle>
      <TextStyled>Nous sommes éonscients que ce résultat peut être un choc.</TextStyled>
      <TextStyled>Mais nous pouvons vous aider à reprendre le contrôle ...</TextStyled>
      <FeelingOfResult feeling={feeling} setFeeling={setFeeling} />
      <ButtonPrimary
        content="J'échange avec un conseiller"
        onPress={() => navigation.navigate('TABS', { screen: 'DEFI' })}
      />
    </>
  );
};

const FeelingOfResult = ({ feeling, setFeeling }) => (
  <>
    <TextStyled bold>Êtes-vous surpris par ce résultat ?</TextStyled>
    <ContainerAnswer>
      <Answer onPress={() => setFeeling(false)}>
        <NoSmiley size={72} color={feeling === false ? '#DE285E' : '#000000'} />
        <WindUp>
          <TextStyled bold color={feeling === false ? '#DE285E' : '#000000'}>
            Non
          </TextStyled>
        </WindUp>
      </Answer>
      <Answer onPress={() => setFeeling(true)}>
        <YesSmiley size={72} color={feeling === true ? '#DE285E' : '#000000'} />
        <WindUp>
          <TextStyled bold color={feeling === true ? '#DE285E' : '#000000'}>
            Oui
          </TextStyled>
        </WindUp>
      </Answer>
    </ContainerAnswer>
  </>
);
const WindUp = styled.View`
  margin-top: -15px;
`;
const Answer = styled.TouchableOpacity`
  align-items: center;
  margin-vertical: 10px;
`;

const ContainerAnswer = styled.View`
  background: #ffffff;
  border: 1px solid #d3d3e880;
  flex-direction: row;
  justify-content: space-around;
`;

const FullScreenBackground = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  max-width: ${screenWidth}px;
  min-width: ${screenWidth}px;
`;

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

const TopContainer = styled.View`
  padding: 20px 25px 40px;
`;

const ResultTitle = styled(H2)`
  ${commonCss}
`;

const TopTitle = styled(H1)`
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
`;

const TopSubTitle = styled(H3)`
  ${commonCss}
`;

const TopButtonContainer = styled.View`
  margin: 20px 0 30px 0;
  align-items: flex-start;
  flex-grow: 0;
  width: auto;
`;

const BottomContainer = styled.View`
  padding: 20px;
  ${(props) => props.longPaddingBottom && 'padding-bottom: 100px;'}
  background-color: #efefef;
  flex-direction: row;
  margin-top: auto;
`;

const BottomSubContainer = styled.View`
  padding: ${({ shrink }) => (shrink ? 15 : 0)}px;
  flex-shrink: ${({ shrink }) => (shrink ? 1 : 0)};
  align-items: flex-start;
`;

const BottomTitle = styled(H2)`
  ${commonCss}
  margin-bottom: 20px;
`;

const BottomSubTitle = styled(H2)`
  ${commonCss}
  font-weight: 500;
  margin-bottom: 20px;
`;

const ResultsIllustrationStyled = styled(ResultsIllustration)`
  height: 40px;
  margin-top: 8px;
`;

const UnderlinedButtonStyled = styled(UnderlinedButton)`
  align-items: flex-start;
`;
export default Result;
