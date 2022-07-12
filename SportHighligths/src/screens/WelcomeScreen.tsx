import {
  Box,
  Center,
  FlatList,
  Icon,
  Pressable,
  Row,
  StatusBar,
  Text,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {onlyUnique} from '../services';
import {paperTheme} from '../themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export const FIRST_USE_KEY = 'FIRST_USE_KEY';
const slides = [
  {
    title: 'Screen 1',
    text: 'Text for screen 1',
  },
  {
    title: 'Screen 2',
    text: 'Text for screen 1',
  },
  {
    title: 'Screen 3',
    text: 'Text for screen 1',
  },
  {
    title: 'Screen 4',
    text: 'Text for screen 1',
  },
  {
    title: 'Screen 4',
    text: 'Text for screen 1',
  },
  {
    title: 'Screen 4',
    text: 'Text for screen 1',
  },
];
const {width, height} = Dimensions.get('screen');
const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleDone = async () => {
    navigation.navigate('LoginScreen' as never);
  };
  return (
    <>
      <StatusBar hidden />
      <Slides handleDone={handleDone} />
    </>
  );
};

export default WelcomeScreen;

type ISlidesProps = {
  handleDone: () => void;
};
const Slides = ({handleDone}: ISlidesProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const onViewableItemsChanged = useRef(
    (i: {viewableItems: {index: any}[]}) => {
      const index = i.viewableItems[0].index;
      setCurrentSlide(index);
    },
  );
  const listRef = useRef<any>(null);
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      listRef.current?.scrollToIndex({
        animated: true,
        index: currentSlide + 1,
        viewPosition: 0,
      });
    }
  };
  const handleSkip = () => {
    listRef.current?.scrollToEnd({
      animated: true,
      viewPosition: 0,
    });
  };
  return (
    <>
      <FlatList
        ref={listRef}
        horizontal
        data={slides}
        pagingEnabled
        keyExtractor={(_, i) => i + ''}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={({item}) => {
          return (
            <Center w={width} h={height}>
              <Text fontSize="3xl">{item.title}</Text>
              <Text fontSize="xl">{item.text}</Text>
            </Center>
          );
        }}
      />
      <Center px={4} position="absolute" bottom={36} w={width}>
        <Indicators count={slides.length} currentSlide={currentSlide} />
      </Center>
      <Row
        justifyContent="space-between"
        px={4}
        position="absolute"
        w={width}
        bottom={25}>
        <Pressable
          flexDir="row"
          alignItems="center"
          p={2}
          onPress={() => handleNext()}>
          <Text>Suivant</Text>
          <Icon
            color="black"
            as={<MaterialIcons name="chevron-right" />}
            size={6}
          />
        </Pressable>
        {currentSlide !== slides.length - 1 ? (
          <Pressable onPress={() => handleSkip()} p={2}>
            <Text>Passer</Text>
          </Pressable>
        ) : (
          <Pressable
            p={2}
            borderRadius={5}
            bgColor="primary.500"
            onPress={handleDone}>
            <Text color="white">Commencer</Text>
          </Pressable>
        )}
      </Row>
    </>
  );
};

type IndProps = {count: number; currentSlide: number};
const Indicators = ({count, currentSlide}: IndProps) => {
  const [indicators, setIndicators] = useState<number[]>([]);
  useEffect(() => {
    for (let i = 0; i < count; i++) {
      setIndicators(prev => [...prev, i].filter(onlyUnique));
    }
  }, []);

  return (
    <Row>
      {indicators.map(i => (
        <Box
          key={i}
          mx={1}
          h={3}
          w={3}
          borderRadius={5}
          bgColor={currentSlide === i ? 'blue.500' : 'white'}
          borderWidth={0.3}
          borderColor={
            currentSlide !== i ? paperTheme.colors.primary[500] : 'white'
          }
          overflow="hidden"
        />
      ))}
    </Row>
  );
};
