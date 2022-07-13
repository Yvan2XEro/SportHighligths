import {View, Text, Row, Input, Icon, Box} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ArticlesList from '../components/ArticlesList';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import {paperTheme, tabsTheme} from '../themes';

const HighlightsListScreen = () => {
  return (
    <View flex={1}>
      <Box bgColor="primary.500" pb={2}>
        <Header />
      </Box>
      <Tabs
        style={{
          backgroundColor: paperTheme.colors.primary[500],
          paddingTop: 5,
        }}
        theme={tabsTheme}>
        <TabScreen icon="star" label="Populaire">
          <Box mx={2}>
            <ArticlesList url="/highligths" />
          </Box>
        </TabScreen>
        <TabScreen label="Recommande">
          <Box mx={2}>
            <ArticlesList url="/highligths" />
          </Box>
        </TabScreen>
      </Tabs>
    </View>
  );
};

export default HighlightsListScreen;

const Header = () => {
  const [searchKey, setSearchKey] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = React.useRef<any>(null);
  return (
    <Row alignItems="center" bgColor="white" borderRadius={8} mx={2} px={1}>
      <Icon color="primary.500" size={6} as={<Ionicons name="md-search" />} />
      <Input
        variant="unstyled"
        flex={0.8}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        value={searchKey}
        onChangeText={text => setSearchKey(text)}
        placeholder="Rechercher une publication..."
      />
      {searchKey.length > 1 && (
        <TouchableOpacity
          style={{flex: 0.1, marginLeft: 'auto'}}
          onPress={() => setSearchKey('')}>
          <Icon color="primary.500" as={<Feather name="delete" />} size={5} />
        </TouchableOpacity>
      )}
      {focused && (
        <TouchableOpacity
          style={{flex: 0.1, marginLeft: 'auto'}}
          onPress={() => {
            inputRef.current.blur();
            setFocused(false);
          }}>
          <Icon
            color="primary.500"
            as={<Ionicons name="close-outline" />}
            size={8}
          />
        </TouchableOpacity>
      )}
    </Row>
  );
};
