import {Box, FlatList, ScrollView, View} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {http} from '../services';
import {Post as IPost} from '../types';
import Alert from './Alert';
import Post from './Post';
import Spinner from './Spinner';

// é
const PostList = ({
  url,
  emptyText = 'Aucune publication pour le moment 😢, veillez vous abonner à des amis.',
  onScroll,
}: {
  url: string;
  emptyText?: string;
  onScroll?: (v: number) => void;
}) => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [fetching, setFetching] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [nextUrl, setNextUrl] = React.useState<string | null>(url);

  const onRefresh = () => {
    setNextUrl(url);
    setRefreshing(true);
    fetchNextPage(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  const fetchNextPage = useCallback(
    async (withLoader = true) => {
      if (nextUrl) {
        console.log('yoo');
        if (withLoader) setFetching(true);
        http
          .get(nextUrl)
          .then(({data}) => {
            if (nextUrl === url) setPosts(data.results);
            else setPosts(posts.concat(data.results));
            setNextUrl(data.next);
            setFetching(false);
          })
          .catch(e => {
            console.error(e);
            setFetching(false);
          });
      }
    },
    [nextUrl, http],
  );
  return (
    <FlatList
      data={posts}
      ListHeaderComponent={
        !fetching && posts.length === 0 ? (
          <Box my={3} flexShrink={1}>
            <Alert status="warning" text={emptyText} />
          </Box>
        ) : undefined
      }
      keyExtractor={(p, i) => i + '' + p.id}
      onScrollEndDrag={() => fetchNextPage()}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListFooterComponent={fetching ? <Spinner text="" /> : undefined}
      renderItem={({item}) => <Post data={item} />}
      onScroll={e => {
        if (!!onScroll) onScroll(e.nativeEvent.contentOffset.y);
      }}
    />
  );
};

export default PostList;
