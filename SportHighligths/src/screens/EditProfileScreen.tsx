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
import ImagePicker from 'react-native-image-crop-picker';
import {uniqueid} from '../services/utils';
import {paperTheme} from '../themes';

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

  const handleSetAvatar = useCallback(() => {
    fetchUser();
    onClose();
  }, []);

  useEffect(() => setU(user), [user]);
  return (
    <View flex={1}>
      <Header submitting={submitting} onSubmit={onSubmit} />
      <ScrollView position="relative">
        <Box h={100} backgroundColor="primary.500" />
        <AvatarWrapper onPress={onOpen} user={user} />
        <Box mt={10} px={3}>
          <Text
            mt={5}
            textAlign="center"
            textTransform="uppercase"
            fontFamily="ProductSans-Bold">
            Informations personnelles
          </Text>
          <>
            <TextInput
              labelColor={paperTheme.colors.text[600]}
              value={u.lastName}
              onChangeText={text => setU(u => ({...u, lastName: text}))}
              icon={<Ionicons name="person-outline" />}
              label="Nom:"
            />
            <TextInput
              labelColor={paperTheme.colors.text[600]}
              value={u.firstName}
              onChangeText={text => setU(u => ({...u, firstName: text}))}
              icon={<Ionicons name="person-outline" />}
              label="Prenom:"
            />
            <TextInput
              labelColor={paperTheme.colors.text[600]}
              value={u.email}
              onChangeText={text => setU(u => ({...u, email: text}))}
              icon={<Fontisto name="email" />}
              label="Adresse Email:"
            />
          </>
          <Text
            mt={5}
            textAlign="center"
            textTransform="uppercase"
            fontFamily="ProductSans-Bold">
            Changer le mot de passe
          </Text>
          <>
            <TextInput
              labelColor={paperTheme.colors.text[600]}
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
              labelColor={paperTheme.colors.text[600]}
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
            <ImageActions
              profilUrl={user.avatar}
              onSetProfile={handleSetAvatar}
            />
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
        fontFamily="ProductSans-Bold"
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

type IImageActionsProps = {
  profilUrl: string;
  onSetProfile: () => void;
};
const ImageActions = ({profilUrl, onSetProfile}: IImageActionsProps) => {
  const {openImagesViewer, closeImagesViewer} = useContext(ImagesViewerContext);
  const toast = useToast();

  const [img, setImg] = useState<MediaPickable>();
  const [loading, setLoading] = useState(false);

  const onPicked = useCallback(pickedImage => {
    setImg({
      uri: pickedImage.path,
      type: pickedImage.mime,
      name: uniqueid() + '.' + pickedImage.path.split('.').slice(-1)[0],
    });
  }, []);

  const pickImage = useCallback(() => {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      mediaType: 'photo',
    }).then(onPicked);
  }, [ImagePicker, openImagesViewer]);

  const pickWithCamera = useCallback(() => {
    ImagePicker.openCamera({
      cropping: true,
      multiple: false,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      mediaType: 'photo',
    }).then(onPicked);
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
      http
        .put('auth/set-avatar', fd, conf)
        .then(response => {
          toast.show('SUCCESS');
          setLoading(false);
          onSetProfile();
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
        <Pressable
          onPress={pickWithCamera}
          flexDirection="row"
          alignItems="center">
          <Icon as={<MaterialCommunityIcons name="camera" />} size={25} />
          <Text ml={2}>Prendre une photo</Text>
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
      <Row alignSelf="center" mt={1}>
        <Button
          onPress={() => setImg(undefined)}
          disabled={loading}
          // leftIcon={<Icon as={<MaterialCommunityIcons name="close" />} />}
          variant="outline"
          borderColor="error.500">
          <Text color="error.500">ANNULER</Text>
        </Button>
        <Button onPress={handleSet} isLoading={loading} minW={130} ml={2}>
          UTILISER
        </Button>
      </Row>
    </Box>
  );
};
