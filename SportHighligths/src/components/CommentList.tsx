import {Avatar, Box, FlatList, Row, Text} from 'native-base';
import * as React from 'react';
import {formatDate, http} from '../services';
import {Comment} from '../types';
import Alert from './Alert';
import Spinner from './Spinner';

const CommentList = ({
  url,
  emptyText,
  setRefetchFirstsComments,
  refetchFirstsComments,
  onChanpostComments,
  commentsCount,
}: {
  url: string;
  emptyText: string;
  setRefetchFirstsComments: (v: boolean) => void;
  refetchFirstsComments: boolean;
  onChanpostComments: () => void;
  commentsCount: number;
}) => {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [nextCommentsUrl, setNextCommentsUrl] = React.useState<string | null>(
    url,
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchNextComments();
  }, [nextCommentsUrl]);

  React.useEffect(() => {
    if (refetchFirstsComments) {
      setNextCommentsUrl(url);
    }
  }, [refetchFirstsComments]);

  const listRef = React.useRef<any>(null);

  const fetchNextComments = React.useCallback(
    async (withLoader = true) => {
      if (nextCommentsUrl) {
        if (withLoader) setLoading(true);
        if (nextCommentsUrl === url) setRefetchFirstsComments(false);
        await http
          .get(nextCommentsUrl)
          .then(res => {
            setNextCommentsUrl(res.data.next);
            if (nextCommentsUrl === url) {
              setComments(res.data.results);
              listRef.current?.scrollToTop();
            } else setComments(comments.concat(res.data.results));
            setLoading(false);
            if (res.data.count !== commentsCount) {
              onChanpostComments();
            }
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      }
    },
    [comments, nextCommentsUrl],
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setNextCommentsUrl(url);
    fetchNextComments(false);
    setRefreshing(false);
  }, [url]);

  return (
    <>
      <FlatList
        mb={10}
        data={comments}
        ListHeaderComponent={
          !loading && comments.length === 0 ? (
            <Box m={3}>
              <Alert status="warning" text={emptyText} />
            </Box>
          ) : undefined
        }
        ListFooterComponent={
          loading ? <Spinner text="" size="sm" /> : undefined
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <CommentItem data={item} />}
        onScrollEndDrag={() => fetchNextComments()}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </>
  );
};

export default CommentList;

const CommentItem = ({data}: {data: Comment}) => {
  return (
    <Box m={1} p={2} borderRadius={10}>
      <Row>
        <Avatar source={{uri: data.author.avatar}} size={10} />
        <Box ml={2}>
          <Row mr={2}>
            <Text>
              <Text fontWeight="bold">
                {data.author.firstName} {data.author.lastName}{' '}
              </Text>
              <Text>{data.content}</Text>
            </Text>
          </Row>
          <Box mt={1} p={0.5} borderRadius={3} mr="auto">
            <Text fontSize="xs">{formatDate(data.createdAt)}</Text>
          </Box>
        </Box>
      </Row>
    </Box>
  );
};
