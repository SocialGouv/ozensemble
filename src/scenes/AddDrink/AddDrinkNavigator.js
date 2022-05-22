import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import ChoiceDrinkOrNoDrink from './ChoiceDrinkOrNoDrink';

const AddDrinkStack = createStackNavigator();
const AddDrinkNavigator = () => (
  <AddDrinkStack.Navigator headerMode="none" mode="modal" initialRouteName="CHOICE_DRINK_OR_NO_DRINK">
    <AddDrinkStack.Screen name="CHOICE_DRINK_OR_NO_DRINK" component={ChoiceDrinkOrNoDrink} />
    <AddDrinkStack.Screen name="CONSOS_LIST" component={ConsosList} />
  </AddDrinkStack.Navigator>
);

export default AddDrinkNavigator;
