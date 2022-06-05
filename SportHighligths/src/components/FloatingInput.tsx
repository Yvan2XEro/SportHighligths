import {Box, Icon, Input} from 'native-base';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const FloatingInput = ({
  postId,
  onBlur,
}: {
  postId: number | null;
  onBlur: () => void;
}) => {
  const InputRef = React.useRef<any>(null);

  return (
    <Box
      position="absolute"
      width="100%"
      backgroundColor="white"
      py={1}
      alignItems="center"
      bottom={0.1}
      flexDirection="row">
      <Input
        backgroundColor="white"
        ref={InputRef}
        onBlur={onBlur}
        flex={0.9}
        autoFocus
      />
      <TouchableOpacity style={{flex: 0.12}}>
        <Icon color="primary.500" as={<Feather name="send" />} size={10} />
      </TouchableOpacity>
    </Box>
  );
};

export default FloatingInput;
