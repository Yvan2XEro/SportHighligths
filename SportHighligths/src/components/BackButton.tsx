import React from 'react';
import {Icon, Pressable} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      backgroundColor="gray.300"
      borderRadius={15}
      onPress={() => navigation.goBack()}>
      <Icon
        color="primary.500"
        as={<MaterialIcons name="chevron-left" />}
        size={8}
      />
    </Pressable>
  );
};

export default BackButton;
