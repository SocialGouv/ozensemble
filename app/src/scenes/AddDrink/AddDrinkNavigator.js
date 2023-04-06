import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import AddOwnDrink from './AddOwnDrink';
import AddCoktail from './AddCocktail';
import AddAlcoolQuantity from './AddAlcoolQuantity';

const AddDrinkStack = createStackNavigator();
const AddDrinkNavigator = ({ route }) => {
  return (
    <AddDrinkStack.Navigator headerMode="none" mode="modal" initialRouteName="CONSOS_LIST">
      <AddDrinkStack.Screen
        initialParams={{ timestamp: route?.params?.timestamp, parent: route?.params?.parent }}
        name="CONSOS_LIST">
        {(props) => <ConsosList {...props} />}
      </AddDrinkStack.Screen>
      <AddDrinkStack.Screen name="ADD_OWN_DRINK" component={AddOwnDrink} />
      <AddDrinkStack.Screen name="ADD_COCKTAIL" component={AddCoktail} />
      <AddDrinkStack.Screen name="ADD_QUANTITY" component={AddAlcoolQuantity} />
    </AddDrinkStack.Navigator>
  );
};

export default AddDrinkNavigator;
