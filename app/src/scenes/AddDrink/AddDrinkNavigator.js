import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import EmotionsList from '../AddEmotion/EmotionsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import ContextSuggestion from '../AddEmotion/ContextSuggestion';

const AddDrinkStack = createStackNavigator();

const AddDrinkNavigator = ({ route }) => {
  const [addDrinkModalTimestamp, setDrinkModalTimestamp] = useState(() => route?.params?.timestamp);

  return (
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
      <AddDrinkStack.Screen initialParams={{ parent: route?.params?.parent }} name="EMOTIONS_LIST">
        {(props) => (
          <EmotionsList {...props} addDrinkModalTimestamp={addDrinkModalTimestamp} key={addDrinkModalTimestamp} />
        )}
      </AddDrinkStack.Screen>

      <AddDrinkStack.Screen initialParams={{ parent: route?.params?.parent }} name="CONTEXT_SUGGESTION_SCREEN">
        {(props) => <ContextSuggestion {...props} />}
      </AddDrinkStack.Screen>
    </AddDrinkStack.Navigator>
  );
};

export default AddDrinkNavigator;
