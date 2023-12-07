import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import DrinksContextsList from '../AddEmotion/DrinksContextsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StatusBar } from 'react-native';

const AddDrinkStack = createStackNavigator();

const AddDrinkNavigator = ({ route }) => {
  const [addDrinkModalTimestamp, setDrinkModalTimestamp] = useState(() => route?.params?.timestamp);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AddDrinkStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CONSOS_LIST">
        <AddDrinkStack.Screen initialParams={{ parent: route?.params?.parent }} name="CONSOS_LIST">
          {(props) => (
            <ConsosList
              {...props}
              setDrinkModalTimestamp={setDrinkModalTimestamp}
              addDrinkModalTimestamp={addDrinkModalTimestamp}
            />
          )}
        </AddDrinkStack.Screen>
        <AddDrinkStack.Screen initialParams={{ parent: route?.params?.parent }} name="DRINKS_CONTEXTS_LIST">
          {(props) => (
            <DrinksContextsList
              {...props}
              addDrinkModalTimestamp={addDrinkModalTimestamp}
              key={addDrinkModalTimestamp}
            />
          )}
        </AddDrinkStack.Screen>
      </AddDrinkStack.Navigator>
    </>
  );
};

export default AddDrinkNavigator;
