import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Center, Text} from 'native-base';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Spinner from '../components/Spinner';
import {AuthContext} from '../contexts/AuthContextProvider';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen, {FIRST_USE_KEY} from '../screens/WelcomeScreen';
import {localStorage} from '../services';

const Stack = createNativeStackNavigator();
const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="LoadingScreen">
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;

const LoadingScreen = () => {
  const navigation = useNavigation();
  const {isLoggedIn} = useContext(AuthContext);
  useEffect(() => {
    (async () => checkIfFirstTimeLoad())();
  }, []);
  const checkIfFirstTimeLoad = useCallback(async () => {
    await localStorage.remove(FIRST_USE_KEY);
    const fu = await localStorage.get(FIRST_USE_KEY);
    if (fu === null) {
      navigation.navigate('WelcomeScreen' as never);
    } else {
      if (!isLoggedIn) navigation.navigate('LoginScreen' as never);
    }
  }, []);
  return (
    <Center h="100%" justifyContent="center" alignItems="center">
      <Spinner size="lg" text="" />
      <Text fontSize="xl">Veuillez patienter!</Text>
    </Center>
  );
};
