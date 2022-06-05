import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import PostStackNavigation from './PostStackNavigation';
import UsersNavigation from './UsersNavigation';
import HighlightsStackNavigation from './HighlightsStackNavigation';
import Tabbar from '../components/Tabbar';

const Tab = createBottomTabNavigator();
const AppTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <Tabbar {...props} />}>
      <Tab.Screen
        name="PostStackNavigation"
        component={PostStackNavigation}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Ionicons
                name={!focused ? 'md-home-outline' : 'md-home'}
                size={25}
                color={color}
              />
            );
          },
          tabBarLabel: 'Acceuil',
        }}
      />
      <Tab.Screen
        name="UsersNavigation"
        component={UsersNavigation}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Ionicons
                name={!focused ? 'people-outline' : 'people'}
                size={25}
                color={color}
              />
            );
          },
          tabBarLabel: 'Amis',
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Ionicons
                name={!focused ? 'md-search-outline' : 'md-search'}
                size={25}
                color={color}
              />
            );
          },
          tabBarLabel: 'Rechercher',
        }}
      />
      <Tab.Screen
        name="HighlightsStackNavigation"
        component={HighlightsStackNavigation}
        options={{
          tabBarIcon: ({focused, color}) => {
            return (
              <Ionicons
                name={!focused ? 'star-outline' : 'star'}
                size={25}
                color={color}
              />
            );
          },
          tabBarLabel: 'Moments forts',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigation;
