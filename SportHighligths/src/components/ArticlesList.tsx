import {FlatList, View} from 'native-base';
import React from 'react';
import Article from './Article';
import Goal from '../assets/goal.svg';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const ArticlesList = () => {
  return (
    <FlatList
      ListHeaderComponent={() => {
        return (
          <View>
            <Goal width={width} height={200} />
          </View>
        );
      }}
      data={[1, 2, 3, 4, 5]}
      renderItem={() => <Article />}
    />
  );
};

export default ArticlesList;
