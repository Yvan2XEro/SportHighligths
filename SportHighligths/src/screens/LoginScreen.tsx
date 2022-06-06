import {Box, Button, Icon, Input, Pressable, Row, Text} from 'native-base';
import React, {useContext} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {AuthContext} from '../contexts/AuthContextProvider';
import {isValidEmail} from '../services';
import Alert from '../components/Alert';

const LoginScreen = ({navigation}: any) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [securePassword, setSecurePassword] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [alertError, setAlertError] = React.useState('');
  const submit = React.useCallback(async () => {
    if (isValidEmail(email) && password.length > 6) {
      setSubmitting(true);
      setAlertError('');
      try {
        await login(email, password);
      } catch (e: any) {
        console.error(e);
        if (e.response && e.response.status === 401) {
          setAlertError('Identifiants incorrects');
        }
      }
      setSubmitting(false);
    } else {
      setAlertError(
        'Veillez entrer un email valide et un mot de passe de plus de 6 caractères',
      );
    }
  }, [email, password]);

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
        {alertError.length > 0 && (
          <Alert
            status="error"
            onClose={() => setAlertError('')}
            text={alertError}
          />
        )}
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
          value={password}
          onChangeText={text => setPassword(text)}
          error={
            password.length > 0 && password.length < 6
              ? 'Le mot de passe doit contenir au moins 6 caractères!'
              : undefined
          }
          secureTextEntry={securePassword}
          icon={<MaterialCommunityIcons name="lock-outline" />}
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
            <Button isLoading={submitting} minW={100} onPress={submit}>
              SE CONNECTER
            </Button>
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
  value,
  secureTextEntry = false,
  onChangeText,
  error,
  right,
}: {
  icon: any;
  label: string;
  value: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  error?: string | undefined;
  right?: any;
}) => {
  return (
    <Box mb={2}>
      <Text textTransform="uppercase" fontWeight="bold" letterSpacing={0.7}>
        {label}
      </Text>
      <Row backgroundColor="#fff" borderRadius={10} px={2} alignItems="center">
        <Icon as={icon} size={6} />
        <Input
          value={value}
          onChangeText={onChangeText}
          variant="unstyled"
          secureTextEntry={secureTextEntry}
        />
        <Box ml="auto">{right}</Box>
      </Row>
      {error && (
        <Text color="error.500" fontSize="sm">
          {error}
        </Text>
      )}
    </Box>
  );
};
