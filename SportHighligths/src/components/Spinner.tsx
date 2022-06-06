import {View, Text} from 'react-native';
import React from 'react';
import {Heading, HStack, Spinner as NBSpinner} from 'native-base';

const Spinner = ({
  size = 'lg',
  text = 'Chargement...',
}: {
  size?: 'lg' | 'sm';
  text?: string;
}) => {
  return (
    <HStack space={2} justifyContent="center" alignItems="center">
      <NBSpinner size={size} accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        {text}
      </Heading>
    </HStack>
  );
};

export default Spinner;
