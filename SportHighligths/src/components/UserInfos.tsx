import {Avatar, Box, Row, Text} from 'native-base';
import React from 'react';

const UserInfos = ({
  showSubsCount = true,
  showPubsCount = true,
  showEmitedSubsCount = true,
}: {
  showSubsCount?: boolean | undefined;
  showPubsCount?: boolean | undefined;
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
              fontSize={18}
              fontWeight="bold"
              textAlign="center">
              12M
            </Text>
            <Text color="white">Publications</Text>
          </Box>
        )}
        {showSubsCount && (
          <Box>
            <Text
              color="white"
              fontSize={18}
              fontWeight="bold"
              textAlign="center">
              1.7k
            </Text>
            <Text color="white">Abonnes</Text>
          </Box>
        )}
        {showEmitedSubsCount && (
          <Box>
            <Text
              color="white"
              fontSize={18}
              fontWeight="bold"
              textAlign="center">
              897
            </Text>
            <Text color="white">Abonnement</Text>
          </Box>
        )}
      </Row>
    </Box>
  );
};

export default UserInfos;
