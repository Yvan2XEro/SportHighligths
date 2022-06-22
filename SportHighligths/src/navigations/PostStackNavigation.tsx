import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PostCommentsScreen from '../screens/PostCommentsScreen';
import NewPostScreen from '../screens/NewPostScreen';

const Stack = createNativeStackNavigator();
const PostStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PostCommentsScreen" component={PostCommentsScreen} />
      <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
    </Stack.Navigator>
  );
};
export default PostStackNavigation;
