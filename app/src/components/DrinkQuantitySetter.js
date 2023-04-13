import React from 'react';
import { View, Text } from 'react-native';
import styled, { css } from 'styled-components';
import { getIcon } from '../scenes/ConsoFollowUp/drinksCatalog';
import H3 from './H3';
import QButton from './QButton';
import TextStyled from './TextStyled';
import TouchableDelete from './TouchableDelete';
const DrinkQuantitySetter = ({ oneLine, asPreview, drinkKey, quantity = 0, setDrinkQuantity, catalog }) => {
  const drink = catalog.find((catalogDrink) => catalogDrink.drinkKey === drinkKey);
  const Icon = getIcon(drink.icon);
  const volume = drink.volume;
  const doses = drink.doses;
  const style = drink.style || {};
  const name = drink.displayDrinkModal.capitalize();
  const onSetQuantity = (q) => {
    if (asPreview) return;
    setDrinkQuantity(drinkKey, q);
  };

  if (oneLine) {
    return (
      <OneLineDrinkQuantitySetter
        asPreview={asPreview}
        quantity={quantity}
        onSetQuantity={onSetQuantity}
        volume={volume}
        name={name}
        doses={doses}
      />
    );
  }

  return (
    <SquareDrinkQuantitySetter
      asPreview={asPreview}
      quantity={quantity}
      onSetQuantity={onSetQuantity}
      Icon={Icon}
      style={style}
      volume={volume}
      name={name}
      doses={doses}
    />
  );
};

export const QuantitySetter = ({ quantity, onSetQuantity }) => (
  <ButtonsContainer>
    <QButton content="-" disabled={quantity <= 0} onPress={() => onSetQuantity(quantity - 1)} />
    <QuantityDisplayContainer>
      <QuantityDisplay>{quantity}</QuantityDisplay>
    </QuantityDisplayContainer>
    <QButton content="+" onPress={() => onSetQuantity(quantity + 1)} />
  </ButtonsContainer>
);

const OneLineDrinkQuantitySetter = ({ quantity, onSetQuantity, Icon, volume, name, index, onDelete }) => (
  <TouchableDelete onDelete={onDelete}>
    <OneLineContainer darkBackground={index % 2} first={index === 0}>
      <Icon size={30} />
      <TextContainer>
        <DisplayName>{name}</DisplayName>
        <Volume>
          {' - '}
          {volume}
        </Volume>
      </TextContainer>
      <QuantitySetter quantity={quantity} onSetQuantity={onSetQuantity} />
    </OneLineContainer>
  </TouchableDelete>
);

const SquareDrinkQuantitySetter = ({ asPreview, quantity, onSetQuantity, Icon, volume, doses, name, style }) => {
  return (
    <View className="min-h-24 w-36 flex justify-center shrink-0 grow-0 mb-4">
      <TopContainer>
        <QButton content="-" disabled={!asPreview && quantity <= 0} onPress={() => onSetQuantity(quantity - 1)} />
        <Icon size={50} style={style} />
        {Boolean(quantity) && (
          <QuantityDisplayContainer absolute>
            <QuantityDisplay>{quantity}</QuantityDisplay>
          </QuantityDisplayContainer>
        )}
        <QButton content="+" onPress={() => onSetQuantity(quantity + 1)} />
      </TopContainer>
      <BottomContainer>
        <DisplayName>{name}</DisplayName>
        <Text>
          {' - '}
          {volume}
        </Text>
      </BottomContainer>
      <BottomContainer>
        <Doses>
          {doses} unité{doses > 1 ? 's' : ''}
        </Doses>
      </BottomContainer>
    </View>
  );
};

const OneLineContainer = styled.View`
  height: ${(props) => (props.first ? 70 : 60)}px;
  width: 100%;
  padding-horizontal: 10px;
  ${(props) => props.first && 'padding-top: 10px;'}
  flex-shrink: 0;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: ${({ darkBackground }) => (darkBackground ? '#f9f9f9' : '#efefef')};
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

const TextContainer = styled.View`
  margin-horizontal: 10px;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: flex-start;
  align-items: center;
`;

const DisplayName = styled(TextStyled).attrs({
  numberOfLines: 1,
})`
  font-weight: bold;
  flex-shrink: 1;
`;

const Volume = styled(H3)``;
const Doses = styled(TextStyled)`
  font-size: 14px;
`;

const qButtonSize = 40;

const absoluteCss = css`
  position: absolute;
  top: 7px;
  right: 50px;
`;
const quantityDisplaySize = 23;
const QuantityDisplayContainer = styled.View`
  ${(props) => props.absolute && absoluteCss}
  background: #4030a5;
  width: ${quantityDisplaySize}px;
  height: ${quantityDisplaySize}px;
  border-radius: ${quantityDisplaySize}px;
  justify-content: center;
  align-items: center;
`;

const QuantityDisplay = styled(TextStyled)`
  font-weight: bold;
  font-size: 12px;
  color: #f9f9f9;
`;

const ButtonsContainer = styled.View`
  width: ${qButtonSize * 2 + quantityDisplaySize + 18}px;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
`;

export default DrinkQuantitySetter;
