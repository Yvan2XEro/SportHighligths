import {Avatar, Box, Row, Text} from 'native-base';
import React from 'react';
import {numConverter} from '../services';
import {User} from '../types';

const UserInfos = ({
  showSubsCount = true,
  showPubsCount = true,
  data,
  showEmitedSubsCount = true,
}: {
  showSubsCount?: boolean | undefined;
  showPubsCount?: boolean | undefined;
  data: User;
  showEmitedSubsCount?: boolean | undefined;
}) => {
  return (
    <Box backgroundColor="primary.500">
      <Row
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
        flexWrap="wrap">
        <Avatar
          source={{
            uri: 'https://cdn.pixabay.com/photo/2020/04/30/09/18/man-5112054__340.jpg',
          }}
          size={90}
        />
        {showPubsCount && (
          <Box>
            <Text
              color="white"
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center">
              {numConverter(data?.publicationsCount)}
            </Text>
            <Text color="white">
              {data?.publicationsCount !== 1 ? 'Publications' : 'Publication'}
            </Text>
          </Box>
        )}
        {showSubsCount && (
          <Box>
            <Text
              color="white"
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center">
              {numConverter(data?.followersCount)}
            </Text>
            <Text color="white">
              {data?.followersCount !== 1 ? 'Abonnés' : 'Abonné'}
            </Text>
          </Box>
        )}
        {showEmitedSubsCount && (
          <Box>
            <Text
              color="white"
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center">
              {numConverter(data?.followingsCount)}
            </Text>
            <Text color="white">
              {data?.followingsCount !== 1 ? 'Abonnements' : 'Abonnement'}
            </Text>
          </Box>
        )}
      </Row>
    </Box>
  );
};

export default UserInfos;
