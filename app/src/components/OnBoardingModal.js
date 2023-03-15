import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';
import { defaultPaddingFontScale, hitSlop } from '../styles/theme';
import ButtonPrimary from './ButtonPrimary';

import H1 from './H1';
import Modal from './Modal';
import TextStyled from './TextStyled';

const OnBoardingModal = ({ onPress, visible, hide, title, description, boutonTitle }) => {
  return (
    <Modal visible={visible} animationType="fade" hide={hide} withBackground hideOnTouch>
      <Container>
        <HideContainer onPress={hide} hitSlop={hitSlop(15)}>
          <Cross fill="none" viewBox="0 0 24 24">
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              stroke="black"
              d="M6 18L18 6M6 6l12 12"
            />
          </Cross>
        </HideContainer>
        <TitleContainer>
          <Title>
            <TextStyled>{title}</TextStyled>
          </Title>
        </TitleContainer>
        <SubTitle>
          <TextStyled color={'#3C3C43'}>{description}</TextStyled>
        </SubTitle>
        <Continue>{boutonTitle && <ButtonPrimary onPress={onPress} content={boutonTitle} />}</Continue>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  background-color: white;
  padding: ${defaultPaddingFontScale() / 2}px;
  border-radius: 15px;
`;
const Continue = styled.View`
  align-items: center;
`;

const Title = styled(H1)`
  flex-shrink: 0;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const SubTitle = styled(TextStyled)`
  font-size: 18px;
  margin-bottom: 30px;
  text-align: left;
`;

const HideContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const Cross = styled(Svg)`
  position: absolute;
  top: -${defaultPaddingFontScale() / 2}px;
  right: -${defaultPaddingFontScale() / 2}px;
  height: 20px;
  width: 20px;
  font-weight: bold;
  color: black;
`;

export default OnBoardingModal;
