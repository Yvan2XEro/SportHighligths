import React from 'react';
import {Image, Pressable, Row, Text, View} from 'native-base';
import {Highlight} from '../types';
import {useNavigation} from '@react-navigation/native';

type IArticleProps = {
  data: Highlight;
};
const Article = ({data}: IArticleProps) => {
  const imgSource =
    {uri: data.posts[0]?.images[0]?.image} || require('../assets/siany.jpg');
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('HighlightDetailsScreen' as never, {data} as never)
      }
      flex={1}
      mb={1}>
      <Row>
        <Image
          source={imgSource}
          style={{width: 100, height: 100}}
          borderRadius={3}
          alt="Img"
        />
        <Text flexShrink={1} ml={1} fontWeight="bold" fontSize={18}>
          {data.title}
        </Text>
      </Row>
    </Pressable>
  );
};

export default Article;
