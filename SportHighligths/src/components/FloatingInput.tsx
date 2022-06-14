import {Avatar, Box, Button, Icon, Input} from 'native-base';
import * as React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../contexts/AuthContextProvider';
import {http} from '../services';

const FloatingInput = ({
  postId,
  onComment,
}: {
  postId: number | null;
  onComment: () => void;
}) => {
  const [value, setValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const {user} = React.useContext(AuthContext);
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
      alignItems="center"
      px={1}
      bottom={0.2}
      flexDirection="row">
      <Avatar source={{uri: user.avatar}} size={10} />
      <Input
        backgroundColor="white"
        value={value}
        variant="unstyled"
        placeholder="Entrez un commentaire..."
        borderBottomWidth={2}
        borderRadius={15}
        onChangeText={setValue}
        flex={0.88}
      />
      <Button
        flex={0.12}
        onPress={handleComment}
        borderRadius={15}
        isLoading={loading}
        variant="unstyled"
        backgroundColor="primary.500"
        p={1}
        m={0}>
        <Icon color="white" as={<Feather name="send" />} size={8} />
      </Button>
    </Box>
  );
};

export default FloatingInput;
