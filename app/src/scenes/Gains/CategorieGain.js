import React from 'react';
import styled from 'styled-components';
import H1 from '../../components/H1';
import TextStyled from '../../components/TextStyled';
import { screenWidth } from '../../styles/theme';

const CategorieGain = ({ children, icon = null, value = '?', unit = '', description, onPress, disabled }) => {
  return (
    <ButtonTouchable onPress={onPress} disabled={disabled}>
      <Categorie>
        <ComponentCategorie>
          {!!icon && <IconCategorie>{icon}</IconCategorie>}
          {!!unit && <CategorieUnit>{unit}</CategorieUnit>}
          {children}
          <UnitCategorie>
            <CategorieValue value={`${value}`} numberOfLetters={`${value}`?.length}>
              <TextStyled bold>{value}</TextStyled>
            </CategorieValue>
          </UnitCategorie>
          <CategorieUnit />
        </ComponentCategorie>
        <TextCategorieContainer>
          <TextCategorie>
            <TextStyled numberOfLines={2}>{description}</TextStyled>
          </TextCategorie>
        </TextCategorieContainer>
      </Categorie>
    </ButtonTouchable>
  );
};

const width = Math.max((screenWidth * 4) / 10);

const Categorie = styled.View`
  width: ${width * 0.85}px;
`;

const ComponentCategorie = styled.View`
  border: 1px solid #4030a5;
  border-radius: 5px;
  width: ${width * 0.85}px;
  height: ${width * 0.85}px;
  min-height: ${width * 0.85}px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 4px;
`;

const IconCategorie = styled.View`
  justify-content: center;
  flex-direction: row;
  height: ${width * 0.85 * 0.4}px;
  align-items: center;
`;

const UnitCategorie = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
`;

const CategorieUnit = styled(H1)`
  width: ${width * 0.85}px;
  text-align: center;
`;

const getFontSizeToFit = (props) => {
  // we assume letter width is 2/3 the font-size
  if (isNaN(props.numberOfLetters)) return 35;
  const maxLetterWidth = (width * 0.85) / props.numberOfLetters;
  const maxFontSize = Math.min(maxLetterWidth / (3 / 4), 35);
  return maxFontSize;
};

const CategorieValue = styled.Text`
  font-size: ${getFontSizeToFit}px;
  margin-top: 5px;
  width: ${width * 0.85}px;
  text-align: center;
`;

const TextCategorieContainer = styled.View`
  padding-top: 2px;
  align-items: center;
`;

const TextCategorie = styled.Text`
  text-align: center;
`;

const ButtonTouchable = styled.TouchableOpacity`
  heoght: 100%;
`;

export default CategorieGain;
