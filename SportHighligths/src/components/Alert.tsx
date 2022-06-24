import React, {useCallback, useEffect, useState} from 'react';
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
import * as Animatable from 'react-native-animatable';
import {sleep} from '../services';

const ANIMATION_ENTERING = 1;
const ANIMATION_PENDING = 2;
const ANIMATION_LEAVED = 3;
const ANIMATION_DURATION = 1000;

const Alert = ({
  status,
  text,
  onClose,
}: {
  status: InterfaceAlertProps['status'];
  text: string;
  onClose?: () => void;
}) => {
  const [animationState, setAnimationState] = useState(
    text.length > 0 ? ANIMATION_ENTERING : ANIMATION_LEAVED,
  );

  useEffect(() => {
    setAnimationState(text.length > 0 ? ANIMATION_ENTERING : ANIMATION_LEAVED);
  }, [text]);

  const handleClose = useCallback(async () => {
    if (animationState !== ANIMATION_LEAVED) {
      setAnimationState(ANIMATION_PENDING);
      sleep(ANIMATION_DURATION)
        .then(onClose)
        .then(() => setAnimationState(ANIMATION_LEAVED));
    }
  }, [onClose, animationState]);

  return animationState !== ANIMATION_LEAVED ? (
    <Animatable.View
      animation={
        animationState === ANIMATION_ENTERING
          ? {
              from: {
                opacity: 0,
                left: -100,
                transform: [{scale: 0.6}],
              },
              to: {
                opacity: 1,
                left: 0,
                transform: [{scale: 1}],
              },
            }
          : {
              from: {
                opacity: 1,
                left: 0,
                transform: [{scale: 1}],
              },
              to: {
                opacity: 0,
                left: -100,
                transform: [{scale: 0.6}],
              },
            }
      }
      duration={ANIMATION_DURATION}>
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
                    onPress={handleClose}
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
    </Animatable.View>
  ) : (
    <></>
  );
};

export default Alert;
