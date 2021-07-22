import React from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../../components/TextStyled';
import H3 from '../../components/H3';
import { getDisplayDrinksModalName, getIcon, getVolume } from '../ConsoFollowUp/drinksCatalog';
import TouchableDelete from '../../components/TouchableDelete';

const DrinkQuantitySetter = ({
  oneLine,
  asPreview,
  drinkKey,
  quantity = 0,
  setDrinkQuantity,
  catalog,
  index,
  onDelete,
}) => {
  const Icon = getIcon(drinkKey, catalog);
  const volume = getVolume(drinkKey, catalog);
  const name = getDisplayDrinksModalName(drinkKey, catalog);

  const onSetQuantity = (q) => {
    if (asPreview) return;
    setDrinkQuantity(drinkKey, q);
  };

  const onDeleteRequest = () => {
    onDelete(drinkKey);
  };

  if (oneLine) {
    return (
      <OneLineDrinkQuantitySetter
        quantity={quantity}
        onSetQuantity={onSetQuantity}
        Icon={Icon}
        volume={volume}
        name={name}
        index={index}
        onDelete={onDeleteRequest}
      />
    );
  }

  return (
    <SquareDrinkQuantitySetter
      asPreview={asPreview}
      quantity={quantity}
      onSetQuantity={onSetQuantity}
      Icon={Icon}
      volume={volume}
      name={name}
    />
  );
};

export const QuantitySetter = ({ quantity, onSetQuantity }) => (
  <ButtonsContainer>
    <QButton content="-" disabled={!quantity} onPress={() => onSetQuantity(quantity - 1)} />
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

const SquareDrinkQuantitySetter = ({ asPreview, quantity, onSetQuantity, Icon, volume, name }) => (
  <Container>
    <TopContainer>
      <QButton content="-" disabled={!asPreview && !quantity} onPress={() => onSetQuantity(quantity - 1)} />
      <Icon size={50} />
      {Boolean(quantity) && (
        <QuantityDisplayContainer absolute>
          <QuantityDisplay>{quantity}</QuantityDisplay>
        </QuantityDisplayContainer>
      )}
      <QButton content="+" onPress={() => onSetQuantity(quantity + 1)} />
    </TopContainer>
    <BottomContainer>
      <DisplayName>{name}</DisplayName>
      <Volume>
        {' - '}
        {volume}
      </Volume>
    </BottomContainer>
  </Container>
);

const QButton = ({ small, content, onPress, disabled }) => (
  <QButtonStyled onPress={onPress} disabled={disabled}>
    <QButtonContentContainer small={small} disabled={disabled}>
      <QButtonContent color="#4030a5">{content}</QButtonContent>
    </QButtonContentContainer>
  </QButtonStyled>
);

const Container = styled.View`
  height: 100px;
  width: 145px;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
`;

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

const DisplayName = styled(TextStyled).attrs((props) => ({
  numberOfLines: 1,
}))`
  font-weight: bold;
  flex-shrink: 1;
`;

const Volume = styled(H3)``;

const qButtonSize = 40;
const QButtonStyled = styled.TouchableOpacity``;
const QButtonContentContainer = styled.View`
  height: ${qButtonSize}px;
  width: ${qButtonSize}px;
  border-radius: ${qButtonSize}px;
  border: 1px solid #dbdbe9;
  background: #eaeaed;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const QButtonContent = styled(TextStyled)`
  font-size: 23px;
  line-height: 25px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align-vertical: center;
`;

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

const QuantityDisplay = styled.Text`
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
