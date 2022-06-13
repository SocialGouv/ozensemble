import React from 'react';
import styled from 'styled-components';
import ButtonPrimary from './ButtonPrimary';

import H1 from './H1';
import Modal from './Modal';
import TextStyled from './TextStyled';

const OnBoardingModal = ({ onPress, visible, hide, title, description, boutonTitle }) => {
  return (
    <Modal visible={visible} animationType="fade" hide={hide} withBackground hideOnTouch>
      <Container>
        <Title>
          <TextStyled color="#4030a5">{title}</TextStyled>
        </Title>
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
`;

const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 15px;
  text-align: left;
`;

export default OnBoardingModal;
