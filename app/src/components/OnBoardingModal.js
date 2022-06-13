import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import ButtonPrimary from './ButtonPrimary';

import H1 from './H1';
import Modal from './Modal';
import TextStyled from './TextStyled';

const OnBoardingModal = ({ onPress, visible, hide, title, description, boutonTitle }) => {
  return (
    <Modal visible={visible} animationType="fade" hide={hide} withBackground hideOnTouch>
      <Container>
        <TitleContainer>
          <Title>
            <TextStyled>{title}</TextStyled>
          </Title>
          <TouchableOpacity onPress={hide}>
            <TextStyled>X</TextStyled>
          </TouchableOpacity>
        </TitleContainer>
        <SubTitle>
          <TextStyled color={'#3C3C43'}>{description}</TextStyled>
        </SubTitle>
        <Continue>
          <ButtonPrimary onPress={onPress} content={boutonTitle} />
        </Continue>
      </Container>
    </Modal>
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

const Title = styled(H1)`
  flex-shrink: 0;
  text-align: left;
  margin-bottom: 30px;
  width: 90%;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 15px;
  text-align: left;
`;

export default OnBoardingModal;
