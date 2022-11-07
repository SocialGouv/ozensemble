import React from 'react';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import CocktailGlassTriangle from '../../components/illustrations/drinksAndFood/CocktailGlassTriangle';
import NoDrink from '../../components/illustrations/drinksAndFood/NoDrink';
import { screenHeight } from '../../styles/theme';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import { drinksState } from '../../recoil/consos';
import { NO_CONSO } from '../ConsoFollowUp/drinksCatalog';
import { logEvent } from '../../services/logEventsWithMatomo';
import { P } from '../../components/Articles';
import DateAndTimePickers from './DateAndTimePickers';
import WrapperContainer from '../../components/WrapperContainer';

const ChoiceDrinkOrNoDrink = ({ navigation, route }) => {
  const setGlobalDrinksState = useSetRecoilState(drinksState);
  const drinkModalTimestamp = route.params.timestamp;

  return (
    <SafeWrapper>
      <WrapperContainer
        title={'Mes consommations'}
        onPressBackButton={() => {
          navigation.goBack();
          logEvent({
            category: 'CONSO',
            action: 'CONSO_CLOSE_CONSO_ADDSCREEN',
          });
        }}>
        <DateAndTimePickers />
        <Option
          icon={<NoDrink size={40} />}
          value={"Je n'ai pas bu"}
          onPress={() => {
            logEvent({
              category: 'CONSO',
              action: 'CONSO_DRINKLESS',
            });
            setGlobalDrinksState((state) => [
              ...state,
              { drinkKey: NO_CONSO, quantity: 1, timestamp: makeSureTimestamp(drinkModalTimestamp), id: uuidv4() },
            ]);
            navigation.goBack();
          }}
        />
        <Option
          icon={<CocktailGlassTriangle size={40} />}
          value={"J'ai bu"}
          onPress={() => {
            logEvent({
              category: 'CONSO',
              action: 'CONSO_DRINK',
            });
            navigation.replace('CONSOS_LIST', { timestamp: drinkModalTimestamp });
          }}
        />
      </WrapperContainer>
    </SafeWrapper>
  );
};

const Option = ({ icon, value, onPress }) => {
  return (
    <AskDrinkContainer>
      <ButtonTouchable onPress={onPress}>
        <Box>{icon}</Box>
      </ButtonTouchable>
      <P> {value}</P>
    </AskDrinkContainer>
  );
};

const SafeWrapper = styled(SafeAreaView)`
  flex: 1;
`;

export const DateAndTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ButtonTouchable = styled.TouchableOpacity``;

const Box = styled.View`
  border: 1px solid #de285e;
  border-radius: 5px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const AskDrinkContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${screenHeight * 0.1}px;
`;

export default ChoiceDrinkOrNoDrink;
