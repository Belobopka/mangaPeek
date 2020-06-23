/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default React.memo(({ openMangaLink, styles, item }) => {
  const touchableOpacityOnPress = () => openMangaLink(item);

  return (
    <TouchableOpacity
      onPress={touchableOpacityOnPress}
      style={styles.touchableOpacity}
    >
      {item.img && (
        <Image style={styles.itemImage} source={{ uri: item.img }} />
      )}
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{`${item.name}`}</Text>
      </View>
    </TouchableOpacity>
  );
});
