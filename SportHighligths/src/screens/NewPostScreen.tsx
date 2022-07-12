import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  FlatList,
  Icon,
  Input,
  Pressable,
  Row,
  Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {MediaPickable} from '../types';
import {uniqueid} from '../services/utils';
import {http} from '../services';
import * as Animatable from 'react-native-animatable';
import ImagesViewerContextProvider, {
  ImagesViewerContext,
} from '../contexts/ImagesViewerContextProvider';
import BackButton from '../components/BackButton';
import {useToast} from 'react-native-toast-notifications';
import {paperTheme} from '../themes';

const NewPostScreen = () => {
  const {show} = useToast();
  const [medias, setMedias] = React.useState<MediaPickable[]>([]);
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handlePublish = useCallback(async () => {
    let fd = new FormData();
    fd.append('content', comment);
    if (medias.length > 0) fd.append('images', medias[0]);
    const conf = {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'application/json, text/plain',
      },
    };
    setLoading(true);
    http
      .post('/posts/new', fd, conf)
      .then(response => {
        console.log(response);
        const postId = response.data.id;
        if (medias.length > 1) {
          for (let index = 1; index < medias.length; index++) {
            fd.append('images', medias[index]);
            http.post(`posts/${postId}/add-image`, fd, conf).then(() => {
              if (index == medias.length - 1) {
                setLoading(false);
                show('SUCCESS');
                setMedias([]);
                setComment('');
              }
            });
          }
        } else {
          setLoading(false);
          show('SUCCESS');
          setMedias([]);
          setComment('');
        }
      })
      .catch(err => {
        console.error(err.response);
        setLoading(false);
      });
  }, [medias, comment, http]);
  return (
    <Box flex={1}>
      <Header />

      <ImagesViewerContextProvider>
        <ImgPickerWrapper
          medias={medias}
          setMedias={setMedias}
          comment={comment}
          setComment={setComment}
          valid={medias.length > 0 && comment.length > 0}
          onPublish={handlePublish}
          loading={loading}
        />
      </ImagesViewerContextProvider>
    </Box>
  );
};

export default NewPostScreen;

