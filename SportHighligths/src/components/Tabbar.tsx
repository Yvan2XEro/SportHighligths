import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated,
} from 'react-native';
import * as shape from 'd3-shape';
import {Path, Svg} from 'react-native-svg';
import StaticTabbar from './StaticTabbar';
import {paperTheme} from '../themes';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const {width} = Dimensions.get('window');
const height = 64;
const tabs = [
  {
    name: 'md-home-outline',
    screen: 'PostStackNavigation',
  },
  {
    name: 'people-outline',
    screen: 'UsersNavigation',
  },
  {
    name: 'md-search-outline',
    screen: 'SearchScreen',
  },
  {
    name: 'star-outline',
    screen: 'HighlightsStackNavigation',
  },
];
const tabWidth = width / tabs.length;
const backgroundColor = paperTheme.colors.primary[500];

const getPath = (): string => {
  const left = shape
    .line()
    .x(d => d[0])
    .y(d => d[1])([
    [0, 0],
    [width, 0],
  ]);
  const tab = shape
    .line()
    .x(d => d[0])
    .y(d => d[1])
    .curve(shape.curveBasis)([
    [width, 0],
    [width + 5, 0],
    [width + 10, 10],
    [width + 15, height],
    [width + tabWidth - 15, height],
    [width + tabWidth - 10, 10],
    [width + tabWidth - 5, 0],
    [width + tabWidth, 0],
  ]);
  const right = shape
    .line()
    .x(d => d[0])
    .y(d => d[1])([
    [width + tabWidth, 0],
    [width * 2, 0],
    [width * 2, height],
    [0, height],
    [0, 0],
  ]);
  return `${left} ${tab} ${right}`;
};
const d = getPath();
interface TabbarProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps> {
  value = new Animated.Value(0);

  render() {
    const {value} = this;
    tabs;
    const translateX = value.interpolate({
      inputRange: [0, width],
      outputRange: [-width, 0],
    });
    return (
      <>
        <View {...{height, width}}>
          <AnimatedSvg
            width={width * 2}
            {...{height}}
            style={{transform: [{translateX}]}}>
            <Path fill={backgroundColor} {...{d}} />
          </AnimatedSvg>
          <View style={StyleSheet.absoluteFill}>
            <StaticTabbar {...{tabs, value}} />
          </View>
        </View>
        <SafeAreaView style={styles.container} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});
