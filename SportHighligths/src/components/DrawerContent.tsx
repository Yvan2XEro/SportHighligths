import {Box, Icon, Row, ScrollView, Text, View} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserInfos from './UserInfos';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DrawerContent = ({navigation}: {navigation: any}) => {
  return (
    <View flex={1}>
      <Box py={6} bgColor="primary.500" flex={0.25}>
        <Box mx={2}>
          <UserInfos showPubsCount={false} />
        </Box>
      </Box>
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
          label="Se connecter"
          icon={<MaterialIcons name="login" />}
          onpress={() =>
            navigation.navigate('AuthStackNavigation', {
              screen: 'LoginScreen',
            })
          }
        />
        <CustomDrawerItem
          label="Creer un compte"
          icon={<FontAwesome5 name="user-plus" />}
          onpress={() =>
            navigation.navigate('AuthStackNavigation', {
              screen: 'RegisterScreen',
            })
          }
        />
        <CustomDrawerItem
          label="Parametres"
          icon={<Ionicons name="md-settings-outline" />}
        />
      </ScrollView>
      <Box px={3} flex={0.1} justifyContent="space-between">
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
          <Icon flex={2} as={icon} size={7} />
          <Text flex={8} ml={2} fontWeight="bold">
            {label}
          </Text>
        </Row>
        <Icon flex={2} as={<MaterialIcons name="chevron-right" />} size={8} />
      </Row>
    </TouchableOpacity>
  );
};
