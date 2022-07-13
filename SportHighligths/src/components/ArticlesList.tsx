import {FlatList, View} from 'native-base';
import React, {useEffect} from 'react';
import Article from './Article';
import JuniorSoccer from '../assets/junior_soccer.svg';
import {Dimensions} from 'react-native';
import {http} from '../services';
import {Highlight} from '../types';
import Spinner from './Spinner';

const {width} = Dimensions.get('screen');

const ArticlesList = ({url}: {url: string}) => {
  const [articles, setArticles] = React.useState<Highlight[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [nextUrl, setNextUrl] = React.useState<string | null>(url);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async (withLoader = true) => {
    if (withLoader) setLoading(true);
    http
      .get(url)
      .then(res => {
        console.log(nextUrl, url);
        if (nextUrl === url) setArticles(res.data.results);
        else setArticles(articles.concat(res.data.results));
        setNextUrl(res.data.next);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <FlatList
      ListHeaderComponent={() => {
        return loading ? (
          <Spinner size="lg" text="" />
        ) : (
          <View>
            <JuniorSoccer width={width} height={150} />
          </View>
        );
      }}
      data={articles}
      renderItem={({item}) => <Article data={item} />}
    />
  );
};

export default ArticlesList;
