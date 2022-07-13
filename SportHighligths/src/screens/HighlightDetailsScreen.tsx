import {useRoute} from '@react-navigation/native';
import {
  Box,
  Center,
  FlatList,
  Icon,
  Image,
  Pressable,
  Row,
  Text,
} from 'native-base';
import React, {useContext, useEffect} from 'react';
import {Dimensions} from 'react-native';
import BackButton from '../components/BackButton';
import ImagesViewerContextProvider, {
  ImagesViewerContext,
} from '../contexts/ImagesViewerContextProvider';
import {textSice} from '../services';
import {Highlight} from '../types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const HighlightDetailsScreen = () => {
  const {data} = useRoute().params as {data: Highlight};
  const {title, posts, description} = data;
  const [images, setImages] = React.useState<string[]>([]);
  useEffect(() => {
    setImages([]);
    posts.forEach(post => {
      post.images.forEach(image => {
        setImages(images => [...images, image.image]);
      });
    });
  }, []);
  return (
    <Box flex={1}>
      <Header title={textSice(title, 35)} />

      <Box px={2}>
        <Text fontSize="xl" fontFamily="ProductSans-Regular">
          {title}
        </Text>
        <ImagesViewerContextProvider>
          <FlatList
            data={images}
            horizontal={true}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => {
              return <ImageElement images={images} index={index} uri={item} />;
            }}
          />
        </ImagesViewerContextProvider>
        <Text fontFamily="ProductSans-Regular" mt={2}>
          {description}
        </Text>
        <Pressable>
          <Row mt={10} alignItems="center">
            <Text fontFamily="ProductSans-Medium">Interessant?</Text>
            <Icon
              color="primary.500"
              ml={2}
              as={<SimpleLineIcons name="like" />}
              size={7}
            />
          </Row>
        </Pressable>
      </Box>
    </Box>
  );
};

export default HighlightDetailsScreen;

const Header = ({title}: {title: string}) => {
  return (
    <Row px={2} alignItems="center" bgColor="primary.500">
      <BackButton />
      <Text
        fontFamily="ProductSans-Bold"
        ml={1}
        fontSize="md"
        textTransform="uppercase"
        color="white">
        {title}
      </Text>
    </Row>
  );
};

const ImageElement = ({
  uri,
  index,
  images,
}: {
  uri: string;
  index: number;
  images: string[];
}) => {
  const {openImagesViewer} = useContext(ImagesViewerContext);
  return (
    <Pressable
      onPress={() =>
        openImagesViewer(
          images.map(i => ({uri: i})),
          index,
        )
      }
      bgColor="amber.400"
      mr={1.5}>
      <Image
        source={{uri}}
        style={{width: width / 2, height: 200}}
        borderRadius={3}
        alt="Img"
      />
    </Pressable>
  );
};

const {width} = Dimensions.get('window');
