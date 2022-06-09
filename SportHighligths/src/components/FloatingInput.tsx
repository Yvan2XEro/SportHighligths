import {Box, Button, Icon, Input} from 'native-base';
import * as React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {http} from '../services';

const FloatingInput = ({
  postId,
  onBlur,
  onComment,
}: {
  postId: number | null;
  onBlur: () => void;
  onComment: () => void;
}) => {
  const InputRef = React.useRef<any>(null);
  const [value, setValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleComment = React.useCallback(async () => {
    if (value.length > 0) {
      setLoading(true);
      await http
        .post(`/posts/${postId}/new-comment`, {
          content: value,
        })
        .then(() => {
          setValue('');
          setLoading(false);
          onBlur();
          setValue('');
          onComment();
        })
        .catch(e => {
          console.log(e.response.data);
          setLoading(false);
        });
    }
  }, [value, postId]);
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
        value={value}
        onChangeText={setValue}
        ref={InputRef}
        onBlur={onBlur}
        flex={0.9}
        autoFocus
      />
      <Button
        flex={0.12}
        onPress={handleComment}
        isLoading={loading}
        variant="unstyled"
        p={0}>
        <Icon color="primary.500" as={<Feather name="send" />} size={10} />
      </Button>
    </Box>
  );
};

export default FloatingInput;
