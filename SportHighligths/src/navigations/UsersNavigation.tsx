import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UsersScreen from '../screens/UsersScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const UsersNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="UsersScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="UsersScreen" component={UsersScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default UsersNavigation;
