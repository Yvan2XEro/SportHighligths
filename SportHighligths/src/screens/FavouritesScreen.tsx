import {Row, Text, View} from 'native-base';
import React from 'react';
import BackButton from '../components/BackButton';

const FavouritesScreen = () => {
  return (
    <View>
      <Header />
    </View>
  );
};

export default FavouritesScreen;

const Header = () => {
  return (
    <Row bgColor="primary.500" alignItems="center" px={1}>
      <BackButton />
      <Text textTransform="uppercase" color="white" ml={2}>
        Mes equipes favoris
      </Text>
    </Row>
  );
};
