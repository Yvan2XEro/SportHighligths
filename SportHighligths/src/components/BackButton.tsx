import React from 'react';
import {Icon, Pressable} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {removeRoute} from '../store/slices';

const BackButton = ({prevRoute}: {prevRoute?: string}) => {
  const navigation = useNavigation();
  const backRoute = useSelector(({route}: any) => route);
  const dispatch = useDispatch();
  return (
    <Pressable
      backgroundColor="gray.300"
      borderRadius={15}
      onPress={() => {
        if (prevRoute) return navigation.navigate(prevRoute as never);
        if (backRoute === null) navigation.goBack();
        else {
          let r = {...backRoute};
          dispatch(removeRoute());
          navigation.navigate(r);
        }
      }}>
      <Icon
        color="primary.500"
        as={<MaterialIcons name="chevron-left" />}
        size={8}
      />
    </Pressable>
  );
};

export default BackButton;
