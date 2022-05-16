import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import H3 from '../../components/H3';
import { consolidatedCatalogSelector } from '../../recoil/consos';
import { getDisplayName, getIcon, getVolume } from './drinksCatalog';
import { FeedButtonStyled } from './styles';

const isFirst = (position) => position === 'first';
const isAlone = (position) => position === 'alone';
const isLast = (position) => position === 'last';
const isMiddle = (position) => position === 'middle';

const ConsoFeedDisplay = ({
  onPress,
  selected,
  showButtons,
  nothingSelected,
  drinkKey,
  timestamp,
  quantity: q,
  updateDrinkRequest,
  deleteDrinkRequest,
  position: p,
}) => {
  const consolidatedCatalog = useRecoilValue(consolidatedCatalogSelector);
  const n = getDisplayName(drinkKey, q, consolidatedCatalog);
  const v = getVolume(drinkKey, consolidatedCatalog);
  const Icon = getIcon(drinkKey, consolidatedCatalog);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => onPress(timestamp)}>
        <FeedButton pos={p} showAsSelected={selected || nothingSelected}>
          <Content>
            <Icon size={25} />
            <Drink>
              {q} {n}{' '}
            </Drink>
            <Volume numberOfLines={1} ellipsizeMode="tail">
              ({v})
            </Volume>
            {(isFirst(p) || isAlone(p)) && <Hour>{new Date(timestamp).getLocaleTime('fr')}</Hour>}
          </Content>
        </FeedButton>
      </TouchableWithoutFeedback>
      {showButtons && (
        <UpdateContainer>
          <UpdateButton small content="Modifier" onPress={updateDrinkRequest} />
          <DeleteButton small content="Supprimer" onPress={deleteDrinkRequest} color="#4030a5" shadowColor="#171586" />
        </UpdateContainer>
      )}
    </>
  );
};

const noRadiusBottom = css`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-end-radius: 0px;
  border-bottom-start-radius: 0px;
  margin-bottom: 0px;
  border-bottom-width: 0px;
`;

const noRadiusTop = css`
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top-start-radius: 0px;
  border-top-end-radius: 0px;
  margin-top: 0px;
  border-top-width: 0px;
`;

const firstCss = noRadiusBottom;
const lastCss = noRadiusTop;

const middleCss = css`
  ${noRadiusBottom}
  ${noRadiusTop}
`;

const FeedButton = styled(FeedButtonStyled)`
  ${({ pos }) => {
    if (isFirst(pos)) return firstCss;
    if (isMiddle(pos)) return middleCss;
    if (isLast(pos)) return lastCss;
  }}
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Drink = styled(H3)`
  margin-left: 5px;
  font-weight: bold;
`;

const Volume = styled(H3)`
  flex-shrink: 1;
`;

const Hour = styled(H3)`
  font-style: italic;
  margin-left: auto;
  margin-right: 12px;
  color: #4030a5;
`;

const UpdateContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
`;

const UpdateButton = styled(ButtonPrimary)`
  flex-grow: 0;
  margin-right: 10px;
`;

const DeleteButton = styled(UpdateButton)`
  margin-right: 0px;
`;

export default ConsoFeedDisplay;
