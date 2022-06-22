import {View, Text} from 'react-native';
import React, {createContext, useCallback, useState} from 'react';
import {ImageSource} from 'react-native-image-viewing/dist/@types';
import ImageView from 'react-native-image-viewing';
import {paperTheme} from '../themes';
import {Center} from 'native-base';

export const ImagesViewerContext = createContext({
  images: [] as ImageSource[],
  imageIndex: 0,
  setImageIndex: (v: number) => {},
  isVisible: false,
  setIsVisible: (v: boolean) => {},
  openImagesViewer: (images: ImageSource[], index = 0) => {},
  closeImagesViewer: () => {},
});

const ImagesViewerContextProvider = ({children}: any) => {
  const [images, setImages] = useState<ImageSource[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const openImagesViewer = useCallback(
    (images: ImageSource[], index = 0) => {
      setImages(images);
      setImageIndex(index);
      setIsVisible(true);
    },
    [setImages, setImageIndex, setIsVisible],
  );

  const closeImagesViewer = useCallback(() => {
    setImages([]);
    setImageIndex(0);
    setIsVisible(false);
  }, [setImages, setImageIndex, setIsVisible]);

  return (
    <ImagesViewerContext.Provider
      value={{
        images,
        imageIndex,
        isVisible,
        setIsVisible,
        setImageIndex,
        openImagesViewer,
        closeImagesViewer,
      }}>
      {children}
      <ImageView
        images={images}
        imageIndex={imageIndex}
        onImageIndexChange={setImageIndex}
        backgroundColor={paperTheme.colors.primary[500]}
        FooterComponent={() => (
          <Center>
            <Text>{`${images.length > 0 ? imageIndex + 1 : 0}/${
              images.length
            }`}</Text>
          </Center>
        )}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      />
    </ImagesViewerContext.Provider>
  );
};

export default ImagesViewerContextProvider;
