import {RefreshControl, TouchableOpacity} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import {Avatar, Box, Button, FlatList, Row, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {User} from '../types';
import {http, numConverter} from '../services';
import Spinner from './Spinner';
import Alert from './Alert';
import {AuthContext} from '../contexts/AuthContextProvider';
import {paperTheme} from '../themes';

const UsersList = ({url, emptyText}: {url: string; emptyText: string}) => {
  const [fetching, setFetching] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const [nextUrl, setNextUrl] = React.useState<string | null>(url);

  useEffect(() => {
    fetchNextPage(true, url);
  }, []);

  const fetchNextPage = useCallback(
    async (withLoader = true, url?: string) => {
      if (!nextUrl && url === undefined) return;
      if (nextUrl || url) {
        if (withLoader) setFetching(true);
        if (!nextUrl && url) setNextUrl(url);
        http
          .get(nextUrl + '')
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
    },
    [nextUrl, http, nextUrl],
  );

  const onRefresh = useCallback(() => {
    setNextUrl(url);
    setRefreshing(true);
    fetchNextPage(false, nextUrl ? nextUrl : undefined);
    setRefreshing(false);
  }, [url]);

  return (
    <FlatList
      data={users}
      ListHeaderComponent={
        !fetching && users.length === 0 ? (
          <Box m={3} flexShrink={1}>
            <Alert status="warning" text={emptyText} />
          </Box>
        ) : undefined
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          style={{zIndex: 1.2}}
          colors={[paperTheme.colors.primary[500]]}
          tintColor={paperTheme.colors.primary[500]}
          onRefresh={onRefresh}
        />
      }
      keyExtractor={(u, i) => i + '' + u.id}
      onScrollEndDrag={() => fetchNextPage()}
      ListFooterComponent={fetching ? <Spinner text="" /> : undefined}
      renderItem={({item}) => <UserItem user={item} />}
    />
  );
};

export default UsersList;

const UserItem = ({user}: {user: User}) => {
  const [loading, setLoading] = React.useState(false);
  const [u, setU] = React.useState<User>({...user});
  const navigation = useNavigation();
  const {user: loggedUser} = useContext(AuthContext);
  const handleFollow = useCallback(async () => {
    setLoading(true);
    if (!u.followed) {
      http
        .post(`/follow-user/${u.id}`)
        .then(() => {
          setLoading(false);
          setU({...u, followed: true, followersCount: u.followersCount + 1});
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
          setU({...u, followed: false, followersCount: u.followersCount - 1});
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
        onPress={
          user.id !== loggedUser.id
            ? () =>
                navigation.navigate('ProfileScreen' as never, {user} as never)
            : undefined
        }>
        <Box>
          <Avatar source={{uri: u.avatar}} />
        </Box>
        <Box mx={1} flex={1}>
          <Text fontSize={17} fontWeight="bold">
            {u.firstName} {u.lastName} {user.id === loggedUser.id && ' (vous)'}
          </Text>
          <Text flexShrink={1}>
            Suivi par {numConverter(u.followersCount)} personnes(2 amis en
            communs)
          </Text>
        </Box>
      </TouchableOpacity>
      <Box flex={2.5}>
        {user.id !== loggedUser.id && (
          <Button
            isLoading={loading}
            variant={u.followed ? 'outline' : 'solid'}
            onPress={handleFollow}
            fontWeight="bol">
            {u.followed ? 'Unfollow' : `Follow`}
          </Button>
        )}
      </Box>
    </Row>
  );
};
