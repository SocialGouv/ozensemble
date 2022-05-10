import React from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../../components/TextStyled';
import H2 from '../../components/H2';
import H1 from '../../components/H1';
import Screen1Image from '../../components/Illustrations/Screen1';
import Screen2Image from '../../components/Illustrations/Screen2';
import Screen3Image from '../../components/Illustrations/Screen3';
import { screenHeight, screenWidth } from '../../styles/theme';
import { mediaHeight } from '../../styles/mediaQueries';
import Agreement from './Agreement';

export const Screen1 = () => (
  <ScreenBgStyled>
    <StyledScreen1 />
    <Title>
      <TextStyled color="#4030a5">Bravo de vouloir réduire votre consommation</TextStyled>
    </Title>
    <SubTitle1>
      <TextStyled color="#191919">Vous avez entre les mains un outil </TextStyled>
      <TextStyled color="#4030a5">gratuit </TextStyled>
      <TextStyled color="#191919">et </TextStyled>
      <TextStyled color="#4030a5">anonyme </TextStyled>
      <TextStyled color="#191919">de suivi de consommation d'alcool</TextStyled>
    </SubTitle1>
  </ScreenBgStyled>
);

export const Screen2 = () => (
  <ScreenBgStyled>
    <StyledScreen2 />
    <Title>
      <TextStyled color="#4030a5">Comment cela marche ?</TextStyled>
    </Title>
    <BulletPointView>
      <TextStyled color="#191919">
        {'\u2022'} Évaluez votre risque{'\n'}
      </TextStyled>
      <TextStyled color="#191919">
        {'\u2022'} Fixez-vous un objectif{'\n'}
      </TextStyled>
      <TextStyled color="#191919">
        {'\u2022'} Trouvez des conseils{'\n'}
      </TextStyled>
    </BulletPointView>
    <SubTitle2>
      <TextStyled color="#191919">Rien de plus simple !</TextStyled>
    </SubTitle2>
  </ScreenBgStyled>
);

export const Screen3 = ({ setAgreed, agreed }) => (
  <ScreenBgStyled>
    <StyledScreen3 />
    <Title>
      <TextStyled color="#4030a5">Mesurez vos gains</TextStyled>
    </Title>
    <SubTitle3>
      <TextStyled color="#191919">
        Au fil du temps, vous découvrirez vos économies en euros et les calories évitées
      </TextStyled>
    </SubTitle3>
    <Agreement onAgree={() => setAgreed(!agreed)} agreed={agreed} />
  </ScreenBgStyled>
);

const ScreenBgStyled = styled.View`
  background-color: #f9f9f9;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

const Title = styled(H1)`
  margin-bottom: ${screenHeight * 0.025}px;
  width: 75%;
  flex-shrink: 0;
  text-align: center;
`;

const BulletPointView = styled(H2)`
  width: 75%;
  flex-shrink: 0;
  text-align: center;
  margin-bottom: ${screenHeight * 0.025}px;
`;

const SubTitle1 = styled(H2)`
  width: 75%;
  flex-shrink: 0;
  text-align: center;
  margin-bottom: ${screenHeight * 0.2}px;
`;

const SubTitle2 = styled(H2)`
  width: 75%;
  flex-shrink: 0;
  flex-direction: column;
  text-align: center;
  margin-bottom: ${screenHeight * 0.15}px;
`;

const SubTitle3 = styled(H2)`
  width: 75%;
  flex-shrink: 0;
  flex-direction: column;
  text-align: center;
  margin-bottom: ${screenHeight * 0.1}px;
`;

const bigImage = css`
  height: 200px;
`;
const mediumImage = css`
  height: 150px;
`;
const smallImage = css`
  height: 65px;
`;

const imageCss = css`
  margin-bottom: ${screenHeight * 0.05}px;
  width: ${screenWidth}px;
  flex-shrink: 0;
  ${bigImage}
  ${mediaHeight.medium`${mediumImage}`}
  ${mediaHeight.small`${smallImage}`}
`;

const StyledScreen1 = styled(Screen1Image)`
  ${imageCss}
`;

const StyledScreen2 = styled(Screen2Image)`
  ${imageCss}
`;

const StyledScreen3 = styled(Screen3Image)`
  ${imageCss}
`;
