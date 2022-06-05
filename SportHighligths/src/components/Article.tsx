import {Dimensions} from 'react-native';
import React from 'react';
import {Box, Image, Row, Text, View} from 'native-base';
import Video from 'react-native-video';

const VIDEO_WIN_WIDTH = Dimensions.get('window').width;

const Article = () => {
  return (
    <View flex={1} mb={1}>
      <Row>
        <Image
          source={require('../assets/siany.jpg')}
          style={{width: 100, height: 100}}
          borderRadius={3}
          alt="Img"
        />
        <Text ml={1} fontWeight="bold" fontSize={18}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid,
          velit.
        </Text>
      </Row>
    </View>
  );
};

export default Article;
