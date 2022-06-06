import React, {useEffect, useState} from 'react';
import {Avatar, Box, Icon, Image, Row, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Post as IPost} from '../types';

const image =
  'https://cdn.pixabay.com/photo/2020/04/30/09/18/man-5112054__340.jpg';

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
  const [img, setImg] = useState('../assets/abou.jpg');
  return (
    <Box my={2}>
      <Row justifyContent="space-between">
        <Row alignContent="center">
          <Avatar source={{uri: data.author.avatar}} size={45} />
          <Text color="primary.500" ml={3} fontSize={18} fontWeight="bold">
            {data.author.firstName} {data.author.lastName}
          </Text>
        </Row>
        <Text>2 min ago</Text>
      </Row>
      <Box>Les lions indomptables du Cameroun! 😀</Box>
      <Box mt={1}>
        <Image
          // source={require('../assets/moumi.jpg')}
          source={{uri: data.images[0]?.image}}
          alt="Publication"
          width="100%"
          height={400}
        />
      </Box>
      <Box mt={2} flexDirection="row">
        <Box flexDirection="row" alignItems="center">
          <Icon color="primary.500" size={6} as={<Ionicons name="heart" />} />
          <Text color="primary.500" ml={1}>
            12
          </Text>
        </Box>
        <Box ml={4}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'ViewPostScreen' as never,
                {id: data.id} as never,
              )
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              color="primary.500"
              size={6}
              as={<Ionicons name="chatbubble-outline" />}
            />
            <Text color="primary.500" ml={1}>
              12
            </Text>
          </TouchableOpacity>
        </Box>
        <Box ml={4} flexDirection="row" alignItems="center">
          <Icon
            color="primary.500"
            size={6}
            as={<Ionicons name="ios-share-social-outline" />}
          />
          <Text color="primary.500" ml={1}>
            12
          </Text>
        </Box>
      </Box>
      {focusedPost !== data.id && (
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