export const Header = () => {
  return (
    <Row bgColor="primary.500" px={1} py={1} pr={2} alignItems="center">
      <BackButton />
      <Box ml={2}>
        <Text
          fontSize="md"
          textTransform="uppercase"
          color="white"
          fontWeight="bold">
          Nouvelle publication
        </Text>
      </Box>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
const IMAGE_SIZE = Dimensions.get('window').width / 4;
const ImgPickerWrapper = ({
  medias,
  setMedias: sm,
  comment,
  setComment,
  valid,
  onPublish,
  loading,
}: {
  medias: MediaPickable[];
  setMedias: (i: MediaPickable[]) => void;
  comment: string;
  setComment: (c: string) => void;
  valid: boolean;
  onPublish: () => void;
  loading: boolean;
}) => {
  const cleanupImages = useCallback(() => {
    ImagePicker.clean().catch((e: any) => {
      console.error(e);
    });
  }, [ImagePicker]);

  const setMedias = (m: MediaPickable[]) => {
    sm(m);
    setAnimateDeleting(false);
  };

  const pickMediaWithCamera = useCallback(
    (mediaType: 'video' | 'photo', cropping: boolean) => {
      ImagePicker.openCamera({
        cropping,
        multiple: true,
        width: 500,
        height: 500,
        includeExif: true,
        forceJpg: true,
        mediaType,
      })
        .then((image: any) => {
          return setMedias(
            medias.concat([
              {
                uri: image.path,
                type: image.mime,
                name: uniqueid() + '.' + image.path.split('.').slice(-1)[0],
              },
            ]),
          );
        })
        .catch((e: any) => {
          console.error(e);
        });
    },
    [ImagePicker, medias, setMedias],
  );

  const pickExistingMedias = useCallback(
    (mediaType: 'video' | 'photo', cropping: boolean) => {
      ImagePicker.openPicker({
        cropping,
        multiple: true,
        waitAnimationEnd: false,
        sortOrder: 'desc',
        includeExif: true,
        forceJpg: true,
        mediaType,
      }).then((pickedMedias: any) => {
        setMedias(
          medias.concat(
            pickedMedias.map((m: any) => ({
              uri: m.path,
              type: m.mime,
              name: uniqueid() + '.' + m.path.split('.').slice(-1)[0],
            })),
          ),
        );
      });
    },
    [ImagePicker, medias, setMedias],
  );
  const navigation = useNavigation();
  const [animateDeleting, setAnimateDeleting] = useState(false);
  const {openImagesViewer} = useContext(ImagesViewerContext);
  return (
    <Box position="relative" flex={1}>
      <Box>
        <FlatList
          data={medias}
          ListHeaderComponent={
            <Box>
              <Row ml="auto" justifyContent="space-between">
                <Pressable
                  alignItems="center"
                  mr={2}
                  onPress={() => pickMediaWithCamera('photo', false)}>
                  <Icon
                    as={<MaterialCommunityIcons name="camera" />}
                    size={50}
                    color="primary.200"
                  />
                </Pressable>
                <Pressable
                  alignItems="center"
                  mr={2}
                  onPress={() => pickExistingMedias('photo', false)}>
                  <Icon
                    as={<MaterialCommunityIcons name="image-plus" />}
                    size={50}
                    color="primary.200"
                  />
                </Pressable>
                <Pressable
                  onPress={
                    medias.length > 0
                      ? () => {
                          setAnimateDeleting(true);
                          setTimeout(() => {
                            cleanupImages();
                            setMedias([]);
                          }, ANIMATION_DURATION);
                        }
                      : undefined
                  }>
                  <Icon
                    as={
                      <MaterialCommunityIcons name="notification-clear-all" />
                    }
                    size={50}
                    color={medias.length > 0 ? 'error.600' : 'gray.700'}
                  />
                </Pressable>
              </Row>
            </Box>
          }
          keyExtractor={(_, index) => '' + index}
          numColumns={4}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={{position: 'relative'}}
                onPress={() => openImagesViewer(medias, index)}
                onLongPress={() => {
                  console.log('Deleting');
                }}>
                {item.type && item.type.toLowerCase().indexOf('video/') === -1 && (
                  <Animatable.View
                    animation={
                      animateDeleting
                        ? {
                            from: {
                              opacity: 1,
                              left: 0,
                            },
                            to: {
                              opacity: 0,
                              left: -400,
                            },
                          }
                        : undefined
                    }>
                    <Animatable.View
                      style={{zIndex: 1.1}}
                      animation={{
                        from: {
                          opacity: 0,
                          left: -100,
                        },
                        to: {
                          opacity: 1,
                          left: 0,
                        },
                      }}>
                      <Pressable
                        position="absolute"
                        top={0}
                        onPress={() =>
                          setMedias(medias.filter(m => m.name !== item.name))
                        }
                        right={0}>
                        <Icon
                          as={<MaterialCommunityIcons name="close" />}
                          color="danger.500"
                          size={30}
                        />
                      </Pressable>
                    </Animatable.View>
                    <Animatable.Image
                      key={index}
                      animation={{
                        from: {
                          opacity: 0,
                          left: -100,
                        },
                        to: {
                          opacity: 1,
                          left: 0,
                        },
                      }}
                      duration={ANIMATION_DURATION}
                      source={{uri: item.uri}}
                      style={{
                        width: IMAGE_SIZE - 10,
                        height: IMAGE_SIZE - 10,
                        margin: 5,
                      }}
                    />
                  </Animatable.View>
                )}
              </Pressable>
            );
          }}
        />
      </Box>
      <Row
        width={width}
        mx={3}
        position="absolute"
        bottom={3}
        borderWidth={0.3}
        borderRadius={5}>
        <Input
          value={comment}
          flex={0.9}
          onChangeText={setComment}
          variant="unstyled"
          placeholder="Dites quelque chose..."
          multiline
        />
        <Button
          disabled={!valid}
          onPress={onPublish}
          isLoading={loading}
          flex={0.2}>
          PUBLIER
        </Button>
      </Row>
    </Box>
  );
};

const {width} = Dimensions.get('screen');

const ANIMATION_DURATION = 700;
