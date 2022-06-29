import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  Icon,
  Image,
  Pressable,
  Row,
  ScrollView,
  Text,
  useDisclose,
  View,
} from 'native-base';
import BackButton from '../components/BackButton';
import {AuthContext} from '../contexts/AuthContextProvider';
import {MediaPickable, User} from '../types';
import {TextInput} from './LoginScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {http} from '../services';
import {useToast} from 'react-native-toast-notifications';
import ImagesViewerContextProvider, {
  ImagesViewerContext,
} from '../contexts/ImagesViewerContextProvider';
import {ImageSource} from 'react-native-image-viewing/dist/@types';
import ImagePicker from 'react-native-image-crop-picker';
import {uniqueid} from '../services/utils';

const EditProfileScreen = () => {
  const {user, fetchUser} = useContext(AuthContext) as {
    user: User;
    fetchUser: () => void;
  };
  const {onOpen, onClose, isOpen} = useDisclose();
  const toast = useToast();

  const [submitting, setSubmitting] = useState(false);
  const [u, setU] = useState({...user});

  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [securePassword, setSecurePassword] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = useCallback(async () => {
    if (oldPassword === newPassword && newPassword.length >= 6) {
      setSubmitting(true);
      http
        .put('/auth/set-password', {oldPassword, newPassword})
        .then(() => {
          setSubmitting(false);
          toast.show('Success!');
        })
        .catch(() => {
          setSubmitting(false);
        });
    } else if (
      u.firstName !== user.firstName ||
      u.lastName !== user.lastName ||
      u.email !== user.email
    ) {
      setSubmitting(true);
      http
        .put('/auth/me', u)
        .then(() => {
          setSubmitting(false);
          toast.show('Success!');
          fetchUser();
        })
        .catch(() => {
          setSubmitting(false);
        });
    }
  }, [oldPassword, newPassword, u, user]);
  return (
    <View flex={1}>
      <Header submitting={submitting} onSubmit={onSubmit} />
      <ScrollView position="relative">
        <Box h={100} backgroundColor="primary.500" />
        <AvatarWrapper onPress={onOpen} user={user} />
        <Box mt={10} px={3}>
          <Text mt={5} textAlign="center" textTransform="uppercase">
            Informations personnelles
          </Text>
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
          <Text mt={5} textAlign="center" textTransform="uppercase">
            Changer le mot de passe
          </Text>
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
                        name={
                          secureOldPassword ? 'eye-outline' : 'eye-off-outline'
                        }
                      />
                    }
                  />
                </Pressable>
              }
              secureTextEntry={secureOldPassword}
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
                        name={
                          securePassword ? 'eye-outline' : 'eye-off-outline'
                        }
                      />
                    }
                  />
                </Pressable>
              }
              secureTextEntry={securePassword}
              label="Nouveau mot de passe:"
            />
          </>
        </Box>
      </ScrollView>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <ImagesViewerContextProvider>
          <Actionsheet.Content>
            <ImageActions profilUrl={user.avatar} />
          </Actionsheet.Content>
        </ImagesViewerContextProvider>
        <Actionsheet.Item onPress={onClose}>Fermer</Actionsheet.Item>
      </Actionsheet>
    </View>
  );
};

export default EditProfileScreen;

const Header = ({
  onSubmit,
  submitting,
}: {
  onSubmit: () => void;
  submitting: boolean;
}) => {
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
      <Button onPress={onSubmit} isLoading={submitting} ml="auto">
        <Text color="white" textTransform="uppercase">
          Enregistrer
        </Text>
      </Button>
    </Row>
  );
};

const AvatarWrapper = ({user, onPress}: {user: User; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress} position="absolute">
      <Avatar
        style={{top: 50}}
        left={5}
        source={{
          uri: user.avatar,
        }}
        size={85}
      />
    </Pressable>
  );
};

const ImageActions = ({profilUrl}: {profilUrl: string}) => {
  const {openImagesViewer, closeImagesViewer} = useContext(ImagesViewerContext);
  const toast = useToast();

  const [img, setImg] = useState<MediaPickable>();
  const [loading, setLoading] = useState(false);

  const pickImage = useCallback(() => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      mediaType: 'photo',
    }).then(pickedImage => {
      setImg({
        uri: pickedImage.path,
        type: pickedImage.mime,
        name: uniqueid() + '.' + pickedImage.path.split('.').slice(-1)[0],
      });
    });
  }, [ImagePicker, openImagesViewer]);

  const handleSet = async () => {
    if (!!img) {
      setLoading(true);
      const fd = new FormData();
      fd.append('avatar', img);
      const conf = {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json, text/plain',
        },
      };
      console.log('.....');
      http
        .put('auth/set-avatar', fd, conf)
        .then(() => {
          toast.show('SUCCESS');
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  return !img ? (
    <>
      <Actionsheet.Item>
        <Pressable
          onPress={() => openImagesViewer([{uri: profilUrl}])}
          flexDirection="row"
          alignItems="center">
          <Icon
            as={<MaterialCommunityIcons name="image-filter-center-focus" />}
            size={25}
          />
          <Text ml={2}>Voir la photo</Text>
        </Pressable>
      </Actionsheet.Item>
      <Actionsheet.Item>
        <Pressable onPress={pickImage} flexDirection="row" alignItems="center">
          <Icon as={<MaterialCommunityIcons name="image-edit" />} size={25} />
          <Text ml={2}>Importer une photo</Text>
        </Pressable>
      </Actionsheet.Item>
      <Actionsheet.Item>
        <Row alignItems="center">
          <Icon as={<MaterialCommunityIcons name="image-remove" />} size={25} />
          <Text ml={2}>Supprimer la photo de profile</Text>
        </Row>
      </Actionsheet.Item>
    </>
  ) : (
    <Box>
      <Image source={{uri: img.uri}} alt="Picked profile image" size={300} />
      <Row mt={1}>
        <Button
          onPress={() => setImg(undefined)}
          disabled={loading}
          leftIcon={<Icon as={<MaterialCommunityIcons name="close" />} />}
          variant="subtle">
          ANNULER
        </Button>
        <Button
          onPress={handleSet}
          isLoading={loading}
          leftIcon={<Icon as={<MaterialCommunityIcons name="check" />} />}
          ml={2}>
          UTILISER
        </Button>
      </Row>
    </Box>
  );
};
