import CheckBox from '@react-native-community/checkbox';
import React, { useState } from 'react';
import { Modal, Platform, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import CGUs from '../Infos/CGUs';
import PrivacyPolicy from '../Infos/PrivacyPolicy';
import TextStyled from '../../components/TextStyled';
import { screenWidth } from '../../styles/theme';

const Agreement = ({ onAgree, agreed }) => {
  const [showCGUs, setShowCGUs] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  return (
    <>
      <Container>
        <TouchableWithoutFeedback
          onPress={Platform.select({ ios: onAgree, android: null })}
          hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}>
          <CheckBoxContainer>
            <CheckBoxStyled
              // ios style
              onCheckColor="#fff"
              onTintColor="#fff"
              animationDuration={0.2}
              boxType="square"
              lineWidth={2}
              //android style
              tintColors={{ true: '#fff', false: '#AAAAAA' }}
              //common props
              value={agreed}
              // android press - compulsory
              onChange={Platform.select({ android: onAgree, ios: null })}
            />
          </CheckBoxContainer>
        </TouchableWithoutFeedback>
        <TextContainer>
          <Content>En cochant cette case vous acceptez nos </Content>
          <Link onPress={() => setShowCGUs(true)}>Conditions Générales d'Utilisation </Link>
          <Content>et notre </Content>
          <Link onPress={() => setShowPrivacyPolicy(true)}>Politique de Confidentialité.</Link>
        </TextContainer>
      </Container>
      <Modal
        visible={showCGUs}
        animationType="slide"
        presentationStyle="formSheet"
        onDismiss={() => setShowCGUs(false)}>
        <CGUs onClose={() => setShowCGUs(false)} />
      </Modal>
      <Modal
        visible={showPrivacyPolicy}
        animationType="slide"
        presentationStyle="formSheet"
        onDismiss={() => setShowPrivacyPolicy(false)}>
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      </Modal>
    </>
  );
};

const color = '#fff';

const Container = styled.View`
  text-align: center;
  width: 75%;
  margin-top: 5%;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: ${(Math.ceil((212 / 375) * screenWidth) / 3) * 2.15}px;
`;

const CheckBoxContainer = styled.View`
  padding: 2px;
  height: 30px;
  width: 30px;
  flex-shrink: 0;
  margin-right: 10px;
  ${Platform.OS === 'android' && 'transform: scale(1.4);'}
`;

const CheckBoxStyled = styled(CheckBox)`
  height: 100%;
  width: 100%;
`;

const TextContainer = styled(TextStyled)`
  margin-left: 15px;
  flex-shrink: 1;
  line-height: 19.2px;
`;

const Content = styled(TextStyled)`
  font-size: 12px;
  color: ${color};
`;

const Link = styled(TextStyled)`
  font-size: 12px;
  text-decoration: underline #fff;
  color: ${color};
`;

export default Agreement;
