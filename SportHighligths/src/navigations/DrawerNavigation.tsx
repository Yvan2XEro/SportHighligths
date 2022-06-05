import React from 'react';
import {
  createDrawerNavigator,
  //   useDrawerProgress,
} from '@react-navigation/drawer';
import AppNavigation from './AppNavigation';
import DrawerContent from '../components/DrawerContent';
import AuthStackNavigation from './AuthStackNavigation';

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
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
