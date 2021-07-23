import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import BarCodeReader from './BarCodeReader';
import NewDrinkForm from './NewDrinkForm';
import DrinksQuantityExamples from './DrinksQuantityExamples';

const AddDrinkStack = createStackNavigator();
const AddDrinkNavigator = () => (
  <AddDrinkStack.Navigator headerMode="none" mode="modal" initialRouteName="CONSOS_LIST">
    <AddDrinkStack.Screen name="CONSOS_LIST" component={ConsosList} />
    <AddDrinkStack.Screen name="CONSO_SCAN_BAR_CODE" component={BarCodeReader} />
    <AddDrinkStack.Screen name="CONSO_NEW_DRINK" component={NewDrinkForm} />
    <AddDrinkStack.Screen name="CONSO_DRINKS_QUANTITY_EXAMPLES" component={DrinksQuantityExamples} />
  </AddDrinkStack.Navigator>
);

export default AddDrinkNavigator;
