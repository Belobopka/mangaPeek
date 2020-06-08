/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated, Button } from 'react-native';

const DESCRIPTION_LENGTH = 1002;
const IMAGE_WIDTH = 50;
const IMAGE_HEIGTH = 50;
const IMAGE_WIDTH_EXPANDED = 200;
const IMAGE_HEIGTH_EXPANDED = 200;

const animation = ({ height, width }) => ({ toHeight, toWidth }) =>
  Animated.parallel([
    Animated.timing(height, {
      toValue: toHeight,
      duration: 1000,
    }),
    Animated.timing(width, {
      toValue: toWidth,
      duration: 1000,
    }),
  ]);

const Title = ({ manga, styles, mangaInfo = {} }) => {
  // const [expanded, toggleExpand] = useState(false);
  const [width] = useState(new Animated.Value(IMAGE_WIDTH_EXPANDED));
  const [height] = useState(new Animated.Value(IMAGE_HEIGTH_EXPANDED));
  const [animateWorks, onChangeAnimate] = useState({
    isLoading: false,
    state: 0,
  });
  const [textTranslateY] = useState(new Animated.Value(1));
  const animationToggle = animation({ height, width });
  const onToggle = () => {
    onChangeAnimate({ state: animateWorks.state ? 0 : 1 });
    if (animateWorks.state) {
      animationToggle({
        toHeight: IMAGE_HEIGTH_EXPANDED,
        toWidth: IMAGE_WIDTH_EXPANDED,
      }).start();
      textTranslateY.setValue(0);
      Animated.timing(textTranslateY, {
        toValue: 1,
        duration: 1000,
      }).start();
    } else {
      textTranslateY.setValue(1);
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 1000,
      }).start();
      animationToggle({ toHeight: IMAGE_HEIGTH, toWidth: IMAGE_WIDTH }).start();
    }
  };

  const menuMoveY = textTranslateY.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 250],
  });

  return (
    <View styles={styles.titleContainer}>
      {manga.img && (
        <Animated.Image source={{ uri: manga.img }} style={{ width, height }} />
      )}
      {mangaInfo.description && (
        <Animated.View
          style={{ ...styles.itemTextContainer, maxHeight: menuMoveY }}
        >
          <Text>
            {`${mangaInfo.description.slice(0, DESCRIPTION_LENGTH)}${
              mangaInfo.description.length > DESCRIPTION_LENGTH
                ? ' more...'
                : ''
            }`}
          </Text>
        </Animated.View>
      )}
      {mangaInfo.genresArray && (
        <View style={styles.genreTextContainer}>
          {mangaInfo.genresArray.map(item => (
            <View key={item.title} style={styles.itemTextContainer}>
              <Text style={styles.genre}>{`${item.title}`}</Text>
            </View>
          ))}
        </View>
      )}
      <Button
        onPress={onToggle}
        title={animateWorks.state ? 'Развернуть' : 'Свернуть'}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

Title.propTypes = {
  manga: PropTypes.shape({}).isRequired,
  styles: PropTypes.shape({}).isRequired,
  mangaInfo: PropTypes.shape({
    mangaGenres: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
};

export default Title;
