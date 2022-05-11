import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';

import H1 from '../../components/H1';
import ModalContainer from '../../components/Modal';
import TextStyled from '../../components/TextStyled';

const OnBoardingGain = ({ onPress, visible, hide }) => {
  return (
    <ModalContainer visible={visible} animationType="fade" hide={hide} withBackground hideOnTouch>
      <Container>
        <Title>
          <TextStyled color="#4030a5">Sans objectif, pas de gains</TextStyled>
        </Title>
        <SubTitle>
          <TextStyled color={'#3C3C43'}>
            En 3 étapes, je peux me fixer un objectif pour réduire ma consommation d'alcool
          </TextStyled>
        </SubTitle>
        <Continue>
          <ButtonPrimary onPress={onPress} content="Je me fixe un objectif" />
        </Continue>
      </Container>
    </ModalContainer>
  );
};

const Container = styled.View`
  background-color: white;
  padding: 15px;
  border-radius: 15px;
`;
const Continue = styled.View`
  align-items: center;
  margin-top: 30px;
`;
const ButtonTouchable = styled.TouchableOpacity``;

const ContinueText = styled.Text`
  text-transform: uppercase;
`;

const Title = styled(H1)`
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 30px;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 15px;
  text-align: center;
`;

export default OnBoardingGain;
