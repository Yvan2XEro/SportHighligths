import {ScrollView, View} from 'native-base';
import React from 'react';
import Post from './Post';

const PostList = ({
  setCommentingPostId,
  commentingPostId,
  posts,
}: {
  setCommentingPostId: (id: number | null) => void;
  commentingPostId: number | null;
  posts: any[];
}) => {
  return (
    <ScrollView>
      <Post
        data={{id: 1}}
        onFocus={() => setCommentingPostId(1)}
        focusedPost={commentingPostId}
      />
      <Post
        data={{id: 2}}
        onFocus={() => setCommentingPostId(2)}
        focusedPost={commentingPostId}
      />
      <Post
        data={{id: 3}}
        onFocus={() => setCommentingPostId(3)}
        focusedPost={commentingPostId}
      />
      <Post
        data={{id: 4}}
        onFocus={() => setCommentingPostId(4)}
        focusedPost={commentingPostId}
      />
    </ScrollView>
  );
};

export default PostList;
