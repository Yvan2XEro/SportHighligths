import {Box, Icon, Row, ScrollView, Text, View} from 'native-base';
import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserInfos from './UserInfos';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../contexts/AuthContextProvider';
import {Alert} from 'react-native';
import {User} from '../types';

const DrawerContent = ({navigation}: {navigation: any}) => {
  const {logout, user} = useContext(AuthContext) as {
    logout: () => void;
    user: User;
  };
  return (
    <View flex={1}>
      <Box position="relative" py={10} bgColor="primary.500" flex={0.25}>
        <Box mx={2}>
          <UserInfos showPubsCount={false} data={user} />
          <Text textAlign="center" fontWeight="700" color="white" fontSize="md">
            {user?.firstName} {user?.lastName}
          </Text>
        </Box>
      </Box>
      <Text textAlign="center" color="primary.500">
        {user?.email}
      </Text>
      <ScrollView px={3} mt={6}>
        <CustomDrawerItem
          label="Acceuil"
          icon={<Ionicons name="home-outline" />}
          onpress={() => navigation.navigate('AppTabNavigation')}
        />
        <CustomDrawerItem
          label="Mes equipes favoris"
          icon={<Ionicons name="star" />}
        />
        <CustomDrawerItem
          label="Mes recomandations"
          icon={<MaterialIcons name="recommend" />}
        />
        <CustomDrawerItem
          label="Mon compte"
          icon={<MaterialIcons name="account-circle" />}
        />
        <CustomDrawerItem
          label="Parametres"
          icon={<Ionicons name="md-settings-outline" />}
        />
      </ScrollView>
      <Box px={3} flex={0.1} justifyContent="space-between">
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => {
            Alert.alert(
              'ATTENTION!',
              'Vous allez vous deconnecter!',
              [
                {
                  text: 'Annuler',
                  style: 'cancel',
                },
                {
                  text: 'Confirmer',
                  onPress: () => {
                    navigation.closeDrawer();
                    logout();
                  },
                },
              ],
              {cancelable: false},
            );
          }}>
          <Text>Logout</Text>
          <Icon as={<MaterialIcons name="chevron-right" />} size={8} />
        </TouchableOpacity>
      </Box>
    </View>
  );
};

export default DrawerContent;

const CustomDrawerItem = ({
  label,
  icon,
  onpress,
}: {
  label: string;
  icon: any;
  onpress?: any;
}) => {
  return (
    <TouchableOpacity style={{marginBottom: 8}} onPress={onpress}>
      <Row justifyContent="space-between">
        <Row flex={8}>
          <Icon color="primary.500" flex={2} as={icon} size={7} />
          <Text flex={8} ml={2} fontWeight="bold">
            {label}
          </Text>
        </Row>
        <Icon flex={2} as={<MaterialIcons name="chevron-right" />} size={8} />
      </Row>
    </TouchableOpacity>
  );
};
