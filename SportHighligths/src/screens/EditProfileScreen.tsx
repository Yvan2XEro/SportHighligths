import React, {useContext, useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  Icon,
  Pressable,
  Row,
  ScrollView,
  Text,
  View,
} from 'native-base';
import BackButton from '../components/BackButton';
import {AuthContext} from '../contexts/AuthContextProvider';
import {User} from '../types';
import {TextInput} from './LoginScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfileScreen = () => {
  return (
    <View flex={1}>
      <Header />
      <FormWrapper />
    </View>
  );
};

export default EditProfileScreen;

const Header = () => {
  return (
    <Row bgColor="primary.500" px={2} alignItems="center">
      <BackButton />
      <Text
        ml={2}
        fontSize="md"
        color="white"
        fontWeight="bold"
        textTransform="uppercase">
        editer le profile
      </Text>
      <Button ml="auto">
        <Text color="white" textTransform="uppercase">
          Enregistrer
        </Text>
      </Button>
    </Row>
  );
};

const FormWrapper = () => {
  const {user} = useContext(AuthContext) as {user: User};
  return (
    <ScrollView position="relative">
      <Box h={100} backgroundColor="primary.500" />
      <Avatar
        position="absolute"
        style={{top: 50}}
        left={5}
        source={{
          uri: 'https://lte.ma/wp-content/uploads/2015/06/User-icon.png',
        }}
        size={85}
      />
      <Box mt={10} px={3}>
        <Text mt={5} textAlign="center" textTransform="uppercase">
          Informations personnelles
        </Text>
        <EditProfileForm user={user} />
        <Text mt={5} textAlign="center" textTransform="uppercase">
          Changer le mot de passe
        </Text>
        <ChangePasswordForm />
      </Box>
    </ScrollView>
  );
};

const EditProfileForm = ({user}: {user: User}) => {
  const [u, setU] = useState({...user});
  return (
    <>
      <TextInput
        value={u.lastName}
        onChangeText={text => setU(u => ({...u, lastName: text}))}
        icon={<Ionicons name="person-outline" />}
        label="Nom:"
      />
      <TextInput
        value={u.firstName}
        onChangeText={text => setU(u => ({...u, firstName: text}))}
        icon={<Ionicons name="person-outline" />}
        label="Prenom:"
      />
      <TextInput
        value={u.email}
        onChangeText={text => setU(u => ({...u, email: text}))}
        icon={<Fontisto name="email" />}
        label="Adresse Email:"
      />
    </>
  );
};

const ChangePasswordForm = () => {
  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [securePassword, setSecurePassword] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return (
    <>
      <TextInput
        icon={<MaterialCommunityIcons name="lock-outline" />}
        value={oldPassword}
        onChangeText={setOldPassword}
        right={
          <Pressable onPress={() => setSecureOldPassword(v => !v)}>
            <Icon
              size={5}
              as={
                <Ionicons
                  name={secureOldPassword ? 'eye-outline' : 'eye-off-outline'}
                />
              }
            />
          </Pressable>
        }
        secureTextEntry={securePassword}
        label="Ancien mot de passe:"
      />
      <TextInput
        icon={<MaterialCommunityIcons name="lock-outline" />}
        value={newPassword}
        onChangeText={setNewPassword}
        right={
          <Pressable onPress={() => setSecurePassword(v => !v)}>
            <Icon
              size={5}
              as={
                <Ionicons
                  name={securePassword ? 'eye-outline' : 'eye-off-outline'}
                />
              }
            />
          </Pressable>
        }
        secureTextEntry={securePassword}
        label="Nouveau mot de passe:"
      />
    </>
  );
};
