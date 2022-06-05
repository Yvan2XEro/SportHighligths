import React from 'react';
import {Box, Button, Icon, Pressable, Row, Text} from 'native-base';
import {TextInput} from './LoginScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const RegisterScreen = ({navigation}: any) => {
  return (
    <>
      <Box px={10} flex={0.1}>
        <Text
          fontWeight="bold"
          color="primary.500"
          textTransform="uppercase"
          fontSize={22}
          ml="auto">
          REGISTER
        </Text>
      </Box>
      <Box px={10} flex={0.8} justifyContent="center">
        <TextInput label="Name" icon={<Ionicons name="person-outline" />} />
        <TextInput label="Email" icon={<Fontisto name="email" />} />
        <TextInput
          label="Password"
          icon={<MaterialCommunityIcons name="lock-outline" />}
          right={
            <Pressable>
              <Icon size={5} as={<Ionicons name="eye-outline" />} />
            </Pressable>
          }
        />
        <Box mt={2}>
          <Row alignItems="center" justifyContent="space-between">
            <Button>PROCEDER</Button>
            <Box ml={2}>{/* <Text>Mot de passe oublie?</Text> */}</Box>
          </Row>
        </Box>
      </Box>
      <Box flex={0.1} alignSelf="center">
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Row alignItems="center">
            <Text textTransform="uppercase" fontWeight="700">
              SE CONNECTER
            </Text>
            <Icon as={<MaterialIcons name="chevron-right" />} size={8} />
          </Row>
        </TouchableOpacity>
      </Box>
    </>
  );
};

export default RegisterScreen;
