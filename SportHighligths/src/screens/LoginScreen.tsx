import {Box, Button, Icon, Input, Pressable, Row, Text} from 'native-base';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const LoginScreen = ({navigation}: any) => {
  return (
    <>
      <Box px={10} flex={0.1}>
        <Text
          fontWeight="bold"
          color="primary.500"
          textTransform="uppercase"
          fontSize={22}
          ml="auto">
          Login
        </Text>
      </Box>
      <Box px={10} flex={0.8} justifyContent="center">
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
            <Button>SE CONNECTER</Button>
            <Box ml={2}>
              <Text>Mot de passe oublie?</Text>
            </Box>
          </Row>
        </Box>
      </Box>
      <Box flex={0.1} alignSelf="center">
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Row alignItems="center">
            <Text textTransform="uppercase" fontWeight="700">
              Creer un compte maintenant!
            </Text>
            <Icon as={<MaterialIcons name="chevron-right" />} size={8} />
          </Row>
        </TouchableOpacity>
      </Box>
    </>
  );
};

export default LoginScreen;

export const TextInput = ({
  icon,
  label,
  right,
}: {
  icon: any;
  label: string;
  right?: any;
}) => {
  return (
    <Box>
      <Text textTransform="uppercase" fontWeight="bold" letterSpacing={0.7}>
        {label}
      </Text>
      <Row
        mb={2}
        backgroundColor="#fff"
        borderRadius={10}
        px={2}
        alignItems="center">
        <Icon as={icon} size={6} />
        <Input variant="unstyled" />
        <Box ml="auto">{right}</Box>
      </Row>
    </Box>
  );
};
