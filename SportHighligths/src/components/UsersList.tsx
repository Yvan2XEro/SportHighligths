import {TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Avatar, Box, Button, FlatList, Row, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {User} from '../types';
import {http, numConverter} from '../services';
import Spinner from './Spinner';
import Alert from './Alert';

const UsersList = ({url}: {url: string}) => {
  const [fetching, setFetching] = React.useState(true);
  const [users, setUsers] = React.useState<User[]>([]);
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
          setUsers(users.concat(data.results));
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
      {!fetching && users.length === 0 && (
        <Box m={3}>
          <Alert status="warning" text={`Pas d' élement!`} />
        </Box>
      )}
      <FlatList
        data={users}
        keyExtractor={(u, i) => i + '' + u.id}
        onScrollEndDrag={fetchNextPage}
        ListFooterComponent={fetching ? <Spinner text="" /> : undefined}
        renderItem={({item}) => <UserItem user={item} />}
      />
    </>
  );
};

export default UsersList;

const UserItem = ({user}: {user: User}) => {
  const [loading, setLoading] = React.useState(false);
  const [u, setU] = React.useState<User>({...user});
  const navigation = useNavigation();
  const handleFollow = useCallback(async () => {
    setLoading(true);
    if (!u.followed) {
      http
        .post(`/follow-user/${u.id}`)
        .then(() => {
          setLoading(false);
          setU({...u, followed: true});
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
        });
    } else {
      http
        .delete(`/follow-user/${u.id}`)
        .then(() => {
          setLoading(false);
          setU({...u, followed: false});
        })
        .catch(e => {
          console.error(e);
          setLoading(false);
        });
    }
  }, [u]);
  return (
    <Row mb={1}>
      <TouchableOpacity
        style={{flexDirection: 'row', flex: 6}}
        onPress={() =>
          navigation.navigate('ProfileScreen' as never, {user} as never)
        }>
        <Box>
          <Avatar source={require('../assets/Cover.jpg')} />
        </Box>
        <Box mx={1} flex={1}>
          <Text fontSize={17} fontWeight="bold">
            {u.firstName} {u.lastName}
          </Text>
          <Text flexShrink={1}>
            Suivi par {numConverter(u.followersCount)} personnes(2 amis en
            communs)
          </Text>
        </Box>
      </TouchableOpacity>
      <Box flex={2.5}>
        <Button isLoading={loading} onPress={handleFollow} fontWeight="bol">
          {u.followed ? 'Unfollow' : `Follow`}
        </Button>
      </Box>
    </Row>
  );
};
