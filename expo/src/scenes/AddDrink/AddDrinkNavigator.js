import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import DrinksContextsList from "../AddEmotion/DrinksContextsList";
import ConsosList from "./ConsosList";

const AddDrinkStack = createStackNavigator();

const AddDrinkNavigator = ({ route }) => {
  const [addDrinkModalTimestamp, setDrinkModalTimestamp] = useState(
    () => route?.params?.timestamp ?? Date.now()
  );

  return (
    <AddDrinkStack.Navigator
      key={addDrinkModalTimestamp}
      screenOptions={{ headerShown: false }}
      initialRouteName="CONSOS_LIST">
      <AddDrinkStack.Screen initialParams={{ parent: route?.params?.parent }} name="CONSOS_LIST">
        {(props) => (
          <ConsosList
            {...props}
            setDrinkModalTimestamp={setDrinkModalTimestamp}
            addDrinkModalTimestamp={addDrinkModalTimestamp}
          />
        )}
      </AddDrinkStack.Screen>
      <AddDrinkStack.Screen
        initialParams={{ parent: route?.params?.parent }}
        name="DRINKS_CONTEXTS_LIST">
        {(props) => (
          <DrinksContextsList
            {...props}
            addDrinkModalTimestamp={addDrinkModalTimestamp}
            key={addDrinkModalTimestamp}
          />
        )}
      </AddDrinkStack.Screen>
    </AddDrinkStack.Navigator>
  );
};

export default AddDrinkNavigator;
