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

const ProfileScreen = () => {
  const {id} = useRoute().params as any;
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  return (
    <View flex={1}>
      <Header />
      <Box bgColor="primary.500" px={2} py={1}>
        <UserInfos />
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
            <UsersList users={[]} />
          </TabScreen>
        </Tabs>
      </Box>
    </View>
  );
};

export default ProfileScreen;

export const Header = () => {
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
          Jean robert
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
