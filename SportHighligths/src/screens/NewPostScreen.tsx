import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Alert,
  Box,
  Checkbox,
  FlatList,
  Icon,
  Image,
  Input,
  Row,
  Text,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import {MediaPickable} from '../types';

const NewPostScreen = () => {
  const navigation = useNavigation();
  return (
    <Box>
      <Header navigation={navigation} />
      <ImgPickerWrapper />
    </Box>
  );
};

export default NewPostScreen;

export const Header = ({navigation}: {navigation: NavigationProp<any>}) => {
  return (
    <Row bgColor="primary.500" px={0.5} py={1} alignItems="center">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          color="white"
          as={<MaterialIcons name="chevron-left" />}
          size={8}
        />
      </TouchableOpacity>
      <Box ml={2}>
        <Text color="white" fontWeight="bold">
          Nouvelle publication
        </Text>
      </Box>
      <TouchableOpacity style={{marginLeft: 'auto'}}>
        <Row alignItems="center">
          <Text color="white">Publier</Text>
          <Icon
            color="white"
            as={<MaterialIcons name="chevron-right" />}
            size={8}
          />
        </Row>
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
const ImgPickerWrapper = () => {
  const cleanupImages = useCallback(() => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch((e: any) => {
        Alert(e);
      });
  }, [ImagePicker]);
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
          setMedias([...medias, {uri: image.path, mime: image.mime}]);
        })
        .catch((e: any) => {
          Alert(e);
        });
    },
    [ImagePicker, cleanupImages],
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
      }).then((pickedMideias: any) => {
        setMedias([
          ...medias,
          ...pickedMideias.map((m: any) => ({uri: m.path, mime: m.mime})),
        ]);
      });
    },
    [ImagePicker, cleanupImages],
  );
  const [medias, setMedias] = React.useState<MediaPickable[]>([]);
  return (
    <Box>
      <Row ml="auto" justifyContent="space-between">
        <TouchableOpacity
          style={{marginRight: 7}}
          onPress={() => pickMediaWithCamera('photo', false)}>
          <Icon as={<MaterialCommunityIcons name="camera" />} size={8} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 7}}
          onPress={() => pickExistingMedias('photo', false)}>
          <Icon as={<MaterialCommunityIcons name="image" />} size={8} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 7}}
          onPress={() => pickMediaWithCamera('video', false)}>
          <Icon as={<MaterialCommunityIcons name="video" />} size={8} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginRight: 7}}
          onPress={() => pickExistingMedias('video', false)}>
          <Icon as={<MaterialIcons name="video-collection" />} size={8} />
        </TouchableOpacity>
      </Row>
      <Box borderWidth={0.3} borderRadius={5} m={2}>
        <Input
          variant="unstyled"
          placeholder="Commentaire..."
          multiline
          numberOfLines={4}
        />
      </Box>
      <Box>
        <FlatList
          data={medias}
          keyExtractor={(_, index) => '' + index}
          numColumns={4}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{position: 'relative'}}
                onLongPress={undefined}>
                {item.mime &&
                item.mime.toLowerCase().indexOf('video/') === -1 ? (
                  <Image
                    key={index}
                    source={{uri: item.uri}}
                    style={{
                      width: IMAGE_SIZE - 10,
                      height: IMAGE_SIZE - 10,
                      margin: 5,
                    }}
                    alt="media"
                  />
                ) : (
                  <Video
                    key={index}
                    source={{uri: item.uri}}
                    style={{
                      width: IMAGE_SIZE - 10,
                      height: IMAGE_SIZE - 10,
                      margin: 5,
                    }}
                    resizeMode="cover"
                    controls={true}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
      </Box>
    </Box>
  );
};
