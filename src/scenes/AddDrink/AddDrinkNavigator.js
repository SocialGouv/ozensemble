import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BarCodeReader from './BarCodeReader';
import ConsosList from './ConsosList';
import DrinksQuantityExamples from './DrinksQuantityExamples';
import NewDrinkForm from './NewDrinkForm';
import ChoiceDrinkOrNoDrink from './ChoiceDrinkOrNoDrink';

const AddDrinkStack = createStackNavigator();
const AddDrinkNavigator = () => (
  <AddDrinkStack.Navigator headerMode="none" mode="modal" initialRouteName="CHOICE_DRINK_OR_NO_DRINK">
    <AddDrinkStack.Screen name="CHOICE_DRINK_OR_NO_DRINK" component={ChoiceDrinkOrNoDrink} />
    <AddDrinkStack.Screen name="CONSOS_LIST" component={ConsosList} />
    <AddDrinkStack.Screen name="CONSO_SCAN_BAR_CODE" component={BarCodeReader} />
    <AddDrinkStack.Screen name="CONSO_NEW_DRINK" component={NewDrinkForm} />
    <AddDrinkStack.Screen name="CONSO_DRINKS_QUANTITY_EXAMPLES" component={DrinksQuantityExamples} />
  </AddDrinkStack.Navigator>
);

export default AddDrinkNavigator;
