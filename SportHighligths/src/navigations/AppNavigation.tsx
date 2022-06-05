import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppTabNavigation from './AppTabNavigation';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AppTabNavigation">
      <Stack.Screen name="AppTabNavigation" component={AppTabNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
