import {Box, Icon, Input, Row} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsersList from '../components/UsersList';

const UsersScreen = () => {
  return (
    <Box>
      <Header />
      <Box mx={2} mt={1}>
        <UsersList users={[]} />
      </Box>
    </Box>
  );
};

export default UsersScreen;

const Header = () => {
  return (
    <Box bgColor="primary.500" p={2}>
      <Row
        alignItems="center"
        borderWidth={0.3}
        borderRadius={5}
        px={1}
        bgColor="white">
        <Icon
          color="primary.500"
          flex={1}
          as={<Ionicons name="md-search-sharp" />}
          size={6}
        />
        <Input
          color="primary.500"
          variant="unstyled"
          flex={8}
          height={39}
          placeholder="Rechercher..."
        />
        <Icon
          color="primary.500"
          flex={1}
          as={<Ionicons name="people" />}
          size={7}
        />
      </Row>
    </Box>
  );
};
