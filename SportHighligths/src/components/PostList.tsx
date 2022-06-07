import {Box, FlatList, ScrollView, View} from 'native-base';
import React, {useEffect} from 'react';
import {http} from '../services';
import {Post as IPost} from '../types';
import Alert from './Alert';
import Post from './Post';
import Spinner from './Spinner';

// é
const PostList = ({
  setCommentingPostId,
  commentingPostId,
  url,
  emptyText = 'Aucune publication pour le moment 😢, veillez vous abonner à des amis.',
}: {
  setCommentingPostId: (id: number | null) => void;
  commentingPostId: number | null;
  url: string;
  emptyText?: string;
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
      return http
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
    <>
      {!fetching && posts.length === 0 && (
        <Box m={3}>
          <Alert status="warning" text={emptyText} />
        </Box>
      )}
      <FlatList
        data={posts}
        keyExtractor={(p, i) => i + '' + p.id}
        onScrollEndDrag={fetchNextPage}
        ListFooterComponent={fetching ? <Spinner text="" /> : undefined}
        renderItem={({item}) => (
          <Post
            focusedPost={commentingPostId}
            onFocus={() => setCommentingPostId(item.id)}
            data={item}
          />
        )}
      />
    </>
  );
};

export default PostList;
