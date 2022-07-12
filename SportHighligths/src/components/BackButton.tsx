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
      borderColor="gray.300"
      borderRadius={6}
      borderWidth={0.7}
      onPress={() => {
        if (prevRoute) return navigation.navigate(prevRoute as never);
        if (backRoute === null) navigation.goBack();
        else {
          let r = {...backRoute};
          dispatch(removeRoute());
          navigation.navigate(r);
        }
      }}>
      <Icon color="white" as={<MaterialIcons name="chevron-left" />} size={9} />
    </Pressable>
  );
};

export default BackButton;
