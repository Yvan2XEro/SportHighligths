import React, {useCallback, useState} from 'react';
import {Avatar, Box, Icon, Image, Pressable, Row, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Post as IPost} from '../types';
import {formatDate, http} from '../services';

const Post = ({
  data,
  onFocus,
  focusedPost,
}: {
  data: IPost;
  onFocus?: () => void;
  focusedPost?: number | null;
}) => {
  const navigation = useNavigation();
  const [post, setPost] = useState<IPost>(data);
  const handleLike = useCallback(async () => {
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
    <Box my={2}>
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
      <Box mt={1}>
        {
          <Image
            source={{uri: post.images[0]?.image}}
            alt="Publication"
            width="100%"
            height={400}
          />
        }
      </Box>
      <Box mt={2} flexDirection="row">
        <Pressable onPress={handleLike} flexDirection="row" alignItems="center">
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
              navigation.navigate('ViewPostScreen' as never, {post} as never)
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
      {focusedPost !== post.id && (
        <Box
          flexDirection="row"
          borderWidth={0.3}
          borderColor="primary.500"
          borderRadius={5}
          p={2}
          mt={2}>
          <TouchableOpacity onPress={onFocus} style={{flex: 0.9}}>
            <Text color="text.900">Commenter...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 0.1}}>
            <Icon
              color="primary.500"
              size={6}
              as={<Ionicons name="images" />}
            />
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
};

export default Post;
