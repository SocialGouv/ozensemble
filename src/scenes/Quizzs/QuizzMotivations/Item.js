import React from 'react';
import styled from 'styled-components';
import CheckBox from '@react-native-community/checkbox';
import { TouchableWithoutFeedback, View } from 'react-native';
import ButtonPrimary from '../../../components/ButtonPrimary';
import TextStyled from '../../../components/TextStyled';
import { useNavigation } from '@react-navigation/native';

export const Item = ({ answerKey, content, alertText, onPress, checked = false, disabled = false }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => onPress?.(answerKey)}>
      <View>
        <ItemContainer>
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
              disabled={disabled}
              value={checked}
            />
          </CheckBoxContainer>
          <TextStyled>{content}</TextStyled>
        </ItemContainer>
        {!!checked && !!alertText && (
          <AlertContainer>
            <TextStyled color="#1a1a1a">{alertText}</TextStyled>
            <ButtonPrimaryStyled
              small
              content="Échanger avec un conseiller"
              onPress={() => navigation.navigate('CONTACT')}
            />
          </AlertContainer>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

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

const ItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 5px;
`;

const AlertContainer = styled.View`
  padding: 15px;
  border-radius: 10px;
  margin: 5px;
  background-color: #de285e11;
`;

const ButtonPrimaryStyled = styled(ButtonPrimary)`
  margin-top: 20px;
`;

export default Item;
