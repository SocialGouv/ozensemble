import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import TextStyled from '../../components/TextStyled';
import styled from 'styled-components';
import WrapperContainer from '../../components/WrapperContainer';
import ElementDayDefi from '../../components/ElementDayDefi';

const GainsFromStartModale = () => {
  const navigation = useNavigation();

  return (
    <>
      <WrapperContainer onPressBackButton={navigation.goBack} title="Euros et calories économisés">
        <ElementDayDefi
          content={
            <TextStyled>
              Vos gains depuis le début sont calculés à partir de votre{' '}
              <TextStyled color="#4030A5">estimation hebdomadaire avant de réduire</TextStyled> indiquée quand vous avez
              fixé votre objectif{' '}
              <TextStyled color="#4030A5" bold>
                et
              </TextStyled>{' '}
              votre <TextStyled color="#4030A5">consommation d’alcool</TextStyled> que vous ajoutez tous les jours.
            </TextStyled>
          }
        />
        <ElementDayDefi
          content={
            <TextStyled>
              Pour les euros économisés, nous calculons à partir d’un{' '}
              <TextStyled color="#4030A5">prix moyen de la boisson achetée en grande surface</TextStyled> .
            </TextStyled>
          }
        />
      </WrapperContainer>
    </>
  );
};

export default GainsFromStartModale;
