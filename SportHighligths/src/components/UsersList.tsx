import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Avatar, Box, Button, FlatList, Row, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const UsersList = ({users}: {users: any[]}) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6]}
      keyExtractor={(item, i) => i + ''}
      renderItem={() => {
        return (
          <Row mb={1}>
            <TouchableOpacity
              style={{flexDirection: 'row', flex: 6}}
              onPress={() =>
                navigation.navigate('ProfileScreen' as never, {id: 1} as never)
              }>
              <Box>
                <Avatar source={require('../assets/Cover.jpg')} />
              </Box>
              <Box mx={1} flex={1}>
                <Text fontSize={17} fontWeight="bold">
                  Jean Robert
                </Text>
                <Text flexShrink={1}>
                  Suivi par 121k personnes(2 amis en communs)
                </Text>
              </Box>
            </TouchableOpacity>
            <Box flex={2.5}>
              <Button>Suivre</Button>
            </Box>
          </Row>
        );
      }}
    />
  );
};

export default UsersList;
