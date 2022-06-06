import React from 'react';
import {
  Alert as NBAlert,
  Center,
  CloseIcon,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {InterfaceAlertProps} from 'native-base/lib/typescript/components/composites/Alert/types';

const Alert = ({
  status,
  text,
  onClose,
}: {
  status: InterfaceAlertProps['status'];
  text: string;
  onClose?: () => void;
}) => {
  return (
    <Center>
      <Stack space={3} w="100%" maxW="400">
        <NBAlert
          w="100%"
          status={status}
          bgColor={status == 'error' ? 'error.400' : undefined}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <NBAlert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {text}
                </Text>
              </HStack>
              {!!onClose && (
                <IconButton
                  variant="unstyled"
                  onPress={onClose}
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: 'coolGray.600',
                  }}
                />
              )}
            </HStack>
          </VStack>
        </NBAlert>
      </Stack>
    </Center>
  );
};

export default Alert;
