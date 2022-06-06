import React, {useContext} from 'react';
import {Box, Button, Icon, Pressable, Row, Text} from 'native-base';
import {TextInput} from './LoginScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {AuthContext} from '../contexts/AuthContextProvider';
import {isValidEmail} from '../services';
import Alert from '../components/Alert';

const RegisterScreen = ({navigation}: any) => {
  const {register} = useContext(AuthContext);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [securePassword, setSecurePassword] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [alertError, setAlertError] = React.useState('');
  const submit = React.useCallback(async () => {
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      isValidEmail(email) &&
      password.length > 6
    ) {
      setSubmitting(true);
      setAlertError('');
      try {
        await register({firstName, lastName, email, password});
      } catch (e: any) {
        console.error(e);
        if (e.response && e.response.status === 401) {
          setAlertError('Identifiants incorrects');
        }
      }
      setSubmitting(false);
    } else {
      setAlertError('Veillez entrer conformement tous les champs!');
    }
  }, [firstName, lastName, email, password]);
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
        {alertError.length > 0 && (
          <Alert
            status="error"
            onClose={() => setAlertError('')}
            text={alertError}
          />
        )}
        <TextInput
          label="Nom"
          icon={<Ionicons name="person-outline" />}
          value={lastName}
          onChangeText={text => setLastName(text)}
          error={
            lastName.length > 0 && lastName.length < 3
              ? 'Le nom doit contenir au moins 3 caractères!'
              : undefined
          }
        />
        <TextInput
          label="Prenom"
          icon={<Ionicons name="person-outline" />}
          value={firstName}
          onChangeText={text => setFirstName(text)}
          error={
            firstName.length > 0 && firstName.length < 3
              ? 'Le prenom doit contenir au moins 3 caractères!'
              : undefined
          }
        />
        <TextInput
          label="Email"
          icon={<Fontisto name="email" />}
          value={email}
          onChangeText={text => setEmail(text)}
          error={
            email.length > 0 && !isValidEmail(email)
              ? 'Adresse email invalide!'
              : undefined
          }
        />
        <TextInput
          label="Mot de passe"
          icon={<MaterialCommunityIcons name="lock-outline" />}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={securePassword}
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
        />
        <Box mt={2}>
          <Row alignItems="center" justifyContent="space-between">
            <Button isLoading={submitting} onPress={submit} minW={100}>
              PROCEDER
            </Button>
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
