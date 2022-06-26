import React, {useContext} from 'react';
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
import {store} from './src/store';
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
            <NavigationContainer>
              <AlternateNavigation />
            </NavigationContainer>
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
