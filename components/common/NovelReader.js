/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Text,
  ScrollView,
} from 'react-native';

// import styles from './styles/MangaList';

export default ({ text, styles }) => (
  <ScrollView>
    <Text>
      {text}
    </Text>
  </ScrollView>
);
