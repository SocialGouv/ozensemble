import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import ChoiceDrinkOrNoDrink from './ChoiceDrinkOrNoDrink';

const AddDrinkStack = createStackNavigator();
const AddDrinkNavigator = ({ route }) => {
  return (
    <AddDrinkStack.Navigator headerMode="none" mode="modal" initialRouteName="CHOICE_DRINK_OR_NO_DRINK">
      <AddDrinkStack.Screen name="CHOICE_DRINK_OR_NO_DRINK" initialParams={{ timestamp: route.params.timestamp }}>
        {(props) => <ChoiceDrinkOrNoDrink {...props} />}
      </AddDrinkStack.Screen>
      <AddDrinkStack.Screen name="CONSOS_LIST">{(props) => <ConsosList {...props} />}</AddDrinkStack.Screen>
    </AddDrinkStack.Navigator>
  );
};

export default AddDrinkNavigator;
