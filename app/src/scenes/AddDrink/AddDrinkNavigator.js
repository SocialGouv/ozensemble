import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import EmotionsList from '../AddEmotion/EmotionsList';

const AddDrinkStack = createStackNavigator();

const AddDrinkNavigator = ({ route }) => {
  return (
    <AddDrinkStack.Navigator screenOptions={{ headerShown: false }} presentation="modal" initialRouteName="CONSOS_LIST">
      <AddDrinkStack.Screen
        initialParams={{ timestamp: route?.params?.timestamp, parent: route?.params?.parent }}
        name="CONSOS_LIST">
        {(props) => <ConsosList {...props} timestamp={route?.params?.timestamp} />}
      </AddDrinkStack.Screen>
      <AddDrinkStack.Screen
        name="EMOTIONS_LIST"
        component={EmotionsList}
        initialParams={{ timestamp: route?.params?.timestamp }}
      />
    </AddDrinkStack.Navigator>
  );
};

export default AddDrinkNavigator;
