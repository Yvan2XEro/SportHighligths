import {Box, FlatList, ScrollView, View} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {http} from '../services';
import {paperTheme} from '../themes';
import {Post as IPost} from '../types';
import NoData from './NoData';
import Post from './Post';
import Spinner from './Spinner';

// é
const PostList = ({
  url,
  emptyText = 'Aucune publication pour le moment 😢, veillez vous abonner à des amis.',
  onScroll,
  onGotoComments,
}: {
  url: string;
  emptyText?: string;
  onScroll?: (v: number) => void;
  onGotoComments?: () => void;
}) => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [nextUrl, setNextUrl] = React.useState<string | null>(url);
  const [fetching, setFetching] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

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
          <NoData text={emptyText} />
        ) : undefined
      }
      contentContainerStyle={onScroll ? {marginTop: 43} : undefined}
      keyExtractor={(p, i) => i + '' + p.id}
      onScrollEndDrag={() => fetchNextPage()}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={fetching ? <Spinner text="" /> : undefined}
      renderItem={({item}) => (
        <Post data={item} onGotoComments={onGotoComments} />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={{zIndex: 1.2}}
          colors={[paperTheme.colors.primary[500]]}
          tintColor={paperTheme.colors.primary[500]}
        />
      }
      onScroll={e => {
        if (!!onScroll) onScroll(e.nativeEvent.contentOffset.y);
      }}
    />
  );
};

export default PostList;
