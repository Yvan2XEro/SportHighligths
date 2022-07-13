import React, {useContext, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {paperTheme} from './src/themes';
import AuthContextProvider, {
  AuthContext,
} from './src/contexts/AuthContextProvider';
import AuthStackNavigation from './src/navigations/AuthStackNavigation';
import {Provider as ReduxProvider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import {store} from './src/store';
import {enableScreens} from 'react-native-screens';

enableScreens();

const App = () => {
  return (
    <NativeBaseProvider theme={paperTheme}>
      <PaperProvider>
        <ReduxProvider store={store}>
          <AuthContextProvider>
            <StatusBar
              backgroundColor={paperTheme.colors.primary[500]}
              barStyle={'light-content'}
            />
            <ToastProvider
              duration={5000}
              animationType="slide-in"
              animationDuration={250}>
              <NavigationContainer>
                <AlternateNavigation />
              </NavigationContainer>
            </ToastProvider>
          </AuthContextProvider>
        </ReduxProvider>
      </PaperProvider>
    </NativeBaseProvider>
  );
};

export default App;

const AlternateNavigation = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return isLoggedIn ? <DrawerNavigation /> : <AuthStackNavigation />;
};
