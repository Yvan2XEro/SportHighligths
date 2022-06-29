import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Box, FlatList, Icon, Input, Pressable, Row, Text} from 'native-base';
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

const NewPostScreen = () => {
  const [medias, setMedias] = React.useState<MediaPickable[]>([]);
  const [comment, setComment] = React.useState('');

  const handlePublish = useCallback(async () => {
    const fd = new FormData();
    fd.append('content', comment);
    fd.append('images', medias);
    http
      .post('/posts/new', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json, text/plain',
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err.response.status);
      });
  }, [medias, comment, http]);
  return (
    <Box>
      <Header onPublish={handlePublish} />

      <ImagesViewerContextProvider>
        <ImgPickerWrapper
          medias={medias}
          setMedias={setMedias}
          comment={comment}
          setComment={setComment}
        />
      </ImagesViewerContextProvider>
    </Box>
  );
};

export default NewPostScreen;

export const Header = ({onPublish}: {onPublish: () => void}) => {
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
      <TouchableOpacity style={{marginLeft: 'auto'}} onPress={onPublish}>
        <Text color="white" textTransform="uppercase" fontWeight="bold">
          Publier
        </Text>
      </TouchableOpacity>
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
}: {
  medias: MediaPickable[];
  setMedias: (i: MediaPickable[]) => void;
  comment: string;
  setComment: (c: string) => void;
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
    <Box>
      <Box bgColor="primary.500">
        <Row ml="auto" justifyContent="space-between">
          <TouchableOpacity
            style={{marginRight: 7}}
            onPress={() => pickMediaWithCamera('photo', false)}>
            <Icon
              color="white"
              as={<MaterialCommunityIcons name="camera" />}
              size={8}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: 7}}
            onPress={() => pickExistingMedias('photo', false)}>
            <Icon
              color="white"
              as={<MaterialCommunityIcons name="image-plus" />}
              size={8}
            />
          </TouchableOpacity>
          {medias.length > 0 && (
            <TouchableOpacity
              style={{marginRight: 7}}
              onPress={() => {
                setAnimateDeleting(true);
                setTimeout(() => {
                  cleanupImages();
                  setMedias([]);
                }, ANIMATION_DURATION);
              }}>
              <Icon
                as={<MaterialCommunityIcons name="notification-clear-all" />}
                size={8}
                color="white"
              />
            </TouchableOpacity>
          )}
        </Row>
      </Box>
      <Box borderWidth={0.3} borderRadius={5} m={2}>
        <Input
          value={comment}
          onChangeText={setComment}
          variant="unstyled"
          placeholder="Commentaire..."
          multiline
        />
      </Box>
      <Box>
        <FlatList
          data={medias}
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
    </Box>
  );
};

const ANIMATION_DURATION = 700;
