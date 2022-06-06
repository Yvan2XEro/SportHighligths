import {Box, Heading, Icon, Input, Row} from 'native-base';
import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FloatingInput from '../components/FloatingInput';
import PostList from '../components/PostList';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({navigation}: any) => {
  const [commentingPostId, setCommentingPostId] = React.useState<number | null>(
    null,
  );

  return (
    <Box style={{marginBottom: 56}} position="relative">
      <Box p={1} bgColor="primary.500">
        <Header navigation={navigation} />
      </Box>
      <Box mx={2} mb={10} position="relative">
        <PostList
          commentingPostId={commentingPostId}
          setCommentingPostId={setCommentingPostId}
          posts={[]}
        />
        {commentingPostId !== null && (
          <FloatingInput
            postId={commentingPostId}
            onBlur={() => setCommentingPostId(null)}
          />
        )}
      </Box>
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  actionBtn: {marginRight: 7},
});

const Header = ({navigation}: any) => {
  const [searching, setSearching] = React.useState(false);

  return searching ? (
    <SearchInput
      searching={searching}
      onCloseSearching={() => setSearching(false)}
    />
  ) : (
    <ActionsHeader
      searching={searching}
      onSearching={() => setSearching(true)}
      navigation={navigation}
    />
  );
};

const ANIMATION_DURATION = 200;

export const SearchInput = ({
  onCloseSearching,
  searching,
}: {
  onCloseSearching: () => void;
  searching: boolean;
}) => {
  const searchInputRef = React.useRef<any>(null);
  const inputRef = React.useRef<any>(null);
  const [searchKey, setSearchKey] = React.useState('');

  React.useEffect(() => {
    if (searchInputRef && searchInputRef.current) {
      if (searching) {
        searchInputRef.current.slideInRight(ANIMATION_DURATION).then(() => {
          if (inputRef && inputRef.current) {
            inputRef.current.focus();
          }
        });
      }
    }
  }, [searching]);

  return (
    <Animatable.View ref={searchInputRef}>
      <Row alignItems="center" bgColor="white" borderRadius={8} mx={2} px={1}>
        <Icon color="primary.500" size={6} as={<Ionicons name="md-search" />} />
        <Input
          variant="unstyled"
          flex={0.8}
          ref={inputRef}
          value={searchKey}
          onChangeText={text => setSearchKey(text)}
          placeholder="Rechercher une publication..."
        />
        {searchKey.length > 1 && (
          <TouchableOpacity
            style={{flex: 0.1}}
            onPress={() => setSearchKey('')}>
            <Icon color="primary.500" as={<Feather name="delete" />} size={5} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{flex: 0.1, marginLeft: 'auto'}}
          onPress={() => {
            inputRef.current.blur();
            searchInputRef.current.slideOutLeft(ANIMATION_DURATION);
            setTimeout(
              () => {
                onCloseSearching();
              } /* onCloseSearching() */,
              ANIMATION_DURATION - 100,
            );
          }}>
          <Icon
            color="primary.500"
            as={<Ionicons name="close-outline" />}
            size={8}
          />
        </TouchableOpacity>
      </Row>
    </Animatable.View>
  );
};

const ActionsHeader = ({navigation, onSearching, searching}: any) => {
  const actionsRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (actionsRef && actionsRef.current) {
      if (!searching) {
        actionsRef.current.slideInRight(ANIMATION_DURATION);
      }
    }
  }, [searching]);
  return (
    <Animatable.View ref={actionsRef}>
      <Box px={2} py={1}>
        <Row alignItems="center" justifyContent="space-between">
          <Row alignItems="center">
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                color="white"
                size={8}
                as={<Ionicons name="menu-sharp" />}
              />
            </TouchableOpacity>
            <Heading color="white" ml={1} size="md" textTransform="uppercase">
              SportHightligths
            </Heading>
          </Row>
          <Row>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon
                color="white"
                size={6}
                as={<Ionicons name="notifications" />}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate('NewPostScreen')}>
              <Icon
                color="white"
                size={6}
                as={<FontAwesome name="plus-square-o" />}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={onSearching}>
              <Icon color="white" size={6} as={<Ionicons name="md-search" />} />
            </TouchableOpacity>
          </Row>
        </Row>
      </Box>
    </Animatable.View>
  );
};
