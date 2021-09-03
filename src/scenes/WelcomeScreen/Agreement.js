import React from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CGUs from '../Infos/CGUs';
import PrivacyPolicy from '../Infos/PrivacyPolicy';

const Agreement = ({ onAgree, agreed }) => {
  const [showCGUs, setShowCGUs] = React.useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = React.useState(false);
  return (
    <>
      <Container>
        <TouchableWithoutFeedback onPress={onAgree} hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}>
          <CheckBoxContainer>
            <CheckBoxStyled
              // ios style
              onCheckColor="#4030a5"
              onTintColor="#4030a5"
              onFillColor="#4030a511"
              animationDuration={0.2}
              boxType="square"
              lineWidth={1}
              //android style
              tintColors={{ true: '#4030a5', false: '#c4c4c4' }}
              //common props
              value={agreed}
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

const color = '#222222';

const Container = styled.View`
  text-align: center;
  width: 75%;
  margin-top: 5%;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

const CheckBoxContainer = styled.View`
  padding: 2px;
  height: 20px;
  width: 20px;
  flex-shrink: 0;
  margin-right: 10px;
`;

const CheckBoxStyled = styled(CheckBox)`
  height: 100%;
  width: 100%;
`;

const TextContainer = styled.Text`
  margin-left: 15px;
  flex-shrink: 1;
`;

const Content = styled.Text`
  font-size: 10px;
  color: ${color};
`;

const Link = styled.Text`
  font-size: 10px;
  text-decoration: underline;
  color: ${color};
`;

export default Agreement;
