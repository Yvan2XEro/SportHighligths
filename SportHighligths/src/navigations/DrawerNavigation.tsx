import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AppNavigation from './AppNavigation';
import DrawerContent from '../components/DrawerContent';
import AuthStackNavigation from './AuthStackNavigation';
import PostCommentsScreen from '../screens/PostCommentsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import FavouritesScreen from '../screens/FavouritesScreen';

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
      <Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Drawer.Screen name="FavouritesScreen" component={FavouritesScreen} />
      <Drawer.Screen name="PostCommentsScreen" component={PostCommentsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
