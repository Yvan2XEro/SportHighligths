import {useNavigation, useRoute} from '@react-navigation/native';
import {Box, Icon, Row, Text, View} from 'native-base';
import React, {useState} from 'react';
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

const ProfileScreen = () => {
  const {user} = useRoute().params as {user: User};
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  return (
    <View flex={1}>
      <Header user={user} />
      <Box bgColor="primary.500" px={2} py={1}>
        <UserInfos data={user} />
      </Box>
      <Box flex={1}>
        <Tabs
          style={{
            backgroundColor: paperTheme.colors.primary[500],
            paddingTop: 5,
          }}
          theme={tabsTheme}
          showLeadingSpace={true}>
          <TabScreen label="Publications">
            <>
              <PostList
                commentingPostId={commentingPostId}
                setCommentingPostId={id => setCommentingPostId(id)}
                posts={[]}
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
            <UsersList url={`/users/${user.id}/followers`} />
          </TabScreen>
        </Tabs>
      </Box>
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
