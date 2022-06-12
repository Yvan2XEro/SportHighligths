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

const App = () => {
  return (
    <NativeBaseProvider theme={paperTheme}>
      <PaperProvider>
        <AuthContextProvider>
          <StatusBar
            backgroundColor={paperTheme.colors.primary[500]}
            barStyle={'light-content'}
          />
          <NavigationContainer>
            {/* <AuthStackNavigation /> */}
            <AlternateNavigation />
          </NavigationContainer>
        </AuthContextProvider>
      </PaperProvider>
    </NativeBaseProvider>
  );
};

export default App;

const AlternateNavigation = () => {
  const {isLoggedIn} = useContext(AuthContext);

  return isLoggedIn ? <DrawerNavigation /> : <AuthStackNavigation />;
};
