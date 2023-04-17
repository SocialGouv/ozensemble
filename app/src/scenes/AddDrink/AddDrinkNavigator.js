import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';

const AddDrinkStack = createStackNavigator();
const AddDrinkNavigator = ({ route }) => {
  return (
    <AddDrinkStack.Navigator headerMode="none" mode="modal" initialRouteName="CONSOS_LIST">
      <AddDrinkStack.Screen
        initialParams={{ timestamp: route?.params?.timestamp, parent: route?.params?.parent }}
        name="CONSOS_LIST">
        {(props) => <ConsosList {...props} timestamp={route?.params?.timestamp} />}
      </AddDrinkStack.Screen>
    </AddDrinkStack.Navigator>
  );
};

export default AddDrinkNavigator;
