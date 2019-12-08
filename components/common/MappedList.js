/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default ({ list, openMangaLink, styles }) => {
  const keyExtractor = (item, index) => item.name || index.toString();

  const touchableOpacityOnPress = (item) => () => {
    return openMangaLink(item);
  };

  return (list.map(
    (item, index) => {
      return (
        <TouchableOpacity 
          onPress={touchableOpacityOnPress(item)} 
          style={styles.touchableOpacity} 
          key={keyExtractor(item.name, index)}
        >
          {item.img && (
          <Image
            style={styles.itemImage}
            source={{uri: item.img}}
          />
          )}
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{`${item.name}`}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  ));
};
