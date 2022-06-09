import {Box, Icon, ScrollView, View} from 'native-base';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import Post from '../components/Post';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingInput from '../components/FloatingInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {http} from '../services';
import {Comment, Post as IPost} from '../types';
import Spinner from '../components/Spinner';
import CommentList from '../components/CommentList';

const ViewPostScreen = () => {
  const [showInput, setShowInput] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const {post: p} = useRoute().params as {post: IPost};
  const [post, setPost] = React.useState<IPost>(p);
  const [refetchFirstsComments, setRefetchFirstsComments] =
    React.useState(false);
  const fetchPost = React.useCallback(
    async (withLoader: boolean = true) => {
      if (withLoader) setLoading(true);
      await http
        .get(`/posts/${p.id}`)
        .then(res => {
          setPost(res.data);
          console.log('fetched...', post.commentsCount);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    },
    [p],
  );
  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);
  return (
    <Box mb={10} position="relative">
      <Header />
      {!loading ? (
        <>
          <View marginX={2}>
            <ScrollView>
              <Post data={post as IPost} onFocus={() => setShowInput(true)} />
              <CommentList
                url={`/posts/${post.id}/comments`}
                emptyText="Pas encore de commentaire pour cette publication!"
                setRefetchFirstsComments={setRefetchFirstsComments}
                refetchFirstsComments={refetchFirstsComments}
                commentsCount={post.commentsCount}
                onChanpostComments={fetchPost}
              />
            </ScrollView>
          </View>
          {showInput && (
            <FloatingInput
              postId={1}
              onBlur={() => setShowInput(false)}
              onComment={() => {
                setPost(v => ({...v, commentsCount: v.commentsCount + 1}));
                setRefetchFirstsComments(true);
                fetchPost(false);
              }}
            />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default ViewPostScreen;

export const Header = () => {
  const navigation = useNavigation();
  return (
    <Box px={0.5} py={1} flexDirection="row" justifyContent="space-between">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon as={<MaterialIcons name="chevron-left" />} size={8} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon as={<MaterialCommunityIcons name="dots-vertical" />} size={8} />
      </TouchableOpacity>
    </Box>
  );
};
