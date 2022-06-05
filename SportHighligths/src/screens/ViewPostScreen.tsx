import {Box, Icon, ScrollView, View} from 'native-base';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import Post from '../components/Post';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FloatingInput from '../components/FloatingInput';
import {useNavigation} from '@react-navigation/native';

const ViewPostScreen = () => {
  const [showInput, setShowInput] = React.useState(false);
  return (
    <Box mb={10} position="relative">
      <Header />
      <View marginX={2}>
        <ScrollView>
          <Post data={{id: 1}} onFocus={() => setShowInput(true)} />
        </ScrollView>
      </View>
      {showInput && (
        <FloatingInput postId={1} onBlur={() => setShowInput(false)} />
      )}
    </Box>
  );
};

export default ViewPostScreen;

export const Header = () => {
  const navigation = useNavigation();
  return (
    <Box px={0.5} py={1} flexDirection="row" justifyContent="space-between">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon as={<MaterialIcons name="chevron-left" />} size={8} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon as={<MaterialCommunityIcons name="dots-vertical" />} size={8} />
      </TouchableOpacity>
    </Box>
  );
};
