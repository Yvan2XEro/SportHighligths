import {useNavigation, useRoute} from '@react-navigation/native';
import {Box, Icon, Row, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import UserInfos from '../components/UserInfos';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import PostList from '../components/PostList';
import UsersList from '../components/UsersList';
import FloatingInput from '../components/FloatingInput';
import {paperTheme, tabsTheme} from '../themes';
import {User} from '../types';
import {http} from '../services';
import Spinner from '../components/Spinner';

const ProfileScreen = () => {
  const {user} = useRoute().params as {user: User};
  const [loading, setLoading] = useState<boolean>(false);
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  const [u, setU] = useState<User>(user);
  useEffect(() => {
    setLoading(true);
    (async () => {
      http
        .get(`/users/${user.id}`)
        .then(res => {
          setU(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    })();
  }, []);
  return (
    <View flex={1}>
      <Header user={user} />
      <Box bgColor="primary.500" px={2} py={1}>
        <UserInfos data={u} />
      </Box>
      {!loading ? (
        <Box flex={1}>
          <Tabs
            style={{
              backgroundColor: paperTheme.colors.primary[500],
              paddingTop: 5,
            }}
            theme={tabsTheme}
            uppercase={false}
            showLeadingSpace={true}>
            <TabScreen label="Publications">
              <>
                <PostList
                  commentingPostId={commentingPostId}
                  setCommentingPostId={id => setCommentingPostId(id)}
                  emptyText="Aucune publication pour cet utilisateur!"
                  url={`/users/${user.id}/posts`}
                />
                {commentingPostId !== null && (
                  <FloatingInput
                    postId={commentingPostId}
                    onBlur={() => setCommentingPostId(null)}
                  />
                )}
              </>
            </TabScreen>
            <TabScreen label="Abonnnees">
              <Box mt={1} mx={2}>
                <UsersList
                  url={`/users/${user.id}/followers`}
                  emptyText={`Cet utilisateur n'est pas encore suivi par quelqu'un!`}
                />
              </Box>
            </TabScreen>
            <TabScreen label="Abonnnements">
              <Box mt={1} mx={2}>
                <UsersList
                  url={`/users/${user.id}/followings`}
                  emptyText={`Cet utilisateur ne suit personne actuellement!`}
                />
              </Box>
            </TabScreen>
          </Tabs>
        </Box>
      ) : (
        <Spinner />
      )}
    </View>
  );
};

export default ProfileScreen;

export const Header = ({user}: {user: User}) => {
  const navigation = useNavigation();
  return (
    <Box
      bgColor="primary.500"
      px={0.5}
      py={1}
      flexDirection="row"
      justifyContent="space-between">
      <Row alignItems="center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            color="white"
            as={<MaterialIcons name="chevron-left" />}
            size={8}
          />
        </TouchableOpacity>
        <Text fontSize="2xl" color="white">
          {user.firstName} {user.lastName}
        </Text>
      </Row>
      <TouchableOpacity>
        <Icon
          color="white"
          as={<MaterialCommunityIcons name="dots-vertical" />}
          size={8}
        />
      </TouchableOpacity>
    </Box>
  );
};
