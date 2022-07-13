import {Center, Text} from 'native-base';
import React from 'react';
import NoDataSvg from '../assets/nodata.svg';

type INoDataProps = {
  text: string;
};
const NoData = ({text}: INoDataProps) => {
  return (
    <Center mt={5}>
      <NoDataSvg height={200} />
      <Text mt={1} fontFamily="ProductSans-Medium" fontSize={17}>
        {text}
      </Text>
    </Center>
  );
};

export default NoData;
