import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConsosList from './ConsosList';
import EmotionsList from '../AddEmotion/EmotionsList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

const AddDrinkStack = createStackNavigator();

const AddDrinkNavigator = ({ route }) => {
  const [currentScreen, setCurrentScreen] = React.useState('CONSOS_LIST');

  return (
    <SafeAreaView className="flex-1">
      <View className="h-2 flex-row w-full px-6">
        <View className="bg-blue-900 h-full flex-1 rounded-full" />
        <View className="bg-white w-5 h-full" />
        <View className="bg-blue-500 h-full flex-1 rounded-full" />
      </View>
      <AddDrinkStack.Navigator
        screenListeners={{
          state: (e) => {
            // Do something with the state
            console.log('state changed', JSON.stringify(e.data, null, 2));
          },
        }}
        screenOptions={{ headerShown: false }}
        initialRouteName="CONSOS_LIST">
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
    </SafeAreaView>
  );
};

export default AddDrinkNavigator;
