import React from 'react';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import H3 from '../../components/H3';
import { getDisplayDrinksModalName, getIcon, getVolume } from '../consoDuck';

const QButton = ({ content, onPress, disabled }) => (
  <QButtonStyled onPress={onPress} disabled={disabled}>
    <QButtonContentContainer disabled={disabled}>
      <QButtonContent type="title">{content}</QButtonContent>
    </QButtonContentContainer>
  </QButtonStyled>
);

const DrinkQuantitySetter = ({ asPreview, drinkKey, quantity = 0, setDrinkQuantity }) => {
  const Icon = getIcon(drinkKey);

  const onSetQuantity = q => {
    if (asPreview) return;
    setDrinkQuantity(drinkKey, q);
  };

  return (
    <Container>
      <TopContainer>
        <QButton content="-" disabled={!asPreview && !quantity} onPress={() => onSetQuantity(quantity - 1)} />
        <Icon size={50} />
        {Boolean(quantity) && (
          <QuantityDisplayContainer>
            <QuantityDisplay>{quantity}</QuantityDisplay>
          </QuantityDisplayContainer>
        )}
        <QButton content="+" onPress={() => onSetQuantity(quantity + 1)} />
      </TopContainer>
      <BottomContainer>
        <DisplayName type="h2">{getDisplayDrinksModalName(drinkKey).capitalize()}</DisplayName>
        <Volume>
          {' - '}
          {getVolume(drinkKey)}
        </Volume>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.View`
  height: 100px;
  width: 145px;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
`;

const TopContainer = styled.View`
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DisplayName = styled(TextStyled)`
  font-weight: bold;
`;

const Volume = styled(H3)``;

const qButtonSize = 40;
const QButtonStyled = styled.TouchableOpacity``;
const QButtonContentContainer = styled.View`
  height: ${qButtonSize}px;
  width: ${qButtonSize}px;
  border-radius: ${qButtonSize}px;
  border: 1px solid ${({ theme }) => theme.colors.questionBorderUnselected};
  background: #eaeaed;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const QButtonContent = styled(TextStyled)`
  font-size: 23px;
  line-height: 26px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;

const quantityDisplaySize = 23;
const QuantityDisplayContainer = styled.View`
  position: absolute;
  top: 7px;
  right: 50px;
  background: ${({ theme }) => theme.colors.title};
  width: ${quantityDisplaySize}px;
  height: ${quantityDisplaySize}px;
  border-radius: ${quantityDisplaySize}px;
  justify-content: center;
  align-items: center;
`;

const QuantityDisplay = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.whiteBg};
`;

export default DrinkQuantitySetter;
