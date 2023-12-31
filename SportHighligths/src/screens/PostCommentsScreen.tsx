import {Box, Icon, Row, Text, View} from 'native-base';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingInput from '../components/FloatingInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {http, numConverter, textSice} from '../services';
import {Post as IPost} from '../types';
import Spinner from '../components/Spinner';
import CommentList from '../components/CommentList';
import BackButton from '../components/BackButton';

const PostCommentsScreen = () => {
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
    <Box height="100%">
      <Header post={post} />
      {!loading && (
        <>
          <View mb={65} marginX={2}>
            <CommentList
              url={`/posts/${post.id}/comments`}
              emptyText="Soyez la premiere peresonne a commenter!"
              setRefetchFirstsComments={setRefetchFirstsComments}
              refetchFirstsComments={refetchFirstsComments}
              commentsCount={post.commentsCount}
              onChanpostComments={() => fetchPost(false)}
            />
          </View>
        </>
      )}
      <FloatingInput
        postId={post.id}
        onComment={() => {
          setPost(v => ({...v, commentsCount: v.commentsCount + 1}));
          setRefetchFirstsComments(true);
          fetchPost(false);
        }}
      />
    </Box>
  );
};

export default PostCommentsScreen;

export const Header = ({post}: {post: IPost}) => {
  return (
    <Row
      backgroundColor="primary.500"
      alignItems="center"
      px={1}
      py={1}
      justifyContent="space-between">
      <BackButton />
      <Row>
        <Box ml={0}>
          <Text
            color="white"
            fontWeight="bold"
            fontSize="md"
            textTransform="uppercase">
            Commentaires
          </Text>
          <Text color="white" fontSize="sm">
            Publie par{' '}
            {textSice(post.author.firstName + ' ' + post.author.lastName)} ({' '}
            {numConverter(post.commentsCount)}
            Commentaires)
          </Text>
        </Box>
      </Row>
      <TouchableOpacity>
        <Icon
          color="white"
          as={<MaterialCommunityIcons name="dots-vertical" />}
          size={8}
        />
      </TouchableOpacity>
    </Row>
  );
};
