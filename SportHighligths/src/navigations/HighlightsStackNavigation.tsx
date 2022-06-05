import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HighlightsListScreen from '../screens/HighlightsListScreen';
import HighlightDetailsScreen from '../screens/HighlightDetailsScreen';

const Stack = createNativeStackNavigator();
const HighlightsStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HighlightsListScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="HighlightsListScreen"
        component={HighlightsListScreen}
      />
      <Stack.Screen
        name="HighlightDetailsScreen"
        component={HighlightDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HighlightsStackNavigation;
