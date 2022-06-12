import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RefreshingScreen from '../components/RefreshingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="RefreshingScreen">
      <Stack.Screen name="RefreshingScreen" component={RefreshingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
