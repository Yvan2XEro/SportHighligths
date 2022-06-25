import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppNavigation from './AppNavigation';
import DrawerContent from '../components/DrawerContent';
import AuthStackNavigation from './AuthStackNavigation';
import WithoutTabStackNavigator from './WithoutTabStackNavigator';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="AppNavigation"
      drawerContent={(props: any) => <DrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="AppNavigation" component={AppNavigation} />
      <Drawer.Screen
        name="AuthStackNavigation"
        component={AuthStackNavigation}
      />
      <Drawer.Screen
        name="WithoutTabStackNavigator"
        component={WithoutTabStackNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
