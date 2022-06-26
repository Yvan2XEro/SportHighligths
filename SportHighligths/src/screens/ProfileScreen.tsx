import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Box,
  Divider,
  Icon,
  Menu,
  Pressable,
  Row,
  Text,
  View,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import UserInfos from '../components/UserInfos';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import PostList from '../components/PostList';
import UsersList from '../components/UsersList';
import {paperTheme, tabsTheme} from '../themes';
import {User} from '../types';
import {http, textSice} from '../services';
import Spinner from '../components/Spinner';
import {AuthContext} from '../contexts/AuthContextProvider';
import BackButton from '../components/BackButton';
import {useDispatch} from 'react-redux';
import {saveRoute} from '../store/slices';

const ProfileScreen = () => {
  const route = useRoute();
  const {user} = route.params as {user: User};
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
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
              <PostList
                emptyText="Aucune publication pour cet utilisateur!"
                url={`/users/${user.id}/posts`}
                onGotoComments={() => dispatch(saveRoute(route))}
              />
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
  return (
    <Box
      bgColor="primary.500"
      px={0.5}
      py={1}
      flexDirection="row"
      justifyContent="space-between">
      <Row px={1} alignItems="center">
        <BackButton prevRoute="UsersScreen" />
        <Text
          ml={1}
          fontSize="md"
          fontWeight="bold"
          textTransform="uppercase"
          color="white">
          {textSice(user.firstName + ' ' + user.lastName, 30)}
        </Text>
      </Row>
      <ProfileMenu user={user} />
    </Box>
  );
};

const ProfileMenu = ({user}: {user: User}) => {
  const {user: loggedUser} = useContext(AuthContext) as {user: User};

  return (
    <Menu
      closeOnSelect={false}
      onOpen={() => console.log('opened')}
      onClose={() => console.log('closed')}
      trigger={triggerProps => {
        return (
          <Pressable {...triggerProps}>
            <Icon
              color="white"
              as={<MaterialCommunityIcons name="dots-vertical" />}
              size={8}
            />
          </Pressable>
        );
      }}>
      <Menu.Group title="Profile">
        {user.id == loggedUser.id ? (
          <>
            <Menu.Item>
              <Text fontWeight="bold" ml={1}>
                Editer mon profile
              </Text>
            </Menu.Item>
            <Menu.Item>
              <Text fontWeight="bold" ml={1}>
                Parametres de mon compte
              </Text>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item>
              <Text fontWeight="bold" ml={1}>
                Plus de details
              </Text>
            </Menu.Item>
            {!user.followed ? (
              <Menu.Item>
                <Text fontWeight="bold" ml={1}>
                  Suivre
                </Text>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <Text fontWeight="bold" ml={1}>
                  Ne plus suivre
                </Text>
              </Menu.Item>
            )}
          </>
        )}
      </Menu.Group>
      <Divider borderColor="primary.500" />
      <Menu.Group title="Attention!">
        {user.id !== loggedUser.id ? (
          <>
            <Menu.Item>
              <Row>
                <Icon
                  color="danger.500"
                  as={<MaterialCommunityIcons name="close-box-outline" />}
                  size={5}
                />
                <Text ml={1}>Signaler</Text>
              </Row>
            </Menu.Item>
            <Menu.Item>
              <Row>
                <Icon
                  color="danger.500"
                  as={<MaterialCommunityIcons name="cancel" />}
                  size={5}
                />
                <Text ml={1}>Bloquer</Text>
              </Row>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item>
            <Row>
              <Icon
                color="danger.500"
                as={<MaterialCommunityIcons name="cancel" />}
                size={5}
              />
              <Text ml={1}>Supprimmer mon compte</Text>
            </Row>
          </Menu.Item>
        )}
      </Menu.Group>
    </Menu>
  );
};
