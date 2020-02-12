/* eslint-disable react/jsx-filename-extension */
import React, { memo } from 'react';
import {
  View,
} from 'react-native';

import Block from './Block';

const BlockWrapper = ({ viewStyles, key, ...otherProps }) => (
  <View style={viewStyles} key={key}>
    <Block {...otherProps} />
  </View>
);

export default memo(BlockWrapper);
