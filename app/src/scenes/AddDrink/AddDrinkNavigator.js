import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import AddOwnDrink from './AddOwnDrink';
import AddCocktail from './AddCocktail';
import AddAlcoolQuantity from './AddAlcoolQuantity';

const AddDrinkStack = createStackNavigator();
const AddDrinkNavigator = ({ route }) => {
  const [quantitySelected, setQuantitySelected] = useState();

  return (
    <AddDrinkStack.Navigator headerMode="none" mode="modal" initialRouteName="CONSOS_LIST">
      <AddDrinkStack.Screen
        initialParams={{ timestamp: route?.params?.timestamp, parent: route?.params?.parent }}
        name="CONSOS_LIST">
        {(props) => <ConsosList {...props} timestamp={route?.params?.timestamp} />}
      </AddDrinkStack.Screen>
      <AddDrinkStack.Screen name="ADD_OWN_DRINK" initialParams={{ timestamp: route?.params?.timestamp }}>
        {(props) => (
          <AddOwnDrink {...props} quantitySelected={quantitySelected} setQuantitySelected={setQuantitySelected} />
        )}
      </AddDrinkStack.Screen>
      <AddDrinkStack.Screen name="ADD_COCKTAIL">
        {(props) => <AddCocktail {...props} setQuantitySelected={setQuantitySelected} />}
      </AddDrinkStack.Screen>
      <AddDrinkStack.Screen name="ADD_QUANTITY">
        {(props) => <AddAlcoolQuantity {...props} setQuantitySelected={setQuantitySelected} />}
      </AddDrinkStack.Screen>
    </AddDrinkStack.Navigator>
  );
};

export default AddDrinkNavigator;
