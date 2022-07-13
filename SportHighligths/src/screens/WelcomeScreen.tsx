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
import {Dimensions, ImageBackground} from 'react-native';
import {onlyUnique} from '../services';
import {paperTheme} from '../themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import Followers from '../assets/welcome/followers.svg';
import Happy from '../assets/welcome/happy.svg';
import Profile from '../assets/welcome/profile.svg';
import Settings from '../assets/welcome/settings.svg';
import SocialLife from '../assets/welcome/social_life.svg';
import Team from '../assets/welcome/team.svg';

export const FIRST_USE_KEY = 'FIRST_USE_KEY';
const slides = [
  {
    title: 'Vivez des moments inoubliables!',
    text: 'Vous pouvez partager vos meilleurs moments avec vos amis.',
    svg: <Team height={150} />,
  },
  {
    title: 'Suivez vos equipes favorites!',
    text: 'Retrouvez les meilleurs moments forts de tous les matchs concernants vos equipes favorites',
    svg: <Happy height={150} />,
  },
  {
    title: 'Reagiz sur les matchs!',
    text: 'Vous pouvez donner votre avis sur les matchs de votre choix.',
    svg: <SocialLife height={150} />,
  },
  {
    title: 'Retrouvez vos amis!',
    text: 'Vous pouvez retrouver des amis qui partagent les memes moments forts que vous  sur notre application.',
    svg: <Followers height={150} />,
  },
  {
    title: 'Personnalisez votre application!',
    text: 'Vous pouvez personnaliser votre application pour vous adapter a vos besoins.',
    svg: <Settings height={150} />,
  },
  {
    title: 'Adaptez votre profil!',
    text: "Vous pouvez adaptez votre profil afin d' avoir des meilleurs suggestions.",
    svg: <Profile height={150} />,
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
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/BgAuth2.png')}>
        <Slides handleDone={handleDone} />
      </ImageBackground>
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
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(_, i) => i + ''}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={({item}) => {
          return (
            <Center w={width} h={height}>
              {item.svg}
              <Text textAlign="center" color="gray.300" fontSize="3xl">
                {item.title}
              </Text>
              <Text mt={2} textAlign="center" color="gray.400" fontSize="xl">
                {item.text}
              </Text>
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
          <Text color="white">Suivant</Text>
          <Icon
            color="white"
            as={<MaterialIcons name="chevron-right" />}
            size={6}
          />
        </Pressable>
        {currentSlide !== slides.length - 1 ? (
          <Pressable onPress={() => handleSkip()} p={2}>
            <Text color="white">Passer</Text>
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
