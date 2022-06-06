import {FlatList, ScrollView, View} from 'native-base';
import React, {useEffect} from 'react';
import {http} from '../services';
import {Post as IPost} from '../types';
import Post from './Post';
import Spinner from './Spinner';

const PostList = ({
  setCommentingPostId,
  commentingPostId,
  url,
}: {
  setCommentingPostId: (id: number | null) => void;
  commentingPostId: number | null;
  url: string;
}) => {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const [fetching, setFetching] = React.useState(true);

  const [nextUrl, setNextUrl] = React.useState<string | null>(url);
  useEffect(() => {
    fetchNextPage();
  }, []);
  const fetchNextPage = async () => {
    if (nextUrl) {
      setFetching(true);
      http
        .get(nextUrl)
        .then(({data}) => {
          setPosts(posts.concat(data.results));
          setNextUrl(data.next);
          setFetching(false);
        })
        .catch(e => {
          console.error(e);
          setFetching(false);
        });
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(p, i) => i + '' + p.id}
      onScrollEndDrag={fetchNextPage}
      ListFooterComponent={fetching ? <Spinner text="" /> : undefined}
      renderItem={({item}) => <Post data={item} />}
    />
  );
};

export default PostList;
