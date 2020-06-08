/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';

import rightArrow from '../../assets/images/right_arrow.png';

const Title = ({ openMangaSite, homeStyles, moduleName, children }) => (
  <View style={homeStyles.siteContainer}>
    <TouchableOpacity
      onPress={openMangaSite}
      style={homeStyles.touchableOpacity}
    >
      <Text style={homeStyles.blockName}>
        {moduleName.toUpperCase()}
        <Image source={rightArrow} style={homeStyles.rightButtonImage} />
      </Text>
    </TouchableOpacity>
    {children}
  </View>
);

export default React.memo(Title);
