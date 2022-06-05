import * as React from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export function useKeyboard() {
  const [keyboarHeight, setKeyboardHeigth] = React.useState(0);

  function onKeyboadDidShow(e: KeyboardEvent) {
    setKeyboardHeigth(e.endCoordinates.height);
  }
  function onKeyboadDidHide() {
    setKeyboardHeigth(0);
  }

  React.useEffect(() => {
    const showSubsription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboadDidShow,
    );
    const hideSubsription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboadDidHide,
    );

    return () => {
      showSubsription.remove();
      hideSubsription.remove();
    };
  }, []);
  return keyboarHeight;
}
