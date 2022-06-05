import React from 'react';
import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/navigations/DrawerNavigation';
import {Provider as PaperProvider} from 'react-native-paper';
import {paperTheme} from './src/themes';

const App = () => {
  return (
    <NativeBaseProvider theme={paperTheme}>
      <PaperProvider>
        <StatusBar
          backgroundColor={paperTheme.colors.primary[500]}
          barStyle={'light-content'}
        />
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  );
};

export default App;
