import React, {useCallback, useContext, useState} from 'react';
import {Avatar, Box, Icon, Image, Pressable, Row, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Post as IPost} from '../types';
import {formatDate, http} from '../services';
import ImagesViewerContextProvider, {
  ImagesViewerContext,
} from '../contexts/ImagesViewerContextProvider';

const Post = ({data}: {data: IPost}) => {
  const navigation = useNavigation();
  const [post, setPost] = useState<IPost>(data);

  const handleLike = useCallback(async () => {
    setPost({
      ...post,
      likesCount: post.liked ? post.likesCount - 1 : post.likesCount + 1,
      liked: !post.liked,
    });
    if (!post.liked)
      http.post(`/posts/${post.id}/like`).then(res => {
        setPost({...post, liked: true, likesCount: post.likesCount + 1});
      });
    else
      http.delete(`/posts/${post.id}/like`).then(res => {
        setPost({...post, liked: false, likesCount: post.likesCount - 1});
      });
  }, [post]);
  return (
    <ImagesViewerContextProvider>
      <Box
        my={1}
        py={1}
        px={0.5}
        borderWidth={0.3}
        borderColor="primary.500"
        borderRadius={3}>
        <Row justifyContent="space-between">
          <Row alignContent="center">
            <Avatar source={{uri: post.author.avatar}} size={45} />
            <Text color="primary.500" ml={3} fontSize={18} fontWeight="bold">
              {post.author.firstName} {post.author.lastName}
            </Text>
          </Row>
          <Text>{formatDate(post.createdAt)}</Text>
        </Row>
        <Box>{post.content}</Box>
        <ViewableImage images={post.images} />
        <Box mt={2} flexDirection="row">
          <Pressable
            onPress={handleLike}
            flexDirection="row"
            alignItems="center">
            <Icon
              color="primary.500"
              size={6}
              as={<Ionicons name={post.liked ? 'heart' : 'heart-outline'} />}
            />
            <Text color="primary.500" ml={1}>
              {post.likesCount}
            </Text>
          </Pressable>
          <Box ml={4}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'PostCommentsScreen' as never,
                  {post} as never,
                )
              }
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                color="primary.500"
                size={6}
                as={<Ionicons name="chatbubble-outline" />}
              />
              <Text color="primary.500" ml={1}>
                {post.commentsCount}
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </ImagesViewerContextProvider>
  );
};

export default Post;

const ViewableImage = ({images}: {images: {image: string}[]}) => {
  const {openImagesViewer} = useContext(ImagesViewerContext);
  return (
    <Pressable
      onPress={() => openImagesViewer(images.map(i => ({uri: i.image})))}
      mt={1}>
      {images[0]?.image && (
        <Image
          source={{uri: images[0]?.image}}
          alt="Publication"
          width="100%"
          height={400}
        />
      )}
    </Pressable>
  );
};
