import {Box, Heading, Icon, Input, Row, Text, View} from 'native-base';
import * as React from 'react';
import {
  BackHandler,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostList from '../components/PostList';
import * as Animatable from 'react-native-animatable';
import {paperTheme} from '../themes';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation}: any) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

  return (
    <Box position="relative">
      <Animated.View style={{transform: [{translateY}], zIndex: 1.1}}>
        <Box
          bgColor="primary.500"
          position="absolute"
          top={0}
          pt={1.5}
          left={0}
          right={0}>
          <Header navigation={navigation} setIsSearching={setIsSearching} />
        </Box>
      </Animated.View>
      <Animatable.View
        animation={
          !isSearching
            ? {
                from: {
                  opacity: 0.5,
                },
                to: {opacity: 1},
              }
            : undefined
        }>
        <Box opacity={isSearching ? 0 : 1} mx={2} position="relative">
          <PostList
            url="/posts"
            onScroll={(n: number) => {
              scrollY.setValue(n);
            }}
          />
        </Box>
      </Animatable.View>
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  actionBtn: {marginRight: 7},
});

const Header = ({navigation, setIsSearching}: any) => {
  const [searching, setSearching] = React.useState(false);
  React.useEffect(() => {
    setIsSearching(searching);
  }, [searching]);
  return searching ? (
    <SearchInput
      onCloseSearching={() => {
        setSearching(false);
        setIsSearching(false);
      }}
    />
  ) : (
    <ActionsHeader
      searching={searching}
      onSearching={() => setSearching(true)}
      navigation={navigation}
    />
  );
};

const ANIMATION_DURATION = 500;
// Search input screen
export const SearchInput = ({
  onCloseSearching,
}: {
  onCloseSearching: () => void;
}) => {
  const searchInputRef = React.useRef<any>(null);
  const inputRef = React.useRef<any>(null);
  const [searchKey, setSearchKey] = React.useState('');
  const [focusedInput, setFocusedInput] = React.useState(true);
  const [searchinActive, setSearchinActive] = React.useState(false);
  const [screenDimensions, setScreenDimensions] = React.useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const openSearchAnimation = {
    from: {
      borderBottomLeftRadius: 5000,
      borderTopLeftRadius: 5000,
      borderBottomRightRadius: 5000,
      width: 0,
      height: 0,
      right: 25,
      marginTop: 120,
    },
    to: {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: screenDimensions.height,
      height: screenDimensions.height,
      right: 0,
      marginTop: 0,
    },
  };

  const closeSearchAnimation = {
    from: {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: screenDimensions.height,
      height: screenDimensions.height,
      right: 0,
      marginTop: 0,
    },
    to: {
      borderBottomLeftRadius: 5000,
      borderTopLeftRadius: 5000,
      borderBottomRightRadius: 5000,
      width: 0,
      height: 0,
      right: 25,
      marginTop: 120,
    },
  };

  const handleClose = () => {
    setTimeout(onCloseSearching, ANIMATION_DURATION);
    setSearchinActive(sa => (focusedInput ? sa : false));
    setFocusedInput(focusedInput => !focusedInput);
  };

  useFocusEffect(
    React.useCallback(() => {
      const backEvent = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (searchKey.length > 0) {
            setSearchKey('');
            inputRef?.current.clear();
            return true;
          } else if (focusedInput) {
            handleClose();
            return true;
          }

          return false;
        },
      );

      const e = Dimensions.addEventListener('change', newSizes => {
        setScreenDimensions({
          height: newSizes.window.height,
          width: newSizes.window.width,
        });
      });

      return () => {
        backEvent.remove();
        e.remove();
      };
    }, [searchKey, focusedInput, inputRef.current, handleClose]),
  );

  return (
    <View ref={searchInputRef}>
      <Animatable.View
        animation={
          focusedInput
            ? {
                from: {
                  bottom: 60,
                },
                to: {
                  bottom: 0,
                },
              }
            : {
                from: {
                  bottom: 0,
                },
                to: {
                  bottom: 50, //25,
                },
              }
        }
        style={[{zIndex: 1.5}]}>
        <Row alignItems="center" bgColor="white" borderRadius={8} mx={2} px={1}>
          <Icon
            color="primary.500"
            size={6}
            as={<Ionicons name="md-search" />}
          />
          <Input
            variant="unstyled"
            flex={0.8}
            ref={inputRef}
            value={searchKey}
            autoFocus={true}
            onFocus={() => {
              setFocusedInput(true);
              setSearchinActive(true);
            }}
            onBlur={() => {
              setFocusedInput(false);
              setSearchinActive(false);
              setTimeout(onCloseSearching, ANIMATION_DURATION);
            }}
            onChangeText={text => setSearchKey(text)}
            placeholder="Rechercher une publication..."
          />
          {searchKey.length > 1 && (
            <TouchableOpacity
              style={{flex: 0.1}}
              onPress={() => setSearchKey('')}>
              <Icon
                color="primary.500"
                as={<Feather name="delete" />}
                size={5}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{flex: 0.1, marginLeft: 'auto'}}
            onPress={handleClose}>
            <Icon
              color="primary.500"
              as={<Ionicons name="close-outline" />}
              size={8}
            />
          </TouchableOpacity>
        </Row>
      </Animatable.View>
      {searchinActive && (
        <Animatable.View
          animation={focusedInput ? openSearchAnimation : closeSearchAnimation}
          duration={ANIMATION_DURATION}
          style={{
            position: 'absolute',
            top: -70,
            right: 0,
            backgroundColor: paperTheme.colors.primary[500],
            opacity: 1,
            zIndex: 1.4,
            paddingTop: 60,
          }}>
          <Text></Text>
        </Animatable.View>
      )}
    </View>
  );
};

const ActionsHeader = ({navigation, onSearching, searching}: any) => {
  const actionsRef = React.useRef<any>(null);

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
